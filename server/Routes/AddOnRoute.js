const router = require("express").Router();
const {
  addAddOn,
  getAddOn,
  getAddOnById,
  updateAddOnById,
  deleteAddOnById,
} = require("../Controllers/AddONController");

router.post("/addAddOn", addAddOn);
router.get("/getAddOn", getAddOn);
router.post("/getAddOnById", getAddOnById);
router.post("/updateAddOnById/:id", updateAddOnById);
router.delete("/deleteAddOnById/:id", deleteAddOnById);

module.exports = router;
