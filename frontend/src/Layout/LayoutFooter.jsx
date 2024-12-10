import imageFood from "../assets/orderfood1.png";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
export default function LayoutFooter() {
  return (
    <div className="bg-black text-white">
      <footer className="marginJustification py-24">
        <div className="flex justify-between items-center  ">
          <div className="flex items-center w-2/5">
            <img src={imageFood} alt="" className="w-20 h-w-20" />
            <div>
              <p className=" text-sm font-bold">About us</p>
              <div className="">
                <p className="text-md">
                  Some short text about company like You might remember the Dell
                  computer commercials in which a youth reports.
                </p>
                <br />
                <div className="flex items-center gap-4">
                  <FaFacebook />
                  <FaInstagram />
                  <FaTwitter />
                  <FaYoutube />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold ">Error Page</p>
            <p>Not found</p>
            <p>Maintence</p>
            <p>Coming Soon</p>
          </div>
          <div>
            <p className="text-sm font-bold ">Service</p>
            <p>Delivery Support</p>
            <p>Contact Us</p>
            <p>Terms of use</p>
            <p>Privacy policy</p>
          </div>
          <div>
            <p className="text-sm font-bold ">For Users</p>
            <p>User Login</p>
            <p>User register</p>
            <p>Forgot Password</p>
            <p>Account Setting</p>
          </div>
          <div>
            <p className="text-sm font-bold ">More pages</p>
            <p>Trending</p>
            <p>Most popular</p>
            <p>Restaurant Details</p>
            <p>Favorites</p>
          </div>
        </div>
        <br />
        <div className="mx-6">
          <p className="text-2xl mb-4">Countries</p>
          <div className="grid grid-cols-6 gap-3">
            <div className="text-gray-400 ">
              <p>India</p>
              <p>Indonesia</p>
              <p>Ireland</p>
              <p>Italy</p>
              <p>Lebnanon</p>
            </div>
            <div className="text-gray-400 ">
              <p>Malaysia</p>
              <p>New Zealand</p>
              <p>Philippines</p>
              <p>Poland</p>
              <p>Portugal</p>
            </div>
            <div className="text-gray-400 ">
              <p>Australia</p>
              <p>Brasil</p>
              <p>Canada</p>
              <p>Chile</p>
              <p>Czech Republic</p>
            </div>
            <div className="text-gray-400 ">
              <p>Turkey</p>
              <p>UAE</p>
              <p>United Kingdom</p>
              <p>United States</p>
              <p>Sri Lanka</p>
            </div>
            <div className="text-gray-400 ">
              <p>Qatar</p>
              <p>Singapore</p>
              <p>Slovakia</p>
              <p>South Africa</p>
              <p>Green Land</p>
            </div>
            <div className="text-gray-400 ">
              <p>Pakistan</p>
              <p>Bangladesh</p>
              <p>Bhutaan</p>
              <p>Nepal</p>
              <p>VietNam</p>
            </div>
          </div>
          <br />
          <div className="download flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/appstore.png" alt="" className="w-28 h-w-28" />
              <img src="/playmarket.png" alt="" className="w-28 h-w-28" />
            </div>
            <div className="copyright">
              <p className="text-gray-500">© Project created by Group6</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
