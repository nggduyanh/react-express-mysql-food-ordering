import { useEffect, useState } from "react";
import { City, Ward, District, refreshPage } from "../../Route";
import toast from "react-hot-toast";

export default function Address() {
  const [userAddressInfor, setuserAddressInfor] = useState({
    address: "",
    Ward: "",
    District: "",
    City: "",
  });
  const handleChangeAddres = (event) => {
    const { name, value } = event.target;
    setuserAddressInfor((prevAddres) => {
      const newAddress = {
        ...prevAddres,
        [name]: value,
      };
      if (name === "City") {
        newAddress.District = "";
        newAddress.Ward = "";
      }
      return newAddress;
    });
  };
  const listCity = City.map((items) => {
    return (
      <option key={items} value={items}>
        {items}
      </option>
    );
  });
  const listDistrict = userAddressInfor.City
    ? District[userAddressInfor.City]?.map((district) => (
        <option key={district} value={district}>
          {district}
        </option>
      ))
    : [];
  const listWard = userAddressInfor.City
    ? Ward[userAddressInfor.City]?.map((ward) => (
        <option key={ward} value={ward}>
          {ward}
        </option>
      ))
    : [];
  const handleSubmitAddress = (event) => {
    event.preventDefault();
    if (
      userAddressInfor.City === "" ||
      userAddressInfor.District === "" ||
      userAddressInfor.Ward === "" ||
      userAddressInfor.address === ""
    ) {
      toast.error("Please enter your address fullfilled please");
    } else {
      const address =
        userAddressInfor.address +
        "," +
        userAddressInfor.Ward +
        "," +
        userAddressInfor.District +
        "," +
        userAddressInfor.City;
      const addressSessions = {
        expired: 3600000,
        address: address,
      };
      sessionStorage.setItem("userAddress", JSON.stringify(addressSessions));
      refreshPage();
    }
  };
  const [isAddress, setIsAddress] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("userAddress")) setIsAddress(true);
    else setIsAddress(false);
  }, []);
  return (
    <div className="p-5">
      <p className="text-2xl font-bold">Update address</p>
      <br />
      <form action="" onSubmit={handleSubmitAddress}>
        <div className="address w-11/12 mb-10">
          <label htmlFor="address" className="text-xl mb-2 block">
            Enter address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            disabled={!isAddress ? false : true}
            placeholder={
              !isAddress
                ? "Please enter another address"
                : `You have already added this address: ${
                    JSON.parse(sessionStorage.getItem("userAddress")).address
                  }`
            }
            onChange={handleChangeAddres}
            className="block w-full border border-pink-500 p-2 rounded-xl"
          />
        </div>
        <div className="optionForChoosingAddressInfor mb-10 flex items-center gap-5">
          <select
            name="Ward"
            onChange={handleChangeAddres}
            id=""
            disabled={userAddressInfor.City.trim().length !== 0 ? false : true}
            className="block border border-pink-500 p-2 rounded-xl"
          >
            <option value="" hidden>
              Select Ward
            </option>
            {listWard}
          </select>
          <select
            name="District"
            onChange={handleChangeAddres}
            id=""
            disabled={userAddressInfor.City.trim().length !== 0 ? false : true}
            className="block border border-pink-500 p-2 rounded-xl"
          >
            <option value="" hidden>
              Select District
            </option>
            {listDistrict}
          </select>
          <select
            name="City"
            onChange={handleChangeAddres}
            id=""
            disabled={!isAddress ? false : true}
            placeholder={
              !isAddress
                ? "Please enter another address"
                : "You have already added this address"
            }
            className="block border border-pink-500 p-2 rounded-xl "
          >
            <option value="" hidden>
              Select City
            </option>
            {listCity}
          </select>
        </div>
        <div className="address w-11/12 mb-10">
          <label htmlFor="final">Final address</label>
          <input
            type="text"
            name="final"
            id="final"
            value={`Address: ${userAddressInfor.address}, Ward: ${userAddressInfor.Ward}, District: ${userAddressInfor.District}, City: ${userAddressInfor.City}`}
            disabled
            className="block w-full border border-pink-500 p-2 rounded-xl"
          />
        </div>
        <div className="w-11/12 flex items-center justify-end">
          <button
            disabled={!isAddress ? false : true}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg min-w-40 hover:bg-red-700 transition-all ease-in"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
