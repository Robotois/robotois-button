{
  "targets": [
    {
      "target_name": "LEDModule",
      "sources": [ "src/wrapper/LEDModule.cpp","src/wrapper/LEDWrapper.cpp",
      "src/LED.cpp",
      "src/libraries/robotois-digital-header/DigitalHeader.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}
