create table NguoiBan (
	MaNguoiBan int primary key auto_increment,
    TenNguoiBan varchar (50),
    TenNguoiSoHuu varchar (50),
    ThanhPho varchar (50),
    ThoiGianMoCua time,
    ThoiGianDongCua time,
    DiaChi varchar (255),
    CanCuoc varchar (255),
    GiayPhep varchar (255),
    SoDienThoai varchar (15),
    MatKhau varchar (255),
    Anh varchar (255),
    Email varchar (255),
    Diem double default 0,
    LuotDanhGia int default 0
);

create table NguoiMua (
	MaNguoiMua int primary key auto_increment,
    TenNguoiMua varchar (50),
    Email varchar (50),
    anh varchar (255),
    MatKhau varchar (50),
    SoDienThoai varchar (50)
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
    foreign key (MaNguoiMua) references nguoimua (MaNguoiMua) on delete cascade,
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
    foreign key (MaNguoiMua) references NguoiMua (MaNguoiMua) on delete cascade,
    foreign key (MaKhuyenMai) references KhuyenMai (MaKhuyenMai) on delete cascade
);

create table TaiXe (
	MaTaiXe int primary key auto_increment, 
    TenTaiXe varchar (50),
    SoDienThoai varchar (15),
    CanCuoc varchar (255),
    BangLai varchar (255),
    Anh varchar (255),
    MatKhau varchar (255)
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
    foreign key (MaNguoiMua) references NguoiMua (MaNguoiMua) on delete set null,
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
    foreign key (MaNguoiMua) references nguoimua (MaNguoiMua) on delete cascade
);

# Drop Table 
drop table NhanXet;
drop table NguoiMua_KhuyenMai;
drop table LoaiNguoiBan_NguoiBan;
drop table ChiTietDonHang;

drop table DonHang;
drop table NguoiMua;
drop table MonAn;
drop table LoaiMonAn;
drop table LoaiNguoiBan;
drop table KhuyenMai;
drop table NguoiBan;
drop table TaiXe;
drop table PhuongThucGiaoDich;
drop table TrangThaiDonHang;
#

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

delimiter $$
create trigger themNguoiMua_KhuyenMai before delete on NguoiMua_KhuyenMai
for each row 
begin
	update khuyenmai set soLuong = soLuong + 1 where makhuyenmai = old.makhuyenmai;
end$$
delimiter ;

create trigger xoaNguoiMua_KhuyenMai after delete on NguoiMua_KhuyenMai
for each row
update khuyenmai set soLuong = soLuong + 1 where maKhuyenMai = old.maKhuyenMai;
