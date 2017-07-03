{
  "targets": [
    {
      "target_name": "ButtonModule",
      "sources": [ "src/wrapper/ButtonModule.cpp","src/wrapper/ButtonWrapper.cpp",
      "src/Button.cpp",
      "src/libraries/robotois-digital-header/DigitalHeader.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}
