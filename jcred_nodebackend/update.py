import requests

url = 'http://localhost:3080/update_user_python'

payload = {'firstname': 'jaz', 'id': '1'}

r = requests.post(url, data=payload)
print(r.text)
