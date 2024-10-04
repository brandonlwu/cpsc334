#!/usr/bin/python
import os, sys
import serial
import time

ser = serial.Serial('/dev/cu.usbserial-110',9600, timeout = 5)

# listen for the input, exit if nothing received in timeout period
while True:
	line = ser.readline()
	print(line)
	if len(line) == 0:
		print("Time out! Exit.\n")
		sys.exit()