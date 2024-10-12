const userModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userCardModel = require("../models/userCardSchema");

const register = (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    age,
    country,
    phoneNumber,
    gender,
    image,
  } = req.body;
  const newUser = new userModel({
    firstName,
    lastName,
    userName,
    email,
    password,
    age,
    country,
    phoneNumber,
    gender,
    image,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        msg: "user created successfully",
        user: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        msg: err.message,
      });
    });
};

const login = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  try {
    const found = await userModel.findOne({ email });
    if (found) {
      try {
        const valid = await bcrypt.compare(password, found.password);
        if (valid) {
          try {
            const userSearch = await userCardModel.find({ userId: found._id });
            if (!userSearch.length) {
              const newUserCard = new userCardModel({
                userId: found._id,
              });
              try {
                await newUserCard.save();
              } catch (error) {
                res.status(500).json({
                  msg: err.message,
                });
              }
            }
          } catch (error) {
            res.status(500).json({
              msg: err.message,
            });
          }

          const payload = {
            userId: found._id,
            firstName: found.firstName,
            phoneNumber: found.phoneNumber,
          };

          const option = {
            expiresIn: "60m",
          };

          const token = jwt.sign(payload, process.env.SECRET, option);
          res.status(200).json({
            success: true,
            msg: "user logged in successfully",
            token: token,
          });
        } else {
          res.status(403).json({
            success: false,
            msg: "The email doesn't exist or The password you’ve entered is incorrect",
          });
        }
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      res.status(403).json({
        success: false,
        msg: "The email doesn't exist ",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: error.message,
    });
  }
};

const updateInfo = async (req, res) => {
  const { firstName, lastName, email, oldPassword, phoneNumber, newPassword } =
    req.body;
  const _id = req.token.userId;
  if (oldPassword) {
    try {
      const lookFor = await userModel.findOne({ _id });
      if (lookFor) {
        try {
          const valid = await bcrypt.compare(oldPassword, lookFor.password);
          console.log(valid);
          if (valid) {
            const hashedNew = await bcrypt.hash(newPassword, 8);

            userModel
              .findOneAndUpdate({ _id }, { password: hashedNew }, { new: true })
              .then((info) => {
                res.status(200).json({
                  success: true,
                  updated: info,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  success: false,
                  message: `Server Error`,
                  error: err.message,
                });
              });
          } else {
            res.status(400).json({
              success: false,
              message: `Not Valid`,
            });
          }
        } catch (error) {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            error: error.message,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: `Not Found`,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error.message,
      });
    }
  } else {
    userModel
      .findOneAndUpdate(
        { _id },
        { firstName, lastName, email, phoneNumber },
        { new: true }
      )
      .then((result) => {
        if (Object.keys(result).length) {
          res.status(200).json({
            success: true,
            search: result,
          });
        } else {
          res.status(200).json({
            success: true,
            search: "no user",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          error: error.message,
        });
      });
  }
};
module.exports = {
  register,
  login,
  updateInfo,
};
