const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { authPolice } = require("../controllers/police");
const sendResponse = require("../utils/sendResponse");
const Police = require("../models/police");

/**
 * route : POST /api/police/auth
 * access : Public
 * desc: Auth Police
 */
router.post(
  "/auth",
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("contactNumber", "contactNumber is required").not().isEmpty(),
    // check("pushToken", "pushToken is required").not().isEmpty(),
    check("location", "location is required").not().isEmpty(),
  ],
  authPolice
);

/**
 * route : GET /api/police/:id
 * access : Public
 * desc: Auth Police
 */
router.get("/:id", async (req, res) => {
  try {
    const police = await Police.findById(req.params.id);
    if (police) {
      return sendResponse(
        { ...police._doc, password: null, pushToken: null },
        res,
        200
      );
    }
    return sendResponse("No Police Station Found", res, 404);
  } catch (error) {
    sendResponse(error.message, res);
  }
});

exports.policeRoute = router;
