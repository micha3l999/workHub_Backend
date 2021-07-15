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

module.exports = {
    createSeller
}
