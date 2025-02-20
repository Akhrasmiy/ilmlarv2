const fs = require('fs');
const { Vimeo } = require('vimeo');
const path = require('path');

const client = new Vimeo(
  '7b85ff7d5311b2cffd78329c83b9e0e1fb8a723c',
  'lOAIup4lasCSdySlIRf0Ihr+w04p5iudKgBInM2DDCyzLW9LxcCt2+Mz74R02lw3l2mQ0yS4gEa4c4rjNbDjd9BbobmoX7tFZ90+fHwx+xz5CR5H5v9tPM/pmz9zSzmH',
  '2ac395a2694246448051ee01faf135ce'
);

const uploadTrailerToVimeo = (videoFile) => {
  return new Promise(async (resolve, reject) => {
    const tempPath = path.join(__dirname, "../../uploads", videoFile.name);

    // Save the file temporarily
    await fs.promises.writeFile(tempPath, videoFile.data);

    client.upload(
      tempPath,
      {
        name: 'My Video Upload',
        description: 'This is an uploaded video via API',
        privacy: { view: 'anybody' }
      },
      async function (uri) {
        console.log('Video uploaded:', uri);

        // Delete the temporary file
        await fs.promises.unlink(tempPath);

        // Construct the full Vimeo URL
        const videoUrl = `https://vimeo.com${uri}`;
        resolve(videoUrl);
      },
      function (bytesUploaded, bytesTotal) {
        console.log(`Upload progress: ${(bytesUploaded / bytesTotal) * 100}%`);
      },
      async function (error) {
        console.error('Upload failed:', error);

        // Delete the temporary file in case of an error
        await fs.promises.unlink(tempPath);

        reject(error);
      }
    );
  });
};

module.exports = { uploadTrailerToVimeo };
