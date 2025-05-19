const knex = require("./src/db/db.js");

(async () => {
    try {
        // Mavjud kurslar uchun idx ni yangilash
        await knex('courses')
            .update({
                idx: knex.raw(`REGEXP_REPLACE(REGEXP_REPLACE(LOWER(name), '[^a-z0-9\\s]', '', 'g'), '\\s+', '-', 'g') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0')`)
            });

        console.log('Eski kurslar uchun idx yangilandi');

        // Ulanishni yopish
        await knex.destroy();
        console.log('Ulanish yopildi');
    } catch (err) {
        console.error('Xato yuz berdi:', err);
    }
})();