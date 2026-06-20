/**
 * @swagger
 * tags:
 *   - name: Admin - Dashboard
 *     description: Admin boshqaruv paneli statistikasi
 *   - name: Admin - Users
 *     description: Foydalanuvchilarni boshqarish
 *   - name: Admin - Teachers
 *     description: O'qituvchilarni tasdiqlash va boshqarish
 *   - name: Admin - Courses
 *     description: Kurslarni tasdiqlash va boshqarish
 *   - name: Admin - Enrollments
 *     description: Ro'yxatga olishni boshqarish
 *   - name: Admin - Transactions
 *     description: Tranzaksiyalar ro'yxati
 *   - name: Admin - Categories
 *     description: Kategoriyalarni boshqarish
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pagination:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 20
 *         total:
 *           type: integer
 *           example: 100
 *         pages:
 *           type: integer
 *           example: 5
 *
 *     AdminUser:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         first_name:
 *           type: string
 *           example: "Ali"
 *         last_name:
 *           type: string
 *           example: "Valiyev"
 *         email:
 *           type: string
 *           example: "ali@example.com"
 *         user_name:
 *           type: string
 *           example: "ali123"
 *         is_verified:
 *           type: boolean
 *           example: true
 *         is_blocked:
 *           type: boolean
 *           example: false
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-11-18T14:00:00Z"
 *         type_name:
 *           type: string
 *           example: "student"
 *
 *     AdminCourse:
 *       type: object
 *       properties:
 *         course_id:
 *           type: integer
 *           example: 1
 *         course_name:
 *           type: string
 *           example: "Python asoslari"
 *         discription:
 *           type: string
 *           example: "Kurs haqida ma'lumot"
 *         price:
 *           type: number
 *           example: 99.99
 *         is_verified:
 *           type: boolean
 *           example: false
 *         rejected_reason:
 *           type: string
 *           nullable: true
 *           example: null
 *         teacher_id:
 *           type: integer
 *           example: 5
 *         teacher_first_name:
 *           type: string
 *           example: "Bobur"
 *         teacher_last_name:
 *           type: string
 *           example: "Toshmatov"
 *         average_score:
 *           type: number
 *           example: 4.5
 *         sold_count:
 *           type: integer
 *           example: 120
 *         current_learners:
 *           type: integer
 *           example: 45
 *
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Dasturlash"
 *
 *     Enrollment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 10
 *         first_name:
 *           type: string
 *           example: "Ali"
 *         last_name:
 *           type: string
 *           example: "Valiyev"
 *         email:
 *           type: string
 *           example: "ali@example.com"
 *         course_id:
 *           type: integer
 *           example: 3
 *         course_name:
 *           type: string
 *           example: "Python asoslari"
 *         price:
 *           type: number
 *           example: 99.99
 *         status:
 *           type: string
 *           example: "active"
 *         start_date:
 *           type: string
 *           format: date-time
 *         end_date:
 *           type: string
 *           format: date-time
 *           nullable: true
 *
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         debit:
 *           type: number
 *           example: 0
 *         credit:
 *           type: number
 *           example: 99.99
 *         comment:
 *           type: string
 *           example: "Kurs sotib olish"
 *         is_internal:
 *           type: boolean
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         user_id:
 *           type: integer
 *           example: 5
 *         first_name:
 *           type: string
 *           example: "Ali"
 *         last_name:
 *           type: string
 *           example: "Valiyev"
 *         email:
 *           type: string
 *           example: "ali@example.com"
 */

// ─────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────

