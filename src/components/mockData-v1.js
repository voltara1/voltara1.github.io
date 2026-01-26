const mockProjects = [
  {
    id: 1,
    title: "Smart Home Automation Hub",
    description: "Complete IoT system for home automation with temperature sensors and remote control.",
    user: {
      usename: "Alex Chen",
      email: "alex.chen@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-01T00:00:00",
      updated_at: "2024-01-01T00:00:00"
    },
    category: "Arduino",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "Arduino",
      "IoT",
      "Sensors"
    ],
    likes: 234,
    comments: [
      {
        id: 1,
        comment: "Discussion thread for Smart Home Automation Hub.",
        created_at: "2025-01-05T00:00:00",
        updated_at: "2025-01-05T00:00:00",
        user_id: 1
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?smart-home,iot",
    created_at: "2025-01-05T00:00:00",
    updated_at: "2025-01-05T00:00:00"
  },
  {
    id: 2,
    title: "WiFi Weather Station",
    description: "ESP32-based weather monitoring system with cloud connectivity and data logging.",
    user: {
      usename: "Sarah Martinez",
      email: "sarah.martinez@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-02T00:00:00",
      updated_at: "2024-01-02T00:00:00"
    },
    category: "ESP32",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "ESP32",
      "Sensors",
      "IoT"
    ],
    likes: 180,
    comments: [
      {
        id: 2,
        comment: "Discussion thread for WiFi Weather Station.",
        created_at: "2025-01-12T00:00:00",
        updated_at: "2025-01-12T00:00:00",
        user_id: 2
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?weather,station",
    created_at: "2025-01-12T00:00:00",
    updated_at: "2025-01-12T00:00:00"
  },
  {
    id: 3,
    title: "AI-Powered Robot Car",
    description: "Autonomous robot car using Raspberry Pi with computer vision and obstacle avoidance.",
    user: {
      usename: "Michael Park",
      email: "michael.park@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-03T00:00:00",
      updated_at: "2024-01-03T00:00:00"
    },
  category: "Robotics",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Robotics",
      "Raspberry Pi"
    ],
    likes: 412,
    comments: [
      {
        id: 3,
        comment: "Discussion thread for AI-Powered Robot Car.",
        created_at: "2025-01-19T00:00:00",
        updated_at: "2025-01-19T00:00:00",
        user_id: 3
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?robot,car",
    created_at: "2025-01-19T00:00:00",
    updated_at: "2025-01-19T00:00:00"
  },
  {
    id: 4,
    title: "USB-C Power Delivery Board",
    description: "Custom PCB for USB-C power delivery with overvoltage and thermal protection.",
    user: {
      usename: "Emma Wilson",
      email: "emma.wilson@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-04T00:00:00",
      updated_at: "2024-01-04T00:00:00"
    },
    category: "PCB Design",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "PCB Design",
      "Sensors"
    ],
    likes: 366,
    comments: [
      {
        id: 4,
        comment: "Discussion thread for USB-C Power Delivery Board.",
        created_at: "2025-01-26T00:00:00",
        updated_at: "2025-01-26T00:00:00",
        user_id: 4
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?pcb,circuit",
    created_at: "2025-01-26T00:00:00",
    updated_at: "2025-01-26T00:00:00"
  },
  {
    id: 5,
    title: "Digital Oscilloscope DIY",
    description: "Build a compact oscilloscope using STM32 microcontroller and TFT display.",
    user: {
      usename: "David Kumar",
      email: "david.kumar@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-05T00:00:00",
      updated_at: "2024-01-05T00:00:00"
    },
    category: "STM32",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "STM32",
      "Sensors"
    ],
    likes: 298,
    comments: [
      {
        id: 5,
        comment: "Discussion thread for Digital Oscilloscope DIY.",
        created_at: "2025-02-02T00:00:00",
        updated_at: "2025-02-02T00:00:00",
        user_id: 5
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?oscilloscope,stm32",
    created_at: "2025-02-02T00:00:00",
    updated_at: "2025-02-02T00:00:00"
  },
  {
    id: 6,
    title: "LoRa Sensor Network",
    description: "Long-range wireless environmental monitoring with sensors and LoRa communication.",
    user: {
      usename: "Jessica Lee",
      email: "jessica.lee@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-06T00:00:00",
      updated_at: "2024-01-06T00:00:00"
    },
    category: "IoT",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "IoT",
      "Sensors"
    ],
    likes: 367,
    comments: [
      {
        id: 6,
        comment: "Discussion thread for LoRa Sensor Network.",
        created_at: "2025-02-09T00:00:00",
        updated_at: "2025-02-09T00:00:00",
        user_id: 6
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?lora,network",
    created_at: "2025-02-09T00:00:00",
    updated_at: "2025-02-09T00:00:00"
  },
  {
    id: 7,
    title: "Smart Light Controller",
    description: "Arduino-based RGB lighting controller with sound-reactive effects.",
    user: {
      usename: "Alex Chen",
      email: "alex.chen@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-01T00:00:00",
      updated_at: "2024-01-01T00:00:00"
    },
    category: "Arduino",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "Arduino",
      "Sensors"
    ],
    likes: 255,
    comments: [
      {
        id: 7,
        comment: "Discussion thread for Smart Light Controller.",
        created_at: "2025-02-16T00:00:00",
        updated_at: "2025-02-16T00:00:00",
        user_id: 7
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?arduino,led",
    created_at: "2025-02-16T00:00:00",
    updated_at: "2025-02-16T00:00:00"
  },
  {
    id: 8,
    title: "Raspberry Pi Media Center",
    description: "Transform your TV into a smart entertainment center using Raspberry Pi.",
    user: {
      usename: "Daniel Cho",
      email: "daniel.cho@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-08T00:00:00",
      updated_at: "2024-01-08T00:00:00"
    },
    category: "Raspberry Pi",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Raspberry Pi"
    ],
    likes: 512,
    comments: [
      {
        id: 8,
        comment: "Discussion thread for Raspberry Pi Media Center.",
        created_at: "2025-02-23T00:00:00",
        updated_at: "2025-02-23T00:00:00",
        user_id: 8
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?raspberry-pi,media",
    created_at: "2025-02-23T00:00:00",
    updated_at: "2025-02-23T00:00:00"
  },
  {
    id: 9,
    title: "3D Printed Robot Arm",
    description: "Robotic arm with servo control for automation tasks and teaching robotics.",
    user: {
      usename: "Linda Wong",
      email: "linda.wong@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-09T00:00:00",
      updated_at: "2024-01-09T00:00:00"
    },
    category: "Robotics",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "Robotics",
      "Arduino"
    ],
    likes: 342,
    comments: [
      {
        id: 9,
        comment: "Discussion thread for 3D Printed Robot Arm.",
        created_at: "2025-03-02T00:00:00",
        updated_at: "2025-03-02T00:00:00",
        user_id: 9
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?robot,arm",
    created_at: "2025-03-02T00:00:00",
    updated_at: "2025-03-02T00:00:00"
  },
  {
    id: 10,
    title: "ESP32 Security Camera",
    description: "Compact camera module using ESP32-CAM with motion detection alerts.",
    user: {
      usename: "Amir Rahman",
      email: "amir.rahman@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-10T00:00:00",
      updated_at: "2024-01-10T00:00:00"
    },
    category: "ESP32",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "ESP32",
      "IoT"
    ],
    likes: 412,
    comments: [
      {
        id: 10,
        comment: "Discussion thread for ESP32 Security Camera.",
        created_at: "2025-03-09T00:00:00",
        updated_at: "2025-03-09T00:00:00",
        user_id: 10
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?camera,esp32",
    created_at: "2025-03-09T00:00:00",
    updated_at: "2025-03-09T00:00:00"
  },
  {
    id: 11,
    title: "Plant Monitoring System",
    description: "IoT-based plant health tracker using moisture and light sensors.",
    user: {
      usename: "Sabrina Ho",
      email: "sabrina.ho@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-11T00:00:00",
      updated_at: "2024-01-11T00:00:00"
    },
    category: "IoT",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "IoT",
      "Sensors",
      "Arduino"
    ],
    likes: 289,
    comments: [
      {
        id: 11,
        comment: "Discussion thread for Plant Monitoring System.",
        created_at: "2025-03-16T00:00:00",
        updated_at: "2025-03-16T00:00:00",
        user_id: 11
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?plant,iot",
    created_at: "2025-03-16T00:00:00",
    updated_at: "2025-03-16T00:00:00"
  },
  {
    id: 12,
    title: "Environmental Air Monitor",
    description: "Portable PM2.5, temperature and humidity monitoring device.",
    user: {
      usename: "Kevin Liu",
      email: "kevin.liu@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-12T00:00:00",
      updated_at: "2024-01-12T00:00:00"
    },
    category: "Sensors",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Sensors",
      "ESP32"
    ],
    likes: 301,
    comments: [
      {
        id: 12,
        comment: "Discussion thread for Environmental Air Monitor.",
        created_at: "2025-03-23T00:00:00",
        updated_at: "2025-03-23T00:00:00",
        user_id: 12
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?air,quality",
    created_at: "2025-03-23T00:00:00",
    updated_at: "2025-03-23T00:00:00"
  },
  {
    id: 13,
    title: "Raspberry Pi Retro Console",
    description: "Build a retro gaming console using Raspberry Pi and RetroPie.",
    user: {
      usename: "George Tan",
      email: "george.tan@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-13T00:00:00",
      updated_at: "2024-01-13T00:00:00"
    },
    category: "Raspberry Pi",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Raspberry Pi"
    ],
    likes: 478,
    comments: [
      {
        id: 13,
        comment: "Discussion thread for Raspberry Pi Retro Console.",
        created_at: "2025-03-30T00:00:00",
        updated_at: "2025-03-30T00:00:00",
        user_id: 13
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?retro,gaming",
    created_at: "2025-03-30T00:00:00",
    updated_at: "2025-03-30T00:00:00"
  },
  {
    id: 14,
    title: "Smart Mirror Display",
    description: "Two-way mirror with Raspberry Pi displaying weather and calendar.",
    user: {
      usename: "Emily Zhao",
      email: "emily.zhao@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-14T00:00:00",
      updated_at: "2024-01-14T00:00:00"
    },
    category: "Raspberry Pi",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Raspberry Pi",
      "IoT"
    ],
    likes: 612,
    comments: [
      {
        id: 14,
        comment: "Discussion thread for Smart Mirror Display.",
        created_at: "2025-04-06T00:00:00",
        updated_at: "2025-04-06T00:00:00",
        user_id: 14
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?mirror,smart",
    created_at: "2025-04-06T00:00:00",
    updated_at: "2025-04-06T00:00:00"
  },
  {
    id: 15,
    title: "PCB Power Regulator",
    description: "Efficient voltage regulator board with custom PCB layout.",
    user: {
      usename: "Hassan Noor",
      email: "hassan.noor@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-15T00:00:00",
      updated_at: "2024-01-15T00:00:00"
    },
    category: "PCB Design",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "PCB Design"
    ],
    likes: 320,
    comments: [
      {
        id: 15,
        comment: "Discussion thread for PCB Power Regulator.",
        created_at: "2025-04-13T00:00:00",
        updated_at: "2025-04-13T00:00:00",
        user_id: 15
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?pcb,board",
    created_at: "2025-04-13T00:00:00",
    updated_at: "2025-04-13T00:00:00"
  },
  {
    id: 16,
    title: "STM32 Flight Controller",
    description: "Lightweight drone flight controller developed using STM32 MCU.",
    user: {
      usename: "Julie Kim",
      email: "julie.kim@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-16T00:00:00",
      updated_at: "2024-01-16T00:00:00"
    },
    category: "STM32",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "STM32",
      "Sensors"
    ],
    likes: 456,
    comments: [
      {
        id: 16,
        comment: "Discussion thread for STM32 Flight Controller.",
        created_at: "2025-04-20T00:00:00",
        updated_at: "2025-04-20T00:00:00",
        user_id: 16
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?drone,controller",
    created_at: "2025-04-20T00:00:00",
    updated_at: "2025-04-20T00:00:00"
  },
  {
    id: 17,
    title: "Robotic Line Follower",
    description: "Simple robotics project using IR sensors and Arduino.",
    user: {
      usename: "Ben Carter",
      email: "ben.carter@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-17T00:00:00",
      updated_at: "2024-01-17T00:00:00"
    },
    category: "Robotics",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Robotics",
      "Arduino",
      "Sensors"
    ],
    likes: 410,
    comments: [
      {
        id: 17,
        comment: "Discussion thread for Robotic Line Follower.",
        created_at: "2025-04-27T00:00:00",
        updated_at: "2025-04-27T00:00:00",
        user_id: 17
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?robot,line",
    created_at: "2025-04-27T00:00:00",
    updated_at: "2025-04-27T00:00:00"
  },
  {
    id: 18,
    title: "Smart Thermostat",
    description: "AI-enabled thermostat using ESP32 with temperature prediction.",
    user: {
      usename: "Karen White",
      email: "karen.white@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-18T00:00:00",
      updated_at: "2024-01-18T00:00:00"
    },
    category: "IoT",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "IoT",
      "ESP32",
      "Sensors"
    ],
    likes: 389,
    comments: [
      {
        id: 18,
        comment: "Discussion thread for Smart Thermostat.",
        created_at: "2025-05-04T00:00:00",
        updated_at: "2025-05-04T00:00:00",
        user_id: 18
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?thermostat,iot",
    created_at: "2025-05-04T00:00:00",
    updated_at: "2025-05-04T00:00:00"
  },
  {
    id: 19,
    title: "RFID Door Lock System",
    description: "Arduino-controlled security lock using RFID authentication.",
    user: {
      usename: "Alex Chen",
      email: "alex.chen@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-01T00:00:00",
      updated_at: "2024-01-01T00:00:00"
    },
    category: "Arduino",
    proficiency: "ADVANCED",
    curated: true,
    tags: [
      "Arduino",
      "Sensors"
    ],
    likes: 312,
    comments: [
      {
        id: 19,
        comment: "Discussion thread for RFID Door Lock System.",
        created_at: "2025-05-11T00:00:00",
        updated_at: "2025-05-11T00:00:00",
        user_id: 19
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?rfid,lock",
    created_at: "2025-05-11T00:00:00",
    updated_at: "2025-05-11T00:00:00"
  },
  {
    id: 20,
    title: "ESP32 GPS Tracker",
    description: "Vehicle tracking system with GPS and IoT cloud logging.",
    user: {
      usename: "Rachel Adams",
      email: "rachel.adams@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-20T00:00:00",
      updated_at: "2024-01-20T00:00:00"
    },
    category: "ESP32",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "ESP32",
      "IoT"
    ],
    likes: 445,
    comments: [
      {
        id: 20,
        comment: "Discussion thread for ESP32 GPS Tracker.",
        created_at: "2025-05-18T00:00:00",
        updated_at: "2025-05-18T00:00:00",
        user_id: 20
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?gps,esp32",
    created_at: "2025-05-18T00:00:00",
    updated_at: "2025-05-18T00:00:00"
  },
  {
    id: 21,
    title: "STM32 Robot Controller",
    description: "Advanced robot motor and sensor controller using STM32.",
    user: {
      usename: "Daniel Foster",
      email: "daniel.foster@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-21T00:00:00",
      updated_at: "2024-01-21T00:00:00"
    },
    category: "STM32",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "STM32",
      "Robotics"
    ],
    likes: 534,
    comments: [
      {
        id: 21,
        comment: "Discussion thread for STM32 Robot Controller.",
        created_at: "2025-05-25T00:00:00",
        updated_at: "2025-05-25T00:00:00",
        user_id: 21
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?stm32,robot",
    created_at: "2025-05-25T00:00:00",
    updated_at: "2025-05-25T00:00:00"
  },
  {
    id: 22,
    title: "PCB Sensor Module",
    description: "Modular PCB with multiple integrated environmental sensors.",
    user: {
      usename: "Alex Chen",
      email: "alex.chen@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-01T00:00:00",
      updated_at: "2024-01-01T00:00:00"
    },
    category: "PCB Design",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "PCB Design",
      "Sensors"
    ],
    likes: 278,
    comments: [
      {
        id: 22,
        comment: "Discussion thread for PCB Sensor Module.",
        created_at: "2025-06-01T00:00:00",
        updated_at: "2025-06-01T00:00:00",
        user_id: 22
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?pcb,sensor",
    created_at: "2025-06-01T00:00:00",
    updated_at: "2025-06-01T00:00:00"
  },
  {
    id: 23,
    title: "Raspberry Pi Home Server",
    description: "Always-on home server with backups, media, and file storage.",
    user: {
      usename: "Kevin Zhang",
      email: "kevin.zhang@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-23T00:00:00",
      updated_at: "2024-01-23T00:00:00"
    },
    category: "Raspberry Pi",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Raspberry Pi"
    ],
    likes: 823,
    comments: [
      {
        id: 23,
        comment: "Discussion thread for Raspberry Pi Home Server.",
        created_at: "2025-06-08T00:00:00",
        updated_at: "2025-06-08T00:00:00",
        user_id: 23
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?server,raspberrypi",
    created_at: "2025-06-08T00:00:00",
    updated_at: "2025-06-08T00:00:00"
  },
  {
    id: 24,
    title: "Arduino Pet Feeder",
    description: "Automated pet feeder with scheduling and weight sensors.",
    user: {
      usename: "Julia Martinez",
      email: "julia.martinez@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-01-24T00:00:00",
      updated_at: "2024-01-24T00:00:00"
    },
    category: "Arduino",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Arduino",
      "Sensors"
    ],
    likes: 456,
    comments: [
      {
        id: 24,
        comment: "Discussion thread for Arduino Pet Feeder.",
        created_at: "2025-06-15T00:00:00",
        updated_at: "2025-06-15T00:00:00",
        user_id: 24
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?pet,arduino",
    created_at: "2025-06-15T00:00:00",
    updated_at: "2025-06-15T00:00:00"
  },
  {
    id: 25,
    title: "Solar-Powered Weather Node",
    description: "Low-power ESP32-based weather node powered by a small solar panel.",
    user: {
      usename: "Liam Turner",
      email: "liam.turner@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-01T00:00:00",
      updated_at: "2024-02-01T00:00:00"
    },
    category: "ESP32",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "ESP32",
      "IoT",
      "Sensors"
    ],
    likes: 421,
    comments: [
      {
        id: 25,
        comment: "Discussion thread for Solar-Powered Weather Node.",
        created_at: "2025-06-22T00:00:00",
        updated_at: "2025-06-22T00:00:00",
        user_id: 25
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?solar,weather",
    created_at: "2025-06-22T00:00:00",
    updated_at: "2025-06-22T00:00:00"
  },
  {
    id: 26,
    title: "Bluetooth LED Matrix Sign",
    description: "Arduino-controlled LED matrix sign configurable via Bluetooth app.",
    user: {
      usename: "Noah Smith",
      email: "noah.smith@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-02T00:00:00",
      updated_at: "2024-02-02T00:00:00"
    },
    category: "Arduino",
    proficiency: "BEGINNER",
    curated: true,
    tags: [
      "Arduino",
      "LED",
      "Bluetooth"
    ],
    likes: 198,
    comments: [
      {
        id: 26,
        comment: "Discussion thread for Bluetooth LED Matrix Sign.",
        created_at: "2025-06-29T00:00:00",
        updated_at: "2025-06-29T00:00:00",
        user_id: 26
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?led,matrix",
    created_at: "2025-06-29T00:00:00",
    updated_at: "2025-06-29T00:00:00"
  },
  {
    id: 27,
    title: "Indoor Air Quality Dashboard",
    description: "Raspberry Pi dashboard showing live CO2, temperature and humidity levels.",
    user: {
      usename: "Olivia Brown",
      email: "olivia.brown@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-03T00:00:00",
      updated_at: "2024-02-03T00:00:00"
    },
    category: "Raspberry Pi",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Raspberry Pi",
      "Sensors",
      "Dashboard"
    ],
    likes: 474,
    comments: [
      {
        id: 27,
        comment: "Discussion thread for Indoor Air Quality Dashboard.",
        created_at: "2025-07-06T00:00:00",
        updated_at: "2025-07-06T00:00:00",
        user_id: 27
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?air,dashboard",
    created_at: "2025-07-06T00:00:00",
    updated_at: "2025-07-06T00:00:00"
  },
  {
    id: 28,
    title: "STM32 Signal Generator",
    description: "Programmable waveform generator using an STM32 and DAC output.",
    user: {
      usename: "Ethan Davis",
      email: "ethan.davis@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-04T00:00:00",
      updated_at: "2024-02-04T00:00:00"
    },
    category: "STM32",
    proficiency: "ADVANCED",
    curated: true,
    tags: [
      "STM32",
      "Signal",
      "Electronics"
    ],
    likes: 389,
    comments: [
      {
        id: 28,
        comment: "Discussion thread for STM32 Signal Generator.",
        created_at: "2025-07-13T00:00:00",
        updated_at: "2025-07-13T00:00:00",
        user_id: 28
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?signal,generator",
    created_at: "2025-07-13T00:00:00",
    updated_at: "2025-07-13T00:00:00"
  },
  {
    id: 29,
    title: "LoRa-based Smart Agriculture",
    description: "Long-range soil and climate monitoring network for smart farming.",
    user: {
      usename: "Sophia Green",
      email: "sophia.green@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-05T00:00:00",
      updated_at: "2024-02-05T00:00:00"
    },
    category: "IoT",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "IoT",
      "LoRa",
      "Agriculture"
    ],
    likes: 502,
    comments: [
      {
        id: 29,
        comment: "Discussion thread for LoRa-based Smart Agriculture.",
        created_at: "2025-07-20T00:00:00",
        updated_at: "2025-07-20T00:00:00",
        user_id: 29
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?agriculture,iot",
    created_at: "2025-07-20T00:00:00",
    updated_at: "2025-07-20T00:00:00"
  },
  {
    id: 30,
    title: "Robotic Vacuum Prototype",
    description: "DIY robotic vacuum platform with basic room mapping.",
    user: {
      usename: "James Hall",
      email: "james.hall@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-06T00:00:00",
      updated_at: "2024-02-06T00:00:00"
    },
    category: "Robotics",
    proficiency: "ADVANCED",
    curated: true,
    tags: [
      "Robotics",
      "Sensors",
      "Mapping"
    ],
    likes: 433,
    comments: [
      {
        id: 30,
        comment: "Discussion thread for Robotic Vacuum Prototype.",
        created_at: "2025-07-27T00:00:00",
        updated_at: "2025-07-27T00:00:00",
        user_id: 30
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?robot,vacuum",
    created_at: "2025-07-27T00:00:00",
    updated_at: "2025-07-27T00:00:00"
  },
  {
    id: 31,
    title: "Smart Garage Door Opener",
    description: "ESP32-based garage door opener with smartphone control.",
    user: {
      usename: "Mia Carter",
      email: "mia.carter@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-07T00:00:00",
      updated_at: "2024-02-07T00:00:00"
    },
    category: "ESP32",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "ESP32",
      "IoT"
    ],
    likes: 312,
    comments: [
      {
        id: 31,
        comment: "Discussion thread for Smart Garage Door Opener.",
        created_at: "2025-08-03T00:00:00",
        updated_at: "2025-08-03T00:00:00",
        user_id: 31
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?garage,door",
    created_at: "2025-08-03T00:00:00",
    updated_at: "2025-08-03T00:00:00"
  },
  {
    id: 32,
    title: "Wearable Fitness Tracker",
    description: "Low-cost fitness tracker using STM32 and Bluetooth LE.",
    user: {
      usename: "Ava Johnson",
      email: "ava.johnson@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-08T00:00:00",
      updated_at: "2024-02-08T00:00:00"
    },
    category: "STM32",
    proficiency: "ADVANCED",
    curated: true,
    tags: [
      "STM32",
      "Wearable",
      "Bluetooth"
    ],
    likes: 487,
    comments: [
      {
        id: 32,
        comment: "Discussion thread for Wearable Fitness Tracker.",
        created_at: "2025-08-10T00:00:00",
        updated_at: "2025-08-10T00:00:00",
        user_id: 32
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?fitness,tracker",
    created_at: "2025-08-10T00:00:00",
    updated_at: "2025-08-10T00:00:00"
  },
  {
    id: 33,
    title: "Raspberry Pi Smart Doorbell",
    description: "Network-connected doorbell with camera and motion alerts.",
    user: {
      usename: "William Scott",
      email: "william.scott@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-09T00:00:00",
      updated_at: "2024-02-09T00:00:00"
    },
    category: "Raspberry Pi",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Raspberry Pi",
      "Camera",
      "IoT"
    ],
    likes: 536,
    comments: [
      {
        id: 33,
        comment: "Discussion thread for Raspberry Pi Smart Doorbell.",
        created_at: "2025-08-17T00:00:00",
        updated_at: "2025-08-17T00:00:00",
        user_id: 33
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?doorbell,camera",
    created_at: "2025-08-17T00:00:00",
    updated_at: "2025-08-17T00:00:00"
  },
  {
    id: 34,
    title: "PCB Audio Amplifier",
    description: "Compact PCB design for a stereo audio amplifier.",
    user: {
      usename: "Isabella Moore",
      email: "isabella.moore@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-10T00:00:00",
      updated_at: "2024-02-10T00:00:00"
    },
    category: "PCB Design",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "PCB Design",
      "Audio"
    ],
    likes: 284,
    comments: [
      {
        id: 34,
        comment: "Discussion thread for PCB Audio Amplifier.",
        created_at: "2025-08-24T00:00:00",
        updated_at: "2025-08-24T00:00:00",
        user_id: 34
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?audio,amplifier",
    created_at: "2025-08-24T00:00:00",
    updated_at: "2025-08-24T00:00:00"
  },
  {
    id: 35,
    title: "Smart Greenhouse Controller",
    description: "Automated greenhouse system managing light, temperature and irrigation.",
    user: {
      usename: "Lucas Perez",
      email: "lucas.perez@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-11T00:00:00",
      updated_at: "2024-02-11T00:00:00"
    },
    category: "IoT",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "IoT",
      "Agriculture",
      "Automation"
    ],
    likes: 509,
    comments: [
      {
        id: 35,
        comment: "Discussion thread for Smart Greenhouse Controller.",
        created_at: "2025-08-31T00:00:00",
        updated_at: "2025-08-31T00:00:00",
        user_id: 35
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?greenhouse,automation",
    created_at: "2025-08-31T00:00:00",
    updated_at: "2025-08-31T00:00:00"
  },
  {
    id: 36,
    title: "Self-Balancing Robot",
    description: "Two-wheeled self-balancing robot using IMU sensors.",
    user: {
      usename: "Charlotte King",
      email: "charlotte.king@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-12T00:00:00",
      updated_at: "2024-02-12T00:00:00"
    },
    category: "Robotics",
    proficiency: "ADVANCED",
    curated: true,
    tags: [
      "Robotics",
      "Sensors",
      "Control"
    ],
    likes: 547,
    comments: [
      {
        id: 36,
        comment: "Discussion thread for Self-Balancing Robot.",
        created_at: "2025-09-07T00:00:00",
        updated_at: "2025-09-07T00:00:00",
        user_id: 36
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?robot,self-balancing",
    created_at: "2025-09-07T00:00:00",
    updated_at: "2025-09-07T00:00:00"
  },
  {
    id: 37,
    title: "Low-Power Remote Sensor Node",
    description: "Battery-optimized STM32 sensor node with deep sleep strategy.",
    user: {
      usename: "Henry Young",
      email: "henry.young@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-13T00:00:00",
      updated_at: "2024-02-13T00:00:00"
    },
    category: "STM32",
    proficiency: "ADVANCED",
    curated: false,
    tags: [
      "STM32",
      "Low Power",
      "Sensors"
    ],
    likes: 331,
    comments: [
      {
        id: 37,
        comment: "Discussion thread for Low-Power Remote Sensor Node.",
        created_at: "2025-09-14T00:00:00",
        updated_at: "2025-09-14T00:00:00",
        user_id: 37
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?low-power,sensor",
    created_at: "2025-09-14T00:00:00",
    updated_at: "2025-09-14T00:00:00"
  },
  {
    id: 38,
    title: "Smart Lighting Dashboard",
    description: "Central dashboard for monitoring and controlling home lighting.",
    user: {
      usename: "Amelia Rivera",
      email: "amelia.rivera@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-14T00:00:00",
      updated_at: "2024-02-14T00:00:00"
    },
    category: "IoT",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "IoT",
      "Dashboard",
      "Lighting"
    ],
    likes: 292,
    comments: [
      {
        id: 38,
        comment: "Discussion thread for Smart Lighting Dashboard.",
        created_at: "2025-09-21T00:00:00",
        updated_at: "2025-09-21T00:00:00",
        user_id: 38
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?lighting,dashboard",
    created_at: "2025-09-21T00:00:00",
    updated_at: "2025-09-21T00:00:00"
  },
  {
    id: 39,
    title: "Multi-Sensor Wearable Badge",
    description: "Conference badge with motion, temperature and proximity sensors.",
    user: {
      usename: "Jackson Lee",
      email: "jackson.lee@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-15T00:00:00",
      updated_at: "2024-02-15T00:00:00"
    },
    category: "Sensors",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Sensors",
      "Wearable"
    ],
    likes: 468,
    comments: [
      {
        id: 39,
        comment: "Discussion thread for Multi-Sensor Wearable Badge.",
        created_at: "2025-09-28T00:00:00",
        updated_at: "2025-09-28T00:00:00",
        user_id: 39
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?badge,wearable",
    created_at: "2025-09-28T00:00:00",
    updated_at: "2025-09-28T00:00:00"
  },
  {
    id: 40,
    title: "Raspberry Pi Weather Map",
    description: "Wall-mounted display showing live global weather conditions.",
    user: {
      usename: "Harper Flores",
      email: "harper.flores@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-16T00:00:00",
      updated_at: "2024-02-16T00:00:00"
    },
    category: "Raspberry Pi",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Raspberry Pi",
      "Display",
      "Weather"
    ],
    likes: 522,
    comments: [
      {
        id: 40,
        comment: "Discussion thread for Raspberry Pi Weather Map.",
        created_at: "2025-10-05T00:00:00",
        updated_at: "2025-10-05T00:00:00",
        user_id: 40
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?weather,map",
    created_at: "2025-10-05T00:00:00",
    updated_at: "2025-10-05T00:00:00"
  },
  {
    id: 41,
    title: "USB-C Power Tester",
    description: "Handheld USB-C power and protocol tester with OLED display.",
    user: {
      usename: "Grace Cooper",
      email: "grace.cooper@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-17T00:00:00",
      updated_at: "2024-02-17T00:00:00"
    },
    category: "PCB Design",
    proficiency: "ADVANCED",
    curated: true,
    tags: [
      "PCB Design",
      "Power",
      "USB-C"
    ],
    likes: 497,
    comments: [
      {
        id: 41,
        comment: "Discussion thread for USB-C Power Tester.",
        created_at: "2025-10-12T00:00:00",
        updated_at: "2025-10-12T00:00:00",
        user_id: 41
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?usb,tester",
    created_at: "2025-10-12T00:00:00",
    updated_at: "2025-10-12T00:00:00"
  },
  {
    id: 42,
    title: "Arduino Music Visualizer",
    description: "Sound-reactive LED strip visualizer for music playback.",
    user: {
      usename: "Victoria Hughes",
      email: "victoria.hughes@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-18T00:00:00",
      updated_at: "2024-02-18T00:00:00"
    },
    category: "Arduino",
    proficiency: "BEGINNER",
    curated: false,
    tags: [
      "Arduino",
      "LED",
      "Audio"
    ],
    likes: 276,
    comments: [
      {
        id: 42,
        comment: "Discussion thread for Arduino Music Visualizer.",
        created_at: "2025-10-19T00:00:00",
        updated_at: "2025-10-19T00:00:00",
        user_id: 42
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?music,led",
    created_at: "2025-10-19T00:00:00",
    updated_at: "2025-10-19T00:00:00"
  },
  {
    id: 43,
    title: "IoT Water Leak Detector",
    description: "Wi-Fi enabled water leak detection system for home safety.",
    user: {
      usename: "Sebastian Brooks",
      email: "sebastian.brooks@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-19T00:00:00",
      updated_at: "2024-02-19T00:00:00"
    },
    category: "IoT",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "IoT",
      "Sensors",
      "Home"
    ],
    likes: 458,
    comments: [
      {
        id: 43,
        comment: "Discussion thread for IoT Water Leak Detector.",
        created_at: "2025-10-26T00:00:00",
        updated_at: "2025-10-26T00:00:00",
        user_id: 43
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?water,leak",
    created_at: "2025-10-26T00:00:00",
    updated_at: "2025-10-26T00:00:00"
  },
  {
    id: 44,
    title: "Robotic Arm Drawing Bot",
    description: "Desktop robotic arm capable of drawing vector graphics.",
    user: {
      usename: "Zoe Mitchell",
      email: "zoe.mitchell@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-20T00:00:00",
      updated_at: "2024-02-20T00:00:00"
    },
    category: "Robotics",
    proficiency: "ADVANCED",
    curated: true,
    tags: [
      "Robotics",
      "Drawing"
    ],
    likes: 539,
    comments: [
      {
        id: 44,
        comment: "Discussion thread for Robotic Arm Drawing Bot.",
        created_at: "2025-11-02T00:00:00",
        updated_at: "2025-11-02T00:00:00",
        user_id: 44
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?robot,drawing",
    created_at: "2025-11-02T00:00:00",
    updated_at: "2025-11-02T00:00:00"
  },
  {
    id: 45,
    title: "Environmental Sensor Hat for Pi",
    description: "Stackable sensor hat with temperature, humidity and pressure sensors.",
    user: {
      usename: "Leo Ward",
      email: "leo.ward@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-21T00:00:00",
      updated_at: "2024-02-21T00:00:00"
    },
    category: "Raspberry Pi",
    proficiency: "INTERMEDIATE",
    curated: false,
    tags: [
      "Raspberry Pi",
      "Sensors"
    ],
    likes: 327,
    comments: [
      {
        id: 45,
        comment: "Discussion thread for Environmental Sensor Hat for Pi.",
        created_at: "2025-11-09T00:00:00",
        updated_at: "2025-11-09T00:00:00",
        user_id: 45
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?raspberrypi,sensor",
    created_at: "2025-11-09T00:00:00",
    updated_at: "2025-11-09T00:00:00"
  },
  {
    id: 46,
    title: "Wireless Power Meter",
    description: "Smart meter that monitors household power usage and uploads data to the cloud.",
    user: {
      usename: "Chloe Barnes",
      email: "chloe.barnes@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-22T00:00:00",
      updated_at: "2024-02-22T00:00:00"
    },
    category: "ESP32",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "ESP32",
      "IoT",
      "Power"
    ],
    likes: 492,
    comments: [
      {
        id: 46,
        comment: "Discussion thread for Wireless Power Meter.",
        created_at: "2025-11-16T00:00:00",
        updated_at: "2025-11-16T00:00:00",
        user_id: 46
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?power,meter",
    created_at: "2025-11-16T00:00:00",
    updated_at: "2025-11-16T00:00:00"
  },
  {
    id: 47,
    title: "Portable Logic Analyzer",
    description: "Pocket-sized logic analyzer with STM32 and USB interface.",
    user: {
      usename: "Nathan Rogers",
      email: "nathan.rogers@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-23T00:00:00",
      updated_at: "2024-02-23T00:00:00"
    },
    category: "STM32",
    proficiency: "ADVANCED",
    curated: true,
    tags: [
      "STM32",
      "Tools",
      "Debug"
    ],
    likes: 518,
    comments: [
      {
        id: 47,
        comment: "Discussion thread for Portable Logic Analyzer.",
        created_at: "2025-11-23T00:00:00",
        updated_at: "2025-11-23T00:00:00",
        user_id: 47
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?logic,analyzer",
    created_at: "2025-11-23T00:00:00",
    updated_at: "2025-11-23T00:00:00"
  },
  {
    id: 48,
    title: "Smart Bike Computer",
    description: "Handlebar-mounted bike computer with GPS and heart rate display.",
    user: {
      usename: "Lily Patterson",
      email: "lily.patterson@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-24T00:00:00",
      updated_at: "2024-02-24T00:00:00"
    },
    category: "IoT",
    proficiency: "ADVANCED",
    curated: true,
    tags: [
      "IoT",
      "GPS",
      "Wearable"
    ],
    likes: 563,
    comments: [
      {
        id: 48,
        comment: "Discussion thread for Smart Bike Computer.",
        created_at: "2025-11-30T00:00:00",
        updated_at: "2025-11-30T00:00:00",
        user_id: 48
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?bike,computer",
    created_at: "2025-11-30T00:00:00",
    updated_at: "2025-11-30T00:00:00"
  },
  {
    id: 49,
    title: "Raspberry Pi Time-Lapse Rig",
    description: "Motorized camera slider controlled by Raspberry Pi for time-lapse photography.",
    user: {
      usename: "Eleanor Griffin",
      email: "eleanor.griffin@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-25T00:00:00",
      updated_at: "2024-02-25T00:00:00"
    },
    category: "Raspberry Pi",
    proficiency: "INTERMEDIATE",
    curated: true,
    tags: [
      "Raspberry Pi",
      "Camera",
      "Motion"
    ],
    likes: 546,
    comments: [
      {
        id: 49,
        comment: "Discussion thread for Raspberry Pi Time-Lapse Rig.",
        created_at: "2025-12-07T00:00:00",
        updated_at: "2025-12-07T00:00:00",
        user_id: 49
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?timelapse,camera",
    created_at: "2025-12-07T00:00:00",
    updated_at: "2025-12-07T00:00:00"
  },
  {
    id: 50,
    title: "Modular Sensor Experiment Kit",
    description: "Classroom-friendly kit of swappable sensor modules and tutorials.",
    user: {
      usename: "Madison Powell",
      email: "madison.powell@example.com",
      password: "5d41402abc4b2a76b9719d911017c592",
      role: "CREATOR",
      created_at: "2024-02-26T00:00:00",
      updated_at: "2024-02-26T00:00:00"
    },
    category: "Sensors",
    proficiency: "BEGINNER",
    curated: true,
    tags: [
      "Sensors",
      "Education",
      "Kit"
    ],
    likes: 489,
    comments: [
      {
        id: 50,
        comment: "Discussion thread for Modular Sensor Experiment Kit.",
        created_at: "2025-12-14T00:00:00",
        updated_at: "2025-12-14T00:00:00",
        user_id: 50
      }
    ],
    imageUrl: "https://source.unsplash.com/400x300/?sensors,education",
    created_at: "2025-12-14T00:00:00",
    updated_at: "2025-12-14T00:00:00"
  }
]