import { useEffect, useState } from "react";
import { formatDate, getAllComments, localStaticFile } from "../../Route";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

export default function History() {
  const { tokenValue, userData } = useOutletContext();
  const [listSeller, setListSeller] = useState([]);
  const [error, setError] = useState(null);
  const [listHistory, setListComments] = useState([]);
  useEffect(() => {
    if (userData && userData.MaNguoiDung) {
      const getList = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3030/nguoimua/allnhanxet/${userData?.MaNguoiDung}`,
            {
              headers: {
                Authorization: "Bearer " + tokenValue,
              },
            }
          );
          const data = response.data;
          setListComments(data);
        } catch (error) {
          console.error("Error fetching comments:", error);
          setListComments([]);
          setError(error);
        }
      };
      getList();
    }
  }, [tokenValue, userData]);
  useEffect(() => {
    const getSeller = async () => {
      try {
        const response = await axios.get("http://localhost:3030/nguoiban", {
          headers: {
            Authorization: "Bearer " + tokenValue,
          },
        });
        const data = response.data;
        setListSeller(data);
      } catch (err) {
        setListSeller([]);
        setError(err);
      }
    };
    getSeller();
  }, [listHistory, tokenValue]);
  return (
    <>
      <div className="p-5">
        <p className="text-2xl font-bold mb-2">History Comments</p>
        <div className="overflow-auto max-h-[650px]">
          {listHistory.length > 0 ? (
            listHistory.map((history) => {
              return (
                <div
                  key={history.MaMonAn}
                  className="border border-pink-500 mb-3 rounded-xl p-3 flex items-center gap-3 justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        !userData?.AnhNguoiDung ||
                        userData.AnhNguoiDung === "null"
                          ? "/avatar.png"
                          : localStaticFile + userData?.AnhNguoiDung
                      }
                      alt=""
                      className="w-10 h-10"
                    />
                    <div>
                      <p>
                        You have comment in{" "}
                        <span className="font-bold text-black">{`${history.TenMonAn}`}</span>{" "}
                        food in{" "}
                        <span className="text-pink-500 font-bold">
                          {
                            listSeller.filter((seller) => {
                              return seller.MaNguoiBan === history.MaNguoiBan;
                            })[0]?.TenNguoiBan
                          }
                        </span>{" "}
                        restaurant
                      </p>
                      <p>
                        Content:{" "}
                        <span className="text-gray-600">
                          {" "}
                          {`${history.NhanXet?.[0].NoiDung}`}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray text-sm">
                      {formatDate(history.NhanXet?.[0].ThoiGianTao)}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <p>You have not comment anything at all</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
