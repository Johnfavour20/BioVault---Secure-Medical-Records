
import React from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { MedicalRecord } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatbotProps {
  records: MedicalRecord[];
}

const Chatbot: React.FC<ChatbotProps> = ({ records }) => {
  const [chat, setChat] = React.useState<Chat | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  React.useEffect(() => {
    const initializeChat = () => {
        setIsLoading(true);
        setError('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const recordContext = records.map(r => 
                `Record Title: ${r.title}\nRecord Type: ${r.type}\nDate: ${r.date}\nDoctor: ${r.doctor}\n\nContent:\n${r.content}`
            ).join('\n\n---\n\n');

            const greeting = "Hello! I'm Bio.AI, your personal medical assistant. I've reviewed your records and I'm ready to answer any questions you might have about them.";
            const initialHistory = [
                { role: 'user' as const, parts: [{ text: `Here are my medical records for context:\n\n${recordContext}` }] },
                { role: 'model' as const, parts: [{ text: greeting }] }
            ];
            
            const chatSession = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: "You are a helpful AI medical assistant for BioVault. Your name is 'Bio.AI'. Your purpose is to help the user understand their medical records. You must only answer questions based on the provided medical records. If a question is outside the scope of the records, or if you are asked for medical advice, you must politely decline and advise the user to consult with a healthcare professional. Be friendly, empathetic, and clear in your responses. Do not hallucinate or make up information. Your knowledge is strictly limited to the documents provided.",
                },
                history: initialHistory,
            });
            
            setChat(chatSession);
            setMessages([{ role: 'model', text: greeting }]);

        } catch (e) {
            console.error("Chat initialization failed:", e);
            setError("Failed to initialize the AI assistant.");
        } finally {
            setIsLoading(false);
        }
    };
    initializeChat();
  }, [records]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chat || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const messageToSend = input;
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await chat.sendMessage({ message: messageToSend });
      const modelMessage: Message = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (e) {
      console.error("Sending message failed:", e);
      setError("Sorry, I couldn't process that. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-grow overflow-y-auto pr-2 space-y-4 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-xl max-w-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-gray-700'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && messages.length > 0 && (
           <div className="flex justify-start">
            <div className="p-3 rounded-xl max-w-sm bg-gray-700">
                <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && <p className="text-rose-400 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your records..."
          disabled={isLoading}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
          aria-label="Chat input"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
