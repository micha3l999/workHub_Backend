const Category = require("../categories/category");
const SellerServices = require("../sellerServices/sellerService");
const Subcategory = require("../subcategories/subcategory");


const searchInDataBase = async (req, res) => {
    const keyword = req.query.keyword;

    const categories = await Category.find(
        {
            categoryName: {
                $regex: keyword,
                $options: "i",
            }
        }
    );

    const subcategories = await Subcategory.find(
        {
            subcategoryName: {
                $regex: keyword,
                $options: "i",
            }
        }
    )

    const sellerServices = await SellerServices.find(
        {
            title: {
                $regex: keyword,
                $options: "i",
            }
        }
    )

    var results = {
        categories: categories,
        subcategories: subcategories,
        sellerServices,
    };

    res.status(200).json(results);
}


module.exports = {
    searchInDataBase
}

