import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import CountLayout from "../Function/CountLayout";
import PrevCount from "../Function/PrevCount";
import NextCount from "../Function/NextCount";
import ArrayGetList from "../Function/ArrayGetList";
export default function CustomerList() {
  const { listUser } = useOutletContext();
  const [rows, setRows] = useState(5);
  return (
    <CountLayout rows={rows}>
      <ArrayGetList array={listUser} />
      <div className="flex items-center justify-end mt-3 gap-2">
        <p>Rows per page: {rows}</p>
        <div className="flex items-center gap-4">
          <PrevCount />
          <NextCount array={listUser} />
        </div>
      </div>
    </CountLayout>
  );
}
