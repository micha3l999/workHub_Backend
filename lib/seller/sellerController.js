const Seller = require("./seller");
const User = require("../user/user");

const createSeller = async (req, res) => {
    const newSeller = new Seller({
        professions: req.body.professions,
        description: req.body.description,
        skills: req.body.skills
    });
    console.log(newSeller);
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
    }
}

module.exports = {
    createSeller
}
