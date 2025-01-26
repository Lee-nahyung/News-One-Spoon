# -*- coding: utf-8 -*-
import requests
import json

#1. Kakao OAuth token 가져오기
with open(r"C:\Users\gkthf\OneDrive\바탕 화면\kakao_code.json", "r") as fp:
    tokens = json.load(fp)

# 카카오톡 메시지 전송 URL
url = "https://kapi.kakao.com/v2/api/talk/memo/default/send"

# Authorization 헤더 설정
headers = {
    "Authorization": "Bearer " + tokens["access_token"]
}

# 전송할 메시지 데이터 설정
data = {
    "template_object": json.dumps({
        "object_type": "text",
        "text": "hello world!",
        "link": {
            "web_url": "https://www.naver.com"
        }
    })
}

# POST 요청 보내기
response = requests.post(url, headers=headers, data=data)

# 응답 상태 코드 출력
print(response.status_code)

# 응답 결과에 따른 메시지 출력
if response.status_code == 200:
    result = response.json()
    if result.get('result_code') == 0:
        print('메시지를 성공적으로 보냈습니다.')
    else:
        print('메시지를 성공적으로 보내지 못했습니다. 오류메시지 : ' + str(result))
else:
    print(f"오류 발생: {response.status_code} - {response.text}")
