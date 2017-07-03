CC=g++

COMPILE_FLAGS = -g -std=c++11 -Wall -c
LINKER_FLAGS = -g
LIBS = -l bcm2835 -l rt

OBJECTS = \
	test.o \
	DigitalHeader.o \
	Button.o
	# AccurateTiming.o

#OBJECTS = $(subst .cpp,.o,$(SOURCES))

all: io.o button.o main.o
	$(CC) $(LINKER_FLAGS) -o runner $(OBJECTS) $(LIBS)

main.o: test.cpp
	$(CC) $(COMPILE_FLAGS) test.cpp
io.o: libraries/robotois-digital-header/DigitalHeader.cpp libraries/robotois-digital-header/DigitalHeader.h
	$(CC) $(COMPILE_FLAGS) libraries/robotois-digital-header/DigitalHeader.cpp
# timer.o: libraries/robotois-timer/AccurateTiming.cpp libraries/robotois-timer/AccurateTiming.h
# 	$(CC) $(COMPILE_FLAGS) libraries/robotois-timer/AccurateTiming.cpp
button.o: Button.cpp Button.h
	$(CC) $(COMPILE_FLAGS) Button.cpp

clean:
	$(RM) $(OBJECTS) runner
