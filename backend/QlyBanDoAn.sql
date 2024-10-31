create table NguoiDung (
	MaNguoiDung int primary key auto_increment,
    TenNguoiDung varchar (50) unique,
    Email varchar (255),
    AnhNguoiDung varchar (255),
    MatKhau varchar (50),
    SoDienThoai varchar (50)
);

alter table nguoidung modify column SoDienThoai varchar (50) unique;

create table NguoiBan (
	MaNguoiBan int primary key,
    TenNguoiBan varchar (50),
    ThanhPho varchar (50),
    ThoiGianMoCua time,
    ThoiGianDongCua time,
    DiaChi varchar (255),
    AnhNguoiBan varchar (255),
    CanCuoc varchar (255),
    GiayPhep varchar (255),
    Diem double default 0,
    LuotDanhGia int default 0,
    foreign key (MaNguoiBan) references NguoiDung (MaNguoiDung) on delete cascade
);

alter table NguoiBan add column TenChuSoHuu varchar (50);
alter table NguoiBan add column QueQuanChuSoHuu varchar (50);
alter table NguoiBan add column NgaySinhChuSoHuu datetime;
alter table NguoiBan add column Email varchar (255);
alter table NguoiBan add column Hotline varchar (255);

create table LoaiNguoiBan (
	MaLoaiNguoiBan int primary key auto_increment,
    TenLoaiNguoiBan varchar (50)
);

create table LoaiMonAn (
	MaLoaiMonAn int primary key auto_increment,
    TenLoaiMonAn varchar (50),
    MaNguoiBan int not null,
    foreign key (MaNguoiBan) references NguoiBan (MaNguoiBan) on delete cascade
);

create table MonAn (
	MaMonAn int primary key auto_increment,
    TenMonAn varchar (50),
    AnhMonAn varchar (255),
    GiaBan int,
    MoTa varchar (255),
    MaNguoiBan int,
    MaLoaiMonAn int,
    foreign key (MaNguoiBan) references nguoiban (MaNguoiBan) on delete set null,
    foreign key (MaLoaiMonAn) references loaimonan (MaLoaiMonAn) on delete set null
);

create table NhanXet (
	MaNguoiMua int,
    MaMonAn int,
    primary key (MaNguoiMua,MaMonAn),
    foreign key (MaNguoiMua) references nguoidung (MaNguoiDung) on delete cascade,
    foreign key (MaMonAn) references monan (MaMonAn),
    HienThi boolean default true,
    NoiDung varchar (255),
    TraLoi varchar (255),
    Diem double
);

alter table nhanxet add column ThoiGianTao datetime default now();

create table LoaiNguoiBan_NguoiBan (
	MaNguoiBan int,
    MaLoaiNguoiBan int,
    primary key (MaNguoiBan,MaLoaiNguoiBan),
    foreign key (MaNguoiBan) references nguoiban (MaNguoiBan) on delete cascade,
    foreign key (MaLoaiNguoiBan) references LoaiNguoiBan (MaLoaiNguoiBan) on delete cascade
);

create table KhuyenMai (
	MaKhuyenMai int primary key auto_increment,
    TenKhuyenMai varchar (255),
    PhanTram double,
    GiaTri int default 0,
    MaNguoiBan int,
    SoLuong int,
    NgayTao datetime,
    NgayHetHan datetime,
    foreign key (MaNguoiBan) references NguoiBan (MaNguoiBan) on delete cascade
);

create table NguoiMua_KhuyenMai (
	MaNguoiMua int,
    MaKhuyenMai int,
    primary key (MaNguoiMua, MaKhuyenMai),
    foreign key (MaNguoiMua) references NguoiDung (MaNguoiDung) on delete cascade,
    foreign key (MaKhuyenMai) references KhuyenMai (MaKhuyenMai) on delete cascade
);

create table TaiXe (
	MaTaiXe int primary key, 
    CanCuoc varchar (255),
    BangLai varchar (255),
    foreign key (MaTaiXe) references NguoiDung (MaNguoiDung) on delete cascade
);

