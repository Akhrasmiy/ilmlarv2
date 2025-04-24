const express = require("express");
const { createCourse, addCourseVideos, completeCourse, updateCourse, updateCourseVideo, getCourses, getSavedCourses, getPurchasedCourses, getCourseDetails, addCommit, addScore, getCoursecardDetails, getCourseDetailswithouttoken, getlessondetails, getCourseDetailsForTeacher, getlessonForTeacherdetails, aaddCourseVideos } = require("./_controllers");
const isTeacher = require("../../shared/auth/isteacher");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const isCourseOwner = require("../../shared/auth/isCourseOwner");
const { getCourseDetailsService } = require("./listCourses");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");

const router = express.Router();

router.post("/", isLoggedIn, isTeacher, createCourse);
router.post("/videos", isLoggedIn, isTeacher, isCourseOwner, addCourseVideos);
router.patch("/complete", isLoggedIn, isTeacher, isCourseOwner, completeCourse);
router.get("/", isLoggedIn, getCourses);
router.get("/donthavetoken", getCourses);
router.patch("/:id", isLoggedIn, isTeacher, updateCourse);
router.patch("/videos/:videoId", isLoggedIn, isTeacher, updateCourseVideo);

router.get("/saved-courses", isLoggedIn, getSavedCourses); // Saqlangan kurslarni olish
router.get("/purchased-courses", isLoggedIn, getPurchasedCourses); // Sotib olingan kurslarni olish
router.get("/course/:id", isLoggedIn, getCourseDetails); // Kurs detallari (sotib olingan yoki olinmagan)
router.get("/course-forteacher/:id", isLoggedIn, isTeacher, getCourseDetailsForTeacher);
router.get("/lesson/:id", isLoggedIn, getlessondetails); // Kurs detallari (sotib olingan yoki olinmagan)
router.get("/lesson/:id/withouttoken", getlessondetails); // Kurs detallari (sotib olingan yoki olinmagan)
router.get("/lesson-forteacher/:id", isLoggedIn, isTeacher, getlessonForTeacherdetails);
router.get("/course/:id/withouttoken", getCourseDetailswithouttoken); // Kurs detallari (sotib olingan yoki olinmagan)
router.get("/coursecard/:id", getCoursecardDetails); // Kurs detallari (sotib olingan yoki olinmagan)
router.post("/course/:id/commit", isLoggedIn, addCommit); // Kursga izoh qo'shish
router.post("/course/:id/score", isLoggedIn, addScore); // Kursga baho qo'shish
router.get('/get-signed-url', (req, res) => {
    const { file } = req.query;

    if (!file) return res.status(400).json({ error: 'Fayl nomi kerak' });

    const url = `https://ilmlar-videos-2025.s3.eu-north-1.amazonaws.com/${file}`;
    const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDMVirFjuMHzXJPaiP/TWejvdR6VhJhMSBsFfNcQKyeuZ8Zk8ZzAeztn7WwJwsfg2P7p5/RDyVU09mzwY0G2peyqLOZr+HZFYwk06OkrOi5FKPMSlrcucSzxlghpkFxm+/b64m0i4Tm5ZS9mCukwTaCj8NjwddFSzAblGnW69SN7uhSq98ZaqGUeH2CmeihBHJI/DgRZ+mTZGK1TKJ2PD045Y0MF7UqrFkZnamUaqxU4lQ0pwhsD6fAi8DP7ungGYxsawGi6THYJGMnecJWhXU/7mYYyAvbyy1TMotaiWE1Y+syjje76sOxNwO7kOkkUDYWtFrfrDUNQfGeBrgGgnRrAgMBAAECggEAEXVlRybrt+1yUF25wKT8720XO/KhtGMtqX6Aoge2mAM1GErbgFUQSMdGD0xus10XDFfonESmhGZraePmKElB/9ZRLhbsfY9NP5JDn5zUb4fXbOuHcud+anvOaOWbHtlbd5da1y26h73i5QYc6IFHpoUhBSN5QKbpb9nQ5zeUHCI/vZotSKjq6Q8nrWNjp7WQuwMi7V1ZE9AL/BMXfOmfvcYSEoqbOWL6Ub4vErkSf2jBNh1Xby0PiYr8lOW32qaOxnSJCmjUSN4B+x4aqMZBaS6VAg8t523oxnTEAVc1lBpZ10Ehtkd9YsIm/BRqfUfxhF2z53g6GmW5gW2eCC+6IQKBgQD7kSJl4guAqYyRDBjz87xzlJRzA4RabtN8o1xhzei7MfxFdCjCcxRPzTGgUTJGNXHlfDyjmmnTJEysfeF7OfRc1YXXGoJKH4y0vGhQUCI2XJQDWtA3zHEibvTaK8vL7YxQLi8Z3hBN8ftmMw0xNBNzQhRjxLfQ8noqsNANao8YSwKBgQDP7/fAXI3lMAt1Yy9HJfe3W47LCxZmj3kFJyvSHD1xF9ASsTUdGTGA4z8sCSDjvCCaS8NzcrDidVDtPJLw881LtKTFook1OkJgttHQzf96zgxzN5ID5ja3O6ztOpJiCfczElEg3YBRkoqbB++oCtNd2O9pUyLzrW4PJ5ccdPbAYQKBgQCwU9o4b2iAllbglAopc/3zRYGH3D8449V410g5hYpLK44XYIPxR5hFFx5hsIf8jhl3MM2QHvtt81OK0/Dn3odZSpC1ZO9N5S9Kv4SeRoy0bc+RSmYHtlTWPc+B3JDML4TZ7oU1LGFhQOtlhwMIKeg4MWj5RTlSS6M1qRkrTjVeYQKBgQCGo4fVK1jJdMGGodFkDUaHmCYufKBlijK/TmzGYHi8OMIGyG1uyPhPz1UBK2v7ab3minYk07eK+pGK+zTeBc8BXRdvzN1w9Kc0Pkw/GpN5Ld/L3siR88er/1zqQom0J2XD0PFtCV9j8jIDTjE0qsXPt37VwPoZtEtWTrk+uNFpIQKBgHLtXDg4oxDXVek0RGVK0PIPmCCiZh5WCoF1VrtxBO5TdBJBXH8eqEO51oPfYYhZH5GYpvTUv7cMxgXZyrOpteUu2Ed7xu8tQoAcNCkqPmgeaJZO6MX+S/FlGORoFVdXongXTIJdAuIAQrstirH+AhdpoBQWzsq8F7JFcNodOWDK
-----END RSA PRIVATE KEY-----`; // CloudFront private key
    const signedUrl = getSignedUrl({
        url,
        keyPairId: "fe28c383-c7cd-4836-8ff3-03965506c7a0",
        privateKey: privateKey,
        dateLessThan: new Date(Date.now() + 60 * 60 * 1000),
    });

    res.json({ signedUrl });
});

module.exports = router;
