const mongoose = require('mongoose');
const { imageSchema } = require('../globalSchemas/globalSchemas');

//Validate that email
let validateEmailWithRegex = function (dataToValidate) {
  let a = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return a.test(dataToValidate);
}
let validateEmailExist = async function (emailToValidate) {
  const userEmailExist = await User.find({ 'email': emailToValidate });
  return userEmailExist.length == 0;
}


//Validate the phone number
let validatePhoneWithRegex = function (dataToValidate) {
  let reg = /^[0-9]{10}$/;
  return reg.test(dataToValidate);
}
let validatePhoneExist = async function (phoneToValidate) {
  const userPhoneExist = await User.find({ 'phone': phoneToValidate });
  return userPhoneExist.length == 0;
}



let emailValidators = [
  { validator: validateEmailWithRegex, message: props => `'${props.value}' is not a valid email` },
  { validator: validateEmailExist, message: props => `'${props.value}' is already in use` }
]

let phoneValidators = [
  { validator: validatePhoneWithRegex, message: props => `'${props.value}' is not a valid email` },
  { validator: validatePhoneExist, message: props => `'${props.value}' is already in use` }
]


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The Name is required"]
  },

  lastName: {
    type: String,
    required: [true, "The Lastname is required"]
  },

  email: {
    type: String,
    required: [true, "An email is required"],
    unique: true,
    validate: emailValidators
  },

  phone: {
    type: String,
    required: [true, "A number is required"],
    unique: true,
    validate: phoneValidators
  },

  image: imageSchema,


  role: {
    type: String,
    enum: ["CUSTOMER", "PROFESSIONAL"],
    default: "CUSTOMER"
  },


  customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

  sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },

  birthDate: {
    type: Date, 
  }

},

  { timestamps: true }

);

const User = mongoose.model("User", userSchema);
module.exports = User;