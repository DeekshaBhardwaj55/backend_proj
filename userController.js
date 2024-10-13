const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed to register user",
    });
  }
};
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "Failed to login",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "Failed to login",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed to login",
    });
  }
};
exports.getAllUser = async (req, res,next) => {
  try{
      const UserList = await User.find();
      res.status(200).json({
          status: "success",
          count: UserList.length,
          data: {
              UserList,
          }
      });
  } catch(e){
      res.status(400).json({
          status: "Failed to get all tasks"
      });
  }
};
