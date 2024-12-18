#include <Stepper.h>
#include <ESP32Servo.h>

const int stepsPerRevolution = 2048;  // change this to fit the number of steps per revolution

// ULN2003 Motor Driver Pins
#define IN1 19
#define IN2 18
#define IN3 5
#define IN4 17

#define SERVOPIN 13
#define SERVOPIN2 12


// initialize stepper and servo motors
Stepper myStepper(stepsPerRevolution, IN1, IN3, IN2, IN4);
Servo servoMotor;
Servo servoMotor2;

void setup() {
  myStepper.setSpeed(10);
  servoMotor.attach(SERVOPIN);
  servoMotor2.attach(SERVOPIN2);
  Serial.begin(115200);
  
}

void loop() {
  servoMotor.write(30);
  servoMotor2.write(30);
  Serial.println("clockwise");
  myStepper.step(512);
  delay(1000);

  servoMotor.write(150);
  servoMotor2.write(150);
  Serial.println("counterclockwise");
  myStepper.step(-512);
  delay(1000);
}