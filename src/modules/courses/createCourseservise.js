const db = require("../../db/db.js");
const FormData = require("form-data");
const { uploadTrailerToVimeo } = require("../../shared/uploads/uploadTrailerService.js");
const { default: axios } = require("axios");
const { imguploads } = require("../../shared/uploads/imgupload.js");
const { BadRequestError } = require("../../shared/errors/index.js");

exports.createCourseService = async (data, file, trailerFile) => {
    if (!file) {
      throw new BadRequestError("Cover image (file) is required.");
    }
  console.log(data)
    const teacher = await db("teacher_more_date").where("user_id", data.teacher_id).first();
    console.log(teacher)
    if (!teacher || teacher.status !== 2) {
      throw new BadRequestError("Teacher is not active.");
    }
  
    // Upload cover image
    const coverUrl = await imguploads(file);
  
    // Upload trailer if provided
    let trailerUrl = null;
    if (trailerFile) {
      trailerUrl = await uploadTrailerToVimeo(trailerFile);
    }
  
    // Prepare course data for insertion
    const courseData = {
        name: data.name,
        discription: data.description || null, // Fix here
        obloshka: coverUrl,
        trieler: trailerUrl,
        teacher_id: data.teacher_id,
        category: Number(data.category),
        price: data.price || 0,
        period: data.period,
        language: data.language,
        status: 1,
        created_at: new Date(),
      };      
  
    // Insert course into the database
    const [courseId] = await db("courses").insert(courseData, ["id"]);
  
    // Insert study parties if provided
    if (data.study_parties && data.study_parties.length > 0) {
      const studyPartyData = data.study_parties.map((party) => ({
        course_id: courseId.id,
        name: party.name,
      }));
      await db("course_study_party").insert(studyPartyData);
    }
  
    return courseId;
  };
  