create table TrangThaiDonHang (
	MaTrangThai int primary key auto_increment,
    TenTrangThai varchar (50)
);

create table PhuongThucGiaoDich (
	MaPhuongThucGiaoDich int primary key auto_increment,
    TenPhuongThucGiaoDich varchar (50)
);

create table DonHang (
	MaDonHang int primary key auto_increment,
    DiaChiDen varchar (255),
    TrangThai int,
    GiaBan int,
    MaTaiXe int,
    MaKhuyenMai int,
    MaNguoiMua int,
    MaPhuongThucGiaoDich int,
    foreign key (TrangThai) references TrangThaiDonHang (MaTrangThai) on delete set null,
    foreign key (MaTaiXe) references TaiXe (MaTaiXe) on delete set null,
    foreign key (MaKhuyenMai) references KhuyenMai (MaKhuyenMai) on delete set null,
    foreign key (MaNguoiMua) references NguoiDung (MaNguoiDung) on delete set null,
    foreign key (MaPhuongThucGiaoDich) references PhuongThucGiaoDich (MaPhuongThucGiaoDich) on delete set null
);

alter table donhang add column ThoiGianTao datetime default now();
alter table donhang add column LoiNhan varchar (255);

create table ChiTietDonHang (
	MaMonAn int,
    MaDonHang int,
    SoLuong int,
    primary key (MaMonAn, MaDonHang),
    foreign key (MaMonAn) references MonAn (MaMonAn),
    foreign key (MaDonHang) references DonHang (MaDonHang) 
);

create table NguoiBanYeuThich (
	MaNguoiBan int,
    MaNguoiMua int,
    primary key (MaNguoiBan,MaNguoiMua),
    foreign key (MaNguoiBan) references nguoiban (MaNguoiBan) on delete cascade,
    foreign key (MaNguoiMua) references nguoidung (MaNguoiDung) on delete cascade
);

create table VaiTro (
	MaVaiTro int primary key auto_increment,
    TenVaiTro varchar (50)
);

create table VaiTro_NguoiDung (
	MaVaiTro int,
    MaNguoiDung int,
    primary key (MaVaiTro,MaNguoiDung),
    foreign key (MaVaiTro) references VaiTro (MaVaiTro) on delete cascade,
    foreign key (MaNguoiDung) references nguoidung (MaNguoiDung) on delete cascade
);

# Trigger

create trigger tinhDiemNguoiBanInsert after insert on NhanXet
for each row
update NguoiBan 
join 
(select new.Diem as diem, nguoiban.MaNguoiBan from monan join nguoiban on monan.MaNguoiBan = nguoiban.MaNguoiBan where monan.MaMonAn = new.MaMonAn ) as tmp 
on NguoiBan.MaNguoiBan = tmp.MaNguoiBan
set NguoiBan.Diem = NguoiBan.Diem + tmp.diem, NguoiBan.LuotDanhGia = NguoiBan.LuotDanhGia + 1 ;

create trigger tinhDiemNguoiBanUpdate after update on NhanXet
for each row
update NguoiBan 
join 
(select new.Diem - old.Diem as diem, nguoiban.MaNguoiBan from monan join nguoiban on monan.MaNguoiBan = nguoiban.MaNguoiBan where monan.MaMonAn = old.MaMonAn ) as tmp 
on NguoiBan.MaNguoiBan = tmp.MaNguoiBan
set NguoiBan.Diem = NguoiBan.Diem + tmp.diem;

delimiter $$
create trigger themNguoiMua_KhuyenMai before insert on NguoiMua_KhuyenMai
for each row 
begin
	if ((select soLuong from khuyenmai where khuyenmai.MaKhuyenMai = new.MaKhuyenMai) = 0)
    then
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Đã hết số lượng khuyến mãi';
    else update khuyenmai set soLuong = soLuong - 1 where makhuyenmai = new.makhuyenmai;
    end if;
