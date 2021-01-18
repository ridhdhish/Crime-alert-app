const { validationResult } = require("express-validator");
const Relative = require("../models/relative");
const sendResponse = require("../utils/sendResponse");

const getRelatives = async (req, res) => {
  try {
    const relatives = await Relative.find({ userId: req.user.id });

    if (relatives.length === 0) {
      return sendResponse("No relatives found", res, 404);
    }

    res.status(200).json({ relatives });
  } catch (err) {
    return sendResponse(err.message, res);
  }
};

const addRelative = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(errors.array(), res, 400);
  }

  try {
    req.body.userId = req.user.id;

    const newRelative = new Relative(req.body);

    await newRelative.save();

    res.json({ newRelative });
  } catch (err) {
    return sendResponse(err.message, res);
  }
};

const updateRelative = async (req, res) => {
  try {
    const relative = await Relative.findByIdAndUpdate(req.params.id, req.body);

    if (!relative) {
      return sendResponse("Unable to update relative", res, 404);
    }

    res.json({ ...relative._doc, ...req.body });
  } catch (err) {
    return sendResponse(err.message, res);
  }
};

const deleteRelative = async (req, res) => {
  try {
    const relative = await Relative.findByIdAndDelete(req.params.id);

    if (!relative) {
      return sendResponse("Unable to delete relative", res, 404);
    }
    sendResponse("Relative deleted", res, 200);
  } catch (err) {
    return sendResponse(err.message, res);
  }
};

const getRelative = async (req, res) => {
  try {
    const relative = await Relative.findById(req.params.id);

    if (!relative) {
      return sendResponse("No relative found", res, 404);
    }

    res.json({ relative });
  } catch (err) {
    return sendResponse(err.message, res);
  }
};

const deleteAllRelative = async (req, res) => {
  try {
    const relative = await Relative.deleteMany({ userId: req.user.id });

    if (!relative) {
      return sendResponse("Unable to delete relatives", res, 404);
    }
    sendResponse("All Relatives deleted", res, 200);
  } catch (err) {
    return sendResponse(err.message, res);
  }
};

module.exports = {
  getRelatives,
  addRelative,
  updateRelative,
  deleteRelative,
  getRelative,
  deleteAllRelative,
};
