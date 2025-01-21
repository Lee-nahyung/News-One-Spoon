import requests

url = 'https://kauth.kakao.com/oauth/token'
rest_api_key = '9e9937c272ef0b6237c98914a19da447'
redirect_uri = 'https://example.com/oauth'
authorize_code = 'iTgi9FuY0kBP3bf3vsEZ-vG7JylxZbeW3s9aKl0zN3lXBpsAUxLsvwAAAAQKPXOaAAABlIcanEat1856Xp2T3g'

data = {
    'grant_type':'authorization_code',
    'client_id':rest_api_key,
    'redirect_uri':redirect_uri,
    'code': authorize_code,
    }

response = requests.post(url, data=data)
tokens = response.json()
print(tokens)

# json 저장
import json
#1.
with open(r"C:\Users\gkthf\OneDrive\바탕 화면\kakao_code.json","w") as fp:
    json.dump(tokens, fp)