const API_TOKEN = import.meta.env.VITE_GRAPHY_API_TOKEN;
const BASE_URL = "https://api.graphy.com/v2/sso";

export const sendOtp = async (email) => {
  const res = await fetch(`${BASE_URL}/otp/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ email }),
  });
  return res.json();
};

export const verifyOtp = async (email, otp) => {
  const res = await fetch(`${BASE_URL}/otp/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ email, otp }),
  });
  return res.json();
};
