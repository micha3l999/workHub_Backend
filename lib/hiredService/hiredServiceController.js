const HiredService = require("./hiredService");
const Seller = require("../seller/seller");
const SellerService = require("../sellerServices/sellerService");
const statusService = require("../hiredService/hiredServiceConfig");

const createHiredService = async (req, res) => {
  try {
    const body = req.body;

    const promise1 = Seller.findOne({ _id: body.sellerId });
    const promise2 = SellerService.findOne({ _id: body.sellerServiceId });

    const results = await Promise.all([ promise1, promise2]);

    const seller = results[0];
    const sellerService = results[1];
    
    if (!seller || !sellerService) {
      return res.status(404).json({ message: "NOT_FOUND" });
    }

    /*if (seller.busy && seller.busy == true) {
      return res.status(409).json({ message: "SELLER_BUSY" });
    }*/

    const newHiredService = new HiredService({
      sellerServiceId: body.sellerServiceId,
      customerUserId: body.customerUserId,
      sellerId: body.sellerId,
      total: body.total,
      customerEmail: body.customerEmail,
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

const getHiredService = async (req, res) => {
  try {
    const query = req.query;

    const hiredService = await HiredService.findOne({ _id: query.hiredServiceId }, {}, { lean: true });

    if (!hiredService) {
      return res.status(404).json({ message: "NOT_FOUND"});
    }
    
      return res.status(200).json(hiredService);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ error : err.message });
    }
}

const updateStatusHiredService = async (req, res) => {
  try {
    const body = req.body;

    const hiredService = await HiredService.findOne({ _id: body.hiredServiceId }, {} ,{ lean:true });

    if (!hiredService) {
      return res.status(404).json({ message: "NOT_FOUND" });
    }

    if (hiredService.status && hiredService.status == statusService.COMPLETED) {
      return res.status(400).json({ message: "SERVICE_COMPLETED" });
    }

    const updateData = {
      $set: {
        status: body.status,
      }
    };

    const updatedService = await HiredService.findOneAndUpdate({ _id: body.hiredServiceId }, updateData, { new: true, lean:true });
    
    return res.status(200).json(updatedService);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ error : err.message });
  }
}

const getHiredServicesList = async (req, res) => {
  try {

      //const promise1 = User.findOne({ _id: req.query.userId }, {}, { lean: true }).populate('customerId').populate('sellerId');
      const hiredServices = await HiredService.find( { customerUserId: req.user._id } )
        .populate({ 
          path: 'sellerServiceId',
          select: 'mainImage sellerUser subcategoryId duration description title categoryId',
          populate: {
              path: 'subcategoryId',
              select: 'subcategoryName image'
          },
      }).populate('sellerId');

      return res.status(200).json({ userData: req.user, hiredServices: hiredServices });
  } catch (error) {
      res.status(500).json({ error: "Internal server error." });
      logger.error(error);
  }
}

const getActiveServices = async (req, res) => {
  try {

      const activeServices = await HiredService.find( { customerUserId: req.user._id, status: { $in: [ statusService.PENDING, statusService.READY ] } } )
        .populate({ 
          path: 'sellerServiceId',
          select: 'mainImage sellerUser subcategoryId duration description title categoryId',
          populate: [{
              path: 'subcategoryId',
              select: 'subcategoryName image'
          },
          {
            path: 'sellerUser',
          }
        ]
      }).populate('sellerId');

      return res.status(200).json(activeServices);
  } catch (error) {
      res.status(500).json({ error: "Internal server error." });
      logger.error(error);
  }
}

const getCompletedServices = async (req, res) => {
  try {

      const completedServices = await HiredService.find( { customerUserId: req.user._id, status: statusService.COMPLETED } )
        .populate({ 
          path: 'sellerServiceId',
          select: 'mainImage sellerUser subcategoryId duration description title categoryId',
          populate: [{
            path: 'subcategoryId',
            select: 'subcategoryName image'
        },
        {
          path: 'sellerUser',
        }
      ]
      }).populate('sellerId');

      return res.status(200).json(completedServices);
  } catch (error) {
      res.status(500).json({ error: "Internal server error." });
      logger.error(error);
  }
}

module.exports = {
  createHiredService,
  getHiredService,
  updateStatusHiredService,
  getHiredServicesList,
  getActiveServices,
  getCompletedServices,
}