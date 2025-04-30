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
const keyPairId = "K1UUVGRPEJM5HF";
const privateKey = `-----BEGIN RSA PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDMVirFjuMHzXJPaiP/TWejvdR6VhJhMSBsFfNcQKyeuZ8Zk8ZzAeztn7WwJwsfg2P7p5/RDyVU09mzwY0G2peyqLOZr+HZFYwk06OkrOi5FKPMSlrcucSzxlghpkFxm+/b64m0i4Tm5ZS9mCukwTaCj8NjwddFSzAblGnW69SN7uhSq98ZaqGUeH2CmeihBHJI/DgRZ+mTZGK1TKJ2PD045Y0MF7UqrFkZnamUaqxU4lQ0pwhsD6fAi8DP7ungGYxsawGi6THYJGMnecJWhXU/7mYYyAvbyy1TMotaiWE1Y+syjje76sOxNwO7kOkkUDYWtFrfrDUNQfGeBrgGgnRrAgMBAAECggEAEXVlRybrt+1yUF25wKT8720XO/KhtGMtqX6Aoge2mAM1GErbgFUQSMdGD0xus10XDFfonESmhGZraePmKElB/9ZRLhbsfY9NP5JDn5zUb4fXbOuHcud+anvOaOWbHtlbd5da1y26h73i5QYc6IFHpoUhBSN5QKbpb9nQ5zeUHCI/vZotSKjq6Q8nrWNjp7WQuwMi7V1ZE9AL/BMXfOmfvcYSEoqbOWL6Ub4vErkSf2jBNh1Xby0PiYr8lOW32qaOxnSJCmjUSN4B+x4aqMZBaS6VAg8t523oxnTEAVc1lBpZ10Ehtkd9YsIm/BRqfUfxhF2z53g6GmW5gW2eCC+6IQKBgQD7kSJl4guAqYyRDBjz87xzlJRzA4RabtN8o1xhzei7MfxFdCjCcxRPzTGgUTJGNXHlfDyjmmnTJEysfeF7OfRc1YXXGoJKH4y0vGhQUCI2XJQDWtA3zHEibvTaK8vL7YxQLi8Z3hBN8ftmMw0xNBNzQhRjxLfQ8noqsNANao8YSwKBgQDP7/fAXI3lMAt1Yy9HJfe3W47LCxZmj3kFJyvSHD1xF9ASsTUdGTGA4z8sCSDjvCCaS8NzcrDidVDtPJLw881LtKTFook1OkJgttHQzf96zgxzN5ID5ja3O6ztOpJiCfczElEg3YBRkoqbB++oCtNd2O9pUyLzrW4PJ5ccdPbAYQKBgQCwU9o4b2iAllbglAopc/3zRYGH3D8449V410g5hYpLK44XYIPxR5hFFx5hsIf8jhl3MM2QHvtt81OK0/Dn3odZSpC1ZO9N5S9Kv4SeRoy0bc+RSmYHtlTWPc+B3JDML4TZ7oU1LGFhQOtlhwMIKeg4MWj5RTlSS6M1qRkrTjVeYQKBgQCGo4fVK1jJdMGGodFkDUaHmCYufKBlijK/TmzGYHi8OMIGyG1uyPhPz1UBK2v7ab3minYk07eK+pGK+zTeBc8BXRdvzN1w9Kc0Pkw/GpN5Ld/L3siR88er/1zqQom0J2XD0PFtCV9j8jIDTjE0qsXPt37VwPoZtEtWTrk+uNFpIQKBgHLtXDg4oxDXVek0RGVK0PIPmCCiZh5WCoF1VrtxBO5TdBJBXH8eqEO51oPfYYhZH5GYpvTUv7cMxgXZyrOpteUu2Ed7xu8tQoAcNCkqPmgeaJZO6MX+S/FlGORoFVdXongXTIJdAuIAQrstirH+AhdpoBQWzsq8F7JFcNodOWDK\n-----END RSA PRIVATE KEY-----`;
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
  const tempPath = path.join(__dirname, "../../Uploads", videoFile.name);
  try {

    // Vaqtinchalik faylni saqlash
    await fs.writeFile(tempPath, videoFile.data);

    // UUID generatsiyasi
    const uniqueId = uuidv4();
    const fileExtension = path.extname(videoFile.name).toLowerCase();
    const uniqueFileName = `${uniqueId}${fileExtension}`; // UUID bilan fayl nomini yaratish

    // Content-Type
    const contentTypes = {
      ".mp4": "video/mp4",
      ".webm": "video/webm",
      ".mov": "video/quicktime",
      ".m3u8": "application/x-mpegURL",
    };
    const contentType = contentTypes[fileExtension] || "application/octet-stream";
console.log(1, contentType)
    // S3’ga yuklash
    const params = {
      Bucket: "ilmlar-videos-2025",
      Key: uniqueFileName,
      Body: await fs.readFile(tempPath),
      ContentType: contentType,
      ACL: "private",
    };
console.log(2, params)
    await s3Client.send(new PutObjectCommand(params));
    console.log(`Video yuklandi: ${uniqueFileName}`);
console.log(3, uniqueFileName)
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