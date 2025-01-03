const knex = require('../../db/db.js');

/**
 * @param {Object} data
 * @param {number} data.course_id
 * @param {number} data.user_id
 */
const buyCourseService = async ({ course_id, user_id }) => {
    return knex.transaction(async (trx) => {
        try {
            // 1. Foydalanuvchini tekshirish
            const user = await trx('users').where({ id: user_id, type: 2 }).first();
            if (!user || !user.is_verified) {
                return {
                    status: 403,
                    response: { message: 'Foydalanuvchi tasdiqlanmagan.' },
                };
            }

            // 2. Kursni tekshirish
            const course = await trx('courses').where({ id: course_id, status: 2 }).first();
            if (!course) {
                return {
                    status: 404,
                    response: { message: 'Kurs topilmadi.' },
                };
            }
            const activeCourse = await trx('course_users')
                .where({ user_id, course_id })
                .andWhere('end_date', '>', new Date())
                .first();

            if (activeCourse) {
                return {
                    status: 403,
                    response: {
                        message: 'Kurs allaqachon sotib olingan va tugash vaqti hali kelmagan.',
                    },
                };
            }
            // 3. Foydalanuvchi balansini tekshirish
            const transactions = await trx('transactions')
                .where({ user_id })
                .select(knex.raw('SUM(credit) - SUM(debit) AS balance'))
                .first();

            const settings = await trx('settings').orderBy('id', 'desc').first();
            const course_price = (course.price * (100 + (settings?.percent || 0))) / 100;

            if ((transactions?.balance || 0) < course_price) {
                return {
                    status: 403,
                    response: { message: 'Yetarli mablag‘ mavjud emas.' },
                };
            }

            // 4. Kursni sotib olish
            const teacher_id = course.teacher_id;

            // 4.1. Kursni foydalanuvchi uchun qo'shish
            const start_date = new Date();
            const end_date = course.period
                ? new Date(new Date().setMonth(new Date().getMonth() + course.period))
                : null;

            await trx('course_users').insert({
                course_id,
                user_id,
                start_date,
                end_date,
                status: 1, // "actual" holat
            });

            // 4.2. O'qituvchi uchun tranzaksiya qo'shish
            await trx('transactions').insert({
                user_id: teacher_id,
                debit: 0,
                credit: course.price,
                comment: `Kurs sotildi: ${course.id}`,
                is_internal: true,
                created_at: new Date(),
            });

            // 4.3. O'quvchi uchun tranzaksiya yaratish
            await trx('transactions').insert({
                user_id,
                debit: course_price,
                credit: 0,
                comment: `Kurs sotib olindi: ${course.id}`,
                is_internal: true,
                created_at: new Date(),
            });
            // 4.4. ilmlar uchun tranzaksiya yaratish
            await trx('transactions').insert({
                user_id: null,
                debit: 0,
                credit: course_price - course.price,
                comment: `Kurs sotib olindi: ${course.id}`,
                is_internal: true,
                created_at: new Date(),
            });
            await trx('own_transaction').insert({
                total: course_price - course.price,
                credit:course_price - course.price
            });
            // Agar barcha jarayonlar muvaffaqiyatli bo'lsa:
            return {
                status: 201,
                response: {
                    message: 'Kurs muvaffaqiyatli sotib olindi.',
                    data: { course_id, user_id },
                },
            };
        } catch (error) {
            // Agar tranzaksiya davomida xato yuz bersa, uni bekor qiladi
            throw error;
        }
    });
};

module.exports = {
    buyCourseService,
};
