const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "Tegi Pannu",
        email: "tegi@example.com",
      },
      {
        name: "Karan",
        email: "karan@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "Tegi Chat",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Guest User",
        email: "guest@example.com",
      },
      {
        name: "Karan",
        email: "Karan@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Guest User",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Naveezy",
        email: "navaan@example.com",
      },
      {
        name: "Karan",
        email: "Karan@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Naveezy",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Tegi Pannu",
        email: "tegi@example.com",
      },
      {
        name: "Karan",
        email: "Karan@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Khan Bhaini",
        email: "khan@example.com",
      },
      {
        name: "Karan",
        email: "Karan@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Khan Bhaini",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Tegi Pannu",
        email: "Tegi@example.com",
      },
      {
        name: "Karan",
        email: "karan@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Chill Zone",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
];

module.exports = chats;