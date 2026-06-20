const db = require("../../db/db.js");

exports.getCategories = async () => {
    return db("category").select("*").orderBy("name");
};

exports.createCategory = async (name) => {
    if (!name || !name.trim()) throw new Error("Kategoriya nomi kiritilmadi");
    const [row] = await db("category").insert({ name: name.trim() }).returning("*");
    return row;
};

exports.updateCategory = async (id, name) => {
    if (!name || !name.trim()) throw new Error("Kategoriya nomi kiritilmadi");
    const [row] = await db("category").where("id", id).update({ name: name.trim() }).returning("*");
    if (!row) throw new Error("Kategoriya topilmadi");
    return row;
};

exports.deleteCategory = async (id) => {
    const deleted = await db("category").where("id", id).delete();
    if (!deleted) throw new Error("Kategoriya topilmadi");
    return { message: "Kategoriya o'chirildi" };
};
