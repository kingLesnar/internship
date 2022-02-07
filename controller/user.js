const User = require("../models/user");
const { validationResult } = require("express-validator");
const res = require("express/lib/response");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  //   console.log(req);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Email already exists",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
      password: user.password,
    });
  });
};

exports.signin = async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, async (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User doesn't exist",
      });
    }
    if (user) {
      if (!(req.body.password === user.password)) {
        return res.status(401).json({
          error: "Name or password is incorrect",
        });
      }
    }
    const { _id, name, email } = user;
    return res.json({
      user: {
        _id,
        name,
        email,
      },
    });
  });
};

exports.getUser = (req, res) => {
  User.findById({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "NO user Found" });
    } else {
      user.password = undefined;
      return res.status(200).json({ message: "Sucess", user: user });
    }
  });
};

exports.mymiddileware = (req, res, next) => {
  var flag = true;
  console.log("here");
  const charaters = " /@#$%^&";
  const name = req.body.name;
  for (let i = 0; i < name.length; i++) {
    if (charaters.indexOf(name.charAt(i)) !== -1) {
      falg = false;
      return res.status(400).json({
        message: `Your userName has special characters. ${charaters} These are not allowed.`,
      });
    }
  }

  if (flag == true) {
    next();
  }
};
