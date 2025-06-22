const Auth = require("./Auth");
const router = require("express").Router({ mergeParams: true });
const verifyToken = require("../middlewares/authMiddleware");

router.use("/Auth", Auth);

module.exports = router;
