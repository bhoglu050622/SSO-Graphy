import React, { useState, useRef, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { assets } from '../../assets/assets';
import { MdEmail } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { useSearchParams } from 'react-router-dom';

const API_TOKEN = import.meta.env.VITE_GRAPHY_API_TOKEN;
const BASE_URL = "https://api.graphy.com/v2/sso";

const sendOtp = async (email) => {
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

const verifyOtp = async (email, otp) => {
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
    setShowOtpScreen(true);
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
      console.log("🔑 Token saved:", res.token);

      try {
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        if (payload["course-ids"]?.length > 0) {
          console.log("🎓 Auto-enrolled in courses:", payload["course-ids"]);
        }
      } catch (err) {
        console.warn("⚠️ Could not decode JWT:", err);
      }

      window.location.href = `${returnUrl}?ssoToken=${res.token}`;
    } else {
      alert("❌ OTP invalid or expired.");
    }
    setLoading(false);
  };

  const handleSSOLogin = (provider) => {
    const redirectUri = `${import.meta.env.VITE_FRONTEND_BASE_URL}/oauth-callback?provider=${provider}`;
    const ssoUrl = `https://sso.graphy.com/v2/login/${provider}?merchant_id=${import.meta.env.VITE_MERCHANT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    console.log("🔗 Redirecting to SSO URL:", ssoUrl);
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
            <>
              <h2 className="font-clash font-semibold text-[26px] xl:text-[36px] text-center uppercase">
                CHECK YOUR <span className="text-yellow">EMAIL</span>
              </h2>
              <p className="mt-2 mb-8 text-gray-300 text-center">
                We’ve emailed you a 6-digit code to <b>{userEmail}</b>.<br /> Please enter it below.
              </p>
              <div className="flex justify-center gap-2 mb-6">
                {Array(6).fill(0).map((_, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    maxLength="1"
                    value={otp[i]}
                    className="w-10 h-12 text-center text-black font-bold text-xl rounded-md bg-gray-100 focus:outline-yellow"
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value;
                      setOtp(newOtp);
                      handleChange(e, i);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                  />
                ))}
              </div>
              <button className="bg-yellow text-black w-full py-2 text-[16px] rounded-md font-semibold mb-3" onClick={handleVerifyOtp}>
                Verify
              </button>
              <button className="bg-[#0F0F0F] text-white w-full py-2 text-[16px] rounded-md border border-gray-600 mb-3" onClick={() => setShowOtpScreen(false)}>
                Cancel
              </button>
              <p className="text-sm text-center text-gray-100">
                Didn’t receive the email? <span className="text-yellow cursor-pointer" onClick={handleSendOtp}>Resend</span>
              </p>
            </>
          ) : (
            <>
              <h2 className="font-clash font-semibold text-[20px] xl:text-[36px] text-center uppercase">
                Learn from <span className="text-yellow">top creator</span> mentors
              </h2>
              <p className="mt-2 mb-8 text-[14px] xl:text-[16px] text-gray-300 text-center">
                Begin your journey with top-tier mentors today.
              </p>
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
              <div className="text-center text-sm text-gray-400 my-2">or</div>
              <label className="flex items-center w-full bg-[#0F0F0F] text-white rounded-md mb-2 px-4 py-2">
                <IoPersonSharp className="text-gray-400 text-[18px] mr-2" />
                <input
                  type="name"
                  placeholder="Enter Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-transparent outline-none border-none text-[14px]"
                />
              </label>
              <label className="flex items-center w-full bg-[#0F0F0F] text-white rounded-md mb-5 px-4 py-2">
                <MdEmail className="text-gray-400 text-[18px] mr-2" />
                <input
                  type="email"
                  placeholder="Enter Email address"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-transparent outline-none border-none text-[14px]"
                />
              </label>
              <button className="bg-yellow text-black text-[14px] w-full py-2 rounded-md font-semibold" onClick={handleSendOtp}>
                Create Account
              </button>
              <p className="text-sm mt-4 text-center">
                Already have an account? <span className="text-yellow cursor-pointer" onClick={handleSendOtp}>Log in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;