const errorHandler = (err, req, res, next) => {
    console.log("errr handler reached")
    console.error(err)
   if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: "Email already exists"
        })
    }
 if (err.code === 'ER_ROW_IS_REFERENCED_2') {
    return res.status(400).json({
        success: false,
        message: "Cannot delete department because students belong to it."
    });
}
 if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
            success: false,
            message: "Department does not exist"
        })
    }
    res.status(500).json({
        success : false,
        message:"Something went wrong"
    })
}

module.exports = errorHandler