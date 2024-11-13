export const getTokenValue = () => {
  const tokenStorage = localStorage.getItem("token");
  const tokenValue = JSON.parse(tokenStorage).token;
  return tokenValue;
};
