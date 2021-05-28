const Subcategory = require("./subcategory");

const createSubcategory = async (req, res) => {
    const newSubcategory = new Subcategory({
        subcategoryName: req.body.subcategoryName,
        categoryId: req.body.categoryId
    });
    try {
        await newSubcategory.save();
        res.status(200).json(newSubcategory);
    } catch (err) {
        res.status(400).json({ error : err.message });
    }
}

module.exports = {
    createSubcategory
}
