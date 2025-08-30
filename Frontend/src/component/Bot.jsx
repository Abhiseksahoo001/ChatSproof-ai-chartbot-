import React, { useState } from "react";
import axios from "axios";

function Bot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/bot/v1/message", {
        question: inputText, // backend expects `question`
      });

      if (res.status === 200) {
        const userMessage = { text: inputText, sender: "user" };
        const botMessage = { text: res.data.bot, sender: "bot" };

        setMessages((prev) => [...prev, userMessage, botMessage]);
        setInputText(""); // clear input
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error talking to bot", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <h2 className="text-xl font-semibold">ChatSproof</h2>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.length === 0 && !loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-400 text-lg font-medium">Make a command</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs break-words shadow-md ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
            
          </div>
        ))}
        {loading && (
          <p className="text-gray-500 text-sm italic">Bot is typing...</p>
        )}
      </main>

      {/* Input Footer */}
      <footer className="flex items-center p-4 bg-white border-t shadow-md">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className="ml-3 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
        >
          Send
        </button>
      </footer>
    </div>
  );
}

export default Bot;