/**
 * @swagger
 * /api/admins/stats:
 *   get:
 *     summary: Dashboard statistikasi
 *     description: Umumiy foydalanuvchilar, kurslar, daromad va kutayotgan tasdiqlar
 *     tags: [Admin - Dashboard]
 *     security:
 *       - token: []
 *     responses:
 *       200:
 *         description: Statistika muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_users:
 *                       type: integer
 *                       example: 1200
 *                     total_teachers:
 *                       type: integer
 *                       example: 85
 *                     total_courses:
 *                       type: integer
 *                       example: 340
 *                     pending_teachers:
 *                       type: integer
 *                       example: 12
 *                     pending_courses:
 *                       type: integer
 *                       example: 7
 *                     total_enrollments:
 *                       type: integer
 *                       example: 4500
 *                     total_revenue:
 *                       type: number
 *                       example: 125000.50
 *                     recent_users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           first_name:
 *                             type: string
 *                             example: "Ali"
 *                           last_name:
 *                             type: string
 *                             example: "Valiyev"
 *                           email:
 *                             type: string
 *                             example: "ali@example.com"
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *       401:
 *         description: Autentifikatsiya talab qilinadi
 *       403:
 *         description: Admin huquqi talab qilinadi
 */

// ─────────────────────────────────────────────
// USERS
// ─────────────────────────────────────────────

/**
 * @swagger
 * /api/admins/users:
 *   get:
 *     summary: Barcha foydalanuvchilar ro'yxati
 *     tags: [Admin - Users]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Sahifa raqami
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *         description: Bir sahifadagi yozuvlar soni
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Ism, familiya yoki email bo'yicha qidirish
 *       - in: query
 *         name: type
 *         schema:
 *           type: integer
 *         description: "Foydalanuvchi turi (1=teacher, 2=student, 3=admin)"
 *       - in: query
 *         name: is_blocked
 *         schema:
 *           type: boolean
 *         description: Bloklangan foydalanuvchilarni filtrlash
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AdminUser'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         description: Autentifikatsiya talab qilinadi
 *       403:
 *         description: Admin huquqi talab qilinadi
 */

/**
 * @swagger
 * /api/admins/users/{id}:
 *   get:
 *     summary: Foydalanuvchi tafsilotlari
 *     tags: [Admin - Users]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Foydalanuvchi ID
 *     responses:
 *       200:
 *         description: Foydalanuvchi ma'lumotlari (yozilgan kurslar va o'z kurslari bilan)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   allOf:
 *                     - $ref: '#/components/schemas/AdminUser'
 *                     - type: object
 *                       properties:
 *                         speciality:
 *                           type: string
 *                           nullable: true
 *                           example: "Backend dasturlash"
 *                         phone:
 *                           type: string
 *                           nullable: true
 *                           example: "+998901234567"
 *                         enrollments:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               name:
 *                                 type: string
 *                               start_date:
 *                                 type: string
 *                                 format: date-time
 *                               end_date:
 *                                 type: string
 *                                 format: date-time
 *                                 nullable: true
 *                         own_courses:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               name:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                               is_verified:
 *                                 type: boolean
 *       404:
 *         description: Foydalanuvchi topilmadi
 */

/**
 * @swagger
 * /api/admins/users/{id}/block:
 *   patch:
 *     summary: Foydalanuvchini bloklash
 *     tags: [Admin - Users]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Foydalanuvchi ID
 *     responses:
 *       200:
 *         description: Foydalanuvchi bloklandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Foydalanuvchi bloklandi"
 *       404:
 *         description: Foydalanuvchi topilmadi
 */

/**
 * @swagger
 * /api/admins/users/{id}/unblock:
 *   patch:
 *     summary: Foydalanuvchini blokdan chiqarish
 *     tags: [Admin - Users]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Foydalanuvchi ID
 *     responses:
 *       200:
 *         description: Foydalanuvchi blokdan chiqarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Foydalanuvchi blokdan chiqarildi"
 *       404:
 *         description: Foydalanuvchi topilmadi
 */

/**
 * @swagger
 * /api/admins/users/{id}:
 *   delete:
 *     summary: Foydalanuvchini o'chirish
 *     tags: [Admin - Users]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Foydalanuvchi ID
 *     responses:
 *       200:
 *         description: Foydalanuvchi o'chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Foydalanuvchi o'chirildi"
 *       404:
 *         description: Foydalanuvchi topilmadi
 */

// ─────────────────────────────────────────────
// TEACHERS
// ─────────────────────────────────────────────

