const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  getRelatives,
  addRelative,
  updateRelative,
  deleteRelative,
  getRelative,
  deleteAllRelative,
} = require("../controllers/relative");

/**
 * route : GET /api/relative/view
 * access : Private
 * desc: fetch all relatives
 */
router.get("/view", auth, getRelatives);

/**
 * route : POST /api/relative/add
 * access : Private
 * desc: Add new relative
 */
router.post("/add", auth, addRelative);

/**
 * route : PUT /api/relative/update/:id
 * access : Private
 * desc: Update existing relative
 */
router.put("/update/:id", auth, updateRelative);

/**
 * route : DELETE /api/relative/delete/:id
 * access : Private
 * desc: delete a relative
 */
router.delete("/delete/:id", auth, deleteRelative);

/**
 * route : DELETE /api/relative/delete
 * access : Private
 * desc: delete all relatives
 */
router.delete("/delete", auth, deleteAllRelative);

/**
 * route : GET /api/relative/view/:id
 * access : Private
 * desc: fetch single relatives
 */
router.get("/view/:id", auth, getRelative);

exports.relativeRouter = router;
