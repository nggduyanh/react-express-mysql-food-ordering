import React, { useState } from "react";

export default function PersonalDetails(props) {
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
        Personal Details
      </h4>
      <div className="grid grid-cols-5 gap-6">
        <div className="flex flex-col items-center mt-4">
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
            <div>
              <h5 className="mb-2">First Name</h5>
              <input
                type="text"
                placeholder={props.TenChuSoHuu}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
            <div>
              <h5 className="mb-2">Last Name</h5>
              <input
                type="text"
                placeholder={props.TenChuSoHuu}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>

            <div>
              <h5 className="mb-2">Ngày sinh</h5>
              <input
                type="text"
                placeholder={props.NgaySinh}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
            <div>
              <h5 className="mb-2">Quê quán</h5>
              <input
                type="text"
                placeholder={props.QueQuan}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
            <div>
              <h5 className="mb-2">Phone Number</h5>
              <input
                type="text"
                placeholder={props.SDT}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>
            <div>
              <h5 className="mb-2">Email</h5>
              <input
                type="text"
                placeholder={props.Email}
                className="border border-default-200 py-3 px-4 rounded-lg w-full"
              />
            </div>

            <button className="col-span-2 px-4 py-2 text-white font-medium flex gap-2 items-center justify-center text-center bg-[#F97316] rounded-lg w-auto ml-auto">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
