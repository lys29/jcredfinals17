import cv2
import time  
from datetime import datetime  
import requests
import base64


# 1.creating a video object
video = cv2.VideoCapture(0) 
# 2. Variable
a = 0
# 3. While loop
while True:

    a = a + 1
    # 4.Create a frame object
    check, frame = video.read()
    # Converting to grayscale
    #gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
    # 5.show the frame!
    cv2.imshow("Capturing",frame)
    img_counter=0
    # 6.for playing 
    key = cv2.waitKey(1)
    if key == ord('q'):
        break
# 7. image saving
img_name = "opencv_frame_{}.jpg".format(img_counter)
showPic = cv2.imwrite(img_name,frame)
img_counter +=1 
url = 'http://localhost:3002/motion_detector' 
image_save = {'image': base64.b64encode(frame)}
r = requests.post(url, data = image_save)
print(showPic)
# 8. shutdown the camera
video.release()
cv2.destroyAllWindows 
