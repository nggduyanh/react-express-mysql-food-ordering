create table NguoiDung (
	MaNguoiDung int primary key auto_increment,
    TenNguoiDung varchar (50) unique,
    Email varchar (255),
    Anh varchar (255),
    MatKhau varchar (50),
    SoDienThoai varchar (50)
);

create table NguoiBan (
	MaNguoiBan int primary key,
    TenNguoiBan varchar (50),
    ThanhPho varchar (50),
    ThoiGianMoCua time,
    ThoiGianDongCua time,
    DiaChi varchar (255),
    CanCuoc varchar (255),
    GiayPhep varchar (255),
    Diem double default 0,
    LuotDanhGia int default 0,
    foreign key (MaNguoiBan) references NguoiDung (MaNguoiDung) on delete cascade
);

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
    Anh varchar (255),
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

# Drop Table 
-- drop table NhanXet;
-- drop table NguoiMua_KhuyenMai;
-- drop table LoaiNguoiBan_NguoiBan;
-- drop table ChiTietDonHang;
-- drop table VaiTro_NguoiDung;
-- drop table NguoiBanYeuThich;
-- drop table DonHang;
-- drop table MonAn;
-- drop table LoaiMonAn;
-- drop table LoaiNguoiBan;
-- drop table KhuyenMai;
-- drop table NguoiBan;
-- drop table TaiXe;
-- drop table NguoiDung;
-- drop table PhuongThucGiaoDich;
-- drop table TrangThaiDonHang;
-- drop table VaiTro;
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
    ("Đã hủy")
