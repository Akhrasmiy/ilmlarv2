const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config(); // .env faylidan o‘qish uchun

// AWS sozlamalari
const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const cloudfrontDomain = "d276aggqk07mvs.cloudfront.net";
const keyPairId = process.env.CLOUDFRONT_KEY_PAIR_ID; // To‘g‘ri Key Pair ID’ni .env’dan oling
const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY; // Private Key’ni .env’dan oling

// Signed URL yaratish funksiyasi
function getCloudFrontSignedUrl(key, expiresIn = 86400) {
  const url = `https://${cloudfrontDomain}/${key}`;
  return getSignedUrl({
    url,
    keyPairId,
    privateKey,
    dateLessThan: new Date(Date.now() + expiresIn * 1000), // expiresIn sekundda
  });
}

// Video yuklash funksiyasi
const uploadTrailerToVimeo = async (videoFile) => {
  try {
    const tempPath = path.join(__dirname, "../../Uploads", videoFile.name);

    // Vaqtinchalik faylni saqlash
    await fs.writeFile(tempPath, videoFile.data);

    // UUID generatsiyasi
    const uniqueId = uuidv4();
    const fileExtension = path.extname(videoFile.name).toLowerCase();
    const uniqueFileName = `${uniqueId}-${videoFile.name}`;

    // Content-Type
    const contentTypes = {
      ".mp4": "video/mp4",
      ".webm": "video/webm",
      ".mov": "video/quicktime",
      ".m3u8": "application/x-mpegURL",
    };
    const contentType = contentTypes[fileExtension] || "application/octet-stream";

    // S3’ga yuklash
    const params = {
      Bucket: "ilmlar-videos-2025",
      Key: uniqueFileName,
      Body: await fs.readFile(tempPath),
      ContentType: contentType,
      ACL: "private",
    };

    await s3Client.send(new PutObjectCommand(params));
    console.log(`Video yuklandi: ${uniqueFileName}`);

    // Signed URL yaratish
    const signedUrl = getCloudFrontSignedUrl(uniqueFileName);
    console.log("Signed URL:", signedUrl);

    // Vaqtinchalik faylni o‘chirish
    await fs.unlink(tempPath);

    return uniqueFileName; // Faqat fayl nomini qaytarish
  } catch (error) {
    console.error("Xato:", error);
    try {
      await fs.unlink(tempPath);
    } catch (err) {
      console.error("Faylni o‘chirishda xato:", err);
    }
    throw error;
  }
};

// Express router uchun /get-signed-url endpoint
const express = require("express");
const router = express.Router();

const getsignedurlforfront = async (req,res) => {
  const { file } = req.query;

  if (!file) {
    return res.status(400).json({ error: "Fayl nomi kerak" });
  }

  try {
    const signedUrl = getCloudFrontSignedUrl(file);
    res.json({ signedUrl });
  } catch (error) {
    console.error("Signed URL xatosi:", error);
    res.status(500).json({ error: "Signed URL yaratishda xato" });
  }
}

module.exports = { uploadTrailerToVimeo, getsignedurlforfront };