import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Flask 서버 URL

export const fetchAllKeyNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/all-key-news`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all key news:', error);
    throw error;
  }
};

export const sendKakaoMessage = async (accessToken, message, linkUrl) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send_kakao_message`, {
      access_token: accessToken,
      message: message,
      link_url: linkUrl,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending Kakao message:', error);
    throw error;
  }
};
