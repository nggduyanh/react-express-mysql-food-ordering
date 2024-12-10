const nodeMailer = require ("nodemailer")
const mailConfig = require ("../configs/MailConfig")
function mailService ()
{
    let transporter = nodeMailer.createTransport (mailConfig)
    let userMail = `react-express-mysql-food-ordering <${mailConfig.auth.user}>`
    
    async function sendEmail (detail)
    {
        let message = {
            from: userMail,
            ...detail
        }
        
        try 
        {
            let res = await transporter.sendMail (message)
            res.success = true
            return res
        }
        catch (err)
        {
            err.success = false
            return err
        }
    }    

    return {sendEmail}
}

module.exports = mailService ()