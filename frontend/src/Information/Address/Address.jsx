import GridDiv from "../../Function/GridDiv";
import SpecificAddres from "./SpecificAddress";

export default function Address() {
  return (
    <div className="p-5">
      <p className="text-2xl font-bold">Update address</p>
      <br />
      <div className="grid grid-cols-4 ">
        <p className="font-bold text-xl border border-white border-r-gray-400 pl-2">
          memoric-name
        </p>
        <p className="font-bold text-xl border border-white border-r-gray-400 pl-2">
          Address
        </p>
        <p className="font-bold text-xl border border-white border-r-gray-400 pl-2">
          PhoneNumber
        </p>
      </div>
      <br />
      <div className=" ">
        <SpecificAddres />
        <SpecificAddres />
        <SpecificAddres />
        <SpecificAddres />
      </div>
      <div className="mt-20 flex justify-end">
        <button className="p-2 bg-red-500 text-white font-bold rounded-lg">
          Add address
        </button>
      </div>
    </div>
  );
}
