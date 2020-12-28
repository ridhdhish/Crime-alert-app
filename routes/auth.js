const { getAuth } = require("../controllers/auth");

const router = require("express").Router();

router.get("/", getAuth);

exports.authRouter = router;
