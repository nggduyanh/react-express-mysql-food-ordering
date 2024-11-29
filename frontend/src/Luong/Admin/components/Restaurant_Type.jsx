import { useContext, useEffect, useState } from "react";
import { FaMinusCircle } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { AdminContext } from "../Layout/AdminLayoutContext";
import axios from "axios";
import {
  AddSellerType,
  DeleteSellerType,
  getSellerType,
  GetSellerTypeId,
  refreshPage,
  UpdateSellerType,
} from "../../../Route";
import toast from "react-hot-toast";
export default function RestaurantType() {
  const { token } = useContext(AdminContext);
  const [listType, setListType] = useState([]);
  const [resType, setResType] = useState({
    TenLoaiNguoiBan: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentType, setCurrentType] = useState({});
  const [isClose, setIsClose] = useState(true);
  useEffect(() => {
    const getListSellerType = async () => {
      const response = await axios.get(getSellerType, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      setListType(data);
    };
    getListSellerType();
  }, [token]);
  const getCurrentIdSellerType = async (id) => {
    const response = await axios.get(GetSellerTypeId + `${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = response.data;
    setCurrentType(data[0]);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setResType((prevType) => {
      return {
        ...prevType,
        [name]: value,
      };
    });
  };
  const handleAdd = () => {
    if (resType.TenLoaiNguoiBan === "") {
      toast.error("Please enter new seller type");
    } else {
      toast.promise(
        (async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const response = await axios.post(AddSellerType, resType, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          console.log(response);
          if (response.status === 201) {
            refreshPage();
          }
        })(),
        {
          loading: "Adding seller type...",
          success: "Adding success",
          error: "Error adding",
        }
      );
    }
  };
  const handleUpdate = () => {
    if (resType.TenLoaiNguoiBan === currentType.TenLoaiNguoiBan) {
      toast.error("Your value doens't changed");
    } else {
      toast.promise(
        (async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const response = await axios.patch(
            UpdateSellerType,
            {
              MaLoaiNguoiBan: currentType?.MaLoaiNguoiBan,
              TenLoaiNguoiBan: resType.TenLoaiNguoiBan,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          if (response.status === 201) {
            refreshPage();
          }
        })(),
        {
          loading: "Update...",
          success: "Update success",
          error: "Update error",
        }
      );
    }
  };
  const handleDelete = async (id) => {
    toast.promise(
      (async () => {
        const response = await axios.delete(DeleteSellerType, {
          data: {
            MaLoaiNguoiBan: id,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (response.status === 204) {
          refreshPage();
        }
      })(),
      {
        loading: "Delete...",
        success: "Delete success",
        error: "Delete error",
      }
    );
  };
  useEffect(() => {
    if (currentType) {
      setResType((prevType) => {
        return {
          ...prevType,
          TenLoaiNguoiBan: currentType?.TenLoaiNguoiBan || "",
        };
      });
    } else {
      setResType((prevType) => {
        return {
          ...prevType,
          TenLoaiNguoiBan: "",
        };
      });
    }
  }, [token, currentType]);
  return (
    <div>
      <p className="text-2xl font-bold ">List of restaurant types: </p>
      <br />
      <div className="flex items-center gap-4 flex-wrap ">
        {listType.map((type) => {
          return (
            <div
              key={type.MaLoaiNguoiBan}
              className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-xl gap-3"
            >
              <GrUpdate
                onClick={() => {
                  setIsUpdate(true);
                  getCurrentIdSellerType(type.MaLoaiNguoiBan);
                }}
                className="cursor-pointer"
              />
              <p className="">{type.TenLoaiNguoiBan}</p>
              <FaMinusCircle
                onClick={() => {
                  setIsClose(false);
                  getCurrentIdSellerType(type.MaLoaiNguoiBan);
                }}
                className="cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      {!isClose && (
        <div className="fixed top-1/2 -translate-y-1/2 left-1/2 text-center -translate-x-1/2 w-1/4 h-1/6 bg-white rounded-lg border border-blue-500">
          <p className="mt-3 text-md p-2">
            Are you sure you want to delete your seller type?
          </p>
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={() => handleDelete(currentType?.MaLoaiNguoiBan)}
              className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold"
            >
              Yes
            </button>
            <button
              onClick={() => setIsClose(true)}
              className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <br />
      <div>
        <input
          type="text"
          name="TenLoaiNguoiBan"
          value={resType.TenLoaiNguoiBan}
          onChange={handleChange}
          placeholder="Enter your restaurant type"
          className="border border-blue-500 w-full rounded-lg p-3"
        />
        <div className="flex items-center justify-end">
          {!isUpdate ? (
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white py-2 rounded-xl mt-4 px-4"
            >
              Add
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white py-2 rounded-xl mt-4 px-4"
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
