import { useLocation } from "react-router-dom";
import ResInfo from "./InfoRes/ResInfo";
import GridDiv from "../Function/GridDiv";
export default function ListRes() {
  const value = useLocation();
  const listFood = value.state.map((items) => {
    return (
      <ResInfo {...items} key={items.id}>
        <p className="text-xl font-bold">{items.title} </p>
        <i>{items.category}</i>
        <p className="text-md text-gray-500">Open - Close: 12:00am - 23:00pm</p>
      </ResInfo>
    );
  });
  return (
    <div className="marginJustification">
      <p className="text-2xl font-bold my-4">Good food near you</p>
      <GridDiv cols={4} classname="listFood ">
        {listFood}
      </GridDiv>
    </div>
  );
}