end$$
delimiter ;

create trigger xoaNguoiMua_KhuyenMai after delete on NguoiMua_KhuyenMai
for each row
update khuyenmai set soLuong = soLuong + 1 where maKhuyenMai = old.maKhuyenMai;


# Drop Table 
drop table NhanXet;
drop table NguoiMua_KhuyenMai;
drop table LoaiNguoiBan_NguoiBan;
drop table ChiTietDonHang;
drop table VaiTro_NguoiDung;
drop table NguoiBanYeuThich;
drop table DonHang;
drop table MonAn;
drop table LoaiMonAn;
drop table LoaiNguoiBan;
drop table KhuyenMai;
drop table NguoiBan;
drop table TaiXe;
drop table NguoiDung;
drop table PhuongThucGiaoDich;
drop table TrangThaiDonHang;
drop table VaiTro;

-- Dữ liệu
-- VaiTro
insert into vaitro (vaitro.TenVaiTro) values 
	("Admin"),
    ("Buyer"),
    ("Seller"),
    ("Driver");

-- NguoiDung
insert into nguoidung (nguoidung.TenNguoiDung,nguoidung.MatKhau) values 
	("abc","1"),
    ("root","1"),
    ("custard","1"),
    ("malenia423","1"),
    ("dizzy", "1"),
    ("dope","1"),
    ("sktt1","1");

-- VaiTroNguoiDung
insert into vaitro_nguoidung (vaitro_nguoidung.MaNguoiDung, vaitro_nguoidung.MaVaiTro) values 
	(2,1),
    (1,2),
    (3,2),
    (4,2),
    (5,3),
    (6,3),
    (7,3);

-- NguoiBan
insert into nguoiban (nguoiban.MaNguoiBan,nguoiban.TenNguoiBan,nguoiban.ThanhPho, nguoiban.ThoiGianMoCua, nguoiban.ThoiGianDongCua, nguoiban.DiaChi) values 
	(5,"Thiên Đường ăn vặt","Hà Nội","8:00","10:00","Hàm Tử Quan"),
    (6,"Salt and lime", "Hà Nội", "8:00","19:00", "Đặng Thai Mai"),
    (7, "King Roti", "Hà Nội", "7:00","23:00","Hàng Gai");
    
-- LoaiMonAn
insert into loaimonan (loaimonan.TenLoaiMonAn,loaimonan.MaNguoiBan) values 
	("Ăn vặt",5),
    ("Salads, (California Burritos style)",6),
    ("American BBQ Menu",6),
    ("Roti",7);
-- MonAn
insert into monan (monan.TenMonAn,monan.MoTa,monan.MaNguoiBan,monan.GiaBan,monan.MaLoaiMonAn) values 
	("Mỳ cay","Cay xè lưỡi",5,25000,1),
    ("Nem nướng","Đậm ngậy mỗi miếng",5,10000,1),
    ("Pizza", "Ngất ngây",5,250000,null),
    ("Salad Grill Chicken","Black beans, 100 grams fresh grilled chicken, cheddar cheese, picante, sour cream, lettuce and your choice of Salt n' Lime salsa",6,80000,2),
    ("Salad slow cooked Beef Burrito","Black beans, 100 grams braised pulled Australian beef, cheddar cheese, picante, sour cream, lettuce and your choice of Salt n' Lime salsa",6,95000,2),
    ("Smoked Brisket","Slow n' low smoked beef brisket per order served with mashed potatoes or corn on the cob, with small salad and house BBQ sauce",6,250000,3),
    ("Roti socola","Bánh Roti socola là loại bánh có Nhân socola - Vỏ bánh cà phê",7,20000,4),
    ("Roti trà xanh","Bánh Roti Trà Xanh là loại bánh có Nhân bơ sữa - Vỏ bánh Trà Xanh",7,20000,4),
    ("Roti bơ mặn","Bánh Roti Bơ Mặn với nhân phô mai mặn - Vỏ bánh cà phê",7,20000,4);

