import { useOutletContext } from "react-router-dom";
import ArrayGetList from "../Function/ArrayGetList";
import CountLayout from "../Function/CountLayout";
import NextCount from "../Function/NextCount";
import PrevCount from "../Function/PrevCount";
import { useState } from "react";

export default function AdminList() {
  const { listAdmin, search } = useOutletContext();
  const [rows, setRows] = useState(5);
  return (
    <CountLayout rows={rows}>
      <ArrayGetList array={listAdmin} filter={search} />
      <div className="flex items-center justify-end mt-3 gap-2">
        <p>Rows per page: {rows}</p>
        <div className="flex items-center gap-4">
          <PrevCount />
          <NextCount array={listAdmin} />
        </div>
      </div>
    </CountLayout>
  );
}
