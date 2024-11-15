/*
  Rui Santos & Sara Santos - Random Nerd Tutorials
  Complete project details at https://RandomNerdTutorials.com/esp32-stepper-motor-28byj-48-uln2003/
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files.
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  Based on Stepper Motor Control - one revolution by Tom Igoe
*/
#include <Stepper.h>

const int stepsPerRevolution = 1440;  // change this to fit the number of steps per revolution

// ULN2003 Motor Driver Pins
#define IN1 19
#define IN2 18
#define IN3 5
#define IN4 17

#define IN12 27
#define IN22 26
#define IN32 25
#define IN42 33

// initialize the stepper library
Stepper myStepper(stepsPerRevolution, IN1, IN3, IN2, IN4);
Stepper myStepper2(stepsPerRevolution, IN12, IN32, IN22, IN42);

void setup() {
  // set the speed at 5 rpm
  myStepper.setSpeed(5);
  myStepper2.setSpeed(5);
  // initialize the serial port
  Serial.begin(115200);
}

void loop() {
  // step one revolution in one direction:
  myStepper.step(4);
  myStepper2.step(1);
  delay(10);
}