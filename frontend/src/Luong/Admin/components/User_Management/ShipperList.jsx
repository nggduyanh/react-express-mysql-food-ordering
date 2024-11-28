import { useOutletContext } from "react-router-dom";
import CountLayout from "../Function/CountLayout";
import ArrayGetList from "../Function/ArrayGetList";
import PrevCount from "../Function/PrevCount";
import NextCount from "../Function/NextCount";
import { useState } from "react";
export default function ShipperList() {
  const { listShipper, search } = useOutletContext();
  const [rows, setRows] = useState(5);
  return (
    <>
      <CountLayout rows={rows}>
        <ArrayGetList array={listShipper} filter={search} />
        <div className="flex items-center justify-end mt-3 gap-2">
          <p>Rows per page: {rows}</p>
          <div className="flex items-center gap-4">
            <PrevCount />
            <NextCount array={listShipper} />
          </div>
        </div>
      </CountLayout>
    </>
  );
}
