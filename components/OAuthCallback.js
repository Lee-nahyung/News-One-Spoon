import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        const REST_API_KEY = 'd7a9b389ecda610a261f03bf777538c9';
        const REDIRECT_URI = 'http://localhost:3000';

        try {
          // Access Token 요청
          const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              client_id: REST_API_KEY,
              redirect_uri: REDIRECT_URI,
              code,
            }),
          });

          const tokenData = await tokenResponse.json();
          if (tokenData.access_token) {
            console.log('Access Token:', tokenData.access_token);

            // 사용자 정보 요청
            const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
              method: 'GET',
              headers: { Authorization: `Bearer ${tokenData.access_token}` },
            });

            const userData = await userResponse.json();
            console.log('사용자 정보:', userData);
            alert(`안녕하세요, ${userData.properties.nickname}님!`);
            navigate('/');
          }
        } catch (error) {
          console.error('로그인 처리 실패:', error);
        }
      }
    };

    fetchToken();
  }, [navigate]);

  return <h2>로그인 처리 중입니다...</h2>;
}

export default OAuthCallback;
