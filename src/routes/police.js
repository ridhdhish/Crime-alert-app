const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { authPolice } = require("../controllers/police");

/**
 * route : POST /api/auth/auth
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
    check("pushToken", "pushToken is required").not().isEmpty(),
    check("location", "location is required").not().isEmpty(),
  ],
  authPolice
);

exports.policeRoute = router;
