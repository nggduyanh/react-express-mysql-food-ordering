const smtp = {
    host: "smtp.gmail.com", // kết nối máy chủ smtp (simple mail transfer protocol) của google
    port: 587, // sử dụng cổng 587 của máy chủ smtp (587 có nghĩa là sử dụng giao thức mã hóa TLS) nếu là 465 (thì là SSL) 
    secure: false, // false là với cổng 587 (TLS), true là với cổng 465 (SSL)
    auth: {
        user: "accclone21112003@gmail.com",
        pass: "skcw kheo fwil zhud"
    }
}

module.exports = smtp
