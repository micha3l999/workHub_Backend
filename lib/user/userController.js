const User = require("./user");
const generateToken = require("../util/generateAccesToken");

const registerUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        role: req.body.role,
    });
    try {
        await user.save();
        res.status(200).json({
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            accessToken: generateToken({id : user._id})
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const isUserAlreadyRegistered = async (req, res) => {
    try {
        const userPhoneExist = await User.find({ phone: req.body.phone });
        if (userPhoneExist.length != 0) {
            res.status(200).json({ exist: true });
        } else {
            res.status(200).json({ exist: false });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    REGISTER_USER: registerUser,
    ISUSERALREADYREGISTERED: isUserAlreadyRegistered,
};
