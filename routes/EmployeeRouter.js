const express = require("express");
const employeeRouter = express.Router();
const expressAsyncHandler = require("express-async-handler");
const Employee = require("../models/Employee");
const Salary = require("../models/Salary");

employeeRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    try {
      const { employee_id, password, first_name, last_name, dob, contact_no } =
        req.body;
      const employee = new Employee({
        employee_id: Number(employee_id),
        password: password,
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        contact_no: Number(contact_no),
      });
      await employee.save();
      return res.status(200).send({
        message: "Success",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server error!" });
    }
  })
);

employeeRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    try {
      let employee = await Employee.find({
        employee_id: Number(req.body.employee_id),
        password: req.body.password,
      });
      //   console.log(employee);
      if (employee.length > 0) {
        console.log("##########");
        console.log(employee[0]);
        employee = employee[0];
        return res.status(200).send({
          message: "Success",
          employee: {
            employee_id: employee.employee_id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            dob: employee.dob,
            contact_no: employee.contact_no,
          },
        });
      } else {
        return res.status(401).send({ message: "Invalid credentials!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server error!" });
    }
  })
);

employeeRouter.get(
  "/get_basic_report",
  expressAsyncHandler(async (req, res) => {
    const basicReport = await Employee.find({}).select("-password");
    console.log(basicReport);
    return res.status(200).send({ report: basicReport });
  })
);

employeeRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const id = Number(req.params.id);
      const employee = await Employee.find({
        employee_id: id,
      }).select("-password");
      if (employee.length) {
        const salary = await Salary.find({
          employee_id: id,
        });
        if (salary.length) {
          return res.status(200).send({
            message: "Success",
            employee: employee[0],
            salary: salary[0],
          });
        } else {
          return res.status(200).send({
            message: "Success",
            employee: employee[0],
            salary: "Not Available!",
          });
        }
      } else {
        return res.status(400).send({ message: "No such user exists!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server error!" });
    }
  })
);

employeeRouter.post(
  "/addsalary",
  expressAsyncHandler(async (req, res) => {
    try {
      const { id, job_role, monthly_salary, yearly_bonus } = req.body;
      const salary = new Salary({
        employee_id: Number(id),
        job_role: job_role,
        monthly_salary: Number(monthly_salary),
        yearly_bonus: Number(yearly_bonus),
      });
      await salary.save();
      return res.status(200).send({ message: "Success", salary: salary });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server error!" });
    }
  })
);

employeeRouter.post(
  "/updatesalary",
  expressAsyncHandler(async (req, res) => {
    try {
      const { id, job_role, monthly_salary, yearly_bonus } = req.body;
      const updatedSalary = await Salary.updateOne(
        {
          employee: Number(id),
        },
        {
          employee_id: Number(id),
          job_role: job_role,
          monthly_salary: Number(monthly_salary),
          yearly_bonus: Number(yearly_bonus),
        }
      );
      return res.status(200).send({ message: "Success" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal Server error!" });
    }
  })
);

module.exports = employeeRouter;
