const mongoose = require("mongoose");

//**********************// USERS SCHEMA //******************************* */
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg",
    },
    mobile: {
      type: String,
    },
    cart: {
      type: Array,
      // of:
      default: [],
    },
    // address: {
    //   type: Map, //for objects
    //   default: {}
    // }
    address: {
      type: Array, //for objects
      default: []
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel; //default export
