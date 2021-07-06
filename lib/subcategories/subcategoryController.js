const Subcategory = require("./subcategory");

const createSubcategory = async (req, res) => {
    let newSubcategory = new Subcategory({
        subcategoryName: req.body.subcategoryName,
        categoryId: req.body.categoryId,
        image: req.body.image,
    });

    if (req.body.subCategoryDescription) {
        newSubcategory['subCategoryDescription'] = req.body.subCategoryDescription;
    }
    try {
        await newSubcategory.save();
        return res.status(200).json(newSubcategory);
    } catch (err) {
        res.status(400).json({ error : err.message });
        logger.error(err);

    }
}

const allSubCategories = async (req, res) => {
    try {
        const categoryId = req.query.categoryId;
        const limit = req.query.limit ? req.query.limit : 0;
        const subCategories = await Subcategory.find({categoryId: categoryId}).limit(parseInt(limit));

        if (subCategories.length > 0 ) {
            return res.status(200).json(subCategories);
        }
        
        return res.status(404).json({message: "Data not found", body: subCategories});

    } catch (err) {
        res.status(500).json({error : "Internal server error."});
        logger.error(err);
    }
}

module.exports = {
    createSubcategory,
    allSubCategories,
}
