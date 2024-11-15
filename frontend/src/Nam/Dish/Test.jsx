const handleComment = (event) => {
  const { name, value } = event.target;

  setComments((prevComments) => {
    return {
      ...prevComments,
      [name]: name === "diem" ? Number.parseFloat(value) : value,
    };
  });
};
const createComment = async () => {
  if (
    Comments.noiDung.trim().length === 0 &&
    Comments.diem.trim().length === 0
  ) {
    toast.error("Please fullfile your response and star ");
    return;
  }
  try {
    const dataToSend = {
      ...Comments,
      AnhDinhKemTemp: Comments.AnhDinhKemTemp.map((image) => image.url),
      AnhDinhKem: Comments.AnhDinhKem.map((image) => image.file),
    };
    const formCommentData = new FormData();
    dataToSend.AnhDinhKem.forEach((file) => {
      formCommentData.append(AnhDinhKem, file);
    });
    formCommentData.append("MaNguoiMua", userData.MaNguoiDung);
    formCommentData.append("MaMonAn", foodDetails.MaMonAn);
    formCommentData.append("noiDung", dataToSend.noiDung);
    formCommentData.append("HienThi", dataToSend.HienThi);
    formCommentData.append("diem", dataToSend.diem);
    // for (let pair of formCommentData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    const response = await toast.promise(
      axios.post(setCommendForSpecificFood, formCommentData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tokenValue}`,
        },
        withCredentials: true,
      }),
      {
        loading: "Create commennt...",
        success: (response) => {
          // const success = Create commemt successfully: ${response.status};
          setTimeout(() => {
            refreshPage();
          }, 1000);
          return success;
        },
        //   error: (err) => Error creating commennt: ${err.message},
      }
    );
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      toast.error("Bạn đã bình luận cho món ăn này rồi.");
    } else {
      // toast.error(Cannot comment: ${err.message});
    }
  }
};
