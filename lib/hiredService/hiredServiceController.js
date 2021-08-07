const HiredService = require("./hiredService");
const Seller = require("../seller/seller");
const SellerService = require("../sellerServices/sellerService");

const createHiredService = async (req, res) => {
  try {
    const body = req.body;

    const promise1 = Seller.findOne({ _id: body.sellerId });
    const promise2 = SellerService.findOne({ _id: body.sellerServiceId });

    const results = await Promise.all([ promise1, promise2]);

    const seller = results[0];
    const sellerService = results[1];
    
    if (!seller || !sellerService) {
      return res.status(404).json({ message: "Seller or service not found" });
    }

    if (seller.busy && seller.busy == true) {
      return res.status(250).json({ message: "The seller is busy" });
    }

    const newHiredService = new HiredService({
      sellerServiceId: body.sellerServiceId,
      customerUserId: body.customerUserId,
      categoryName: body.categoryName,
      subcategoryName: body.subcategoryName,
      sellerId: body.sellerId,
      total: body.total,
    });

    if (body.requirements) {
      newHiredService["requirements"] = body.requirements;
    }
    

        await newHiredService.save();
        res.status(200).json(newHiredService);
    } catch (err) {
        res.status(500).json({ error : err.message });
        logger.error(err);
    }
}

module.exports = {
  createHiredService,
}