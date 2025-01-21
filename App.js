import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GlobalStyle from "./GlobalStyle";
import DetailPage from "./components/DetailPage"; // DetailPage

function App() {
  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        const REST_API_KEY = "d7a9b389ecda610a261f03bf777538c9"; // 카카오 REST API 키
        const REDIRECT_URI = "http://localhost:3000"; // Redirect URI

        try {
          // Access Token 요청
          const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              client_id: REST_API_KEY,
              redirect_uri: REDIRECT_URI,
              code: code,
            }),
          });

          const tokenData = await tokenResponse.json();

          if (tokenData.access_token) {
            console.log("Access Token:", tokenData.access_token);

            // 사용자 정보 요청
            const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
              },
            });

            const userData = await userResponse.json();
            console.log("사용자 정보:", userData);
            alert(`안녕하세요, ${userData.properties.nickname}님!`);
          } else {
            console.error("토큰 요청 실패:", tokenData);
          }
        } catch (error) {
          console.error("로그인 처리 실패:", error);
        }
      }
    };

    handleKakaoCallback();
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle /> {/* GlobalStyle 적용 */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/details/:category" element={<DetailPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
