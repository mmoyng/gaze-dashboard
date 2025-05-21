import requests
import random
import time
import uuid

# 이 부분은 본인의 API Gateway Invoke URL로 바꾸세요!
url = "https://c1t601n18l.execute-api.ap-southeast-2.amazonaws.com/default/ReceiveGazeData"

genders = ["Male", "Female"]

while True:
    data = {
        "ID": str(uuid.uuid4()),
        "Age": random.randint(10, 70),
        "Gender": random.choice(genders),
        "Position": {
            "X": round(random.uniform(-3, 3), 2),
            "Y": round(random.uniform(-3, 3), 2),
            "Z": round(random.uniform(-3, 3), 2)
        }
    }

    response = requests.post(url, json=data)
    print(f"Sent: {data} | Status: {response.status_code}")
    time.sleep(1)  # 1초마다 전송
