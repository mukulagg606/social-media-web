const express = require("express");
const homeController = require("../controllers/home_controller");
const router = express.Router();

router.get("/",homeController.home);
router.use("/users",require("./users_route"));
router.use("/posts",require('./posts'));
router.use("/comments",require("./comments"));
router.use("/api",require("./api"));
router.use("/likes",require("./like"));

module.exports = router;