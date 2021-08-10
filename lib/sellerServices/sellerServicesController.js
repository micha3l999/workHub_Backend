const SellerService = require("./sellerService");
const Category = require("../categories/category");
const Subcategory = require("../subcategories/subcategory");
const CONFIG = require("./config");
const { sendNotFound, sendSucess } = require("../util/globalFunctions");

const createSellerService = async (req, res) => {
  let servicePrice = req.body.price;
  try {
    let sellerService = new SellerService({
      title: req.body.title,
      description: req.body.description,
      price: servicePrice.toFixed(2),
      duration: req.body.duration,
      images: req.body.images,
      categoryId: req.body.categoryId,
      subcategoryId: req.body.subcategoryId,
      sellerUser: req.body.sellerUser,
      mainImage: req.body.mainImage,
    });

    await sellerService.save();
    return res.status(200).json(sellerService);
  } catch (err) {
    res.status(500).json({error : err.message});
    logger.error(err);
  }
}

const preCreateSellerService = async (req, res) => {
  try {
    const subcategories = JSON.parse(req.query.subcategories);
    let dataToSearch = [];

    subcategories.map((subcategory) => {
        dataToSearch.push({_id: subcategory});
      });

    const resSubcategories = await Subcategory.find({ $or: dataToSearch });
    res.status(200).json(resSubcategories);
  } catch (err) {
    res.status(500).json({error: err.message});
    logger.error(err);
  }
}

const allSellerService = async (req, res) => {
  try {
    const sellerUser = req.query.sellerUser;
    const services = await SellerService.find({sellerUser});
    res.status(200).json(services);
  } catch(err) {
    res.status(500).json({error: err.message});
    logger.error(err);
  }
}

const servicesForCustomer = async (req, res) => {
  try {
    const subcategoryId = req.query.subcategoryId;
    const services = await SellerService.find({subcategoryId}).populate({ path: "sellerUser", populate: { path: "sellerId", select: "busy rating" },  });

    if (services.length < 1) {
      return res.status(404).json({message: "There is no services for this subcategory"});
    }
    
    return res.status(200).json(services);
  } catch (err) {
    res.status(500).json({error: err.message});
    logger.error(err);
  }
}

const getServicesBySubcategory = async (req, res) => {

  try {

    const sellerUser = req.query.sellerUser;
    const subcategoryId = req.query.subcategory;
    
    const result = await SellerService.find({ sellerUser, subcategoryId });
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({error: error.message});
    logger.error(error);
  }

}

const getSellerServiceById = async (req, res) => {

  try {
    const sellerServiceId = req.query.sellerServiceId;

    const sellerService = await SellerService.findOne({ _id: sellerServiceId }).populate({ 
      path: "sellerUser", 
      populate: { 
        path: "sellerId", 
        select: "name lastName rating description busy professions" 
    }, options: { lean: true } });

    if (!sellerService) {
      return res.status(404).json({ message: "Seller Service not found" });
    }

    if (sellerService.sellerUser && sellerService.sellerUser.sellerId && sellerService.sellerUser.sellerId.busy) {
      return res.status(409).json({ message: CONFIG.SELLER.SELLER_BUSY });
    }

    const countServices = await SellerService.aggregate([ 
      { $match: { 
        sellerUser: sellerService.sellerUser._id
      }}, { $group: { _id: null, n: { $sum: 1 } } } ]);

    

    res.status(200).json({ sellerService, countServices: countServices[0].n });
  } catch(error) {
    res.status(500).json({error: error.message});
    logger.error(error);
  }
}

const preCheckoutInformation = async (req, res) => {

  try {
    const _id = req.query.serviceId;

    const service = await SellerService.findOne({ _id }).populate({ path: "sellerUser", select: "name lastName sellerId", populate: { path: "sellerId", select: "busy" } });

    if (!service) {
      return res.status(404).json({ message: "Seller Service not found" });
    }


    if (service.sellerUser && service.sellerUser.sellerId && service.sellerUser.sellerId.busy) {
      return res.status(409).json({ message: CONFIG.SELLER.SELLER_BUSY });
    }
    return res.status(200).json(service);
  } catch (error) {
    res.status(500).json({error: error.message});
    logger.error(error);
  }


}

const updateSellerService = async (req, res) => {

  try {
    
    const service = req.body.sellerService;

    const update = {
      $set: {
        ...service,
      },
    };

    const resultService = await SellerService.findOneAndUpdate({ _id: req.body.sellerServiceId}, update, { lean : true, new: true } );

    if (!resultService) {
      return sendNotFound(res);
    }
    
    return sendSucess(res, resultService);

  } catch (error) {
    logger.error(error);
    return res.status(500).json({error: error.message});
  }

}

const deleteSellerService = async (req, res) => {
  try {

    const sellerServiceId = req.body.sellerServiceId;

    const sellerServices = await SellerService.findOneAndRemove({ _id: sellerServiceId }, { lean: true});

    if (!sellerServices) {
      return sendNotFound(res);
    }

    return sendSucess(res, sellerServices);
    
  } catch (error) {
    logger.error(error);
    return res.status(500).json({error: error.message});
  }
}

const getServicesBySellerUser = async (req, res) => {
  try {

    const sellerUser = req.query.sellerUser;

    const sellerServices = await SellerService.find({ sellerUser }).populate({ path: "categoryId", select: "categoryName"}).populate({ path: "subcategoryId", select: "subcategoryName"});

    if (sellerServices.length < 1) {
      return sendNotFound(res);
    }

    return sendSucess(res, sellerServices);
    
  } catch (error) {
    logger.error(error);
    return res.status(500).json({error: error.message});
  }
}


module.exports = {
    createSellerService,
    allSellerService,
    preCreateSellerService,
    getServicesBySubcategory,
    servicesForCustomer,
    getSellerServiceById,
    preCheckoutInformation,
    updateSellerService,
    getServicesBySellerUser,
    deleteSellerService,
}
