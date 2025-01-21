import os
from flask import Blueprint, jsonify, request, json
import requests
from openai import OpenAI
import datetime
import requests

bp = Blueprint('main', __name__)

# 네이버 뉴스 API 설정
NAVER_CLIENT_ID = os.environ.get("NAVER_CLIENT_ID", "UhDYFpkAOAh6E8YhMVW0")
NAVER_CLIENT_SECRET = os.environ.get("NAVER_CLIENT_SECRET", "g6vLtHYELt")

# OpenAI 객체 생성
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", "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"))

# 카테고리별 검색어 매핑
CATEGORY_QUERIES = {
    "politics": "정치",
    "economy": "경제",
    "society": "사회",
    "culture": "문화",
    "science": "과학"
}

def fetch_news(category):
    """네이버 뉴스 API를 사용해 카테고리별 뉴스 가져오기"""
    query = CATEGORY_QUERIES.get(category)
    if not query:
        return {"error": f"Invalid category: {category}"}

    url = "https://openapi.naver.com/v1/search/news.json"
    headers = {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
    }
    params = {
        "query": query,
        "display": 10,  # 뉴스 항목 수를 5개에서 10개로 늘림
        "sort": "date"
    }
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json().get("items", [])
    return {"error": f"Failed to fetch news for {category}: {response.status_code}"}

def summarize_news_for_category(articles, category):
    """GPT-4 API를 사용해 카테고리별 뉴스 내용을 요약"""
    try:
        # 뉴스 제목과 내용을 하나의 메시지로 생성
        contents = "\n\n".join([f"Title: {article['title']}\nContent: {article['description']}" for article in articles])

        # OpenAI ChatCompletion 호출
        chat_completion = client.chat.completions.create(
            messages=[{
                "role": "user",
                "content": f"다음 기사들을 바탕으로 {category} 카테고리의 핵심 요약을 300~500자로 작성해 주세요. 각 기사의 요약을 줄바꿈으로 구분하여 주세요:\n\n{contents}"
            }],
            model="gpt-4",  # 모델 이름 수정 (GPT-4)
        )

        # 요약된 텍스트 반환
        answer = chat_completion.choices[0].message.content.strip()
        return answer

    except Exception as e:
        return f"Error summarizing news for {category}: {str(e)}"

@bp.route('/api/all-key-news', methods=['GET'])
def get_all_key_news():
    """모든 카테고리별 핵심 뉴스 요약 API"""
    all_summaries = {}
    for category in CATEGORY_QUERIES:
        news_items = fetch_news(category)
        if "error" in news_items:
            all_summaries[category] = {"error": news_items["error"]}
        else:
            # 10개의 뉴스 기사를 요약하여 카테고리별 전체 요약 생성
            summary = summarize_news_for_category(news_items, category)
            all_summaries[category] = {"key_summary": summary}

    return jsonify(all_summaries)

def summarize_news_for_article(description):
    """기사 내용을 100자 내외로 요약"""
    try:
        # OpenAI ChatCompletion 호출
        chat_completion = client.chat.completions.create(
            messages=[{
                "role": "user",
                "content": f"다음 기사 내용을 100자 내외로 간략히 요약해 주세요:\n\n{description}"
            }],
            model="gpt-4",  # 모델 이름 수정 (GPT-4)
        )

        # 요약된 텍스트 반환
        answer = chat_completion.choices[0].message.content.strip()
        return answer

    except Exception as e:
        return f"Error summarizing news: {str(e)}"

@bp.route('/api/category-key-news', methods=['GET'])
def get_category_key_news():
    """모든 카테고리별 최신 뉴스 10개 100자 요약 API"""
    all_summaries = {}
    for category in CATEGORY_QUERIES:
        news_items = fetch_news(category)
        if "error" in news_items:
            all_summaries[category] = {"error": news_items["error"]}
        else:
            article_summaries = []
            for article in news_items:
                # 네이버 뉴스 API에서 description을 가져옴
                description = article['description']
                # description을 100자 내외로 요약
                summary = summarize_news_for_article(description)
                article_summaries.append({
                    "title": article['title'],
                    "summary": summary,
                    "link": article['link']  # 뉴스 링크 포함
                })
            all_summaries[category] = {"key_summary": article_summaries}

    return jsonify(all_summaries)
