const router = require("express").Router({ mergeParams: true });
const service = require("../services");

router.post("/register", async (req, res) => {
  try {
    const {
      params,
      body: { userName, password }
    } = req;
    const data = await service.Auth.registerUser({ userName, password });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const {
      params,
      body: { userName, password }
    } = req;
    const token = await service.Auth.getRegisteredUser({ userName, password });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
