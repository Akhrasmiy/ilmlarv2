const db = require("../../db/db.js");
const FormData = require("form-data");
const { uploadTrailerToVimeo } = require("../../shared/uploads/uploadTrailerService.js");
const { default: axios } = require("axios");
const { imguploads } = require("../../shared/uploads/imgupload.js");

exports.createCourseService = async (data, file, trailerFile) => {
    console.log(file)
    if (!file) {
        throw new Error("Obloshka (cover image) is required.");
    }
    const teacher_more_date=await db("teacher_more_date").where(data.teacher_id).first()
    if (!teacher_more_date||teacher_more_date.status!==2) {
        throw new Error("teacher dont active");
    }
    const obloshkaUrl = await imguploads(file)
    let trailerUrl = null;

    // If a trailer video is uploaded, handle it
    if (trailerFile) {
        trailerUrl = await uploadTrailerToVimeo(trailerFile);
    }
    console.log(data)
    // Insert course data into the database
    const [courseId] = await db("courses").insert(
        {
            name: data.name,
            discription: data.description || null,
            obloshka: obloshkaUrl || null,
            trieler: trailerUrl || null, // Save Vimeo trailer URL
            teacher_id: data.teacher_id,
            category: Number(data.category),
            price: data.price || 0,
            period: data.period,
            language: data.language,
            status: 1, // Default status: incomplete
            created_at: new Date(),
        },
        ["id"]
    );

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
