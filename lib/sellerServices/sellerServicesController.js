const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const SellerService = require("./sellerService");
const Category = require("../categories/category");
const Subcategory = require("../subcategories/subcategory");
const { restart } = require('nodemon');

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
      sellerId: req.body.sellerId,
      mainImage: req.body.mainImage,
    });

    await sellerService.save();
    return res.status(200).json(sellerService);
  } catch (err) {
    res.status(400).json({error : err.message});
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
    res.status(400).json({error: err.message});
    logger.error(err);
  }
}

const allSellerService = async (req, res) => {
  try {
    const sellerId = req.query.sellerId;
    const services = await SellerService.find({sellerId});
    res.status(200).json(services);
  } catch(err) {
    res.status(500).json({error: err.message});
    logger.error(err);
  }
}

const servicesForCustomer = async (req, res) => {
  try {
    const subcategoryId = req.query.subcategoryId;
    const services = await SellerService.find({subcategoryId}).populate("sellerId");

    if (services.length < 1) {
      return res.status(404).json({message: "There is no services for this subcategory"});
    }
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({error: err.message});
    logger.error(err);
  }
}

const getServicesBySubcategory = async (req, res) => {

  try {

    const sellerId = req.query.sellerId;
    const subcategoryId = req.query.subcategory;
    
    const result = await SellerService.find({ sellerId, subcategoryId });
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({error: error.message});
    logger.error(error);
  }

}

const getSellerServiceById = async (req, res) => {

  try {
    const sellerServiceId = req.query.sellerServiceId;

    const sellerService = await SellerService.findOne({ _id: sellerServiceId });
    console.log(sellerService);
    if (!sellerService) {
      return res.status(404).json({ message: "Seller Service not found" });
    }

    res.status(200).json(sellerService);
  } catch(error) {
    res.status(500).json({error: error.message});
    logger.error(error);
  }
}

module.exports = {
    createSellerService,
    allSellerService,
    preCreateSellerService,
    getServicesBySubcategory,
    servicesForCustomer,
    getSellerServiceById,
}
