var Mongoose = require("mongoose");

const employeeSchema = new Mongoose.Schema(
    {
        name: {type: String,
            required: true},
        location: String,
        position: String,
        salary: Number
    }
);

var EmployeeModel = Mongoose.model("employees", employeeSchema);
module.exports = {EmployeeModel};