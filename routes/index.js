const Auth = require("./Auth");
const router = require("express").Router({ mergeParams: true });

router.use("/Auth", Auth);

module.exports = router;
