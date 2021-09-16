const User = require("./user");
const Customer = require("../customer/customer");
const generateToken = require("../util/generateAccesToken");
const Seller = require('../seller/seller');
const HiredServices =  require("../hiredService/hiredService");
const AdminSettings = require("../admin/adminSettings");


const registerUser = async (req, res) => {
    const customerRole = new Customer({});
    try {
        await customerRole.save();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        countryCode: req.body.countryCode,
        phone: req.body.phone,
        role: req.body.role,
        customerId: customerRole._id,
        image: {
            imageOriginal: req.body.imageOriginal,
            imageThumbnail: req.body.imageThumbnail,
        }
    });
    try {
        await user.save();
        res.status(200).json({
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            countryCode: user.countryCode,
            phone: user.phone,
            role: user.role,
            customerId: user.customerId,
            image: user.image,
            accessToken: generateToken({ id: user._id })
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
        logger.error(err);
    }
};

async function registerAdmin(req, res) {

    if (req.body.role !== "ADMIN") {
        logger.error({ error: "BAD_REQUEST" });
        return res.status(400).json({ error: "BAD_REQUEST" });
    }

    const searchedUser = await AdminSettings.findOne({ userEmails: req.body.email }, {}, { lean: true });

    if (!searchedUser) {
        logger.error({ error: "BAD_REQUEST" });
        return res.status(400).json({ error: "BAD_REQUEST" }); 
    }

    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
    });

    try {
        await user.save();
        res.status(200).json({
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            accessToken: generateToken({ id: user._id })
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
        logger.error(err);
    }
}

const getUserDataLogin = async (req, res) => {
    try {

        if (req.body.email) {
            const searchedUser = await AdminSettings.findOne({ userEmails: req.body.email }, {}, { lean: true });

            if (!searchedUser) {
                logger.error({ error: "BAD_REQUEST" });
                return res.status(400).json({ error: "BAD_REQUEST" }); 
            }
        }

        let userData;

        if (req.body.email) {
            userData = await User.findOne({ email: req.body.email }, {}, { lean: true });
        } else {
            userData = await User.findOne({ phone: req.body.phone }, {}, { lean: true }).populate('customerId').populate('sellerId');
        }

        if (!userData) {
            return res.status(418).json({ error: "The user is not registered." });
        }

        const accessToken = generateToken({ id: userData._id });

        return res.status(200).json({ ...userData, accessToken });
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
        logger.error(error);
    }
}

module.exports = {
    registerUser,
    getUserDataLogin,
    registerAdmin,
};
