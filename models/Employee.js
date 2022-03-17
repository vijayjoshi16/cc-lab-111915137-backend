const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employee_id: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  contact_no: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
