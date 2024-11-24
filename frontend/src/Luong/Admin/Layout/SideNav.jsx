import { GrUserAdmin } from "react-icons/gr";
import { NavLink, Outlet } from "react-router-dom";
export default function SideNav() {
  return (
    <div className="flex items-center">
      <div className="mr-64">
        <div className="fixed top-0 left-0 bg-gray-700 w-60 h-full text-white flex flex-col p-3">
          <div className="flex items-center justify-center my-2 text-3xl font-bold gap-2">
            <GrUserAdmin />
            <p>Admin</p>
          </div>
          <div className="flex flex-col items-center flex-grow mt-16">
            <div className="flex flex-col items-center gap-10 text-md text-center font-bold">
              <NavLink to="/admin_home">Dashboard</NavLink>
              <NavLink to="/restaurant_type">Restaurant Type</NavLink>
              <NavLink to="/aaa">Deliver Management</NavLink>
              <NavLink to="/qqq">Content and feedback</NavLink>
              <NavLink to="/asd">System and Security Management</NavLink>
            </div>
          </div>
          <div className="mt-auto mb-4 text-center">
            <button className="px-4 py-2 bg-blue-500 w-full  hover:bg-blue-700 transition-all duration-200 ease-in rounded">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        <Outlet />
      </div>
    </div>
  );
}
