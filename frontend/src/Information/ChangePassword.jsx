export default function ChangePassword() {
  return (
    <div className="p-5">
      <p className="text-2xl font-bold mb-2">Change Password</p>
      <hr />
      <form className="overflow-auto max-h-[650px] mt-5">
        <label htmlFor="oldPassword" className="text-md font-bold mb-2 block">
          Old password
        </label>
        <input
          id="oldPassword"
          type="text"
          placeholder="Retype your old password"
          className="border border-black block w-1/2 p-3 mb-10 rounded-xl"
        />
        <label htmlFor="newPassword" className="text-md font-bold mb-2 block">
          New password
        </label>
        <input
          id="newPassword"
          type="text"
          className="border border-black block w-1/2 p-3 mb-10 rounded-xl"
        />
        <label
          htmlFor="confirmPassword"
          className="text-md font-bold mb-2 block"
        >
          confirm password
        </label>
        <input
          id="confirmPassword"
          type="text"
          className="border border-black block w-1/2 p-3 mb-10 rounded-xl"
        />
        <button className="bg-pink-500 text-white font-bold p-3 w-1/2 rounded-2xl shadow-lg hover:bg-pink-700 transition-all duration-150 ease-in">
          Change password
        </button>
      </form>
    </div>
  );
}
