const Customer = require("./customer");
const SellerServices = require("../sellerServices/sellerService");
const { sendSucess, sendNotFound } = require("../util/globalFunctions");

async function addFavoriteServices(req, res) {

  try {

    const serviceId = req.body.serviceId;
    const sellerService = await SellerServices.findOne({ _id: serviceId }, { _id: 1, sellerUser: 1 }, { lean: true });

    if (!sellerService) {
      return sendNotFound(res);
    }

    if (JSON.stringify(req.user._id) == JSON.stringify(sellerService.sellerUser)) {
      return res.status(400).json({ message: "IS_YOUR_SERVICE" });
    }

    const update = {
      $addToSet: {
        favServices: serviceId,
      }
    };

    const customerUpdated = await Customer.findOneAndUpdate({ _id: req.user.customerId }, update, 
      { lean: true, new: true });

    if (!customerUpdated) {
      return sendNotFound(res);
    }

    return sendSucess(res, customerUpdated);

  } catch (error) {
    logger.error(error);
    res.status(500).json(error);
  }

}

async function removeFavoriteService(req, res) {

  try {
    
    const serviceId = req.body.serviceId;
    const sellerService = await SellerServices.findOne({ _id: serviceId }, { _id: 1, sellerUser: 1 }, { lean: true });

    if (!sellerService) {
      return sendNotFound(res);
    }

    if (JSON.stringify(req.user._id) == JSON.stringify(sellerService.sellerUser)) {
      return res.status(400).json({ message: "IS_YOUR_SERVICE" });
    }

    const update = {
      $pull: {
        favServices: serviceId
      }
    };

    const favServices = await Customer.findOneAndUpdate({ _id: req.user.customerId }, update, 
      { lean: true, new: true } );

    if (!favServices) {
      return sendNotFound(res);
    }

    sendSucess(res, favServices);

  } catch (error) {
    logger.error(error);
    res.status(500).json(error);
  }

}

module.exports = {
  addFavoriteServices,
  removeFavoriteService,
};