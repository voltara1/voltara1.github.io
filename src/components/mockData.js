const mockProjects = [
    {
        id: 1,
        title: "Smart Home Automation Hub",
        description: "Complete IoT system for home automation with temperature sensors and remote control.",
        detailed_description:
            "This Arduino project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Alex Chen",
            email: "alex.chen@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-01T00:00:00",
            updated_at: "2024-01-01T00:00:00"
        },
        category: {
            id: 1,
            name: "Arduino",
            description: "All topics on IoT projects using Arduino"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["Arduino", "IoT", "Sensors"],
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
        updated_at: "2025-01-05T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?smart-home,iot",
        schematic_img: "https://source.unsplash.com/400x300/?smart-home,iot",
        pcb_layout_img: "https://source.unsplash.com/400x300/?smart-home,iot",
        bom_img: "https://source.unsplash.com/400x300/?smart-home,iot"
    },
    {
        id: 2,
        title: "WiFi Weather Station",
        description: "ESP32-based weather monitoring system with cloud connectivity and data logging.",
        detailed_description:
            "This ESP32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Sarah Martinez",
            email: "sarah.martinez@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-02T00:00:00",
            updated_at: "2024-01-02T00:00:00"
        },
        category: {
            id: 2,
            name: "ESP32",
            description: "All topics on IoT projects using ESP32"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["ESP32", "IoT", "Sensors"],
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
        updated_at: "2025-01-12T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?weather,station",
        schematic_img: "https://source.unsplash.com/400x300/?weather,station",
        pcb_layout_img: "https://source.unsplash.com/400x300/?weather,station",
        bom_img: "https://source.unsplash.com/400x300/?weather,station"
    },
    {
        id: 3,
        title: "AI-Powered Robot Car",
        description: "Autonomous robot car using Raspberry Pi with computer vision and obstacle avoidance.",
        detailed_description:
            "This Robotics project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Michael Park",
            email: "michael.park@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-03T00:00:00",
            updated_at: "2024-01-03T00:00:00"
        },
        category: {
            id: 3,
            name: "Robotics",
            description: "All topics on robotics, motion control and automation"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Robotics", "Raspberry Pi", "STM32"],
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
        updated_at: "2025-01-19T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?robot,car",
        schematic_img: "https://source.unsplash.com/400x300/?robot,car",
        pcb_layout_img: "https://source.unsplash.com/400x300/?robot,car",
        bom_img: "https://source.unsplash.com/400x300/?robot,car"
    },
    {
        id: 4,
        title: "USB-C Power Delivery Board",
        description: "Custom PCB for USB-C power delivery with overvoltage and thermal protection.",
        detailed_description:
            "This PCB Design project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Emma Wilson",
            email: "emma.wilson@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-04T00:00:00",
            updated_at: "2024-01-04T00:00:00"
        },
        category: {
            id: 4,
            name: "PCB Design",
            description: "All topics on PCB layout, fabrication and power design"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["PCB Design", "Arduino", "STM32"],
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
        updated_at: "2025-01-26T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?pcb,circuit",
        schematic_img: "https://source.unsplash.com/400x300/?pcb,circuit",
        pcb_layout_img: "https://source.unsplash.com/400x300/?pcb,circuit",
        bom_img: "https://source.unsplash.com/400x300/?pcb,circuit"
    },
    {
        id: 5,
        title: "Digital Oscilloscope DIY",
        description: "Build a compact oscilloscope using STM32 microcontroller and TFT display.",
        detailed_description:
            "This STM32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "David Kumar",
            email: "david.kumar@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-05T00:00:00",
            updated_at: "2024-01-05T00:00:00"
        },
        category: {
            id: 5,
            name: "STM32",
            description: "All topics on STM32 microcontroller-based projects"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["STM32", "Sensors", "PCB Design"],
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
        updated_at: "2025-02-02T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?oscilloscope,stm32",
        schematic_img: "https://source.unsplash.com/400x300/?oscilloscope,stm32",
        pcb_layout_img: "https://source.unsplash.com/400x300/?oscilloscope,stm32",
        bom_img: "https://source.unsplash.com/400x300/?oscilloscope,stm32"
    },
    {
        id: 6,
        title: "LoRa Sensor Network",
        description: "Long-range wireless environmental monitoring with sensors and LoRa communication.",
        detailed_description:
            "This IoT project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Jessica Lee",
            email: "jessica.lee@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-06T00:00:00",
            updated_at: "2024-01-06T00:00:00"
        },
        category: {
            id: 6,
            name: "IoT",
            description: "All topics on Internet of Things systems and connectivity"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["IoT", "Arduino", "ESP32"],
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
        updated_at: "2025-02-09T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?lora,network",
        schematic_img: "https://source.unsplash.com/400x300/?lora,network",
        pcb_layout_img: "https://source.unsplash.com/400x300/?lora,network",
        bom_img: "https://source.unsplash.com/400x300/?lora,network"
    },
    {
        id: 7,
        title: "Smart Light Controller",
        description: "Arduino-based RGB lighting controller with sound-reactive effects.",
        detailed_description:
            "This Arduino project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Alex Chen",
            email: "alex.chen@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-01T00:00:00",
            updated_at: "2024-01-01T00:00:00"
        },
        category: {
            id: 1,
            name: "Arduino",
            description: "All topics on IoT projects using Arduino"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["Arduino", "IoT", "Sensors"],
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
        updated_at: "2025-02-16T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?arduino,led",
        schematic_img: "https://source.unsplash.com/400x300/?arduino,led",
        pcb_layout_img: "https://source.unsplash.com/400x300/?arduino,led",
        bom_img: "https://source.unsplash.com/400x300/?arduino,led"
    },
    {
        id: 8,
        title: "Raspberry Pi Media Center",
        description: "Transform your TV into a smart entertainment center using Raspberry Pi.",
        detailed_description:
            "This Raspberry Pi project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Daniel Cho",
            email: "daniel.cho@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-08T00:00:00",
            updated_at: "2024-01-08T00:00:00"
        },
        category: {
            id: 7,
            name: "Raspberry Pi",
            description: "All topics on projects using Raspberry Pi"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Raspberry Pi", "Robotics", "IoT"],
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
        updated_at: "2025-02-23T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?raspberry-pi,media",
        schematic_img: "https://source.unsplash.com/400x300/?raspberry-pi,media",
        pcb_layout_img: "https://source.unsplash.com/400x300/?raspberry-pi,media",
        bom_img: "https://source.unsplash.com/400x300/?raspberry-pi,media"
    },
    {
        id: 9,
        title: "3D Printed Robot Arm",
        description: "Robotic arm with servo control for automation tasks and teaching robotics.",
        detailed_description:
            "This Robotics project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Linda Wong",
            email: "linda.wong@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-09T00:00:00",
            updated_at: "2024-01-09T00:00:00"
        },
        category: {
            id: 3,
            name: "Robotics",
            description: "All topics on robotics, motion control and automation"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["Robotics", "Arduino", "STM32"],
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
        updated_at: "2025-03-02T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?robot,arm",
        schematic_img: "https://source.unsplash.com/400x300/?robot,arm",
        pcb_layout_img: "https://source.unsplash.com/400x300/?robot,arm",
        bom_img: "https://source.unsplash.com/400x300/?robot,arm"
    },
    {
        id: 10,
        title: "ESP32 Security Camera",
        description: "Compact camera module using ESP32-CAM with motion detection alerts.",
        detailed_description:
            "This ESP32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Amir Rahman",
            email: "amir.rahman@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-10T00:00:00",
            updated_at: "2024-01-10T00:00:00"
        },
        category: {
            id: 2,
            name: "ESP32",
            description: "All topics on IoT projects using ESP32"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["ESP32", "IoT", "Sensors"],
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
        updated_at: "2025-03-09T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?camera,esp32",
        schematic_img: "https://source.unsplash.com/400x300/?camera,esp32",
        pcb_layout_img: "https://source.unsplash.com/400x300/?camera,esp32",
        bom_img: "https://source.unsplash.com/400x300/?camera,esp32"
    },
    {
        id: 11,
        title: "Plant Monitoring System",
        description: "IoT-based plant health tracker using moisture and light sensors.",
        detailed_description:
            "This IoT project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Sabrina Ho",
            email: "sabrina.ho@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-11T00:00:00",
            updated_at: "2024-01-11T00:00:00"
        },
        category: {
            id: 6,
            name: "IoT",
            description: "All topics on Internet of Things systems and connectivity"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["IoT", "Arduino", "ESP32"],
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
        updated_at: "2025-03-16T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?plant,iot",
        schematic_img: "https://source.unsplash.com/400x300/?plant,iot",
        pcb_layout_img: "https://source.unsplash.com/400x300/?plant,iot",
        bom_img: "https://source.unsplash.com/400x300/?plant,iot"
    },
    {
        id: 12,
        title: "Environmental Air Monitor",
        description: "Portable PM2.5, temperature and humidity monitoring device.",
        detailed_description:
            "This Sensors project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Kevin Liu",
            email: "kevin.liu@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-12T00:00:00",
            updated_at: "2024-01-12T00:00:00"
        },
        category: {
            id: 8,
            name: "Sensors",
            description: "All topics on sensor integration and data acquisition"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Sensors", "IoT", "STM32"],
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
        updated_at: "2025-03-23T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?air,quality",
        schematic_img: "https://source.unsplash.com/400x300/?air,quality",
        pcb_layout_img: "https://source.unsplash.com/400x300/?air,quality",
        bom_img: "https://source.unsplash.com/400x300/?air,quality"
    },
    {
        id: 13,
        title: "Raspberry Pi Retro Console",
        description: "Build a retro gaming console using Raspberry Pi and RetroPie.",
        detailed_description:
            "This Raspberry Pi project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "George Tan",
            email: "george.tan@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-13T00:00:00",
            updated_at: "2024-01-13T00:00:00"
        },
        category: {
            id: 7,
            name: "Raspberry Pi",
            description: "All topics on projects using Raspberry Pi"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Raspberry Pi", "Robotics", "IoT"],
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
        updated_at: "2025-03-30T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?retro,gaming",
        schematic_img: "https://source.unsplash.com/400x300/?retro,gaming",
        pcb_layout_img: "https://source.unsplash.com/400x300/?retro,gaming",
        bom_img: "https://source.unsplash.com/400x300/?retro,gaming"
    },
    {
        id: 14,
        title: "Smart Mirror Display",
        description: "Two-way mirror with Raspberry Pi displaying weather and calendar.",
        detailed_description:
            "This Raspberry Pi project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Emily Zhao",
            email: "emily.zhao@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-14T00:00:00",
            updated_at: "2024-01-14T00:00:00"
        },
        category: {
            id: 7,
            name: "Raspberry Pi",
            description: "All topics on projects using Raspberry Pi"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Raspberry Pi", "Robotics", "IoT"],
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
        updated_at: "2025-04-06T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?mirror,smart",
        schematic_img: "https://source.unsplash.com/400x300/?mirror,smart",
        pcb_layout_img: "https://source.unsplash.com/400x300/?mirror,smart",
        bom_img: "https://source.unsplash.com/400x300/?mirror,smart"
    },
    {
        id: 15,
        title: "PCB Power Regulator",
        description: "Efficient voltage regulator board with custom PCB layout.",
        detailed_description:
            "This PCB Design project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Hassan Noor",
            email: "hassan.noor@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-15T00:00:00",
            updated_at: "2024-01-15T00:00:00"
        },
        category: {
            id: 4,
            name: "PCB Design",
            description: "All topics on PCB layout, fabrication and power design"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["PCB Design", "Arduino", "STM32"],
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
        updated_at: "2025-04-13T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?pcb,board",
        schematic_img: "https://source.unsplash.com/400x300/?pcb,board",
        pcb_layout_img: "https://source.unsplash.com/400x300/?pcb,board",
        bom_img: "https://source.unsplash.com/400x300/?pcb,board"
    },
    {
        id: 16,
        title: "STM32 Flight Controller",
        description: "Lightweight drone flight controller developed using STM32 MCU.",
        detailed_description:
            "This STM32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Julie Kim",
            email: "julie.kim@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-16T00:00:00",
            updated_at: "2024-01-16T00:00:00"
        },
        category: {
            id: 5,
            name: "STM32",
            description: "All topics on STM32 microcontroller-based projects"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["STM32", "Sensors", "PCB Design"],
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
        updated_at: "2025-04-20T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?drone,controller",
        schematic_img: "https://source.unsplash.com/400x300/?drone,controller",
        pcb_layout_img: "https://source.unsplash.com/400x300/?drone,controller",
        bom_img: "https://source.unsplash.com/400x300/?drone,controller"
    },
    {
        id: 17,
        title: "Robotic Line Follower",
        description: "Simple robotics project using IR sensors and Arduino.",
        detailed_description:
            "This Robotics project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Ben Carter",
            email: "ben.carter@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-17T00:00:00",
            updated_at: "2024-01-17T00:00:00"
        },
        category: {
            id: 3,
            name: "Robotics",
            description: "All topics on robotics, motion control and automation"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Robotics", "Arduino", "STM32"],
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
        updated_at: "2025-04-27T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?robot,line",
        schematic_img: "https://source.unsplash.com/400x300/?robot,line",
        pcb_layout_img: "https://source.unsplash.com/400x300/?robot,line",
        bom_img: "https://source.unsplash.com/400x300/?robot,line"
    },
    {
        id: 18,
        title: "Smart Thermostat",
        description: "AI-enabled thermostat using ESP32 with temperature prediction.",
        detailed_description:
            "This IoT project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Karen White",
            email: "karen.white@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-18T00:00:00",
            updated_at: "2024-01-18T00:00:00"
        },
        category: {
            id: 6,
            name: "IoT",
            description: "All topics on Internet of Things systems and connectivity"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["IoT", "Arduino", "ESP32"],
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
        updated_at: "2025-05-04T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?thermostat,iot",
        schematic_img: "https://source.unsplash.com/400x300/?thermostat,iot",
        pcb_layout_img: "https://source.unsplash.com/400x300/?thermostat,iot",
        bom_img: "https://source.unsplash.com/400x300/?thermostat,iot"
    },
    {
        id: 19,
        title: "RFID Door Lock System",
        description: "Arduino-controlled security lock using RFID authentication.",
        detailed_description:
            "This Arduino project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Alex Chen",
            email: "alex.chen@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-01T00:00:00",
            updated_at: "2024-01-01T00:00:00"
        },
        category: {
            id: 1,
            name: "Arduino",
            description: "All topics on IoT projects using Arduino"
        },
        proficiency: "ADVANCED",
        curated: true,
        tags: ["Arduino", "Sensors", "Robotics"],
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
        updated_at: "2025-05-11T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?rfid,lock",
        schematic_img: "https://source.unsplash.com/400x300/?rfid,lock",
        pcb_layout_img: "https://source.unsplash.com/400x300/?rfid,lock",
        bom_img: "https://source.unsplash.com/400x300/?rfid,lock"
    },
    {
        id: 20,
        title: "ESP32 GPS Tracker",
        description: "Vehicle tracking system with GPS and IoT cloud logging.",
        detailed_description:
            "This ESP32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Rachel Adams",
            email: "rachel.adams@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-20T00:00:00",
            updated_at: "2024-01-20T00:00:00"
        },
        category: {
            id: 2,
            name: "ESP32",
            description: "All topics on IoT projects using ESP32"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["ESP32", "IoT", "Sensors"],
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
        updated_at: "2025-05-18T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?gps,esp32",
        schematic_img: "https://source.unsplash.com/400x300/?gps,esp32",
        pcb_layout_img: "https://source.unsplash.com/400x300/?gps,esp32",
        bom_img: "https://source.unsplash.com/400x300/?gps,esp32"
    },
    {
        id: 21,
        title: "STM32 Robot Controller",
        description: "Advanced robot motor and sensor controller using STM32.",
        detailed_description:
            "This STM32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Daniel Foster",
            email: "daniel.foster@example.com",
            password: "daniel.foster@example.com",
            role: "CREATOR",
            created_at: "2024-01-21T00:00:00",
            updated_at: "2024-01-21T00:00:00"
        },
        category: {
            id: 5,
            name: "STM32",
            description: "All topics on STM32 microcontroller-based projects"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["STM32", "Robotics", "Sensors"],
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
        updated_at: "2025-05-25T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?stm32,robot",
        schematic_img: "https://source.unsplash.com/400x300/?stm32,robot",
        pcb_layout_img: "https://source.unsplash.com/400x300/?stm32,robot",
        bom_img: "https://source.unsplash.com/400x300/?stm32,robot"
    },
    {
        id: 22,
        title: "PCB Sensor Module",
        description: "Modular PCB with multiple integrated environmental sensors.",
        detailed_description:
            "This PCB Design project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Alex Chen",
            email: "alex.chen@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-01T00:00:00",
            updated_at: "2024-01-01T00:00:00"
        },
        category: {
            id: 4,
            name: "PCB Design",
            description: "All topics on PCB layout, fabrication and power design"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["PCB Design", "Sensors", "STM32"],
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
        updated_at: "2025-06-01T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?pcb,sensor",
        schematic_img: "https://source.unsplash.com/400x300/?pcb,sensor",
        pcb_layout_img: "https://source.unsplash.com/400x300/?pcb,sensor",
        bom_img: "https://source.unsplash.com/400x300/?pcb,sensor"
    },
    {
        id: 23,
        title: "Raspberry Pi Home Server",
        description: "Always-on home server with backups, media, and file storage.",
        detailed_description:
            "This Raspberry Pi project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Kevin Zhang",
            email: "kevin.zhang@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-23T00:00:00",
            updated_at: "2024-01-23T00:00:00"
        },
        category: {
            id: 7,
            name: "Raspberry Pi",
            description: "All topics on projects using Raspberry Pi"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Raspberry Pi", "IoT", "Sensors"],
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
        updated_at: "2025-06-08T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?server,raspberrypi",
        schematic_img: "https://source.unsplash.com/400x300/?server,raspberrypi",
        pcb_layout_img: "https://source.unsplash.com/400x300/?server,raspberrypi",
        bom_img: "https://source.unsplash.com/400x300/?server,raspberrypi"
    },
    {
        id: 24,
        title: "Arduino Pet Feeder",
        description: "Automated pet feeder with scheduling and weight sensors.",
        detailed_description:
            "This Arduino project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Julia Martinez",
            email: "julia.martinez@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-01-24T00:00:00",
            updated_at: "2024-01-24T00:00:00"
        },
        category: {
            id: 1,
            name: "Arduino",
            description: "All topics on IoT projects using Arduino"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Arduino", "Sensors", "Robotics"],
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
        updated_at: "2025-06-15T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?pet,arduino",
        schematic_img: "https://source.unsplash.com/400x300/?pet,arduino",
        pcb_layout_img: "https://source.unsplash.com/400x300/?pet,arduino",
        bom_img: "https://source.unsplash.com/400x300/?pet,arduino"
    },
    {
        id: 25,
        title: "Solar-Powered Weather Node",
        description: "Low-power ESP32-based weather node powered by a small solar panel.",
        detailed_description:
            "This ESP32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Liam Turner",
            email: "liam.turner@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-01T00:00:00",
            updated_at: "2024-02-01T00:00:00"
        },
        category: {
            id: 2,
            name: "ESP32",
            description: "All topics on IoT projects using ESP32"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["ESP32", "IoT", "Sensors"],
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
        updated_at: "2025-06-22T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?solar,weather",
        schematic_img: "https://source.unsplash.com/400x300/?solar,weather",
        pcb_layout_img: "https://source.unsplash.com/400x300/?solar,weather",
        bom_img: "https://source.unsplash.com/400x300/?solar,weather"
    },
    {
        id: 26,
        title: "Bluetooth LED Matrix Sign",
        description: "Arduino-controlled LED matrix sign configurable via Bluetooth app.",
        detailed_description:
            "This Arduino project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Noah Smith",
            email: "noah.smith@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-02T00:00:00",
            updated_at: "2024-02-02T00:00:00"
        },
        category: {
            id: 1,
            name: "Arduino",
            description: "All topics on IoT projects using Arduino"
        },
        proficiency: "BEGINNER",
        curated: true,
        tags: ["Arduino", "IoT", "Sensors"],
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
        updated_at: "2025-06-29T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?led,matrix",
        schematic_img: "https://source.unsplash.com/400x300/?led,matrix",
        pcb_layout_img: "https://source.unsplash.com/400x300/?led,matrix",
        bom_img: "https://source.unsplash.com/400x300/?led,matrix"
    },
    {
        id: 27,
        title: "Indoor Air Quality Dashboard",
        description: "Raspberry Pi dashboard showing live CO2, temperature and humidity levels.",
        detailed_description:
            "This Raspberry Pi project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Olivia Brown",
            email: "olivia.brown@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-03T00:00:00",
            updated_at: "2024-02-03T00:00:00"
        },
        category: {
            id: 7,
            name: "Raspberry Pi",
            description: "All topics on projects using Raspberry Pi"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Raspberry Pi", "IoT", "Sensors"],
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
        updated_at: "2025-07-06T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?air,dashboard",
        schematic_img: "https://source.unsplash.com/400x300/?air,dashboard",
        pcb_layout_img: "https://source.unsplash.com/400x300/?air,dashboard",
        bom_img: "https://source.unsplash.com/400x300/?air,dashboard"
    },
    {
        id: 28,
        title: "STM32 Signal Generator",
        description: "Programmable waveform generator using an STM32 and DAC output.",
        detailed_description:
            "This STM32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Ethan Davis",
            email: "ethan.davis@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-04T00:00:00",
            updated_at: "2024-02-04T00:00:00"
        },
        category: {
            id: 5,
            name: "STM32",
            description: "All topics on STM32 microcontroller-based projects"
        },
        proficiency: "ADVANCED",
        curated: true,
        tags: ["STM32", "Sensors", "PCB Design"],
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
        updated_at: "2025-07-13T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?signal,generator",
        schematic_img: "https://source.unsplash.com/400x300/?signal,generator",
        pcb_layout_img: "https://source.unsplash.com/400x300/?signal,generator",
        bom_img: "https://source.unsplash.com/400x300/?signal,generator"
    },
    {
        id: 29,
        title: "LoRa-based Smart Agriculture",
        description: "Long-range soil and climate monitoring network for smart farming.",
        detailed_description:
            "This IoT project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Sophia Green",
            email: "sophia.green@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-05T00:00:00",
            updated_at: "2024-02-05T00:00:00"
        },
        category: {
            id: 6,
            name: "IoT",
            description: "All topics on Internet of Things systems and connectivity"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["IoT", "Raspberry Pi", "Sensors"],
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
        updated_at: "2025-07-20T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?agriculture,iot",
        schematic_img: "https://source.unsplash.com/400x300/?agriculture,iot",
        pcb_layout_img: "https://source.unsplash.com/400x300/?agriculture,iot",
        bom_img: "https://source.unsplash.com/400x300/?agriculture,iot"
    },
    {
        id: 30,
        title: "Robotic Vacuum Prototype",
        description: "DIY robotic vacuum platform with basic room mapping.",
        detailed_description:
            "This Robotics project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "James Hall",
            email: "james.hall@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-06T00:00:00",
            updated_at: "2024-02-06T00:00:00"
        },
        category: {
            id: 3,
            name: "Robotics",
            description: "All topics on robotics, motion control and automation"
        },
        proficiency: "ADVANCED",
        curated: true,
        tags: ["Robotics", "Arduino", "STM32"],
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
        updated_at: "2025-07-27T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?robot,vacuum",
        schematic_img: "https://source.unsplash.com/400x300/?robot,vacuum",
        pcb_layout_img: "https://source.unsplash.com/400x300/?robot,vacuum",
        bom_img: "https://source.unsplash.com/400x300/?robot,vacuum"
    },
    {
        id: 31,
        title: "Smart Garage Door Opener",
        description: "ESP32-based garage door opener with smartphone control.",
        detailed_description:
            "This ESP32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Mia Carter",
            email: "mia.carter@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-07T00:00:00",
            updated_at: "2024-02-07T00:00:00"
        },
        category: {
            id: 2,
            name: "ESP32",
            description: "All topics on IoT projects using ESP32"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["ESP32", "IoT", "Arduino"],
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
        updated_at: "2025-08-03T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?garage,door",
        schematic_img: "https://source.unsplash.com/400x300/?garage,door",
        pcb_layout_img: "https://source.unsplash.com/400x300/?garage,door",
        bom_img: "https://source.unsplash.com/400x300/?garage,door"
    },
    {
        id: 32,
        title: "Wearable Fitness Tracker",
        description: "Low-cost fitness tracker using STM32 and Bluetooth LE.",
        detailed_description:
            "This STM32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Ava Johnson",
            email: "ava.johnson@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-08T00:00:00",
            updated_at: "2024-02-08T00:00:00"
        },
        category: {
            id: 5,
            name: "STM32",
            description: "All topics on STM32 microcontroller-based projects"
        },
        proficiency: "ADVANCED",
        curated: true,
        tags: ["STM32", "Sensors", "IoT"],
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
        updated_at: "2025-08-10T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?fitness,tracker",
        schematic_img: "https://source.unsplash.com/400x300/?fitness,tracker",
        pcb_layout_img: "https://source.unsplash.com/400x300/?fitness,tracker",
        bom_img: "https://source.unsplash.com/400x300/?fitness,tracker"
    },
    {
        id: 33,
        title: "Raspberry Pi Smart Doorbell",
        description: "Network-connected doorbell with camera and motion alerts.",
        detailed_description:
            "This Raspberry Pi project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "William Scott",
            email: "william.scott@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-09T00:00:00",
            updated_at: "2024-02-09T00:00:00"
        },
        category: {
            id: 7,
            name: "Raspberry Pi",
            description: "All topics on projects using Raspberry Pi"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Raspberry Pi", "IoT", "Sensors"],
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
        updated_at: "2025-08-17T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?doorbell,camera",
        schematic_img: "https://source.unsplash.com/400x300/?doorbell,camera",
        pcb_layout_img: "https://source.unsplash.com/400x300/?doorbell,camera",
        bom_img: "https://source.unsplash.com/400x300/?doorbell,camera"
    },
    {
        id: 34,
        title: "PCB Audio Amplifier",
        description: "Compact PCB design for a stereo audio amplifier.",
        detailed_description:
            "This PCB Design project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Isabella Moore",
            email: "isabella.moore@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-10T00:00:00",
            updated_at: "2024-02-10T00:00:00"
        },
        category: {
            id: 4,
            name: "PCB Design",
            description: "All topics on PCB layout, fabrication and power design"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["PCB Design", "STM32", "Sensors"],
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
        updated_at: "2025-08-24T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?audio,amplifier",
        schematic_img: "https://source.unsplash.com/400x300/?audio,amplifier",
        pcb_layout_img: "https://source.unsplash.com/400x300/?audio,amplifier",
        bom_img: "https://source.unsplash.com/400x300/?audio,amplifier"
    },
    {
        id: 35,
        title: "Smart Greenhouse Controller",
        description: "Automated greenhouse system managing light, temperature and irrigation.",
        detailed_description:
            "This IoT project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Lucas Perez",
            email: "lucas.perez@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-11T00:00:00",
            updated_at: "2024-02-11T00:00:00"
        },
        category: {
            id: 6,
            name: "IoT",
            description: "All topics on Internet of Things systems and connectivity"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["IoT", "Raspberry Pi", "Sensors"],
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
        updated_at: "2025-08-31T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?greenhouse,automation",
        schematic_img: "https://source.unsplash.com/400x300/?greenhouse,automation",
        pcb_layout_img: "https://source.unsplash.com/400x300/?greenhouse,automation",
        bom_img: "https://source.unsplash.com/400x300/?greenhouse,automation"
    },
    {
        id: 36,
        title: "Self-Balancing Robot",
        description: "Two-wheeled self-balancing robot using IMU sensors.",
        detailed_description:
            "This Robotics project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Charlotte King",
            email: "charlotte.king@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-12T00:00:00",
            updated_at: "2024-02-12T00:00:00"
        },
        category: {
            id: 3,
            name: "Robotics",
            description: "All topics on robotics, motion control and automation"
        },
        proficiency: "ADVANCED",
        curated: true,
        tags: ["Robotics", "Arduino", "IoT"],
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
        updated_at: "2025-09-07T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?robot,self-balancing",
        schematic_img: "https://source.unsplash.com/400x300/?robot,self-balancing",
        pcb_layout_img: "https://source.unsplash.com/400x300/?robot,self-balancing",
        bom_img: "https://source.unsplash.com/400x300/?robot,self-balancing"
    },
    {
        id: 37,
        title: "Low-Power Remote Sensor Node",
        description: "Battery-optimized STM32 sensor node with deep sleep strategy.",
        detailed_description:
            "This STM32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Henry Young",
            email: "henry.young@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-13T00:00:00",
            updated_at: "2024-02-13T00:00:00"
        },
        category: {
            id: 5,
            name: "STM32",
            description: "All topics on STM32 microcontroller-based projects"
        },
        proficiency: "ADVANCED",
        curated: false,
        tags: ["STM32", "IoT", "Sensors"],
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
        updated_at: "2025-09-14T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?low-power,sensor",
        schematic_img: "https://source.unsplash.com/400x300/?low-power,sensor",
        pcb_layout_img: "https://source.unsplash.com/400x300/?low-power,sensor",
        bom_img: "https://source.unsplash.com/400x300/?low-power,sensor"
    },
    {
        id: 38,
        title: "Smart Lighting Dashboard",
        description: "Central dashboard for monitoring and controlling home lighting.",
        detailed_description:
            "This IoT project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Amelia Rivera",
            email: "amelia.rivera@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-14T00:00:00",
            updated_at: "2024-02-14T00:00:00"
        },
        category: {
            id: 6,
            name: "IoT",
            description: "All topics on Internet of Things systems and connectivity"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["IoT", "ESP32", "Arduino"],
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
        updated_at: "2025-09-21T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?lighting,dashboard",
        schematic_img: "https://source.unsplash.com/400x300/?lighting,dashboard",
        pcb_layout_img: "https://source.unsplash.com/400x300/?lighting,dashboard",
        bom_img: "https://source.unsplash.com/400x300/?lighting,dashboard"
    },
    {
        id: 39,
        title: "Multi-Sensor Wearable Badge",
        description: "Conference badge with motion, temperature and proximity sensors.",
        detailed_description:
            "This Sensors project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Jackson Lee",
            email: "jackson.lee@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-15T00:00:00",
            updated_at: "2024-02-15T00:00:00"
        },
        category: {
            id: 8,
            name: "Sensors",
            description: "All topics on sensor integration and data acquisition"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Sensors", "IoT", "STM32"],
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
        updated_at: "2025-09-28T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?badge,wearable",
        schematic_img: "https://source.unsplash.com/400x300/?badge,wearable",
        pcb_layout_img: "https://source.unsplash.com/400x300/?badge,wearable",
        bom_img: "https://source.unsplash.com/400x300/?badge,wearable"
    },
    {
        id: 40,
        title: "Raspberry Pi Weather Map",
        description: "Wall-mounted display showing live global weather conditions.",
        detailed_description:
            "This Raspberry Pi project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Harper Flores",
            email: "harper.flores@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-16T00:00:00",
            updated_at: "2024-02-16T00:00:00"
        },
        category: {
            id: 7,
            name: "Raspberry Pi",
            description: "All topics on projects using Raspberry Pi"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Raspberry Pi", "IoT", "Sensors"],
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
        updated_at: "2025-10-05T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?weather,map",
        schematic_img: "https://source.unsplash.com/400x300/?weather,map",
        pcb_layout_img: "https://source.unsplash.com/400x300/?weather,map",
        bom_img: "https://source.unsplash.com/400x300/?weather,map"
    },
    {
        id: 41,
        title: "USB-C Power Tester",
        description: "Handheld USB-C power and protocol tester with OLED display.",
        detailed_description:
            "This PCB Design project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Grace Cooper",
            email: "grace.cooper@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-17T00:00:00",
            updated_at: "2024-02-17T00:00:00"
        },
        category: {
            id: 4,
            name: "PCB Design",
            description: "All topics on PCB layout, fabrication and power design"
        },
        proficiency: "ADVANCED",
        curated: true,
        tags: ["PCB Design", "IoT", "ESP32"],
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
        updated_at: "2025-10-12T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?usb,tester",
        schematic_img: "https://source.unsplash.com/400x300/?usb,tester",
        pcb_layout_img: "https://source.unsplash.com/400x300/?usb,tester",
        bom_img: "https://source.unsplash.com/400x300/?usb,tester"
    },
    {
        id: 42,
        title: "Arduino Music Visualizer",
        description: "Sound-reactive LED strip visualizer for music playback.",
        detailed_description:
            "This Arduino project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Victoria Hughes",
            email: "victoria.hughes@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-18T00:00:00",
            updated_at: "2024-02-18T00:00:00"
        },
        category: {
            id: 1,
            name: "Arduino",
            description: "All topics on IoT projects using Arduino"
        },
        proficiency: "BEGINNER",
        curated: false,
        tags: ["Arduino", "IoT", "Sensors"],
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
        updated_at: "2025-10-19T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?music,led",
        schematic_img: "https://source.unsplash.com/400x300/?music,led",
        pcb_layout_img: "https://source.unsplash.com/400x300/?music,led",
        bom_img: "https://source.unsplash.com/400x300/?music,led"
    },
    {
        id: 43,
        title: "IoT Water Leak Detector",
        description: "Wi-Fi enabled water leak detection system for home safety.",
        detailed_description:
            "This IoT project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Sebastian Brooks",
            email: "sebastian.brooks@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-19T00:00:00",
            updated_at: "2024-02-19T00:00:00"
        },
        category: {
            id: 6,
            name: "IoT",
            description: "All topics on Internet of Things systems and connectivity"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["IoT", "Raspberry Pi", "Sensors"],
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
        updated_at: "2025-10-26T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?water,leak",
        schematic_img: "https://source.unsplash.com/400x300/?water,leak",
        pcb_layout_img: "https://source.unsplash.com/400x300/?water,leak",
        bom_img: "https://source.unsplash.com/400x300/?water,leak"
    },
    {
        id: 44,
        title: "Robotic Arm Drawing Bot",
        description: "Desktop robotic arm capable of drawing vector graphics.",
        detailed_description:
            "This Robotics project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Zoe Mitchell",
            email: "zoe.mitchell@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-20T00:00:00",
            updated_at: "2024-02-20T00:00:00"
        },
        category: {
            id: 3,
            name: "Robotics",
            description: "All topics on robotics, motion control and automation"
        },
        proficiency: "ADVANCED",
        curated: true,
        tags: ["Robotics", "Raspberry Pi", "STM32"],
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
        updated_at: "2025-11-02T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?robot,drawing",
        schematic_img: "https://source.unsplash.com/400x300/?robot,drawing",
        pcb_layout_img: "https://source.unsplash.com/400x300/?robot,drawing",
        bom_img: "https://source.unsplash.com/400x300/?robot,drawing"
    },
    {
        id: 45,
        title: "Environmental Sensor Hat for Pi",
        description: "Stackable sensor hat with temperature, humidity and pressure sensors.",
        detailed_description:
            "This Raspberry Pi project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Leo Ward",
            email: "leo.ward@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-21T00:00:00",
            updated_at: "2024-02-21T00:00:00"
        },
        category: {
            id: 7,
            name: "Raspberry Pi",
            description: "All topics on projects using Raspberry Pi"
        },
        proficiency: "INTERMEDIATE",
        curated: false,
        tags: ["Raspberry Pi", "Sensors", "IoT"],
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
        updated_at: "2025-11-09T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?raspberrypi,sensor",
        schematic_img: "https://source.unsplash.com/400x300/?raspberrypi,sensor",
        pcb_layout_img: "https://source.unsplash.com/400x300/?raspberrypi,sensor",
        bom_img: "https://source.unsplash.com/400x300/?raspberrypi,sensor"
    },
    {
        id: 46,
        title: "Wireless Power Meter",
        description: "Smart meter that monitors household power usage and uploads data to the cloud.",
        detailed_description:
            "This ESP32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Chloe Barnes",
            email: "chloe.barnes@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-22T00:00:00",
            updated_at: "2024-02-22T00:00:00"
        },
        category: {
            id: 2,
            name: "ESP32",
            description: "All topics on IoT projects using ESP32"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["ESP32", "IoT", "Sensors"],
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
        updated_at: "2025-11-16T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?power,meter",
        schematic_img: "https://source.unsplash.com/400x300/?power,meter",
        pcb_layout_img: "https://source.unsplash.com/400x300/?power,meter",
        bom_img: "https://source.unsplash.com/400x300/?power,meter"
    },
    {
        id: 47,
        title: "Portable Logic Analyzer",
        description: "Pocket-sized logic analyzer with STM32 and USB interface.",
        detailed_description:
            "This STM32 project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Nathan Rogers",
            email: "nathan.rogers@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-23T00:00:00",
            updated_at: "2024-02-23T00:00:00"
        },
        category: {
            id: 5,
            name: "STM32",
            description: "All topics on STM32 microcontroller-based projects"
        },
        proficiency: "ADVANCED",
        curated: true,
        tags: ["STM32", "PCB Design", "IoT"],
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
        updated_at: "2025-11-23T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?logic,analyzer",
        schematic_img: "https://source.unsplash.com/400x300/?logic,analyzer",
        pcb_layout_img: "https://source.unsplash.com/400x300/?logic,analyzer",
        bom_img: "https://source.unsplash.com/400x300/?logic,analyzer"
    },
    {
        id: 48,
        title: "Smart Bike Computer",
        description: "Handlebar-mounted bike computer with GPS and heart rate display.",
        detailed_description:
            "This IoT project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Lily Patterson",
            email: "lily.patterson@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-24T00:00:00",
            updated_at: "2024-02-24T00:00:00"
        },
        category: {
            id: 6,
            name: "IoT",
            description: "All topics on Internet of Things systems and connectivity"
        },
        proficiency: "ADVANCED",
        curated: true,
        tags: ["IoT", "ESP32", "Sensors"],
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
        updated_at: "2025-11-30T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?bike,computer",
        schematic_img: "https://source.unsplash.com/400x300/?bike,computer",
        pcb_layout_img: "https://source.unsplash.com/400x300/?bike,computer",
        bom_img: "https://source.unsplash.com/400x300/?bike,computer"
    },
    {
        id: 49,
        title: "Raspberry Pi Time-Lapse Rig",
        description: "Motorized camera slider controlled by Raspberry Pi for time-lapse photography.",
        detailed_description:
            "This Raspberry Pi project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Eleanor Griffin",
            email: "eleanor.griffin@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-25T00:00:00",
            updated_at: "2024-02-25T00:00:00"
        },
        category: {
            id: 7,
            name: "Raspberry Pi",
            description: "All topics on projects using Raspberry Pi"
        },
        proficiency: "INTERMEDIATE",
        curated: true,
        tags: ["Raspberry Pi", "Robotics", "IoT"],
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
        updated_at: "2025-12-07T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?timelapse,camera",
        schematic_img: "https://source.unsplash.com/400x300/?timelapse,camera",
        pcb_layout_img: "https://source.unsplash.com/400x300/?timelapse,camera",
        bom_img: "https://source.unsplash.com/400x300/?timelapse,camera"
    },
    {
        id: 50,
        title: "Modular Sensor Experiment Kit",
        description: "Classroom-friendly kit of swappable sensor modules and tutorials.",
        detailed_description:
            "This Sensors project demonstrates innovative use of modern electronics and microcontroller technology. It combines practical hardware design with efficient software implementation to create a functional and reliable system.The system integrates multiple sensors and actuators to achieve its functionality. The project has been designed with modularity in mind, allowing easy customization and expansion for different use cases. All components are readily available from common electronics suppliers, making this project accessible to makers of all skill levels.Detailed build instructions, code comments, and troubleshooting tips are provided to ensure successful replication. The project has been thoroughly tested and validated by the community, with many successful builds reported.",
        user: {
            username: "Madison Powell",
            email: "madison.powell@example.com",
            password: "5d41402abc4b2a76b9719d911017c592",
            role: "CREATOR",
            created_at: "2024-02-26T00:00:00",
            updated_at: "2024-02-26T00:00:00"
        },
        category: {
            id: 8,
            name: "Sensors",
            description: "All topics on sensor integration and data acquisition"
        },
        proficiency: "BEGINNER",
        curated: true,
        tags: ["Sensors", "Arduino", "IoT"],
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
        updated_at: "2025-12-14T00:00:00",
        main_img: "https://source.unsplash.com/400x300/?sensors,education",
        schematic_img: "https://source.unsplash.com/400x300/?sensors,education",
        pcb_layout_img: "https://source.unsplash.com/400x300/?sensors,education",
        bom_img: "https://source.unsplash.com/400x300/?sensors,education"
    }
]

