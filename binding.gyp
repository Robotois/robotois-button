{
  "targets": [
    {
      "target_name": "ButtonModule",
      "sources": [ "ButtonModule.cpp","ButtonWrapper.cpp",
      "src/Modules/Button/Button.cpp",
      "src/Libraries/DigitalIO/DigitalHeader.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}
