import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const provider = searchParams.get('provider');
    const returnUrl = searchParams.get('returnurl') || '/';

    if (!code || !provider) {
      console.warn("❌ Missing OAuth code or provider");
      navigate('/');
      return;
    }

    fetch('https://api.graphy.com/v2/sso/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_GRAPHY_API_TOKEN}`,
      },
      body: JSON.stringify({
        code,
        provider,
        redirect_uri: `${import.meta.env.VITE_FRONTEND_BASE_URL}/oauth-callback?provider=${provider}`,
        merchant_id: import.meta.env.VITE_MERCHANT_ID,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data?.token) {
          localStorage.setItem('graphyToken', data.token);
          console.log("✅ Token saved:", data.token);

          const finalRedirect = `${returnUrl}?ssoToken=${data.token}`;
          window.location.href = finalRedirect;
        } else {
          console.error("❌ OAuth failed:", data);
          navigate('/');
        }
      });
  }, [navigate, searchParams]);

  return <div className="p-4 text-center">Authenticating via Graphy...</div>;
}
