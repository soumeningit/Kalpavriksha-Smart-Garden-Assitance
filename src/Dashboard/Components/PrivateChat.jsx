import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiPhone, FiVideo } from "react-icons/fi";
import { IoSend, IoArrowBack } from "react-icons/io5";

// NOTE: For this component to work, you must have react-icons installed.
// npm install react-icons

// --- MOCK DATA ---
const currentUser = {
  id: 1,
  name: "Aarav Sharma",
  avatar:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format=fit=crop",
};

const contactsData = [
  {
    id: 2,
    name: "Priya Das",
    avatar:
      "https://images.unsplash.com/photo-1582233479579-f2e1281a44c2?q=80&w=1887&auto=format=fit=crop",
    online: true,
    messages: [
      {
        senderId: 2,
        text: "Hey Aarav! Did you see the beautiful Bougainvillea blooms today?",
        time: "10:30 AM",
      },
      {
        senderId: 1,
        text: "Oh yes! They look amazing. I was thinking of getting one for my balcony.",
        time: "10:31 AM",
      },
      {
        senderId: 2,
        text: "You definitely should! They thrive in the Kolkata heat.",
        time: "10:32 AM",
      },
    ],
  },
  {
    id: 3,
    name: "Rohan Mehta",
    avatar:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format=fit=crop",
    online: false,
    messages: [
      {
        senderId: 3,
        text: "Got the soil mix you recommended. Thanks!",
        time: "Yesterday",
      },
      {
        senderId: 1,
        text: "Great! Let me know how it works out for your roses.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 4,
    name: "Sunita Banerjee",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format=fit=crop",
    online: true,
    messages: [
      {
        senderId: 4,
        text: "Can you suggest a good organic pesticide?",
        time: "Yesterday",
      },
    ],
  },
];

// --- Standalone Private Chat Page Component ---
export default function PrivateChat() {
  const [activeChat, setActiveChat] = useState(contactsData[0]);
  const [message, setMessage] = useState("");
  const [allContacts, setAllContacts] = useState(contactsData);
  const chatEndRef = useRef(null);

  // Function to scroll to the latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever the active chat's messages change
  useEffect(() => {
    scrollToBottom();
  }, [activeChat]);

  // Function to handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage = {
      senderId: currentUser.id,
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Update the messages for the active chat
    const updatedContacts = allContacts.map((contact) => {
      if (contact.id === activeChat.id) {
        return { ...contact, messages: [...contact.messages, newMessage] };
      }
      return contact;
    });

    setAllContacts(updatedContacts);
    // Update the active chat state to re-render the message list
    setActiveChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
    setMessage("");
  };

  return (
    <main className="flex-1 flex h-screen bg-white">
      {/* Contact List */}
      <div
        className={`w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 flex flex-col ${
          activeChat && "hidden md:flex"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Chats</h2>
          <div className="relative mt-4">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {allContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setActiveChat(contact)}
              className={`flex items-center p-4 cursor-pointer hover:bg-emerald-50 ${
                activeChat?.id === contact.id ? "bg-emerald-50" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="ml-4 flex-1 overflow-hidden">
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm text-gray-500 truncate">
                  {contact.messages[contact.messages.length - 1].text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={`w-full md:w-2/3 lg:w-3/4 flex flex-col ${
          !activeChat && "hidden md:flex"
        }`}
      >
        {activeChat ? (
          <>
            <div className="p-4 border-b bg-white flex justify-between items-center">
              <div className="flex items-center">
                <button
                  className="md:hidden mr-4 text-gray-600"
                  onClick={() => setActiveChat(null)}
                >
                  <IoArrowBack size={24} />
                </button>
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="font-bold">{activeChat.name}</p>
                  <p className="text-sm text-gray-500">
                    {activeChat.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-gray-500">
                <button className="hover:text-emerald-600">
                  <FiPhone size={20} />
                </button>
                <button className="hover:text-emerald-600">
                  <FiVideo size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
              {activeChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex mb-4 ${
                    msg.senderId === currentUser.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.senderId === currentUser.id
                        ? "bg-emerald-500 text-white rounded-br-none"
                        : "bg-white text-gray-700 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`text-xs mt-1 text-right ${
                        msg.senderId === currentUser.id
                          ? "text-emerald-100"
                          : "text-gray-400"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-white border-t"
            >
              <div className="flex items-center bg-gray-100 rounded-full px-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-transparent p-3 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 text-white rounded-full p-3 hover:bg-emerald-600 transition-colors"
                >
                  <IoSend size={20} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </main>
  );
}
