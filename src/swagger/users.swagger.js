/**
 * @swagger
 * /api/users:
 *  post:
 *       summary: Foydalanuvchini ro'yxatdan o'tkazish
 *       tags: [Users]
 *       security:
 *            - client-id: []
 *            - client-secret: []
 *       requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                                first_name:
 *                                   type: string
 *                                   example: "Ali"
 *                                last_name:
 *                                   type: string
 *                                   example: "Valiyev"
 *                                username:
 *                                   type: string
 *                                   example: "ali123"
 *                                password:
 *                                   type: string
 *                                   example: "123456"
 *                                email:
 *                                   type: string
 *                                   example: "ali@gmail.com"
 *                                type:
 *                                   type: string
 *                                   enum: [student, teacher]
 *                                   example: "student"
 *       responses:
 *            201:
 *                description: Foydalanuvchi muvaffaqiyatli qo'shildi.
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: object
 *                              properties:
 *                                     status:
 *                                        type: string
 *                                        example: "success"
 *                                     data:
 *                                        type: object
 *                                        example:
 *                                          email: "ali@gmail.com"
 *                                     errors:
 *                                        type: object
 *                                        example: []
 *            400:
 *                description: Xatolik yuz berdi.
 *                content:
 *                    application/json:
 *                         schema:
 *                              type: object
 *                              properties:
 *                                     status:
 *                                        type: string
 *                                        example: "error"
 *                                     data:
 *                                        type: object
 *                                        example: {}
 *                                     errors:
 *                                        type: object
 *                                        example: [{"code": "code_num_1", "message": "an error occurred" }]
 */
/**
 * @swagger
 * /api/users/verify:
 *   post:
 *     summary: "Foydalanuvchini tasdiqlash"
 *     description: "Foydalanuvchining elektron pochtasiga yuborilgan kodni tasdiqlash"
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Foydalanuvchining elektron pochtasi"
 *                 example: "ali@gmail.com"
 *               password:
 *                 type: string
 *                 description: "Tasdiqlash kodi (parol)"
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: "Foydalanuvchi muvaffaqiyatli tasdiqlandi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "ali@gmail.com"
 *                     is_verified:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: "Tasdiqlash kodi noto'g'ri yoki muddati o'tib ketgan"
 *       404:
 *         description: "Foydalanuvchi topilmadi"
 */
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: "Foydalanuvchini tizimga kiritish"
 *     description: "Foydalanuvchi tizimga kirish uchun login va parolni tekshirish"
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: "Foydalanuvchining logini yoki elektron pochtasi"
 *                 example: "ali@gmail.com"
 *               password:
 *                 type: string
 *                 description: "Foydalanuvchining paroli"
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: "Foydalanuvchi tizimga muvaffaqiyatli kiritildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: "Foydalanuvchi uchun JWT token"
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: "Login yoki parol xato"
 *       404:
 *         description: "Foydalanuvchi topilmadi"
 */
/**
 * @swagger
 * /api/users/forgot1:
 *   post:
 *     summary: "Foydalanuvchiga tasodifiy parol yuborish"
 *     description: "Tasodifiy parolni elektron pochta orqali yuboradi"
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Foydalanuvchining elektron pochtasi"
 *                 example: "ali@gmail.com"
 *     responses:
 *       201:
 *         description: "Tasodifiy parol yuborildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: "Foydalanuvchining elektron pochtasi"
 *                   example: "ali@gmail.com"
 *       404:
 *         description: "Foydalanuvchi topilmadi"
 *       400:
 *         description: "Xatolik yuz berdi"
 */

/**
 * @swagger
 * /api/users/forgot2:
 *   post:
 *     summary: "Foydalanuvchi uchun yangi parolni o'rnatish"
 *     description: "Tasdiqlash kodini tekshirib, yangi parolni saqlaydi"
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Foydalanuvchining elektron pochtasi"
 *                 example: "ali@gmail.com"
 *               password:
 *                 type: string
 *                 description: "Yangi parol"
 *                 example: "123456"
 *               emailpassword:
 *                 type: string
 *                 description: "Tasdiqlash kodi"
 *                 example: "654321"
 *     responses:
 *       201:
 *         description: "Yangi parol muvaffaqiyatli o'rnatildi"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: "Foydalanuvchining elektron pochtasi"
 *                       example: "ali@gmail.com"
 *       400:
 *         description: "Tasdiqlash kodi noto'g'ri yoki muddati o'tib ketgan"
 *       404:
 *         description: "Foydalanuvchi topilmadi"
 */


/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Foydalanuvchi ma'lumotlarini yangilash
 *     tags: [Users]
*     security:
 *       - token: []            # Bearer Token talab qilinadi

 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "Ali"
 *               last_name:
 *                 type: string
 *                 example: "Valiyev"
 *               user_name:
 *                 type: string
 *                 example: "ali123"
 *               email:
 *                 type: string
 *                 example: "ali@example.com"
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli yangilandi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Foydalanuvchi muvaffaqiyatli yangilandi."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     first_name:
 *                       type: string
 *                       example: "Ali"
 *                     last_name:
 *                       type: string
 *                       example: "Valiyev"
 *                     user_name:
 *                       type: string
 *                       example: "ali123"
 *                     email:
 *                       type: string
 *                       example: "ali@example.com"
 *       400:
 *         description: Noto'g'ri so'rov.
 *       401:
 *         description: Token kiritilmagan yoki noto'g'ri.
 *       404:
 *         description: Foydalanuvchi topilmadi.
 */
