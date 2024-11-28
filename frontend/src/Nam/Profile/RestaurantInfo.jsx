import axios from "axios";
import { useEffect, useState } from "react";
import useFetchData from "../Components/useFetchData";
import { GetUserInfo, handleRefreshPage, UpdateUser } from "../../routebackend";
import toast from "react-hot-toast";
import { refreshPage, GetSellerInfo, DeleteSeller } from "../../Route";
import { useNavigate } from "react-router-dom";

export default function RestaurantInfo(props) {
  const tokenStorage = localStorage.getItem("token");
  const tokenValue = JSON.parse(tokenStorage).token;
  let [userData] = useFetchData(GetUserInfo, tokenValue);
  const [isClose, setIsClose] = useState(false);
  const userInfo = userData?.data?.[0];
  const navigate = useNavigate();
  const [Seller, setSeller] = useState({
    MaNguoiBan: props?.MaNguoiBan,
  });
  useEffect(() => {
    const getSellerIdCurrent = async () => {
      const response = await axios.get(GetSellerInfo, {
        headers: {
          Authorization: "Bearer " + tokenValue,
        },
      });
      const data = response.data;
      setSeller({
        MaNguoiBan: data[0].MaNguoiBan,
      });
    };
    getSellerIdCurrent();
  }, [tokenValue]);
  const [srcimg, setSrcImg] = useState(null);
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file" && files[0]) {
      const file = files[0];
      setSrcImg(URL.createObjectURL(file));
      setSeller((prevForm) => ({
        ...prevForm,
        [name]: file, // Lưu tệp ảnh vào trạng thái của dish
      }));
    } else {
      setSeller((prevForm) => {
        return {
          ...prevForm,
          [name]: value,
        };
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Submit", Seller);
      const res = await axios.patch(UpdateUser, Seller, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenValue}`,
        },
        withCredentials: true,
      });
      if (res.status === 201) {
        alert("Update successful");
        handleRefreshPage();
      } else {
        console.error("Failed to update profile. Status:", res.status);
        alert("Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.error("Error adding profile:", err);
    }
  };
  const deleteAccount = async () => {
    // console.log(Seller?.MaNguoiBan);
    toast.promise(
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.delete(DeleteSeller, {
          data: {
            MaNguoiBan: Seller?.MaNguoiBan,
          },
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        });
        if (response.status === 200 || response.status === 201) {
          refreshPage();
          navigate("/loginSeller");
        }
      })(),
      {
        loading: "Delete account..",
        success: "Delete succes",
        error: "Error deleting",
      }
    );
  };
  return (
    <div className="border border-default-200 p-6 rounded-lg">
      <h4 className="mb-4 text-xl font-medium text-default-900">Restaurant</h4>
      <div className="grid grid-cols-5 gap-6">
        <div>
          <h5 className="mb-2">Restaurant's Logo</h5>
          <div className="flex flex-col items-center  mt-4">
            <div className="relative h-40 w-40 flex flex-col items-center justify-center">
              <input
                type="file"
                accept=".jpeg,.jpg,.png,.gif,.svg"
                name="AnhNguoiBan"
                // id="bgfile"
                onChange={handleChange}
                className="relative z-10 opacity-0 w-full h-full rounded-full"
              />
              <div className=" absolute bg-[#FFF0E9] border-[#F97316] border-2 border-dashed rounded-full h-40 w-40 flex items-center justify-center">
                <p>Add photo</p>
              </div>
              <img
                src={srcimg}
                alt=""
                className="absolute h-full w-full rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <h5 className="mb-2">Chủ sở hữu</h5>
              <input
                type="text"
                placeholder={props.TenChuSoHuu}
                name="TenChuSoHuu"
                onChange={handleChange}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
            <div>
              <h5 className="mb-2">Ngày mở quán</h5>
              <input
                type="date"
                name="NgaySinhChuSoHuu"
                onChange={handleChange}
                placeholder={props.NgaySinh}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
            <div>
              <h5 className="mb-2">Quê quán</h5>
              <input
                type="text"
                name="QueQuanChuSoHuu"
                onChange={handleChange}
                placeholder={props.QueQuan}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
            <div className=" col-span-2">
              <h5 className="mb-2">Restaurant Name</h5>
              <input
                type="text"
                name="TenNguoiBan"
                onChange={handleChange}
                placeholder={props.TenNguoiBan}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>

            <div>
              <h5 className="mb-2">Hotline</h5>
              <input
                type="text"
                name="Hotline"
                onChange={handleChange}
                placeholder={props.Hotline}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
            <div>
              <h5 className="mb-2">Email</h5>
              <input
                type="text"
                name="Email"
                onChange={handleChange}
                placeholder={props.Email}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
            <div>
              <h5 className="mb-2">Address</h5>
              <input
                type="text"
                name="DiaChi"
                onChange={handleChange}
                placeholder={props.Address}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
            <div>
              <h5 className="mb-2">City</h5>
              <input
                name="ThanhPho"
                onChange={handleChange}
                type="text"
                placeholder={props.City}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
            <div>
              <h5 className="mb-2">Thời gian mở cửa</h5>
              <input
                name="ThoiGianMoCua"
                onChange={handleChange}
                type="time"
                placeholder={props.MoCua}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
            <div>
              <h5 className="mb-2">Thời gian đóng cửa</h5>
              <input
                name="ThoiGianDongCua"
                onChange={handleChange}
                type="time"
                placeholder={props.DongCua}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
          </div>
          {isClose && (
            <div className="fixed top-1/2 -translate-y-1/2 left-1/2 text-center -translate-x-1/2 w-1/4 h-1/6 bg-white rounded-lg border border-orange-500">
              <p className="mt-3 text-md p-2">
                Are you sure you want to delete your type food?
              </p>
              <div className="flex items-center justify-center gap-5">
                <button
                  onClick={deleteAccount}
                  className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold"
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsClose(false)}
                  className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={() => setIsClose(true)}
              className=" px-4 py-2 text-white font-medium    text-center bg-red-500 rounded-lg  "
            >
              Delete account
            </button>
            <button
              onClick={handleSubmit}
              className=" px-4 py-2 text-white font-medium    text-center bg-[#F97316] rounded-lg  "
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
