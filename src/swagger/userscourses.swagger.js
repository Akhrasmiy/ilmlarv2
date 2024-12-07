/**
 * @swagger
 * /api/actioncourses/save-courses/{id}:
 *   get:
 *     summary: Foydalanuvchi uchun kursni saqlash
 *     tags: [Save Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: course ID
 *     security:
 *       - token: []
 *     responses:
 *       201:
 *         description: Kurs muvaffaqiyatli saqlandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kurs muvaffaqiyatli saqlandi."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     course_id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       example: 101
 *                     created_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-22T12:00:00Z"
 *       400:
 *         description: Noto'g'ri so'rov
 *       401:
 *         description: Ruxsat berilmagan
 *       500:
 *         description: Server xatosi yuz berdi
 */
/**
 * @swagger
 * /api/actioncourses/buy-course/{id}:
 *   get:
 *     summary: Kursni sotib olish
 *     tags: [Buy Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     security:
 *       - token: []
 *     responses:
 *       201:
 *         description: Kurs muvaffaqiyatli sotib olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Kurs muvaffaqiyatli sotib olindi."
 *                 data:
 *                   type: object
 *                   properties:
 *                     course_id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       example: 101
 *       400:
 *         description: Noto'g'ri so'rov
 *       403:
 *         description: Yetarli mablag‘ mavjud emas yoki foydalanuvchi tasdiqlanmagan
 *       404:
 *         description: Kurs topilmadi
 *       500:
 *         description: Server xatosi yuz berdi
 */

/**
 * @swagger
 * /api/courses/saved-courses:
 *   get:
 *     summary: Foydalanuvchining saqlangan kurslarini olish
 *     tags: [Courses]
 *     security:
 *       - token: []
 *     responses:
 *       200:
 *         description: Saqlangan kurslar muvaffaqiyatli olindi.
 */

/**
 * @swagger
 * /api/courses/purchased-courses:
 *   get:
 *     summary: Foydalanuvchining sotib olingan kurslarini olish
 *     tags: [Courses]
 *     security:
 *       - token: []
 *     responses:
 *       200:
 *         description: Sotib olingan kurslar muvaffaqiyatli olindi.
 */
/**
 * @swagger
 * /api/courses/course/{id}:
 *   get:
 *     summary: Kurs detallari
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kurs ID
 *     security:
 *       - token: []
 *     responses:
 *       200:
 *         description: Kurs detallari muvaffaqiyatli olindi.
 */
/**
 * @swagger
 * /api/courses/course/{id}/commit:
 *   post:
 *     summary: Kursga izoh qo'shish
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kurs ID
 *     security:
 *       - token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Juda yaxshi kurs!"
 *     responses:
 *       201:
 *         description: Izoh muvaffaqiyatli qo'shildi.
 */
/**
 * @swagger
 * /api/courses/course/{id}/score:
 *   post:
 *     summary: Kursga baho qo'shish
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kurs ID
 *     security:
 *       - token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Baho muvaffaqiyatli qo'shildi.
 */

/**
 * @swagger
 * /api/users/userme:
 *   get:
 *     summary: Foydalanuvchi haqida ma'lumotlarni olish
 *     tags: [Users]
 *     security:
 *       - token: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi haqida ma'lumot muvaffaqiyatli qaytarildi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     balance:
 *                       type: number
 *                       format: float
 *                       example: 150.75
 *                     transactions_history:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 101
 *                           user_id:
 *                             type: integer
 *                             example: 1
 *                           debit:
 *                             type: number
 *                             format: float
 *                             example: 50.00
 *                           credit:
 *                             type: number
 *                             format: float
 *                             example: 200.00
 *                           comment:
 *                             type: string
 *                             example: "Monthly subscription payment"
 *                           is_internal:
 *                             type: boolean
 *                             example: false
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-11-23T10:00:00Z"
 *       401:
 *         description: Foydalanuvchi autentifikatsiyadan o'tmagan.
 *       500:
 *         description: Serverda xatolik yuz berdi.
 */
