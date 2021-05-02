const User = require("./user");
const Customer = require("../customer/customer");
const generateToken = require("../util/generateAccesToken");


const registerUser = async (req, res) => {
    /*const customerRole = new Customer({});
    try {
        await customerRole.save();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }*/

    uploadTask = storage.ref('/userImage').child('1234').putString(req.body.image, 'base64', { contentType: 'image/jpg' });
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            console.log(error);
        }, function () {
            // Upload completed successfully, now we can get the download URL
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log();(downloadURL);
        });


    /*const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        countryCode: req.body.countryCode,
        phone: req.body.phone,
        role: req.body.role,
        customerId: customerRole._id
    });
    try {
        await user.save();
        res.status(200).json({
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            phone: user.countryCode + user.phone,
            role: user.role,
            customerId: user.customerId,
            accessToken: generateToken({ id: user._id })
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }*/
};

const getUserData = async (req, res) => {
    try {
        const userData = await User.find({ phone: req.body.phone });
        if (userData.length != 0) {
            const user = userData[0];
            res.status(200).json({
                id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                accessToken: generateToken({ id: user._id })
            });
        } else {
            res.status(418).json({ error: "The user is not registered." });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
}

module.exports = {
    REGISTER_USER: registerUser,
    GETUSERDATA: getUserData
};
