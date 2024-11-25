import { useContext } from "react";
import { countContext } from "./CountLayout";
import ListForUser from "../User_Management/ListForUser";

export default function ArrayGetList(list) {
  const { count, rows } = useContext(countContext);
  const userArray = list.array
    .map((user) => {
      return <ListForUser key={user.MaNguoiDung} {...user} />;
    })
    .slice(count, count + rows);
  return userArray.length > 0 ? userArray : "No user was found";
}