-- NguoiBanYeuThich 
insert into nguoibanyeuthich values 
	(5,1),
    (6,1),
    (7,1),
    (6,3),
    (7,3),
    (5,4),
    (7,4);
    
-- KhuyenMai
insert into khuyenmai (khuyenmai.TenKhuyenMai,khuyenmai.PhanTram,khuyenmai.GiaTri,khuyenmai.MaNguoiBan,khuyenmai.SoLuong,khuyenmai.NgayTao,khuyenmai.NgayHetHan) values 
	("Giảm sâu",null,100000,5,10,"2024-12-1 00:00:00","2024-12-2 00:00:00"),
    ("Giảm nông",5,null,5,10,"2024-10-7 00:00:00","2024-10-9 00:00:00"),
    ("Giảm siêu to",null,1000,5,2,"2024-10-5 00:00:00", "2024-10-6 00:00:00" );

-- NguoiMua_KhuyenMai
insert into nguoimua_khuyenmai values 
	(1,1),
    (3,1),
    (4,1);

-- NhanXet 
insert into nhanxet (nhanxet.MaNguoiMua,nhanxet.MaMonAn,nhanxet.Diem,nhanxet.NoiDung,nhanxet.TraLoi) values 
	(1,4,10,null,null),
    (1,8,2,"Hơi ngọt",null),
    (3,5,10,"Tuyệt","Shop cám ơn ạ");

-- PhuongThucGiaoDich
insert into phuongthucgiaodich (phuongthucgiaodich.TenPhuongThucGiaoDich) values 
	("Cash on Delivery"),
    ("Card"),
    ("E-wallet");

-- TrangThaiDonHang
insert into trangthaidonhang (trangthaidonhang.TenTrangThai) values 
	("Đã nhận đon hàng"),
    ("Đang chuẩn bị món ăn"),
    ("Đang giao"),
    ("Đã giao"),
    ("Đã hủy");
    
-- AI Generate
insert into NguoiDung (TenNguoiDung, Email, MatKhau, SoDienThoai, MaNguoiDung) values 
        ('bnegro0', 'abaythrop0@jigsy.com', '5912817173', '3243002103', 8),
        ('smackie1', 'tstemson1@w3.org', '4358268451', '4698044816', 67),
        ('ypoon2', 'mollin2@salon.com', '2531790398', '5932872011', 51),
        ('msighart3', 'ifeatonby3@surveymonkey.com', '4609442693', '5707027362', 72),
        ('trichardet4', 'dwotton4@go.com', '4082761156', '6324859481', 74),
        ('mmccolley5', 'jhendrich5@macromedia.com', '4011313085', '3474722204', 75),
        ('ehinkensen6', 'mraynor6@omniture.com', '2562276322', '6193987219', 11),
        ('xketchaside7', 'mtidball7@nifty.com', '1586364893', '7964924853', 44),
        ('srutherforth8', 'eparkman8@eepurl.com', '8846782572', '9948476914', 24),
        ('dliddell9', 'dlockier9@dell.com', '6042418151', '9754869208', 16),
        ('gmacintosha', 'osteggalsa@rakuten.co.jp', '3785331786', '9217562751', 32),
        ('dmaberb', 'bbramhillb@netscape.com', '9243440124', '1915215160', 56),
        ('jperryc', 'giozefovichc@joomla.org', '1319410818', '3093805396', 60),
        ('nrobusd', 'lalflattd@bloglines.com', '6407077530', '4716251289', 13),
        ('ncurnesse', 'tgrunsone@bizjournals.com', '1979225777', '4447182245', 84),
        ('cscotchbourougef', 'mrudgerdf@ustream.tv', '6444536756', '3931089767', 47),
        ('gsinncockg', 'lsurmeirg@smh.com.au', '7694304194', '5034522249', 100),
        ('agourdonh', 'jmacchaellh@github.com', '2168135728', '1401041347', 29),
        ('dbuffeyi', 'mkubelkai@webmd.com', '8528446677', '7355874573', 58),
        ('gwitulj', 'tbrechej@tinyurl.com', '5538413942', '6257133844', 63);

