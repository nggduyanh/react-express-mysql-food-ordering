import { GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";
export default function BtnSelection({ children, src, des, ...rest }) {
  if (src !== undefined) {
    return (
      <Link to="." className={rest.className}>
        <img src={src} alt="Designed by freepik" className="w-14 h-14 " />
        <div className="w-full">{children}</div>
        <div className="justify-end">
          <GrNext className="cursor-pointer text-red-500 " />
        </div>
      </Link>
    );
  }
  return (
    <Link to={des} className={rest.className}>
      <div className="w-full">{children}</div>
      <div>
        <GrNext className="cursor-pointer text-red-500" />
      </div>
    </Link>
  );
}
