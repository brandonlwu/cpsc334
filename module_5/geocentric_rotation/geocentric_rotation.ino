
#include <Stepper.h>

const int stepsPerRevolution = 1440; 

=#define IN1 19
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
  myStepper.setSpeed(5);
  myStepper2.setSpeed(5);
  // initialize the serial port
  Serial.begin(115200);
}

void loop() {
  myStepper.step(4);
  myStepper2.step(1);
  delay(10);
}