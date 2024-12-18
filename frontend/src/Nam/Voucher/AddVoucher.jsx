import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../Components/SideBar";
// import { UserAccount } from "../App";
import { vi } from "date-fns/locale";
import {
  AddVoucher,
  getFormattedDate,
  GetUserInfo,
  handleRefreshPage,
} from "../../routebackend";
import axios from "axios";
import NavBar from "../Components/NavBar";
import useFetchData from "../Components/useFetchData";
import toast from "react-hot-toast";
import { GetSellerInfo } from "../../Route";

export default function VoucherAdd() {
  const tokenStorage = localStorage.getItem("token");
  const tokenValue = JSON.parse(tokenStorage).token;
  let [userData] = useFetchData(GetUserInfo, tokenValue);
  const userInfo = userData?.data?.[0];
  const navigate = useNavigate();
  const [Seller, getSeller] = useState([]);
  useEffect(() => {
    fetch(GetSellerInfo, {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        getSeller(data);
      });
  }, []);

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [selectedDateTimeStart, setSelectedDateTimeStart] = useState(null);
  const [selectedDateTimeEnd, setSelectedDateTimeEnd] = useState(null);
  // Handler for date change
  const handleDateChangeStart = (date) => {
    setSelectedDateTimeStart(date);
    setVoucher((prevVoucher) => ({
      ...prevVoucher,
      NgayTao: getFormattedDate(date),
    }));
  };
  const handleDateChangeEnd = (date) => {
    setSelectedDateTimeEnd(date);
    setVoucher((prevVoucher) => ({
      ...prevVoucher,
      NgayHetHan: getFormattedDate(date),
    }));
  };

  const [voucher, setVoucher] = useState({
    TenKhuyenMai: "",
    PhanTram: null,
    GiaTri: null,
    MaNguoiBan: null,
    SoLuong: "",
    NgayTao: null,
    NgayHetHan: null,
  });

  useEffect(() => {
    if (Seller && Seller[0]?.MaNguoiBan) {
      setVoucher((prevVoucher) => ({
        ...prevVoucher,
        MaNguoiBan: Seller[0].MaNguoiBan, // Cập nhật MaNguoiBan khi Seller có giá trị
      }));
    }
  }, [Seller]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVoucher((prevForm) => {
      return {
        ...prevForm,
        [name]:
          name === "GiaTri" || name === "soluong" || name === "PhanTram"
            ? parseInt(value)
            : value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(voucher);
    if (
      voucher.TenKhuyenMai === "" ||
      (voucher.GiaTri === null && voucher.PhanTram === null) ||
      voucher.SoLuong === "" ||
      voucher.NgayTao === "" ||
      voucher.NgayHetHan === ""
    ) {
      toast.error("Please fullfill voucher");
    } else {
      toast.promise(
        (async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const response = await axios.post(
            AddVoucher,
            JSON.stringify(voucher),
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenValue}`,
              },
              withCredentials: true,
            }
          );
          return response;
        })(),
        {
          loading: "Adding voucher...",
          success: (response) => {
            navigate("/voucher");
            return "Voucher added successfully";
          },
          error: "Error adding voucher",
        }
      );
    }
    // try {
    // const response = await axios.post(AddVoucher, JSON.stringify(voucher), {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${tokenValue}`,
    //   },
    //   withCredentials: true,
    //   });
    //   alert("Add sucesss");
    //   handleRefreshPage();
    // } catch (err) {
    //   console.error("Error adding voucher:", err);
    // }
  };
  return (
    <div className="h-screen w-screen">
      <div className="flex h-full">
        <SideBar />
        <div className="flex-1 mt-0">
          <NavBar />
          <section className="p-6">
            <h1 className="text-xl font-medium mb-6">Add Voucher</h1>
            <Link to="/voucher">
              <h3>Back to list</h3>
            </Link>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3">
                <div className="border border-default-200 p-6 rounded-lg grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <h5 className="mb-2">Ten Khuyen Mai</h5>
                    <input
                      type="text"
                      name="TenKhuyenMai"
                      onChange={handleChange}
                      placeholder="Product Name"
                      className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6"
                    />
                    <h5 className="mb-2">Loai Khuyen Mai</h5>
                    <select
                      name=""
                      onChange={handleSelectChange}
                      id=""
                      className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6"
                    >
                      <option value="" hidden>
                        Choose category
                      </option>
                      <option value="PhanTram">Theo phan tram</option>
                      <option value="Gia">Theo gia</option>
                    </select>

                    {selectedOption === "PhanTram" && (
                      <div>
                        <h5 className="mb-2">Phan tram</h5>
                        <input
                          type="text"
                          name="PhanTram"
                          onChange={handleChange}
                          placeholder="Enter percentage"
                          className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6"
                        />
                      </div>
                    )}
                    {selectedOption === "Gia" && (
                      <div>
                        <h5 className="mb-2">Gia tri</h5>
                        <input
                          type="text"
                          name="GiaTri"
                          onChange={handleChange}
                          placeholder="Enter price"
                          className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex mb-6 gap-6">
                      <div className=" h-auto">
                        <h5 className="mb-2">Ngay Bat Dau</h5>
                        <DatePicker
                          placeholderText="Select date and time"
                          dateFormat="Pp"
                          showTimeSelect
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                          selected={selectedDateTimeStart}
                          onChange={handleDateChangeStart}
                          locale={vi}
                        ></DatePicker>
                      </div>
                      <div className=" h-auto">
                        <h5 className="mb-2">Ngay Ket Thuc</h5>
                        <DatePicker
                          placeholderText="Select date and time"
                          dateFormat="Pp"
                          showTimeSelect
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                          selected={selectedDateTimeEnd}
                          onChange={handleDateChangeEnd}
                          locale={vi}
                        ></DatePicker>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h5 className="mb-2">So Luong</h5>
                        <input
                          type="text"
                          name="SoLuong"
                          onChange={handleChange}
                          placeholder="Selling Price"
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="px-4 py-2 text-[#EF4444] font-medium flex gap-2 items-center justify-center text-center bg-red-500/10 rounded-lg ml-auto">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path>
                      <path d="M22 21H7"></path>
                      <path d="m5 11 9 9"></path>
                    </svg>
                    Clear
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-white font-medium flex gap-2 items-center justify-center text-center bg-[#F97316] rounded-lg"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
