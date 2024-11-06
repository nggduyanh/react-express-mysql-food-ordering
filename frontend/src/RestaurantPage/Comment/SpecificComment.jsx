import avatar from "../../assets/avatar.png";
export default function SpecificComment() {
  return (
    <div className="flex gap-3 border p-3 rounded-xl border-gray-300 mb-4">
      <img src={avatar} alt="" className="h-10 w-10" />
      <div className="userInfo w-full">
        <div className="flex w-full justify-between items-center">
          <p>Nguyen Van B</p>
          <p>Ratings</p>
        </div>
        <i className="text-xs">11-12-2002</i>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
          maiores at modi maxime voluptatum, tempora, odit ducimus animi commodi
          ipsa beatae? Distinctio aperiam mollitia dolore, deserunt dicta
          commodi odio officiis?
        </p>
      </div>
    </div>
  );
}
