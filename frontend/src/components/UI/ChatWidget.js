import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile,
  Mic
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ChatWidget = ({ recipientId, recipientName, recipientImage, onClose }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    if (user && !socketRef.current) {
      // In a real app, you would connect to your socket server here
      // socketRef.current = io(process.env.REACT_APP_SOCKET_URL, {
      //   auth: { token: localStorage.getItem('token') }
      // });
      
      // Mock socket events for demo
      setupMockSocket();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  const setupMockSocket = () => {
    // Mock socket behavior for demo purposes
    // In production, this would be real socket.io events
    console.log('Mock socket connected');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      id: Date.now(),
      content: newMessage,
      sender_id: user.id,
      recipient_id: recipientId,
      created_at: new Date(),
      sender_name: `${user.first_name} ${user.last_name}`,
      sender_image: user.profile_image
    };

    // Add message to local state
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');

    // In production, emit socket event
    // socketRef.current?.emit('new_message', {
    //   recipientId,
    //   message: newMessage,
    //   conversationId: `chat_${user.id}_${recipientId}`
    // });

    // Mock typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Mock reply
      const mockReply = {
        id: Date.now() + 1,
        content: 'Thanks for your message! I will get back to you soon.',
        sender_id: recipientId,
        recipient_id: user.id,
        created_at: new Date(),
        sender_name: recipientName,
        sender_image: recipientImage
      };
      setMessages(prev => [...prev, mockReply]);
    }, 2000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40 flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6" />
        {messages.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {messages.length}
          </span>
        )}
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={recipientImage || `https://ui-avatars.com/api/?name=${recipientName}&background=random`}
                    alt={recipientName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{recipientName}</h3>
                  <p className="text-sm text-gray-500">
                    {isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <Phone className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <Video className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Start a conversation with {recipientName}</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        message.sender_id === user.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <Paperclip className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <Smile className="w-4 h-4 text-gray-600" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <Mic className="w-4 h-4 text-gray-600" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
