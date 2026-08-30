const { body, validationResult } = require("express-validator");

const validateStudent = [

    body("student_name")
        .notEmpty()
        .withMessage("Student name is required"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email format is invalid"),

    body("department_id")
        .notEmpty()
        .withMessage("Department ID is required")
        .isInt()
        .withMessage("Department ID must be an integer"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        next();
    }
];

module.exports = validateStudent;