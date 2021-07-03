const SellerService = require("./sellerService");

const createSellerService = async (req, res) => {
  try {
    let sellerService = new SellerService({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      duration: req.body.duration,
      images: req.body.images,
      categoryId: req.body.categoryId,
      subcategoryId: req.body.subcategoryId,
      sellerId: req.body.sellerId,
    });

    await sellerService.save();
    return res.status(200).json(sellerService);
  } catch (err) {
    res.status(400).json({error : err.message});
    WinstonLogger.error(err);
  }
}

const allSellerService = async (req, res) => {
  try {
    const sellerId = req.query.sellerId;
    const services = await SellerService.find({sellerId});
    res.status(200).json(services);
  } catch(err) {
    res.status(500).json({error: err.message});
    WinstonLogger.error(err);
  }
}

module.exports = {
    createSellerService,
    allSellerService
}
