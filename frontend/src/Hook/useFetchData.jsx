import axios from "axios";
import { useEffect, useState } from "react";
export default function useFetchData(url, token) {
  const [data, setData] = useState([]);
  const [errorData, setErrorData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(getData);
      } catch (err) {
        setErrorData(err);
      }
    };
    if (token) {
      fetchData();
    }
  }, [url, token]);
  return [data, errorData, setData];
}
