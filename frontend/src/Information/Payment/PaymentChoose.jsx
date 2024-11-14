import { GrNext, GrDown } from "react-icons/gr";
import Toggle from "../../Function/Toggle/LayoutToggle";
export default function PaymentChoose({ children, name }) {
  return (
    <Toggle>
      <Toggle.Button className="cursor-pointer border w-full border-gray-500 font-bold text-2xl rounded-lg p-2 flex items-center justify-between">
        <p>{name}</p>
        <div>
          <Toggle.Off>
            <GrNext />
          </Toggle.Off>
          <Toggle.On>
            <GrDown />
          </Toggle.On>
        </div>
      </Toggle.Button>
      <div className="">
        <Toggle.On>{children}</Toggle.On>
      </div>
    </Toggle>
  );
}
