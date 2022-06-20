const mongoose = require("mongoose");
const Joi = require("joi");
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(3).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
};
exports.Customer = Customer;
exports.validate = validateCustomer;
