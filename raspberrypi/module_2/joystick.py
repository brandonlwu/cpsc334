# import the libraries
import RPi.GPIO as GPIO
from time import sleep
GPIO.setmode(GPIO.BCM)

# set the pin numbers to be used from Broadcom chip

xpin = 2
ypin = 3
pushpin = 17 # assign a variable name to pin 17
GPIO.setup(xpin, GPIO.IN) # set GPIO pin 2 as Input
GPIO.setup(ypin, GPIO.IN) # set GPIO pin 3 as Input
GPIO.setup(pushpin, GPIO.IN) # set GPIO pin 17 as Input


while True:
	if GPIO.input(pushpin) == 0:
		print("x" + str(GPIO.input(xpin)))
		print("y" + str(GPIO.input(ypin)))
	sleep(0.2)
