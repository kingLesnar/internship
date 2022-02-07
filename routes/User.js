var express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const {
  signup,
  signin,
  getUser,
  mymiddileware,
} = require("../controller/user");

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").contains(),
  ],
  mymiddileware,
  signin,
);

// user
router.post(
  "/signup",
  [
    check("name", "name should be atleast 5 charater").isLength({ min: 5 }),
    check("email", "email is required").isEmail(),
    check("password", "password must be atleast 8 charater").isLength({
      min: 8,
    }),
    // check("phone", "phone Number is Invalid").isLength({min: 10})
  ],
  mymiddileware,
  signup,
);

router.get("/getuser/:id", getUser);

module.exports = router;
