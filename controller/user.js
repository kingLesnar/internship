const User = require("../models/user");
const { validationResult } = require("express-validator");

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
    // if (!user.authenticate(password)) {
    if (user) {
      // console.log(user);
      const auth = await bcrypt.compare(req.body.password, user.password);
      if (!auth) {
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
