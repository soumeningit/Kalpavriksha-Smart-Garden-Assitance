import React, { useState, useEffect, useRef, useContext } from "react";
import { FaRegPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { chatWithLLMAPI } from "../../Service/Operation/ChatWithLLMService";
import AuthContext from "../../Context/AuthContext";

const ThinkingAnimation = () => (
  <div className="flex items-center space-x-2">
    <style>{`
                        @keyframes grow {
                                0% { transform: scale(0.5); opacity: 0.5; }
                                100% { transform: scale(1); opacity: 1; }
                        }
                        .leaf-path {
                                animation: grow 0.8s ease-in-out infinite alternate;
                        }
                `}</style>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="leaf-path text-emerald-500"
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 14H14V17H10V14H7V10H10V7H14V10H17V14Z"
        fill="currentColor"
        style={{ animationDelay: "0s" }}
      />
    </svg>
    <span className="text-sm text-gray-500">Kalpavriksha is thinking...</span>
  </div>
);

export default function ChatWithLLM() {
  const authContext = useContext(AuthContext);
  const { token } = authContext.data;

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello! I'm Kalpavriksha, your personal gardening assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom of the chat on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    try {
      const newMessages = [...messages, { role: "user", text: input }];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);

      const response = await chatWithLLMAPI(input, token);
      console.log("LLM Response:", response);
      const data =
        JSON.parse(response?.data?.data) ||
        "I'm sorry, I couldn't find an answer to that.";

      setMessages((prev) => [...prev, { role: "ai", text: data.answer }]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error during chat:", error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white rounded-2xl shadow-sm font-sans">
      {/* Chat History */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              msg.role === "user" ? "justify-end" : ""
            }`}
          >
            {msg.role === "ai" && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <FaRobot className="w-6 h-6 text-emerald-600" />
              </div>
            )}
            <div
              className={`max-w-md p-4 rounded-2xl ${
                msg.role === "user"
                  ? "bg-emerald-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
            {msg.role === "user" && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUser className="w-6 h-6 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <FaRobot className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="max-w-md p-4 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-none">
              <ThinkingAnimation />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about plants, pests, or seasons in your area..."
            className="w-full pl-4 pr-14 py-3 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 disabled:bg-gray-400 transition-all duration-300 transform hover:scale-110"
          >
            <FaRegPaperPlane className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