insert into nguoiban (nguoiban.MaNguoiBan,nguoiban.TenNguoiBan,nguoiban.DiaChi,nguoiban.ThanhPho,nguoiban.ThoiGianMoCua,nguoiban.ThoiGianDongCua) values 
        (8,"Taste of the Countryside","345 Bạch Đằng, Quận Hải Châu","Đà Nẵng","07:00","22:00"),
        (67,"Four Seasons Dining","123 Nguyễn Thị Minh Khai, Quận 1","Hồ Chí Minh","08:30","21:30"),
        (51,"Pho House Hanoi","45 Lý Thái Tổ, Quận Hoàn Kiếm","Hà Nội","06:00","23:00"),
        (72,"Saigon Rice Plates","678 Trần Phú, Phường 5","Lâm Đồng","09:00","22:00"),
        (74,"Rustic Charm","890 Võ Văn Kiệt, Quận Ninh Kiều","Cần Thơ","07:30","21:00"),
        (75,"Mountain Breeze Café","76 Nguyễn Huệ, Quận 1","Hồ Chí Minh","06:30","22:30"),
        (11,"Zen Vegetarian Café","220 Phạm Văn Đồng, Quận Bắc Từ Liêm","Hà Nội","08:00","23:00"),
        (44,"Royal BBQ & Hotpot","909 Trần Hưng Đạo, Quận 5","Hồ Chí Minh","10:00","21:00"),
        (24,"Sunshine Sushi","560 Nguyễn Văn Linh, Quận Long Biên","Hà Nội","06:00","20:00"),
        (16,"Golden Harvest Restaurant","33 Lê Lợi, Quận Ngô Quyền","Hải Phòng","09:00","22:30"),
        (32,"Chân Quê","114 Võ Thị Sáu, Quận 3","Hồ Chí Minh","07:00","23:30"),
        (56,"Quán Xưa","732 Điện Biên Phủ, Quận Thanh Khê","Đà Nẵng","08:00","22:00"),
        (60,"Vườn Nướng Lẩu","29 Phan Chu Trinh, Quận Bình Thạnh","Hồ Chí Minh","07:30","21:30"),
        (13,"Nhà Hàng Mùa Vàng","455 Nguyễn Đình Chiểu, Phường 2, Quận 3","Hồ Chí Minh","06:00","23:00"),
        (84,"Hương Vị Quê","128 Hùng Vương, Phường Vĩnh Trường","Nha Trang","09:30","20:30"),
        (47,"Nhà Hàng Đất Việt","612 Cách Mạng Tháng 8, Quận 10","Hồ Chí Minh","07:00","21:00"),
        (100,"Gió Núi Quán","84 Hai Bà Trưng, Quận 1","Hồ Chí Minh","01:00","05:00"),
        (29,"Quán Chay Tịnh Tâm","271 Trần Quốc Toản, Quận Hải Châu","Đà Nẵng","04:00","06:00"),
        (58,"Sushi Nắng Hồng","99 Quang Trung, Quận Gò Vấp","Hồ Chí Minh","01:00","07:00"),
        (63,"Old Town Bistro","789 Nguyễn Văn Cừ, Quận Long Biên","Hà Nội","10:00","11:00");

insert into vaitro_nguoidung values
	    (3,8),
        (3,67),
        (3,51),
        (3,72),
        (3,74),
        (3,75),
        (3,11),
        (3,44),
        (3,24),
        (3,16),
        (3,32),
        (3,56),
        (3,60),
        (3,13),
        (3,84),
        (3,47),
        (3,100),
        (3,29),
        (3,58),
        (3,63);
        
