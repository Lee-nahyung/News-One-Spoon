import React, { useEffect, useState  } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const REST_API_KEY = 'd7a9b389ecda610a261f03bf777538c9'; // 카카오에서 발급받은 REST API 키
  const REDIRECT_URI = 'http://localhost:3000'; // Redirect URI
  const [userName, setUserName] = useState(null); // 사용자 이름 상태 관리

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = new URL(window.location.href).searchParams.get("code"); // 리다이렉트 URI에서 code 값 추출
      if (code) {
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

            // Access Token을 localStorage에 저장
            localStorage.setItem("kakao_access_token", tokenData.access_token);

            // 사용자 정보 요청
            const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
              },
            });

            const userData = await userResponse.json();
            console.log("사용자 정보:", userData);
            
             // 사용자 이름 저장 및 환영 메시지 출력
             const userName = userData.properties?.nickname || "사용자";
             setUserName(userName);
             alert(`로그인에 성공하였습니다.`);
          } else {
            console.error("Access Token 요청 실패:", tokenData);
            alert("로그인에 실패하였습니다. 다시 시도해주세요.");
          }
        } catch (error) {
          console.error("Access Token 처리 중 오류 발생:", error);
          alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    };

    handleKakaoCallback(); // 페이지 로드 시 실행
  }, []);

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=talk_message`;
    window.location.href = kakaoAuthUrl; // 카카오 인증 페이지로 이동
  };
  

  const handleKakaoLogoutWithSession = async () => {
    const ACCESS_TOKEN = localStorage.getItem("kakao_access_token");

    if (!ACCESS_TOKEN) {
      alert("로그인이 되어 있지 않습니다.");
      return;
    }

    try {
      // REST API를 사용해 Access Token 무효화
      const response = await fetch("https://kapi.kakao.com/v1/user/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`, // 액세스 토큰 포함
        },
      });

      if (response.ok) {
        localStorage.removeItem("kakao_access_token"); // 로컬 스토리지에서 토큰 제거
        console.log("REST API 로그아웃 성공");
        alert("로그아웃되었습니다.");
      } else {
        const errorData = await response.json();
        console.error("REST API 로그아웃 실패:", errorData);
        alert("로그아웃 중 오류가 발생했습니다.");
      }

      // 카카오 서버 세션 로그아웃 처리
      const LOGOUT_REDIRECT_URI = "http://localhost:3000"; // 로그아웃 후 리다이렉트 URI
      const logoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
      window.location.href = logoutUrl; // 카카오 서버 로그아웃 페이지로 이동
    } catch (error) {
      console.error("로그아웃 요청 실패:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <header className="header">
      <div className="header-logo">
        <h1>뉴스 한 스푼</h1>
      </div>
      <nav className="navbar">
        <ul className="navbar-menu">
          <li><Link to="/politics">정치</Link></li>
          <li><Link to="/economy">경제</Link></li>
          <li><Link to="/society">사회</Link></li>
          <li><Link to="/culture">생활/문화</Link></li>
          <li><Link to="/it">IT/과학</Link></li>
        </ul>
      </nav>
      <div className="header-login">
        {userName ? (
          <>
            <button className="logout-button" onClick={handleKakaoLogoutWithSession}>로그아웃</button>
          </>
        ) : (
          <button className="login-button" onClick={handleKakaoLogin}>로그인</button>
        )}
      </div>
    </header>
  );
}

export default Header;
