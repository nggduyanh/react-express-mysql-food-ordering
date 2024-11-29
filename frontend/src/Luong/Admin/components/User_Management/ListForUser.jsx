export default function ListForUser(user) {
  return (
    <div
      key={user.MaNguoiDung}
      className="user grid grid-cols-4 gap-4 p-4 border border-white border-b-gray-300"
    >
      <p>{user.MaNguoiDung}</p>
      <p>{user.TenNguoiDung}</p>
      <p>{user.Email === null ? "null" : user.Email}</p>
      <p>{user.SoDienThoai === null ? "null" : user.SoDienThoai}</p>
    </div>
  );
}
