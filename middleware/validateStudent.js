const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateStudent = (req, res, next) => {
    if (!req.body.student_name) {
        return res.status(400).json({
            success: false,
            message: "Student name field is empty"
        });
    }

    if (!req.body.email) {
        return res.status(400).json({
            success: false,
            message: "Email field is empty"
        });
    }

    if (!emailPattern.test(req.body.email)) {
        return res.status(400).json({
            success: false,
            message: "Email format is not correct"
        });
    }

    next();
};

module.exports = validateStudent;