/**
 * @swagger
 * /api/admins/teachers:
 *   get:
 *     summary: Barcha o'qituvchilar ro'yxati
 *     description: O'qituvchilarni kurslari, balansi va holati bilan birga qaytaradi
 *     tags: [Admin - Teachers]
 *     security:
 *       - token: []
 *     responses:
 *       200:
 *         description: O'qituvchilar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       teacher_id:
 *                         type: integer
 *                         example: 5
 *                       first_name:
 *                         type: string
 *                         example: "Bobur"
 *                       last_name:
 *                         type: string
 *                         example: "Toshmatov"
 *                       email:
 *                         type: string
 *                         example: "bobur@example.com"
 *                       speciality:
 *                         type: string
 *                         example: "Backend dasturlash"
 *                       phone:
 *                         type: string
 *                         example: "+998901234567"
 *                       status_name:
 *                         type: string
 *                         example: "pending"
 *                       totalDebit:
 *                         type: number
 *                         example: 500.00
 *                       totalCredit:
 *                         type: number
 *                         example: 2000.00
 *                       balance:
 *                         type: number
 *                         example: 1500.00
 *                       courses:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             course_id:
 *                               type: integer
 *                             course_name:
 *                               type: string
 *                             price:
 *                               type: number
 *                             is_verified:
 *                               type: boolean
 */

/**
 * @swagger
 * /api/admins/teachers/{id}/confirm:
 *   patch:
 *     summary: O'qituvchini tasdiqlash
 *     tags: [Admin - Teachers]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O'qituvchi (user) ID
 *     responses:
 *       200:
 *         description: O'qituvchi tasdiqlandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       404:
 *         description: O'qituvchi topilmadi
 */

/**
 * @swagger
 * /api/admins/teachers/{id}/reject:
 *   patch:
 *     summary: O'qituvchini rad etish
 *     tags: [Admin - Teachers]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O'qituvchi (user) ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Hujjatlar to'liq emas"
 *     responses:
 *       200:
 *         description: O'qituvchi rad etildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "O'qituvchi rad etildi"
 *       404:
 *         description: O'qituvchi topilmadi
 */

// ─────────────────────────────────────────────
// COURSES
// ─────────────────────────────────────────────

/**
 * @swagger
 * /api/admins/courses:
 *   get:
 *     summary: Barcha kurslar ro'yxati (admin)
 *     description: Kurslarni o'qituvchi ma'lumotlari, o'rtacha baho va sotish soni bilan qaytaradi
 *     tags: [Admin - Courses]
 *     security:
 *       - token: []
 *     responses:
 *       200:
 *         description: Kurslar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AdminCourse'
 */

/**
 * @swagger
 * /api/admins/courses/{id}/confirm:
 *   patch:
 *     summary: Kursni tasdiqlash
 *     tags: [Admin - Courses]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kurs ID
 *     responses:
 *       200:
 *         description: Kurs tasdiqlandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       404:
 *         description: Kurs topilmadi
 */

/**
 * @swagger
 * /api/admins/courses/{id}/reject:
 *   patch:
 *     summary: Kursni rad etish
 *     tags: [Admin - Courses]
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
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Kurs materiallari sifatsiz"
 *     responses:
 *       200:
 *         description: Kurs rad etildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Kurs rad etildi"
 *       404:
 *         description: Kurs topilmadi
 */

// ─────────────────────────────────────────────
// ENROLLMENTS
// ─────────────────────────────────────────────

/**
 * @swagger
 * /api/admins/enrollments:
 *   get:
 *     summary: Barcha enrollment (kursga yozilish) ro'yxati
 *     tags: [Admin - Enrollments]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *       - in: query
 *         name: course_id
 *         schema:
 *           type: integer
 *         description: Kurs bo'yicha filtrlash
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Foydalanuvchi bo'yicha filtrlash
 *     responses:
 *       200:
 *         description: Enrollmentlar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Enrollment'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */

/**
 * @swagger
 * /api/admins/enrollments/{id}:
 *   delete:
 *     summary: Enrollmentni o'chirish
 *     tags: [Admin - Enrollments]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Enrollment ID
 *     responses:
 *       200:
 *         description: Enrollment o'chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Enrollment o'chirildi"
 *       404:
 *         description: Enrollment topilmadi
 */

