const mongoose = require("mongoose");

const salarySchema = mongoose.Schema({
  employee_id: {
    type: Number,
    required: true,
  },
  job_role: {
    type: String,
    required: true,
  },
  monthly_salary: {
    type: Number,
    required: true,
  },
  yearly_bonus: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Salary", salarySchema);
