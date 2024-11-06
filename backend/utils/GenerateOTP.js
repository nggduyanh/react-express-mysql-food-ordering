function generate (length)
{
    length--
    let max = 10 ** (length + 1) - 1
    let min = 10 ** (length)
    let otp = Math.floor(min + Math.random() * (max - min));
    return otp
}

module.exports = generate