// Get references to the input and results elements
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');
const searchProjectsGrid = document.querySelector('.search-projects-grid');

// Variable to store the current search pagination instance
let searchPagination = null;

// Function to filter items based on the search query
function search(query) {
    return mockProjects.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.name.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
}

// Function to render a single search result card
function renderSearchResultCard(project) {
    return `
        <div class="col">
            <div class="card ms-0 rounded-4 border bg-light">
                <a href="project-details.html?id=${project.id}" class="text-decoration-none">
                    <img src="https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(project.category.name)}" 
                         class="card-img-top rounded-top-3" 
                         alt="${project.title}" 
                         onerror="this.src='https://placehold.co/400x300/23374D/FFFFFF?text=${encodeURIComponent(project.category.name)}'">
                    <div class="card-body">
                        <h5 class="card-title text-secondary fw-bolder">
                            ${project.title}
                        </h5>
                        <p class="card-text text-dark small">
                            ${project.description}
                        </p>
                    </div>
                </a>
            </div>
        </div>
    `;
}

// Function to display search results with pagination
function displayResults(results, query) {
    // Clear previous results and pagination
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = `<div class="alert alert-info my-4"> No results found for "<strong>${query}</strong>" </div>`;
        return;
    }

    // Create container for search results
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.innerHTML = `
        <h3 class="my-4">
            Search Results for "<span class="text-primary">${query}</span>" 
            <span class="badge bg-secondary">${results.length} found</span>
        </h3>
        <div id="search-results-grid" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
        </div>
        <nav id="search-pagination" class="pt-4" aria-label="Search results pagination">
            <ul class="pagination justify-content-center"></ul>
        </nav>
    `;

    resultsContainer.appendChild(searchResultsContainer);

    // Create pagination for search results
    // Show 9 results per page
    searchPagination = new Pagination(
        results,
        9,
        'search-results-grid',
        'search-pagination',
        renderSearchResultCard
    );

    // Start the pagination
    searchPagination.start();
}

