# Python program to implement
# Webcam Motion Detector

# importing OpenCV, time and Pandas library
import cv2, time
# import pandas
# importing datetime class from datetime library
from datetime import datetime
import requests
import base64
# Assigning our static_back to None
static_back = None

# List when any moving object appear
motion_list = [ None, None ]

# Time of movement
time = []

# Capturing video
video = cv2.VideoCapture(0)
img_counter=0

# Infinite while loop to treat stack of image as video
while True:

     # Reading frame(image) from video
     check, frame = video.read()

     # Initializing motion = 0(no motion)
     motion = 0

     # Converting color image to gray_scale image
     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

     # Converting gray scale image to GaussianBlur
     # so that change can be find easily
     gray = cv2.GaussianBlur(gray, (21, 21), 0)

     # In first iteration we assign the value
     # of static_back to our first frame
     if static_back is None:
          static_back = gray
          continue

     # Difference between static background
     # and current frame(which is GaussianBlur)
     diff_frame = cv2.absdiff(static_back, gray)

     # If change in between static background and
     # current frame is greater than 100 it will show white color(255)
     thresh_frame = cv2.threshold(diff_frame, 100, 255, cv2.THRESH_BINARY)[1]
     thresh_frame = cv2.dilate(thresh_frame, None, iterations = 2)

     # Finding contour of moving object
     cnts,_ = cv2.findContours(thresh_frame.copy(),
                         cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

     for contour in cnts:
          if cv2.contourArea(contour) < 10000:
               continue
          motion = 1

          (x, y, w, h) = cv2.boundingRect(contour)
          # making green rectangle around the moving object
          cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 255, 255), 4)

     # Appending status of motion
     motion_list.append(motion)

     motion_list = motion_list[-2:]

    # Appending Start time of motion
     if motion_list[-1] == 1 and motion_list[-2] == 0:

          url = 'http://localhost:3009/motion_detector'
          # palitan ng IP

          result, image = video.read()  
          date_captured= datetime.now().strftime("%Y%m%d-%H%M%S")# to capture the frame/picture
          img_name = date_captured+"_captured_image_{}.jpg".format(img_counter)
          cv2.imwrite(img_name, image)  # save captured as png
          img_counter +=1
          
          with open(img_name, "rb") as f:  # read png as binary
               img_encoded = base64.b64encode(
                    f.read())  # convert binary to base64
               print(img_name)

          myobj = { 'datetime': str(
               datetime.now()), 'image': img_encoded }
          requests.post(url, data=myobj)

     cv2.imshow("Gray Frame", gray)

     cv2.imshow("Difference Frame", diff_frame)

     cv2.imshow("Threshold Frame", thresh_frame)
     
     cv2.imshow("Color Frame", frame)

     key = cv2.waitKey(1)
     # if q entered whole process will stop
     if key == ord('s'):
          print('APP CLOSE')
          break

video.release()
# # Destroying all the windows
cv2.destroyAllWindows()
