{
  "targets": [
    {
      "target_name": "ButtonModule",
      "sources": [
        "src/wrapper/addon.cpp",
        "src/wrapper/MyObject.cpp",
        "src/Button.cpp",
        "src/libraries/robotois-digital-header/DigitalHeader.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}
