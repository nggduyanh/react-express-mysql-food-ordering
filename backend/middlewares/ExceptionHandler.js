function errorHandler (err,req,res,next)
{
    res.status(err.status || 500).json (err.msg || "Not Found")
}

module.exports = errorHandler