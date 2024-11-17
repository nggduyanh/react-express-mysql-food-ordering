import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
export default function RestaurantSeller() {
  const avatarResRef = useRef(null);
  const tokenValue = JSON.parse(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        "http://localhost:3030/nguoidung/current",
        {
          headers: {
            Authorization: "Bearer " + tokenValue.token,
          },
        }
      );
      const data = response.data;
      setUser(data?.[0]);
    };
    getUser();
  }, []);
  const CCCD = useRef(null);
  const Businesslicense = useRef(null);
  const [SellerForm, setSellerForm] = useState({
    MaNguoiBan: user?.MaNguoiDung,
    ThanhPho: "",
    ThoiGianMoCua: "",
    ThoiGianDongCua: "",
    DiaChi: "",
    CanCuoc: null,
    CanCuocTemp: null,
    GiayPhep: null,
    GiayPhepTemp: null,
    diem: null,
    luotDanhGia: null,
    AnhNguoiBan: null,
    AnhNguoiBanTemp: null,
    TenChuSoHuu: "",
    QueQuanChuSoHuu: "",
    NgaySinhChuSoHuu: "",
    Email: "",
    Hotline: "",
  });
  useEffect(() => {
    if (user?.MaNguoiDung) {
      setSellerForm((prevForm) => {
        return {
          ...prevForm,
          MaNguoiBan: user?.MaNguoiDung,
        };
      });
    }
  }, [user]);
  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setSellerForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (
      SellerForm.ThanhPho === "" ||
      SellerForm.DiaChi === "" ||
      SellerForm.Email === "" ||
      SellerForm.Hotline === "" ||
      SellerForm.ThoiGianMoCua === "" ||
      SellerForm.ThoiGianDongCua === "" ||
      SellerForm.NgaySinhChuSoHuu === "" ||
      SellerForm.TenChuSoHuu === "" ||
      SellerForm.CanCuoc === null ||
      SellerForm.AnhNguoiBan === null ||
      SellerForm.GiayPhep === null
    ) {
      toast.error("Please fullfill the form");
    } else {
      toast.promise(
        (async () => {
          const formSellerData = new FormData();
          formSellerData.append("MaNguoiBan", SellerForm?.MaNguoiBan);
          formSellerData.append("ThanhPho", SellerForm.ThanhPho);
          formSellerData.append("ThoiGianMoCua", SellerForm.ThoiGianMoCua);
          formSellerData.append("ThoiGianDongCua", SellerForm.ThoiGianDongCua);
          formSellerData.append("DiaChi", SellerForm.DiaChi);
          formSellerData.append("AnhNguoiBan", SellerForm.AnhNguoiBan);
          formSellerData.append("CanCuoc", SellerForm.CanCuoc);
          formSellerData.append("GiayPhep", SellerForm.GiayPhep);
          formSellerData.append("TenChuSoHuu", SellerForm.TenChuSoHuu);
          formSellerData.append("TenNguoiBan", SellerForm.TenChuSoHuu);
          formSellerData.append("QueQuanChuSoHuu", SellerForm.QueQuanChuSoHuu);
          formSellerData.append(
            "NgaySinhChuSoHuu",
            SellerForm.NgaySinhChuSoHuu
          );
          formSellerData.append("Email", SellerForm.Email);
          formSellerData.append("Hotline", SellerForm.Hotline);
          const response = await axios.post(
            "http://localhost:3030/nguoiban/add",
            formSellerData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + tokenValue.token,
              },
            }
          );
          const Token = await response.data;
          const now = new Date();
          const epxireToken = {
            token: Token.accessToken,
            expireDate: now.getTime() + 3600000,
          };
          localStorage.setItem("token", JSON.stringify(epxireToken));
          navigate("/home/seller");
        })(),
        {
          loading: "Create credentials for seller",
          success: "Success created",
          error: "Error creating credentials",
        }
      );
    }
  };
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSellerForm((prevForm) => {
        return {
          ...prevForm,
          AnhNguoiBanTemp: url,
          AnhNguoiBan: file,
        };
      });
    }
  };
  const handleCCCDChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSellerForm((prevForm) => {
        return {
          ...prevForm,
          CanCuocTemp: url,
          CanCuoc: file,
        };
      });
    }
  };
  const handleBusinesslicenseChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSellerForm((prevForm) => {
        return {
          ...prevForm,
          GiayPhepTemp: url,
          GiayPhep: file,
        };
      });
    }
  };
  console.log(SellerForm);
  return (
    <div className="p-10">
      <div className="">
        <form onSubmit={handleSubmitForm}>
          <div className="flex items-center gap-12">
            <div className="w-1/2">
              <label htmlFor="Tên chủ sở hữu" className="text-xs">
                Tên chủ sở hữu
              </label>
              <br />
              <input
                name="TenChuSoHuu"
                className="input_setup"
                type="text"
                placeholder="enter Tên chủ sở hữu"
                id="Tên chủ sở hữu"
                onChange={handleChangeForm}
              />
              <label htmlFor="Quê Quán" className="text-xs">
                Quê Quán
              </label>
              <br />
              <input
                name="QueQuanChuSoHuu"
                className="input_setup"
                type="text"
                placeholder="Enter Quê Quán"
                id="Quê Quán"
                onChange={handleChangeForm}
              />
              <br />
              <label htmlFor="Ngày Sinh" className="text-xs">
                Ngày Sinh
              </label>
              <br />
              <input
                name="NgaySinhChuSoHuu"
                className="input_setup"
                type="date"
                placeholder="Enter Ngày Sinh"
                id="Ngày Sinh"
                onChange={handleChangeForm}
              />
              <br />
              <label htmlFor="Email" className="text-xs">
                Email
              </label>
              <br />
              <input
                name="Email"
                className="input_setup"
                type="text"
                placeholder="Enter Email"
                id="Email"
                onChange={handleChangeForm}
              />
              <br />
              <label htmlFor="Hotline" className="text-xs">
                Hotline
              </label>
              <br />
              <input
                name="Hotline"
                className="input_setup"
                type="text"
                placeholder="Enter Hotline"
                id="Hotline"
                onChange={handleChangeForm}
              />
              <br />
              <label htmlFor="DiaChi" className="text-xs">
                Địa chỉ
              </label>
              <br />
              <input
                name="DiaChi"
                className="input_setup"
                type="text"
                placeholder="Enter Địa chỉ"
                id="DiaChi"
                onChange={handleChangeForm}
              />
              <br />
            </div>

            <div className="w-1/2">
              <label htmlFor="ThanhPho" className="text-xs">
                Thành Phố
              </label>
              <br />
              <select
                id="ThanhPho"
                className="w-full border border-pink-500 rounded-lg p-4 block"
                name="ThanhPho"
                onChange={handleChangeForm}
              >
                <option value="Hà Nội">Hà Nội</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Cần Thơ">Cần Thơ</option>
                <option value="Nha Trang">Nha Trang</option>
                <option value="Vinh">Vinh</option>
                <option value="Thanh Hóa">Thanh Hóa</option>
                <option value="Quảng Ninh">Quảng Ninh</option>
                <option value="Buôn Ma Thuột">Buôn Ma Thuột</option>
                <option value="Phú Quốc">Phú Quốc</option>
                <option value="Hà Tĩnh">Hà Tĩnh</option>
                <option value="Nam Định">Nam Định</option>
                <option value="Tuy Hòa">Tuy Hòa</option>
              </select>
              <br />
              <label className="text-xs">OpenTime - CloseTime</label>
              <br />
              <div className="flex items-center gap-5">
                <input
                  name="ThoiGianMoCua"
                  className="input_setup block"
                  type="time"
                  placeholder="Enter Open Time"
                  onChange={handleChangeForm}
                />

                <input
                  name="ThoiGianDongCua"
                  className="input_setup block"
                  type="time"
                  placeholder="Enter Close Time"
                  onChange={handleChangeForm}
                />
              </div>
              <br />
              <label htmlFor="AnhNguoiBan" className="text-xs">
                Ảnh cửa hàng
              </label>
              <br />
              <input
                name="AnhNguoiBan"
                className="input_setup hidden"
                type="file"
                accept="image/*"
                ref={avatarResRef}
                onChange={handleAvatarChange}
              />
              <div
                onClick={() => avatarResRef.current.click()}
                className="w-20 h-20 flex items-center text-3xl cursor-pointer text-pink-500 justify-center border border-pink-200 bg-pink-200"
              >
                {SellerForm.AnhNguoiBan === null ? (
                  <FaPlusCircle />
                ) : (
                  <img
                    src={SellerForm.AnhNguoiBanTemp}
                    alt=""
                    className="w-full h-full"
                  />
                )}
              </div>
              <br />
              <label htmlFor="CCCD" className="text-xs">
                Căn cước công dân
              </label>
              <br />
              <input
                name="CanCuoc"
                className="input_setup hidden"
                type="file"
                ref={CCCD}
                accept="image/*"
                onChange={handleCCCDChange}
              />
              <div className="flex items-center gap-2">
                <div
                  onClick={() => CCCD.current.click()}
                  className="w-20 h-20 flex items-center text-3xl cursor-pointer text-pink-500 justify-center border border-pink-200 bg-pink-200"
                >
                  {SellerForm.CanCuoc === null ? (
                    <FaPlusCircle />
                  ) : (
                    <img
                      src={SellerForm.CanCuocTemp}
                      alt=""
                      className="w-full h-full"
                    />
                  )}
                </div>
              </div>
              <br />
              <label htmlFor="GiayPhep" className="text-xs">
                Giấy phép kinh doanh
              </label>
              <br />
              <input
                name="GiayPhep"
                className="input_setup hidden"
                type="file"
                ref={Businesslicense}
                accept="image/*"
                onChange={handleBusinesslicenseChange}
              />
              <div
                onClick={() => Businesslicense.current.click()}
                className="w-20 h-20 flex items-center text-3xl cursor-pointer text-pink-500 justify-center border border-pink-200 bg-pink-200"
              >
                {SellerForm.GiayPhepTemp === null ? (
                  <FaPlusCircle />
                ) : (
                  <img
                    src={SellerForm.GiayPhepTemp}
                    alt=""
                    className="w-full h-full"
                  />
                )}
              </div>
              <br />
            </div>
          </div>
          <button
            className={` btnLoginRegister bg-gradient-to-r from-pink-500 to-pink-400 `}
          >
            Become a merchant
          </button>
        </form>
      </div>
      <div className="flex flex-col justify-end  h-full mt-5 gap-5 ">
        <div className="flex items-center gap-4">
          <FaArrowLeftLong className="text-black font-bold" />
          <Link to="/" className="text-black font-bold">
            Back to previous page
          </Link>
        </div>
      </div>
    </div>
  );
}
