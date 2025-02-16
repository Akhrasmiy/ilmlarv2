const axios = require("axios");
const tus = require("tus-js-client");

const VIMEO_ACCESS_TOKEN = "2ac395a2694246448051ee01faf135ce";

async function uploadVideoToVimeo(videoStream, fileInfo) {
  try {
    // 1️⃣ **Vimeo API orqali yuklashni boshlash**
    const initiateResponse = await axios.post(
      "https://api.vimeo.com/me/videos",
      {
        upload: {
          approach: "tus",
          size: fileInfo.size, // File hajmi
        },
        privacy: { download: false },
      },
      {
        headers: {
          Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const uploadLink = initiateResponse.data.upload.upload_link;
    const videoUri = initiateResponse.data.uri; // Video manzili

    // 2️⃣ **Tus orqali yuklash**
    return new Promise((resolve, reject) => {
        const upload = new tus.Upload(videoStream, {
            endpoint: uploadLink, // `uploadLink` faqat `endpoint` bo‘lishi kerak
            retryDelays: [0, 1000, 3000, 5000],
            metadata: {
              filename: fileInfo.name,
              filetype: fileInfo.mimetype,
            },
            uploadUrl: uploadLink, // Bu ham faqat `uploadLink` bo‘lishi kerak
            onError: (error) => {
              console.error('Failed to upload video to Vimeo:', error);
              reject(new Error('Video upload to Vimeo failed.'));
            },
            onProgress: (bytesUploaded, bytesTotal) => {
              const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
              console.log(`Upload progress: ${percentage}%`);
            },
            onSuccess: () => {
              console.log('File uploaded successfully.');
              resolve(`https://vimeo.com${videoUri}`);
            },
          });          
          

      upload.start();
    });
  } catch (error) {
    console.error("Vimeo yuklashni boshlashda xatolik:", error.response?.data || error.message);
    throw new Error("Vimeo yuklashda muammo yuz berdi.");
  }
}

module.exports = { uploadVideoToVimeo };
