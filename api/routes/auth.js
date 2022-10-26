const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // for decrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // checking user w/ database
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    // compare password w/ database
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    // this will get any other data from user except password
    const { password, ...others } = user._doc;

    // respon with success if both of above are true
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// export
module.exports = router;

// note:
// if you create use POST, updating or editing existing model use PUT, deleting use DELETE, ifcreating some beta or not creating or changing anything use GET
// req is basically the datas we are sending to our server (username, email, password etc). res is what we get after we sent req (can be user, warning, sucessful, or anything you want)