insert into loaimonan (loaimonan.MaLoaiMonAn,loaimonan.MaNguoiBan,loaimonan.TenLoaiMonAn) values
	    (10,8,"Món chính tỏa hương vị quê nhà"),
        (11,8,"Khai vị hấp dẫn"),
        (12,8,"Canh thanh mát"),
        (13,8,"Tráng miệng ngọt ngào"),
        (14,8,"Món phụ đi kèm"),
        (15,75,"Cà phê"),
        (16,75,"Trà"),
        (17,75,"Đồ uống lạnh"),
        (18,75,"Nước hoa quả"),
        (19,75,"Bánh"),
        (20,24,"Sashimi"),
        (21,24,"Sushi Cake"),
        (22,24,"Maki"),
        (23,24,"Yakimono"),
        (24,24,"Tempura"),
        (25,100,"Món kho"),
        (26,100,"Món xào"),
        (27,100,"Món chiên"),
        (28,100,"Món hấp"),
        (29,100,"Món nướng");
        
insert into monan (monan.MaLoaiMonAn,monan.MaNguoiBan,monan.TenMonAn,monan.GiaBan,monan.MoTa) values 
	    (10,8,"Gà kho gừng",250000,"Gà tươi được kho với gừng và gia vị, tạo ra món ăn thơm ngon và bổ dưỡng"),
        (10,8,"Bò nướng lá lốt",300000,"Thịt bò xay nhuyễn cuốn trong lá lốt, nướng trên than hồng, tỏa ra hương vị đặc trưng"),
        (10,8,"Cơm lam",100000,"Gạo nếp được nấu trong ống tre, có vị thơm đặc biệt, thường ăn kèm với muối vừng"),
        (13,8,"Chè đậu xanh",30000,"Chè ngọt thanh từ đậu xanh và nước cốt dừa, rất thích hợp cho những ngày hè nóng bức"),
        (13,8,"Xôi gấc",20000,"Xôi gấc dẻo thơm, có màu đỏ đặc trưng, thường được dùng trong các dịp lễ hội"),
        (14,8,"Nem nướng",20000,"Nem được nướng thơm lừng, ăn kèm với rau sống và nước mắm chua ngọt"),
        (15,75,"Cà phê sữa",45000,"Cà phê phin pha với sữa đặc, thường được uống nóng hoặc lạnh"),
        (15,75,"Cà phê đen",40000,"Cà phê phin không đường, đậm đà hương vị"),
        (15,75,"Cappuccino",45000,"Cà phê espresso kết hợp với sữa nóng và bọt sữa, tạo ra một lớp kem mịn"),
        (16,75,"Trà xanh",40000,"Trà tươi, thanh mát, có thể uống nóng hoặc lạnh"),
        (16,75,"Trà nhài xanh táo chanh",45000,"Trà nhài với nước táo ép"),
        (16,75,"Trà đào quất",30000,"Trà đào túi lọc với quất"),
        (19,75,"Red Velvet",50000,"Bánh gato vị dâu"),
        (19,75,"Brownie",55000,"Bánh socola"),
        (19,75,"Cookie",30000,"Bánh quy với vụn socola"),
        (20,24,"AKAGAI SASHIMI",179000,"Sò lông"),
        (20,24,"CHUBUNE SASHIMI",1089000,"Thuyền sashimi cỡ trung"),
        (22,24,"SAKE AVOCADO MAKI",129000,"Cơm Cuộn Cá Hồi & Bơ "),
        (22,24,"SOFT SHELL CHIZU MAKI",189000,"Cơm Cuộn Cua Lột & Phô Mai"),
        (22,24,"TONKATSU MAKI",109000,"Cơm Cuộn Thịt Heo Chiên");

select * from nguoiban join nguoidung on nguoiban.MaNguoiBan = nguoidung.MaNguoiDung;
select * from nguoiban
select * from vaitro_nguoidung
delete from nguoiban where manguoiban = 107 and mavaitro = 3
select * from vaitro