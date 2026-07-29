const errorHandler = (err, req, res, next) => {
    console.log("errr handler reached")
    console.error(err)
   if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            success: false,
            message: "Email already exists"
        })
    }
    res.status(500).json({
        success : false,
        message:"Something went wrong"
    })
}

module.exports = errorHandler