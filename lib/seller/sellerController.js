const Seller = require("./seller");
const User = require("../user/user");
const SellerService = require("../sellerServices/sellerService");
const { sendNotFound, sendSucess } = require("../util/globalFunctions");
const statusService = require("../hiredService/hiredServiceConfig");
const HiredService = require("../hiredService/hiredService");

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

        const response = await Seller.findOneAndUpdate({ _id: sellerId }, { $set: { busy } }, { new: true });

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

const deleteSellerAccount = async (req, res) => {
    try {
      const sellerId = req.body.sellerId;
      const sellerUser = req.body.sellerUser;

      const update = {
          $set: {
              role: "CUSTOMER",
          },
          $unset: {
            sellerId: ""
          },
      };

      const options = {
        lean : true, 
      };

      const promise1 = User.findOneAndUpdate({ sellerId }, update, { ...options, new: true });
      const promise2 = Seller.findOneAndRemove({ _id: sellerId }, options);
      const promise3 = SellerService.deleteMany({ sellerUser }, { lean: true });

      const results = await Promise.all([ promise1, promise2, promise3]);

      console.log(results);

      if (!results[0] || !results[1]) {
          return sendNotFound(res);
      }

      return sendSucess(res, results);
  
    } catch (error) {
      logger.error(error);
      return res.status(500).json({error: error.message});
    }
}

const getActiveServicesForSeller = async (req, res) => {
    try {
  
        const activeServices = await HiredService.find( { sellerId: req.user.sellerId._id, status: statusService.PENDING } )
          .populate({
            path: 'sellerServiceId',
            select: 'mainImage sellerUser subcategoryId duration description title categoryId',
            populate: [{
                path: 'subcategoryId',
                select: 'subcategoryName image'
            },
            {
                path: "categoryId",
                select: "categoryName image",
            },
          ]
        }).populate('customerUserId');
  
        return res.status(200).json({ userData: req.user, activeServices });
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
        logger.error(error);
    }
  }

module.exports = {
    createSeller,
    switchStatusSeller,
    getSellerById,
    deleteSellerAccount,
    getActiveServicesForSeller,
}
