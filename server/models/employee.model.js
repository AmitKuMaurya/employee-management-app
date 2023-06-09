const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  avatar: {
    public_id: {
      type: String,
      required: [true, "There will be your public Id"],
    },
    url: {
      type: String,
      required: [true, "There will be your image url."],
    },
  },
  status: { type: String, required: [true, "Please choose your status"] },
  gender: { type: String, required: [true, "Plesae choose your gender"] },
});

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = {
  EmployeeModel,
};
