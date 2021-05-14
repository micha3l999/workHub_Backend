const Category = require("./category");

const createCategory = async (req, res) => {
    const newCategory = new Category({
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription
    });
    try {
        await newCategory.save();
        res.status(200).json(newCategory);
    } catch (err) {
        res.status(400).json({ error : err.message });
    }
}


const allCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({error : "Internal server error."})
    }
}

module.exports = {
    createCategory,
    allCategories
}

