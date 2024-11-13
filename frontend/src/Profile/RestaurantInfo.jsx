import { useState } from "react";

export default function RestaurantInfo(props) {
    const [srcimg, setSrcImg] = useState(null);
    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === "file" && files[0]) {
          const file = files[0];
          setSrcImg(URL.createObjectURL(file));
          setUser((prevForm) => ({
            ...prevForm,
            [name]: file, // Lưu tệp ảnh vào trạng thái của dish
          }));
        } else {
          setUser((prevForm) => {
            return {
              ...prevForm,
              [name]: value,
            };
          });
        }
      };

    return (
        <div className="border border-default-200 p-6 rounded-lg">
                <h4 class="mb-4 text-xl font-medium text-default-900">
                  Restaurant
                </h4>
                <div className="grid grid-cols-5 gap-6">
                  <div className="flex flex-col items-center  mt-4">
                    <div className="relative h-40 w-40 flex flex-col items-center justify-center">
                      <input
                        type="file"
                        accept=".jpeg,.jpg,.png,.gif,.svg"
                        name="bgfile"
                        id="bgfile"
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
                  <div className="col-span-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className=" col-span-2">
                        <h5 className="mb-2">Restaurant Name</h5>
                        <input
                          type="text"
                          name="TenNguoiBan"
                          onChange={handleChange}
                          placeholder={props.TenCuaHang}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">Hotline</h5>
                        <input
                          type="text"
                          name="SoDienThoai"
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
                          name="ThanhPho"
                          onChange={handleChange}
                          type="text"
                          placeholder={props.MoCua}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <div>
                        <h5 className="mb-2">Thời gian đóng cửa</h5>
                        <input
                          name="ThanhPho"
                          onChange={handleChange}
                          type="text"
                          placeholder={props.DongCua}
                          className="border border-default-200 py-3 px-4 rounded-lg w-full"
                        />
                      </div>
                      <button
                        // onClick={handleSubmit}
                        className="col-span-2 px-4 py-2 text-white font-medium flex gap-2 items-center justify-center text-center bg-[#F97316] rounded-lg w-auto ml-auto"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
    )
}