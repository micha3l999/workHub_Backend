const Category = require("./category");

const createCategory = async (req, res) => {
    if (req.user.role !== "ADMIN") {
        logger.error({ error: "BAD_REQUEST" });
        return res.status(400).json({ error: "BAD_REQUEST" });
    }
    
    const newCategory = new Category({
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
        image: req.body.image
    });
    try {
        await newCategory.save();
        res.status(200).json(newCategory);
    } catch (err) {
        res.status(400).json({ error : err.message });
        logger.error(err);
    }
}


const allCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({error : "Internal server error."})
        logger.error(err);
    }
}

const homeCategories = async (req, res) => {
    try {
        const categories = await Category.find().limit(5);
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({error : "Internal server error."})
        logger.error(err);
    }
}


module.exports = {
    createCategory,
    allCategories,
    homeCategories
}