/**
 * @swagger
 * /api/admins/test-enrollments:
 *   get:
 *     summary: Test enrollment ro'yxati
 *     description: Admin tomonidan test uchun qo'lda yaratilgan enrollmentlar
 *     tags: [Admin - Enrollments]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *     responses:
 *       200:
 *         description: Test enrollmentlar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       note:
 *                         type: string
 *                         nullable: true
 *                         example: "Test uchun qo'shildi"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       user_id:
 *                         type: integer
 *                         example: 10
 *                       first_name:
 *                         type: string
 *                         example: "Ali"
 *                       last_name:
 *                         type: string
 *                         example: "Valiyev"
 *                       email:
 *                         type: string
 *                         example: "ali@example.com"
 *                       course_id:
 *                         type: integer
 *                         example: 3
 *                       course_name:
 *                         type: string
 *                         example: "Python asoslari"
 *                       admin_first_name:
 *                         type: string
 *                         nullable: true
 *                         example: "Super"
 *                       admin_last_name:
 *                         type: string
 *                         nullable: true
 *                         example: "Admin"
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *
 *   post:
 *     summary: Test enrollment yaratish
 *     description: Foydalanuvchini to'lovsiz kursga qo'shish (test/demo uchun)
 *     tags: [Admin - Enrollments]
 *     security:
 *       - token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - course_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: Kursga qo'shiladigan foydalanuvchi ID
 *                 example: 42
 *               course_id:
 *                 type: integer
 *                 description: Kurs ID
 *                 example: 7
 *               note:
 *                 type: string
 *                 description: Izoh (ixtiyoriy)
 *                 example: "Demo uchun bepul kirish berildi"
 *     responses:
 *       201:
 *         description: Test enrollment muvaffaqiyatli yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Test enrollment yaratildi"
 *                     enrollment:
 *                       $ref: '#/components/schemas/Enrollment'
 *       400:
 *         description: Foydalanuvchi yoki kurs topilmadi, yoki allaqachon yozilgan
 *       404:
 *         description: Foydalanuvchi yoki kurs mavjud emas
 */

// ─────────────────────────────────────────────
// TRANSACTIONS
// ─────────────────────────────────────────────

/**
 * @swagger
 * /api/admins/transactions:
 *   get:
 *     summary: Tranzaksiyalar ro'yxati
 *     tags: [Admin - Transactions]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 100
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         description: Foydalanuvchi bo'yicha filtrlash
 *       - in: query
 *         name: is_internal
 *         schema:
 *           type: boolean
 *         description: Ichki yoki tashqi tranzaksiyalar
 *     responses:
 *       200:
 *         description: Tranzaksiyalar ro'yxati va yig'indi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 summary:
 *                   type: object
 *                   properties:
 *                     total_credit:
 *                       type: number
 *                       example: 250000.00
 *                     total_debit:
 *                       type: number
 *                       example: 50000.00
 *                     net:
 *                       type: number
 *                       example: 200000.00
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */

// ─────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────

/**
 * @swagger
 * /api/admins/categories:
 *   get:
 *     summary: Barcha kategoriyalar ro'yxati
 *     tags: [Admin - Categories]
 *     security:
 *       - token: []
 *     responses:
 *       200:
 *         description: Kategoriyalar ro'yxati
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *
 *   post:
 *     summary: Yangi kategoriya yaratish
 *     tags: [Admin - Categories]
 *     security:
 *       - token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Dizayn"
 *     responses:
 *       201:
 *         description: Kategoriya yaratildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Nom kiritilmadi
 */

/**
 * @swagger
 * /api/admins/categories/{id}:
 *   patch:
 *     summary: Kategoriyani yangilash
 *     tags: [Admin - Categories]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kategoriya ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Veb-dasturlash"
 *     responses:
 *       200:
 *         description: Kategoriya yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Kategoriya topilmadi
 *
 *   delete:
 *     summary: Kategoriyani o'chirish
 *     tags: [Admin - Categories]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kategoriya ID
 *     responses:
 *       200:
 *         description: Kategoriya o'chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Kategoriya o'chirildi"
 *       404:
 *         description: Kategoriya topilmadi
 */
