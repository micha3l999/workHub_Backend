const Seller = require("./seller");
const User = require("../user/user");

const createSeller = async (req, res) => {
    const body = req.body;
    let newSeller = new Seller({
        professions: body.professions,
        description: body.description,
        categoryName: body.categoryName,
    });

    if (body.skills) {
        newSeller['skills'] = body.skills;
    }
    try {
        await newSeller.save();
        const userData = await User.findOneAndUpdate(
            { _id: req.body.userID },
            {role: "SELLER", sellerId:  newSeller._id},
            { new: true }
            ).populate('sellerId');
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json({ error : err.message });
        logger.error(err);
    }
}

const switchStatusSeller = async (req, res) => {
    try {

        const busy = req.body.busy;
        const sellerId = req.body.sellerId;

        const response = await Seller.findOneAndUpdate({ _id: sellerId }, { $set: { busy } });

        if (!response) {
            return res.status(404).json({ message: "not found" });
        }

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ error : error.message });
        logger.error(error);
    }
}

const getSellerById = async (req, res) => {

    try {
        const _id = req.query.sellerId;
        const projection = {
            professions: 0
        };

        const seller = await Seller.findOne({ _id }, { projection } );

        if (!seller) {
            return res.status(404).json({ message: "not found" });
        }

        res.status(200).json(seller);

    } catch (error) {
        res.status(500).json({ error : error.message });
        logger.error(error);
    }
}

module.exports = {
    createSeller,
    switchStatusSeller,
    getSellerById,
}
