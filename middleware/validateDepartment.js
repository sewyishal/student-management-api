const { body, validationResult } = require("express-validator");

const validateDepartment = [
    body("department_name")
        .notEmpty()
        .withMessage("Department name is required"),

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

module.exports = validateDepartment;