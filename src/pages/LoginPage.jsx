import React from "react";
import { useSearchParams } from "react-router-dom";
import LoginModal from "../components/LoginModal";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnurl") || "/";

  return (
    <LoginModal onClose={() => window.location.href = "/"} returnUrl={returnUrl} />
  );
};

export default LoginPage;
