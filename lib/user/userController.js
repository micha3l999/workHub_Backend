const User = require("./user");

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
        const createdUser = await user.save();
        res.status(200).json(createdUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const isUserAlreadyRegistered = async (req, res) => {
    try {
        const userPhoneExist = await User.find({ 'phone': req.query.phone });
        if (userPhoneExist.length != 0) {
            res.status(200).json({ exist: true })
        } else {
            res.status(200).json({ exist: false })
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error." })
    }
}


module.exports = {
    REGISTER_USER: registerUser,
    ISUSERALREADYREGISTERED: isUserAlreadyRegistered,
};
