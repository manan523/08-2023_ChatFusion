const express=require("express");
const router=express.Router();

const controller=require("../controllers/controller");

router.post("/register",controller.registeruser);
router.post("/login",controller.loginuser);
router.get("/getjson",controller.getjson);
// router.post("/addinfo",controller.addinfo);


module.exports=router;