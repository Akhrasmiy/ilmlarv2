const db = require("../../db/db.js");
const { docsuploads } = require("../../shared/uploads/docsuploads.js");
const { uploadTrailerToVimeo } = require("../../shared/uploads/uploadTrailerService.js");

exports.addCourseVideosService = async (data, teacherId, videoFile, file) => {
  let fileUrl = null;
  if (file) {
    fileUrl = await docsuploads(file); // Faylni yuklash
  }

  // Kurs mavjudligini va o‘qituvchiga tegishli ekanligini tekshirish
  const course = await db("courses")
    .where({ id: data.course_id, teacher_id: teacherId })
    .first();

  if (!course) {
    throw new Error("Kurs mavjud emas yoki bu amalni bajarish huquqiga ega emassiz.");
  }

  // Video faylni Vimeo-ga yuklash
  const videoUrl = await uploadTrailerToVimeo(videoFile);

  // Video ma'lumotlarini tayyorlash
  const videoData = {
    course_id: data.course_id,
    file: fileUrl,
    title: data.title,
    description: data.description,
    video_link: videoUrl,
    is_free: data.is_open || false,
  };

  // Kurs videolarini bazaga qo‘shish
  await db("courses_videos").insert(videoData);
};

