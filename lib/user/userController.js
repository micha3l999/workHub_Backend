const User = require("./user");
const Customer = require("../customer/customer");
const generateToken = require("../util/generateAccesToken");
const Seller = require('../seller/seller');
const HiredServices =  require("../hiredService/hiredService");


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

const getUserDataLogin = async (req, res) => {
    try {
        let userData = await User.findOne({ phone: req.body.phone }, {}, { lean: true }).populate('customerId').populate('sellerId');

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

const getUserDataHome = async (req, res) => {
    try {

        //const promise1 = User.findOne({ _id: req.query.userId }, {}, { lean: true }).populate('customerId').populate('sellerId');
        const activeServices = await HiredServices.find( { customerUserId: req.user._id, status: 0 } )
        .populate({ 
            path: 'sellerServiceId',
            select: 'mainImage sellerUser subcategoryId duration description title',
            populate: {
                path: 'subcategoryId',
                select: 'subcategoryName image'
            },
        }).populate('sellerId');

        return res.status(200).json({ userData: req.user, activeServices: activeServices });
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
        logger.error(error);
    }
}

module.exports = {
    registerUser,
    getUserDataLogin,
    getUserDataHome,
};
