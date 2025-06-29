import React, { useState, useRef } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { assets } from '../../assets/assets';
import { MdEmail } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { useSearchParams } from 'react-router-dom';

// API Configuration
const API_TOKEN = import.meta.env.VITE_GRAPHY_API_TOKEN;
const MERCHANT_ID = import.meta.env.VITE_MERCHANT_ID;
const FRONTEND_BASE_URL = import.meta.env.VITE_FRONTEND_BASE_URL;
const GRAPHY_API_BASE_URL = "https://api.graphy.com/v2/sso";
const GRAPHY_SSO_BASE_URL = "https://sso.graphy.com/v2/login";

// API Functions
const sendOtp = async (email) => {
  const res = await fetch(`${GRAPHY_API_BASE_URL}/otp/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ email, merchant_id: MERCHANT_ID }),
  });
  return res.json();
};

const verifyOtp = async (email, otp) => {
  const res = await fetch(`${GRAPHY_API_BASE_URL}/otp/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ email, otp, merchant_id: MERCHANT_ID }),
  });
  return res.json();
};

const LoginModal = ({ onClose }) => {
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnurl") || "/courses";

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async () => {
    if (!userEmail) return alert("Please enter your email");
    setLoading(true);
    const res = await sendOtp(userEmail);
    console.log("📤 OTP sent response:", res);
    // Assuming the API call is successful, show the OTP screen
    if (res.success) { // Check for a success flag from Graphy's API
        setShowOtpScreen(true);
    } else {
        alert(res.message || "Failed to send OTP. Please try again.");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) return alert("Enter full 6-digit OTP");
    setLoading(true);
    const res = await verifyOtp(userEmail, fullOtp);
    console.log("✅ OTP verified response:", res);

    if (res?.token) {
      localStorage.setItem("graphyToken", res.token);
      window.location.href = `${returnUrl}?ssoToken=${res.token}`;
    } else {
      alert(res.message || "❌ OTP invalid or expired.");
    }
    setLoading(false);
  };

  const handleSSOLogin = (provider) => {
    const redirectUri = `${FRONTEND_BASE_URL}/oauth-callback?provider=${provider}`;
    const ssoUrl = `${GRAPHY_SSO_BASE_URL}/${provider}?merchant_id=${MERCHANT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = ssoUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-black rounded-2xl text-white w-[90%] xl:w-[80%] flex flex-col md:flex-row overflow-hidden">
        <div className="w-full hidden md:w-1/2 md:flex items-center justify-center p-4">
          <img src={assets.ex_logo} alt="logo" />
        </div>

        <div className="relative w-full md:hidden md:w-1/2 flex items-center justify-center px-4 py-2 sm:p-4">
          <img src={assets.ex_logo_mob} alt="logo" className='h-[200px]' />
          <img src={assets.close} alt="" className='absolute top-4 right-4 border p-3 rounded-lg border-[#373737]' onClick={onClose} />
        </div>

        <div className="w-full md:w-1/2 py-4 md:py-10 px-4 md:px-10 lg:p-16 flex flex-col justify-center">
          {loading ? (
            <div className="text-center py-12">⏳ Please wait...</div>
          ) : showOtpScreen ? (
            // ... OTP Screen JSX ...
            <>
              <h2 className="font-clash font-semibold text-[26px] xl:text-[36px] text-center uppercase">
                CHECK YOUR <span className="text-yellow">EMAIL</span>
              </h2>
              {/* Rest of OTP screen JSX is unchanged */}
            </>
          ) : (
            // ... Login Screen JSX ...
            <>
                <h2 className="font-clash font-semibold text-[20px] xl:text-[36px] text-center uppercase">
                    Learn from <span className="text-yellow">top creator</span> mentors
                </h2>
                {/* Rest of Login screen JSX is unchanged */}
                <button
                    className="flex items-center text-[14px] gap-3 px-4 py-2 bg-[#0F0F0F] hover:bg-gray-700 rounded-md mb-2 justify-center"
                    onClick={() => handleSSOLogin('google')}
                >
                    <FcGoogle className="w-5 h-5" />
                    Continue with Google
                </button>
                <button
                    className="flex items-center text-[14px] gap-3 px-4 py-2 bg-[#0F0F0F] hover:bg-gray-700 rounded-md justify-center"
                    onClick={() => handleSSOLogin('github')}
                >
                    <FaGithub className="w-5 h-5" />
                    Continue with GitHub
                </button>
                {/* ... other form elements ... */}
                <button className="bg-yellow text-black text-[14px] w-full py-2 rounded-md font-semibold" onClick={handleSendOtp}>
                    Create Account
                </button>
                {/* ... */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;