// Function to clear search input and reset display, this is called when the page loads to ensure a clean state
function clearSearchOnPageLoad() {
    // Clear the search input value
    if (searchInput) {
        searchInput.value = '';
    }

    // Clear any search results
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
    }

    // Make sure projects grid is visible
    if (searchProjectsGrid) {
        searchProjectsGrid.style.display = '';
    }

    // Make sure pagination is visible
    const featuredPagination = document.getElementById('featured-projects-pagination');
    if (featuredPagination) {
        featuredPagination.style.display = '';
    }

    const explorePagination = document.getElementById('explore-projects-pagination');
    if (explorePagination) {
        explorePagination.style.display = '';
    }

    // Clear search pagination instance
    searchPagination = null;

    console.log('Search cleared on page load');
}

// Event listener for the search input
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();

    if (query) {
        // Hide featured projects when searching
        if (searchProjectsGrid) {
            searchProjectsGrid.style.display = 'none';
        }

        // Hide featured pagination too
        const featuredPagination = document.getElementById('featured-projects-pagination');
        if (featuredPagination) {
            featuredPagination.style.display = 'none';
        }

        // Hide explore pagination
        const explorePagination = document.getElementById('explore-projects-pagination');
        if (explorePagination) {
            explorePagination.style.display = 'none';
        }

        const results = search(query);
        displayResults(results, query);
    } else {
        // Show projects when search is empty
        if (searchProjectsGrid) {
            searchProjectsGrid.style.display = '';
        }

        // Show featured pagination
        const featuredPagination = document.getElementById('featured-projects-pagination');
        if (featuredPagination) {
            featuredPagination.style.display = '';
        }

        // Show explore pagination
        const explorePagination = document.getElementById('explore-projects-pagination');
        if (explorePagination) {
            explorePagination.style.display = '';
        }

        resultsContainer.innerHTML = '';

        // Clear search pagination instance
        searchPagination = null;
    }
});

window.addEventListener('load', clearSearchOnPageLoad);