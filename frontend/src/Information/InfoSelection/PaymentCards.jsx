import Cash from "../Payment/Cash";
import Card from "../Payment/Card";
import Ewallet from "../Payment/Ewallet";
import PaymentChoose from "../Payment/PaymentChoose";
export default function PaymentCards() {
  return (
    <div className="p-5">
      <p className="text-2xl font-bold">Payment</p>
      <br />
      <div className="overflow-auto max-h-[660px]">
        <div className="mb-3">
          <PaymentChoose name="Cash">
            <Cash />
          </PaymentChoose>
        </div>
        <div className="mb-3">
          <PaymentChoose name="Card">
            <Card />
          </PaymentChoose>
        </div>
        <div className="mb-3">
          <PaymentChoose name="Ewallet">
            <Ewallet />
          </PaymentChoose>
        </div>
      </div>
    </div>
  );
}
