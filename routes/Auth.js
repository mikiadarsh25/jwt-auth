const router = require("express").Router({ mergeParams: true });
const service = require("../services");
const { errorHandler, responseHandler } = require("../libs/responseHandler");
const { SUCCESS_MESSAGES, STATUS_CODES } = require("../constants");

router.post("/register", async (req, res) => {
  try {
    const {
      params,
      body: { userName, password }
    } = req;
    await service.registerUser({ userName, password });
    const response = { message: SUCCESS_MESSAGES.USER_REGISTERED, statusCode: STATUS_CODES.SUCCESS.POST, data: {} };
    await responseHandler(response, res);
  } catch (error) {
    console.log(error);
    await errorHandler(error, req, res);
  }
});

router.post("/login", async (req, res) => {
  try {
    const {
      params,
      body: { userName, password }
    } = req;
    const token = await service.getRegisteredUser({ userName, password });
    const response = { data: { token }, statusCode: STATUS_CODES.SUCCESS.POST, message: SUCCESS_MESSAGES.LOGIN_SUCCESS };
    await responseHandler(response, res);
  } catch (error) {
    console.log(error);
    await errorHandler(error, req, res);
  }
});

module.exports = router;
