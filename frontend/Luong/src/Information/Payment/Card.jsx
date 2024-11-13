import { useState } from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
export default function Cash() {
  const [CardInfo, setCardInfo] = useState({
    cardNumber: "",
    ValidDay: "",
    CVV: 0,
    NameCard: "",
  });
  const handleInputCardInfo = (event) => {
    const { name, value } = event.target;
    setCardInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  };
  const submitCardInfo = (event) => {
    event.preventDefault();
    console.log(CardInfo);
  };
  return (
    <div>
      <div>
        <div className="cashInfo p-5 border border-gray-300 mt-2 rounded-md ">
          <div className="flex items-center justify-between border border-white border-b-gray-400 py-3">
            <p className="text-lg ">Add Credit/Debit Card</p>
            <div className="flex items-center text-2xl gap-3">
              <FaCcMastercard className="text-red-500" />{" "}
              <FaCcVisa className="text-blue-500" />
            </div>
          </div>
          <br />
          <div className="infoCard">
            <p>Add new card</p>
            <p className="text-xs text-gray-500">
              WE ACCEPT ( Master Card / Visa Card / Rupay )
            </p>
          </div>
          <br />
          <div className="inputCard">
            <form action="" onSubmit={submitCardInfo}>
              <div className="Card_Number">
                <label htmlFor="Card_Number" className="text-xs">
                  Card Number
                </label>
                <br />
                <div className="flex items-center gap-1">
                  <input
                    id="Card_Number"
                    className="w-full p-3 border border-gray-400 rounded-s-lg"
                    type="number"
                    placeholder="Card Number"
                    name="CardNumber"
                    value={CardInfo.cardNumber}
                    onChange={handleInputCardInfo}
                  />
                  <div className="rounded-e-lg border block border-gray-400 py-2 px-3 hover:bg-gray-400 hover:text-white transition-all ease-in duration-300">
                    <CiCreditCard1 className="text-3xl " />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 gap-1">
                <div className="Valid_Dates w-2/3">
                  <label htmlFor="validDates" className="text-xs">
                    Valid through
                  </label>
                  <input
                    id="validDates"
                    type="text"
                    placeholder="Enter your age"
                    className="w-full p-3 border border-gray-400 rounded-s-lg"
                    onChange={handleInputCardInfo}
                    name="ValidDay"
                    value={CardInfo.ValidDay}
                  />
                </div>
                <div className="CVV w-1/3">
                  <label htmlFor="CVV" className="text-xs">
                    CVV number
                  </label>
                  <input
                    id="CVV"
                    type="number"
                    placeholder="Enter CVV number"
                    className="w-full p-3 border border-gray-400 rounded-e-lg"
                    onChange={handleInputCardInfo}
                    name="CVV"
                    value={CardInfo.CVV}
                  />
                </div>
              </div>
              <div className="Name_Card">
                <label htmlFor="Name_Card" className="text-xs">
                  Name on Card
                </label>
                <input
                  id="Name_Card"
                  type="text"
                  placeholder="Enter Card Number"
                  name="NameCard"
                  value={CardInfo.NameCard}
                  onChange={handleInputCardInfo}
                  className="w-full p-3 border border-gray-400 rounded-md"
                />
              </div>
              <div className="flex items-center justify-end">
                <button className="bg-red-500 p-2 mt-2 rounded-lg text-white font-bold hover:bg-red-700 transition-all ease-in duration-200">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
