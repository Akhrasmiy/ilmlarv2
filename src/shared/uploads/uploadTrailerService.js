const fs = require('fs');
const { Vimeo } = require('vimeo');
const path = require('path');

const client = new Vimeo(
  '7b85ff7d5311b2cffd78329c83b9e0e1fb8a723c',
  'lOAIup4lasCSdySlIRf0Ihr+w04p5iudKgBInM2DDCyzLW9LxcCt2+Mz74R02lw3l2mQ0yS4gEa4c4rjNbDjd9BbobmoX7tFZ90+fHwx+xz5CR5H5v9tPM/pmz9zSzmH',
  'b2f405ca0e26c0429b33d8add68516cf'
);

const uploadTrailerToVimeo = (videoFile) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tempPath = path.join(__dirname, "../../uploads", videoFile.name);

      // Faylni vaqtinchalik saqlash
      await fs.promises.writeFile(tempPath, videoFile.data);

      client.upload(
        tempPath,
        {
          name: 'My Video Upload',
          description: 'This is an uploaded video via API',
          privacy: {
            view: 'unlisted', // Video ommaga ochiq bo‘lmasligi uchun
            embed: 'whitelist', // Faqat belgilangan domenlar ruxsat oladi
            download: false // Yuklab olishni taqiqlash
          },
          embed: {
            buttons: {
              like: false,
              watchlater: false,
              share: false,
              embed: false
            },
            logos: {
              vimeo: false // Vimeo logotipini yashirish
            },
            title: {
              name: "hide", // Videoning sarlavhasini yashirish
              owner: "hide" // Profil nomini yashirish
            }
          }
        },
        async function (uri) {
          console.log('Video uploaded:', uri);

          // Vaqtinchalik faylni o‘chirish
          await fs.promises.unlink(tempPath);

          // Whitelistga domen qo‘shish
          const videoId = uri.split('/').pop();
          client.request(
            {
              method: 'PATCH',
              path: `/videos/${videoId}/privacy/domains`,
              body: {
                domains: ['ilmlar.com'], // Ruxsat berilgan domenlar
              },
            },
            function (error, body, statusCode) {
              if (error) {
                console.error('Domain whitelist error:', error);
                return reject(error);
              }
              console.log('Domain added to whitelist:', body);
              resolve(`https://vimeo.com${uri}`);
            }
          );
        },
        function (bytesUploaded, bytesTotal) {
          console.log(`Upload progress: ${(bytesUploaded / bytesTotal) * 100}%`);
        },
        async function (error) {
          console.error('Upload failed:', error);
          await fs.promises.unlink(tempPath);
          reject(error);
        }
      );
    } catch (error) {
      console.error('Unexpected error:', error);
      reject(error);
    }
  });
};

module.exports = { uploadTrailerToVimeo };
