

function sendNotFound(res) {
  try {
    res.status(404).json({ message: "NOT_FOUND" } );
  } catch (error) {
    logger.error(error);
    return res.status(500).json({error: error.message});
  }
  
}

function sendSucess(res, result) {
  try {
    res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({error: error.message});
  }
}

module.exports = {
  sendNotFound,
  sendSucess,
}