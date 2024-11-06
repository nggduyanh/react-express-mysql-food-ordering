import { MdOutlinePassword } from "react-icons/md";

export default function CreateNewPass() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="border mb-3 border-white p-3 rounded-lg bg-pink-200">
          <MdOutlinePassword className="text-4xl text-pink-500" />
        </div>
        <p className="text-4xl font-bold">Create a new password!</p>
      </div>
      <div className="text-center mt-4">
        <p>Please choose a password that has not been used before </p>
        <p className="text-pink-500 font-bold mb-3">
          Must be at least 8 characters
        </p>
        <div>
          <input
            type="text"
            name="setupNewPassword"
            placeholder="setup new password"
            className="block border border-gray-400 w-full mb-3 p-3 rounded-lg"
          />
          <input
            type="text"
            name="confirmNewPassword"
            placeholder="confirm new password"
            className="block border border-gray-400 w-full mb-3 p-3 rounded-lg"
          />
        </div>
        <button className="mt-3 inline-block w-full bg-pink-500 p-3 rounded-lg text-white font-bold hover:bg-pink-700 transition-all duration-200 ease-in">
          Reset password
        </button>
      </div>
    </div>
  );
}
