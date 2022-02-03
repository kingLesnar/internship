var express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const { signup, signin } = require("../controller/user");

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 }),
  ],
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
  signup,
);

module.exports = router;
