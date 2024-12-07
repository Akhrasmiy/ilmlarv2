const db = require("../../db/db.js");
const { imguploads } = require("../../shared/uploads/imgupload");
const { uploadTrailerToVimeo } = require("../../shared/uploads/uploadTrailerService");
const { docsuploads } = require("../../shared/uploads/docsuploads");

exports.updateCourseService = async (courseId, teacherId, data, files) => {
  const course = await db("courses")
    .where({ id: courseId, teacher_id: teacherId })
    .first();

  if (!course) {
    throw new Error("Kurs mavjud emas yoki bu amalni bajarish huquqiga ega emassiz.");
  }

  let obloshkaUrl = course.obloshka;
  let trailerUrl = course.trieler;

  // Fayllarni yuklash
  if (files?.file) {
    obloshkaUrl = await imguploads(files.file);
  }
  if (files?.trieler) {
    trailerUrl = await uploadTrailerToVimeo(files.trieler);
  }

  // Kursni yangilash
  await db("courses").where({ id: courseId }).update({
    name: data.name,
    discription: data.description || null,
    obloshka: obloshkaUrl,
    trieler: trailerUrl,
    category: data.category,
    price: data.price || 0,
    period: data.period,
    language: data.language,
    updated_at: new Date(),
  });
};

exports.updateCourseVideoService = async (videoId, teacherId, data, files) => {
  const video = await db("courses_videos")
    .join("courses", "courses.id", "courses_videos.course_id")
    .where({ "courses_videos.id": videoId, "courses.teacher_id": teacherId })
    .select("courses_videos.*", "courses.teacher_id")
    .first();

  if (!video) {
    throw new Error("Video mavjud emas yoki bu amalni bajarish huquqiga ega emassiz.");
  }

  let fileUrl = video.file;
  let videoUrl = video.video_link;

  // Fayllarni yuklash
  if (files?.file) {
    fileUrl = await docsuploads(files.file);
  }
  if (files?.video) {
    videoUrl = await uploadTrailerToVimeo(files.video);
  }

  // Videoni yangilash
  await db("courses_videos").where({ id: videoId }).update({
    file: fileUrl,
    title: data.title,
    description: data.description,
    video_link: videoUrl,
    is_free: data.is_open || false,
    updated_at: new Date(),
  });
};
