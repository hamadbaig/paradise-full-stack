const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

// module.exports.Signup = async (req, res, next) => {
//   try {
//     const { email, fullName } = req.body;
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.json({ message: "User already exists" });
//     }

//     const user = await User.create({ email, fullName });
//     const token = createSecretToken(user._id);

//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: false,
//     });

//     res.status(201).json({
//       message: "User signed up successfully",
//       success: true,
//       user,
//       token,
//     });

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, fullName } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      // User already exists, proceed with login functionality
      const token = createSecretToken(user._id);

      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });

      await User.findByIdAndUpdate(user._id, { token: token });

      return res.status(200).json({
        message: "User logged in successfully",
        success: true,
        user,
        token,
      });
    }

    // User does not exist, proceed with signup
    user = await User.create({ email, fullName });
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.Login = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(403).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    User.findByIdAndUpdate(user._id, { token: token });

    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      token: token,
      data: user,
    });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is missing" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.addAddress = async (req, res) => {
  const { name, landmark, city, mobile, address, adressType } = req.body;
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is missing" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          addresses: {
            name,
            landmark,
            city,
            mobile,
            address,
            adressType,
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ error: "Failed to update user" });
    }

    res
      .status(200)
      .json({ message: "Address added successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateAddress = async (req, res) => {
  const {
    addressId,
    flatHouseNo,
    landmark,
    townCity,
    pincode,
    state,
    addressType,
  } = req.body;
  const userId = req.userId;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "addresses._id": addressId },
      {
        $set: {
          "addresses.$.flatHouseNo": flatHouseNo,
          "addresses.$.landmark": landmark,
          "addresses.$.townCity": townCity,
          "addresses.$.pincode": pincode,
          "addresses.$.state": state,
          "addresses.$.addressType": addressType,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Address updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeAddress = async (req, res) => {
  const { addressId } = req.body;
  const userId = req.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          addresses: { _id: addressId },
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Address removed successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
