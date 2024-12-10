import { useContext } from "react";
import { countContext } from "./CountLayout";
import ListForUser from "../User_Management/ListForUser";

export default function ArrayGetList(list) {
  const { count, rows } = useContext(countContext);
  if (!list.filter || list.filter.trim() === "") {
    const userArray = list.array
      .map((user) => {
        return <ListForUser key={user.MaNguoiDung} {...user} />;
      })
      .slice(count, count + rows);

    return userArray.length > 0 ? userArray : "No user was found";
  } else {
    // Lọc danh sách dựa trên điều kiện filter
    const userArray = list.array
      .filter((items) =>
        items.TenNguoiDung.toLowerCase().includes(
          list.filter.trim().toLowerCase()
        )
      )
      .map((user) => {
        return <ListForUser key={user.MaNguoiDung} {...user} />;
      })
      .slice(count, count + rows); // Thêm slice nếu cần phân trang

    return userArray.length > 0 ? userArray : "No user was found";
  }
}
