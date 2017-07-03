#include <cstdio>
#include <bcm2835.h>
#include <thread>
#include <chrono>

#include "./Button.h"

void i2c_init();
void i2c_end();

int main(int argc, char const *argv[]) {
  i2c_init();
  Button button(5);
  uint8_t state = 0;
  while (true) {
    state = button.getValue();
    printf("getValue: %d\n", state);
    std::this_thread::sleep_for(std::chrono::milliseconds(250));
  }
  i2c_end();
  return 0;
}

void i2c_init() {
  uint16_t clkDiv = BCM2835_I2C_CLOCK_DIVIDER_626;

  if(!bcm2835_init()){
    printf("BCM2835 Error!!!\n");
  }

  bcm2835_i2c_begin();

  bcm2835_i2c_setClockDivider(clkDiv);
}

void i2c_end() {
  bcm2835_i2c_end();
  bcm2835_close();
}
