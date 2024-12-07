/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - token: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the course
 *                 example: "Introduction to Programming"
 *               description:
 *                 type: string
 *                 description: A detailed description of the course
 *                 example: "This course covers the basics of programming in Python."
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Cover image for the course
 *               trieler:
 *                 type: string
 *                 format: binary
 *                 description: Optional trailer video for the course
 *               category:
 *                 type: integer
 *                 description: Category ID for the course
 *                 example: 1
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the course
 *                 example: 49.99
 *               period:
 *                 type: integer
 *                 description: Period ID for the course duration
 *                 example: 1
 *               level:
 *                 type: integer
 *                 description: Level of the course (e.g., beginner, intermediate, advanced)
 *                 example: 2
 *               language:
 *                 type: integer
 *                 description: Language ID for the course
 *                 example: 1
 *               study_parties:
 *                 type: array
 *                 description: List of study parties related to the course
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the study party
 *                       example: "Study Group 1"
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     courseId:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/courses/videos:
 *   post:
 *     summary: Kursga yangi video va fayl qo'shish
 *     tags: [Courses]
 *     security:
 *       - token: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: integer
 *                 description: Kurs ID
 *                 example: 1
 *               title:
 *                 type: string
 *                 description: Video nomi
 *                 example: "Kirish darsi"
 *               description:
 *                 type: string
 *                 description: Video haqida qisqacha ma'lumot
 *                 example: "Bu video kurs haqida umumiy ma'lumot beradi."
 *               is_open:
 *                 type: boolean
 *                 description: Videoni ochiq qilish (true/false)
 *                 example: false
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Yuklanadigan video fayli
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Yuklanadigan PDF yoki boshqa fayl
 *     responses:
 *       201:
 *         description: Video va fayl muvaffaqiyatli yuklandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Videos added successfully."
 *       400:
 *         description: Noto'g'ri so'rov
 *       401:
 *         description: Ruxsat berilmagan
 *       500:
 *         description: Serverda xatolik yuz berdi
 */

/**
 * @swagger
 * /api/courses/complete:
 *   patch:
 *     summary: Mark a course as completed
 *     tags: [Courses]
 *     security:
 *       - token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompleteCourse'
 *           example:
 *             course_id: 1
 *     responses:
 *       200:
 *         description: Course marked as completed
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /api/courses/{id}:
 *   patch:
 *     summary: Kursni tahrirlash
 *     tags: [Courses]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kurs ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Kurs nomi
 *                 example: "Kirish darsi"
 *               description:
 *                 type: string
 *                 description: Kurs haqida qisqacha ma'lumot
 *                 example: "Bu kurs yangi boshlanuvchilar uchun mo'ljallangan."
 *               category:
 *                 type: integer
 *                 description: Kurs kategoriyasi
 *                 example: 1
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Kurs narxi
 *                 example: 99.99
 *               period:
 *                 type: integer
 *                 description: Kurs davomiyligi (oylar)
 *                 example: 3
 *               language:
 *                 type: integer
 *                 description: Kurs tili
 *                 example: 1
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Kurs uchun yangi rasm fayli
 *               trieler:
 *                 type: string
 *                 format: binary
 *                 description: Kurs uchun yangi trailer video fayli
 *     responses:
 *       200:
 *         description: Kurs muvaffaqiyatli tahrirlandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kurs muvaffaqiyatli yangilandi."
 *       400:
 *         description: Noto'g'ri so'rov
 *       404:
 *         description: Kurs topilmadi
 *       500:
 *         description: Serverda xatolik yuz berdi
 */
/**
 * @swagger
 * /api/courses/videos/{videoId}:
 *   patch:
 *     summary: Kurs videosini tahrirlash yoki qo'shish
 *     tags: [Courses]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Video ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Video nomi
 *                 example: "Dars 1: Kirish"
 *               description:
 *                 type: string
 *                 description: Video haqida qisqacha ma'lumot
 *                 example: "Bu video kursning kirish qismini o'z ichiga oladi."
 *               is_open:
 *                 type: boolean
 *                 description: Videoni ochiq qilish (true/false)
 *                 example: false
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Yangi video fayli
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Qo'shimcha fayl (PDF yoki boshqa format)
 *     responses:
 *       200:
 *         description: Video muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Video muvaffaqiyatli yangilandi."
 *       400:
 *         description: Noto'g'ri so'rov
 *       404:
 *         description: Video topilmadi
 *       500:
 *         description: Serverda xatolik yuz berdi
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Kurslarni olish (o'qituvchi yoki talaba uchun)
 *     tags: [Courses]
 *     security:
 *       - token: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli qaytarilgan kurslar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kurslar muvaffaqiyatli olindi."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Python asoslari"
 *                       description:
 *                         type: string
 *                         example: "Boshlovchilar uchun Python dasturlash kursi"
 *                       category:
 *                         type: integer
 *                         example: 2
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 99.99
 *                       period:
 *                         type: integer
 *                         example: 3
 *                       level:
 *                         type: string
 *                         example: "Beginner"
 *                       language:
 *                         type: string
 *                         example: "Uzbek"
 *                       average_score:
 *                         type: number
 *                         format: float
 *                         example: 4.5
 *       400:
 *         description: Noto'g'ri so'rov
 *       401:
 *         description: Ruxsat berilmagan
 *       500:
 *         description: Server xatosi yuz berdi
 */
