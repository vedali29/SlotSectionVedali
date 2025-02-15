export const initialMeetings = [
    {
      id: 1,
      user: "John Doe",
      role: "Software Engineer",
      date: "2024-02-20",
      startTime: "09:00",
      endTime: "09:30",
      platform: "google-meet",
      timezone: "America/New_York",
      link: "https://meet.google.com/abc-defg-hij"
    },
    {
      id: 2,
      user: "Sarah Wilson",
      role: "Product Manager",
      date: "2024-02-20",
      startTime: "11:00",
      endTime: "11:30",
      platform: "zoom",
      timezone: "Europe/London",
      link: "https://zoom.us/j/123456789"
    },
    {
        id: 3,
        user: "Alice Johnson",
        role: "Data Scientist",
        date: "2024-02-21",
        startTime: "14:00",
        endTime: "14:45",
        platform: "google-meet",
        timezone: "America/Los_Angeles",
        link: "https://meet.google.com/xyz-abcd-efg"
    },
    {
        id: 4,
        user: "Bob Williams",
        role: "QA Engineer",
        date: "2024-02-21",
        startTime: "10:00",
        endTime: "10:30",
        platform: "zoom",
        timezone: "Europe/Berlin",
        link: "https://zoom.us/j/987654321"
    },
    {
        id: 5,
        user: "Charlie Brown",
        role: "UI Designer",
        date: "2024-02-22",
        startTime: "16:00",
        endTime: "16:30",
        platform: "slack",
        timezone: "Asia/Tokyo",
        link: "https://workspace.slack.com/team/C123ABC456"
    },
    {
        id: 6,
        user: "Diana Miller",
        role: "Project Manager",
        date: "2024-02-22",
        startTime: "09:30",
        endTime: "10:00",
        platform: "google-meet",
        timezone: "Australia/Sydney",
        link: "https://meet.google.com/ghi-jklm-nop"
    },
    {
        id: 7,
        user: "Ethan Davis",
        role: "Frontend Developer",
        date: "2024-02-23",
        startTime: "13:00",
        endTime: "13:45",
        platform: "zoom",
        timezone: "America/Chicago",
        link: "https://zoom.us/j/543216789"
    },
    {
        id: 8,
        user: "Fiona White",
        role: "Backend Developer",
        date: "2024-02-23",
        startTime: "15:00",
        endTime: "15:30",
        platform: "google-meet",
        timezone: "Europe/Moscow",
        link: "https://meet.google.com/qrs-tuvw-xyz"
    },
    {
        id: 9,
        user: "George Black",
        role: "DevOps Engineer",
        date: "2024-02-24",
        startTime: "11:00",
        endTime: "11:15",
        platform: "slack",
        timezone: "America/Denver",
        link: "https://workspace.slack.com/team/C654DEF321"
    },
    {
        id: 10,
        user: "Hannah Green",
        role: "Data Analyst",
        date: "2024-02-24",
        startTime: "17:00",
        endTime: "17:30",
        platform: "google-meet",
        timezone: "Asia/Shanghai",
        link: "https://meet.google.com/stu-vwxy-zab"
    },
    {
        id: 11,
        user: "Isaac Gray",
        role: "Security Engineer",
        date: "2024-02-25",
        startTime: "08:00",
        endTime: "08:30",
        platform: "zoom",
        timezone: "Europe/Paris",
        link: "https://zoom.us/j/109876543"
    },
    {
        id: 12,
        user: "Julia Purple",
        role: "Technical Writer",
        date: "2024-02-25",
        startTime: "14:30",
        endTime: "15:00",
        platform: "google-meet",
        timezone: "America/Phoenix",
        link: "https://meet.google.com/bcd-efgh-ijk"
    },
    {
        id: 13,
        user: "Kevin Teal",
        role: "HR Manager",
        date: "2024-02-26",
        startTime: "10:30",
        endTime: "11:00",
        platform: "slack",
        timezone: "Australia/Melbourne",
        link: "https://workspace.slack.com/team/C987GHI654"
    },
    {
        id: 14,
        user: "Linda Olive",
        role: "Sales Representative",
        date: "2024-02-26",
        startTime: "16:30",
        endTime: "17:00",
        platform: "google-meet",
        timezone: "Asia/Dubai",
        link: "https://meet.google.com/efg-hijk-lmn"
    },
    {
        id: 15,
        user: "Michael Silver",
        role: "CEO",
        date: "2024-02-27",
        startTime: "12:00",
        endTime: "12:30",
        platform: "zoom",
        timezone: "America/New_York",
        link: "https://zoom.us/j/321654987"
    }
  ];
  
  export const availableUsers = [
    {
      id: 1,
      name: "John Doe",
      role: "Software Engineer",
      avatar: "/avatars/john.jpg",
      availableSlots: [
        { id: 1, time: "09:00 - 09:30", platform: "google-meet" },
        { id: 2, time: "10:00 - 10:30", platform: "google-meet" },
        { id: 3, time: "14:00 - 14:30", platform: "zoom" }
      ]
    },
    {
      id: 2,
      name: "Sarah Wilson",
      role: "Product Manager",
      avatar: "/avatars/sarah.jpg",
      availableSlots: [
        { id: 4, time: "11:00 - 11:30", platform: "slack" },
        { id: 5, time: "13:00 - 13:30", platform: "google-meet" }
      ]
    },
    {
        id: 3,
        name: "Alice Johnson",
        role: "Data Scientist",
        avatar: "/avatars/alice.jpg",
        availableSlots: [
            { id: 6, time: "14:00 - 14:45", platform: "google-meet" },
            { id: 7, time: "15:00 - 15:30", platform: "zoom" }
        ]
    },
    {
        id: 4,
        name: "Bob Williams",
        role: "QA Engineer",
        avatar: "/avatars/bob.jpg",
        availableSlots: [
            { id: 8, time: "10:00 - 10:30", platform: "zoom" },
            { id: 9, time: "11:00 - 11:30", platform: "google-meet" }
        ]
    },
    {
        id: 5,
        name: "Charlie Brown",
        role: "UI Designer",
        avatar: "/avatars/charlie.jpg",
        availableSlots: [
            { id: 10, time: "16:00 - 16:30", platform: "slack" },
            { id: 11, time: "17:00 - 17:30", platform: "zoom" }
        ]
    },
    {
        id: 6,
        name: "Diana Miller",
        role: "Project Manager",
        avatar: "/avatars/diana.jpg",
        availableSlots: [
            { id: 12, time: "09:30 - 10:00", platform: "google-meet" },
            { id: 13, time: "10:30 - 11:00", platform: "slack" }
        ]
    },
    {
        id: 7,
        name: "Ethan Davis",
        role: "Frontend Developer",
        avatar: "/avatars/ethan.jpg",
        availableSlots: [
            { id: 14, time: "13:00 - 13:45", platform: "zoom" },
            { id: 15, time: "14:00 - 14:30", platform: "google-meet" }
        ]
    },
    {
        id: 8,
        name: "Fiona White",
        role: "Backend Developer",
        avatar: "/avatars/fiona.jpg",
        availableSlots: [
            { id: 16, time: "15:00 - 15:30", platform: "google-meet" },
            { id: 17, time: "16:00 - 16:30", platform: "slack" }
        ]
    },
    {
        id: 9,
        name: "George Black",
        role: "DevOps Engineer",
        avatar: "/avatars/george.jpg",
        availableSlots: [
            { id: 18, time: "11:00 - 11:15", platform: "slack" },
            { id: 19, time: "12:00 - 12:30", platform: "zoom" }
        ]
    },
    {
        id: 10,
        name: "Hannah Green",
        role: "Data Analyst",
        avatar: "/avatars/hannah.jpg",
        availableSlots: [
            { id: 20, time: "17:00 - 17:30", platform: "google-meet" },
            { id: 21, time: "09:00 - 09:30", platform: "zoom" }
        ]
    },
    {
        id: 11,
        name: "Isaac Gray",
        role: "Security Engineer",
        avatar: "/avatars/isaac.jpg",
        availableSlots: [
            { id: 22, time: "08:00 - 08:30", platform: "zoom" },
            { id: 23, time: "10:00 - 10:30", platform: "google-meet" }
        ]
    },
    {
        id: 12,
        name: "Julia Purple",
        role: "Technical Writer",
        avatar: "/avatars/julia.jpg",
        availableSlots: [
            { id: 24, time: "14:30 - 15:00", platform: "google-meet" },
            { id: 25, time: "16:00 - 16:30", platform: "slack" }
        ]
    },
    {
        id: 13,
        name: "Kevin Teal",
        role: "HR Manager",
        avatar: "/avatars/kevin.jpg",
        availableSlots: [
            { id: 26, time: "10:30 - 11:00", platform: "slack" },
            { id: 27, time: "12:00 - 12:30", platform: "google-meet" }
        ]
    },
    {
        id: 14,
        name: "Linda Olive",
        role: "Sales Representative",
        avatar: "/avatars/linda.jpg",
        availableSlots: [
            { id: 28, time: "16:30 - 17:00", platform: "google-meet" },
            { id: 29, time: "17:30 - 18:00", platform: "zoom" }
        ]
    },
    {
        id: 15,
        name: "Michael Silver",
        role: "CEO",
        avatar: "/avatars/michael.jpg",
        availableSlots: [
            { id: 30, time: "12:00 - 12:30", platform: "zoom" },
            { id: 31, time: "13:00 - 13:30", platform: "google-meet" }
        ]
    }
  ];
  

 export const DUMMY_MEETINGS = [
    {
      id: 1,
      title: 'Project Review Meeting',
      status: 'upcoming',
      date: '2024-01-25',
      time: '10:00 AM',
      duration: 30,
      platform: 'google-meet',
      link: 'https://meet.google.com/abc-123',
      attendee: {
        name: 'John Doe',
        role: 'Senior Developer',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe'
      }
    },
    {
      id: 2,
      title: 'Design Sprint Planning',
      status: 'completed',
      date: '2024-01-20',
      time: '2:00 PM',
      duration: 45,
      platform: 'zoom',
      link: 'https://zoom.us/j/123456',
      attendee: {
        name: 'Sarah Wilson',
        role: 'UX Designer',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson'
      }
    },
    {
      id: 3,
      title: 'Team Sync',
      status: 'cancelled',
      date: '2024-01-22',
      time: '11:30 AM',
      duration: 30,
      platform: 'slack',
      link: '#team-channel',
      attendee: {
        name: 'Mike Chen',
        role: 'Product Manager',
        avatar: 'https://ui-avatars.com/api/?name=Mike+Chen'
      }
    },
    {
        id: 4,
        title: 'Data Analysis Discussion',
        status: 'upcoming',
        date: '2024-01-28',
        time: '9:00 AM',
        duration: 60,
        platform: 'google-meet',
        link: 'https://meet.google.com/def-456',
        attendee: {
            name: 'Alice Johnson',
            role: 'Data Scientist',
            avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson'
        }
    },
    {
        id: 5,
        title: 'QA Testing Session',
        status: 'completed',
        date: '2024-01-23',
        time: '3:00 PM',
        duration: 45,
        platform: 'zoom',
        link: 'https://zoom.us/j/456789',
        attendee: {
            name: 'Bob Williams',
            role: 'QA Engineer',
            avatar: 'https://ui-avatars.com/api/?name=Bob+Williams'
        }
    },
    {
        id: 6,
        title: 'UI/UX Review',
        status: 'upcoming',
        date: '2024-01-26',
        time: '1:00 PM',
        duration: 30,
        platform: 'slack',
        link: '#design-channel',
        attendee: {
            name: 'Charlie Brown',
            role: 'UI Designer',
            avatar: 'https://ui-avatars.com/api/?name=Charlie+Brown'
        }
    },
    {
        id: 7,
        title: 'Project Planning Meeting',
        status: 'upcoming',
        date: '2024-01-29',
        time: '10:30 AM',
        duration: 60,
        platform: 'google-meet',
        link: 'https://meet.google.com/ghi-789',
        attendee: {
            name: 'Diana Miller',
            role: 'Project Manager',
            avatar: 'https://ui-avatars.com/api/?name=Diana+Miller'
        }
    },
    {
        id: 8,
        title: 'Frontend Development Sync',
        status: 'completed',
        date: '2024-01-24',
        time: '4:00 PM',
        duration: 45,
        platform: 'zoom',
        link: 'https://zoom.us/j/789123',
        attendee: {
            name: 'Ethan Davis',
            role: 'Frontend Developer',
            avatar: 'https://ui-avatars.com/api/?name=Ethan+Davis'
        }
    },
    {
        id: 9,
        title: 'Backend Architecture Discussion',
        status: 'upcoming',
        date: '2024-01-27',
        time: '2:00 PM',
        duration: 30,
        platform: 'slack',
        link: '#backend-channel',
        attendee: {
            name: 'Fiona White',
            role: 'Backend Developer',
            avatar: 'https://ui-avatars.com/api/?name=Fiona+White'
        }
    },
    {
        id: 10,
        title: 'DevOps Strategy Session',
        status: 'upcoming',
        date: '2024-01-30',
        time: '11:00 AM',
        duration: 60,
        platform: 'google-meet',
        link: 'https://meet.google.com/jkl-012',
        attendee: {
            name: 'George Black',
            role: 'DevOps Engineer',
            avatar: 'https://ui-avatars.com/api/?name=George+Black'
        }
    },
    {
        id: 11,
        title: 'Data Analysis Report Review',
        status: 'completed',
        date: '2024-01-25',
        time: '5:00 PM',
        duration: 45,
        platform: 'zoom',
        link: 'https://zoom.us/j/012345',
        attendee: {
            name: 'Hannah Green',
            role: 'Data Analyst',
            avatar: 'https://ui-avatars.com/api/?name=Hannah+Green'
        }
    },
    {
        id: 12,
        title: 'Security Protocol Update',
        status: 'upcoming',
        date: '2024-01-28',
        time: '3:00 PM',
        duration: 30,
        platform: 'slack',
        link: '#security-channel',
        attendee: {
            name: 'Isaac Gray',
            role: 'Security Engineer',
            avatar: 'https://ui-avatars.com/api/?name=Isaac+Gray'
        }
    },
    {
        id: 13,
        title: 'Technical Documentation Review',
        status: 'upcoming',
        date: '2024-01-31',
        time: '11:30 AM',
        duration: 60,
        platform: 'google-meet',
        link: 'https://meet.google.com/mno-345',
        attendee: {
            name: 'Julia Purple',
            role: 'Technical Writer',
            avatar: 'https://ui-avatars.com/api/?name=Julia+Purple'
        }
    },
    {
        id: 14,
        title: 'HR Policy Discussion',
        status: 'completed',
        date: '2024-01-26',
        time: '6:00 PM',
        duration: 45,
        platform: 'zoom',
        link: 'https://zoom.us/j/345678',
        attendee: {
            name: 'Kevin Teal',
            role: 'HR Manager',
            avatar: 'https://ui-avatars.com/api/?name=Kevin+Teal'
        }
    },
    {
        id: 15,
        title: 'Sales Strategy Planning',
        status: 'upcoming',
        date: '2024-01-29',
        time: '4:00 PM',
        duration: 30,
        platform: 'slack',
        link: '#sales-channel',
        attendee: {
            name: 'Linda Olive',
            role: 'Sales Representative',
            avatar: 'https://ui-avatars.com/api/?name=Linda+Olive'
        }
    }
  ];
