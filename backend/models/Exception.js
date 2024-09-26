class Exception 
{
    constructor (msg = undefined,statusCode = undefined)
    {
        this.status = statusCode
        this.msg = msg
    }

}

module.exports = Exception