# -----------------
def summarize_news_for_message(articles, category):
    """GPT-4 API를 사용해 카테고리별 뉴스 내용을 요약"""
    try:
        # 뉴스 제목과 내용을 하나의 메시지로 생성
        contents = "\n\n".join([f"Title: {article['title']}\nContent: {article['description']}" for article in articles])

        # OpenAI ChatCompletion 호출
        chat_completion = client.chat.completions.create(
            messages=[{
                "role": "user",
                "content": f"다음 기사들을 바탕으로 {category} 카테고리의 핵심 요약을 100자 정도로 작성해 주세요. 각 기사의 요약을 줄바꿈으로 구분하여 주세요:\n\n{contents}"
            }],
            model="gpt-4",  # 모델 이름 수정 (GPT-4)
        )

        # 요약된 텍스트 반환
        answer = chat_completion.choices[0].message.content.strip()
        return answer

    except Exception as e:
        return f"Error summarizing news for {category}: {str(e)}"

@bp.route('/api/category-summary', methods=['GET'])
def get_all_key_news():
    """모든 카테고리별 핵심 뉴스 요약 API"""
    all_summaries = {}
    for category in CATEGORY_QUERIES:
        news_items = fetch_news(category)
        if "error" in news_items:
            all_summaries[category] = {"error": news_items["error"]}
        else:
            # 10개의 뉴스 기사를 요약하여 카테고리별 전체 요약 생성
            summary = summarize_news_for_message(news_items, category)
            all_summaries[category] = {"key_summary": summary}

    return jsonify(all_summaries)

# -------

@bp.route('/send_kakao_message', methods=['POST'])
def send_kakao_message():
    try:
        # 클라이언트로부터 메시지와 액세스 토큰을 받기
        data = request.get_json()

        access_token = data.get('access_token')
        message = data.get('message', 'Hello, world!')  # 메시지가 없으면 기본값 사용
        link_url = data.get('link_url', 'www.naver.com')  # 링크 기본값

        # /api/category-summary API 호출하여 카테고리별 핵심 뉴스 요약 가져오기
        news_summary_response = requests.get("http://localhost:3000/api/category-summary")  # 로컬에서 호출 (실제 환경에 맞게 URL 수정)

        if news_summary_response.status_code == 200:
            all_summaries = news_summary_response.json()

            # 카테고리별로 요약 내용 추출하여 카카오 메시지 내용 구성
            message_content = ""
            for category, summary_data in all_summaries.items():
                # 카테고리별로 100자 내외 요약을 추가
                message_content += f"{category}:\n"
                for article in summary_data.get("key_summary", []):
                    message_content += f"• {article['summary']}\n"
                message_content += "\n"

            # 카카오 API URL
            url = "https://kapi.kakao.com/v2/api/talk/memo/default/send"
            
            headers = {
                "Authorization": "Bearer " + access_token  # 클라이언트가 제공한 액세스 토큰 사용
            }

            # 메시지 전송 데이터
            message_data = {
                "template_object": json.dumps({
                    "object_type": "text",
                    "text": message_content,
                    "link": {
                        "web_url": link_url
                    }
                })
            }

            response = requests.post(url, headers=headers, data=message_data)

            if response.status_code == 200:
                return jsonify({"message": "메시지를 성공적으로 보냈습니다."})
            else:
                return jsonify({"error": "메시지 전송 실패", "details": response.json()}), 400
        else:
            return jsonify({"error": "뉴스 요약을 가져오는 데 실패했습니다."}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
