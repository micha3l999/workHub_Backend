const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageOriginal: {
    type: string,
    default: null,
  },
  imageThumbnail: {
    type: string,
    default: null,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: string,
    required: true,
  },
  lastName: {
    type: string,
    required: true,
  },
  email: {
    type: string,
    required: [true, "An email is required"],
    unique: true,
  },
  phone: {
    type: string,
    required: [true, "A number is required"],
    validate: {
      validator(v) {
        let reg = /^[0-9]{10}$/;
        return reg.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  image: imageSchema,
  address: {
    type: string,
  },
  role: {
    type: string,
    enum: ["CUSTOMER", "PROFESSIONAL"],
    default: "CUSTOMER",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
