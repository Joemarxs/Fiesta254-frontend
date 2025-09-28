import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, User, Phone, Mail, Clock } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isHost: boolean;
}
const ChatPage = () => {
  const {
    hostId
  } = useParams<{
    hostId: string;
  }>();
  const navigate = useNavigate();
  const {
    isAuthenticated,
    currentUser
  } = useAppSelector(state => state.users);
  const events = useAppSelector(state => state.events.events);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Find host details from the first event they host
  const hostEvent = events.find(event => event.host.id === hostId);
  const host = hostEvent?.host;
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login?redirect=/chat/' + hostId);
      return;
    }
    // Mock initial messages for demo
    const initialMessages: Message[] = [{
      id: '1',
      senderId: hostId || '',
      text: 'Hello! How can I help you with my event?',
      timestamp: new Date(Date.now() - 3600000),
      isHost: true
    }];
    setMessages(initialMessages);
  }, [isAuthenticated, navigate, hostId]);
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser?.id || '',
      text: newMessage,
      timestamp: new Date(),
      isHost: false
    };
    setMessages([...messages, userMessage]);
    setNewMessage('');
    // Simulate host reply after a delay
    setTimeout(() => {
      const hostReply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: hostId || '',
        text: "Thank you for your message! I'll get back to you soon.",
        timestamp: new Date(),
        isHost: true
      };
      setMessages(prev => [...prev, hostReply]);
    }, 1500);
  };
  if (!host) {
    return <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Host not found
            </h1>
            <p className="text-gray-600 mb-6">
              We couldn't find the host you're looking for.
            </p>
            <Link to="/" className="inline-flex items-center text-indigo-600">
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>;
  }
  // If not authenticated, show a message and login button
  if (!isAuthenticated) {
    return <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Sign In Required
            </h1>
            <p className="text-gray-600 mb-6">
              You need to be logged in to chat with this host.
            </p>
            <Link to={`/login?redirect=/chat/${hostId}`} className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 mb-4">
              Sign In
            </Link>
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-800">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>;
  }
  return <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link to={hostEvent ? `/events/${hostEvent.id}` : '/events'} className="flex items-center text-indigo-600 mb-6">
          <ArrowLeft size={18} className="mr-2" />
          Back to event
        </Link>
        <div className="max-w-3xl mx-auto">
          {/* Host Info Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <img src={host.image} alt={host.name} className="w-16 h-16 rounded-full object-cover mr-0 md:mr-6 mb-4 md:mb-0" />
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                  {host.name}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                  <div className="flex items-center text-gray-600">
                    <User size={16} className="mr-2" />
                    <span className="text-sm">Host since 2021</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <span className="text-sm">{`${host.name.toLowerCase().replace(' ', '.')}@example.com`}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">
                      Typically responds within 2 hours
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Chat Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-indigo-600 text-white px-6 py-4">
              <h2 className="font-semibold">Chat with {host.name}</h2>
            </div>
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6">
              <div className="space-y-4">
                {messages.map(message => <div key={message.id} className={`flex ${message.isHost ? 'justify-start' : 'justify-end'}`}>
                    {message.isHost && <img src={host.image} alt={host.name} className="w-8 h-8 rounded-full object-cover mr-3 mt-1" />}
                    <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-3 ${message.isHost ? 'bg-gray-100 text-gray-800' : 'bg-indigo-600 text-white'}`}>
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isHost ? 'text-gray-500' : 'text-indigo-200'}`}>
                        {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                      </p>
                    </div>
                    {!message.isHost && <img src={currentUser?.profileImage} alt={currentUser?.name} className="w-8 h-8 rounded-full object-cover ml-3 mt-1" />}
                  </div>)}
                <div ref={messagesEndRef} />
              </div>
            </div>
            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex">
                <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type your message..." className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button type="submit" className="bg-indigo-600 text-white rounded-r-lg px-4 py-2 hover:bg-indigo-700 transition duration-300 flex items-center">
                  <Send size={18} className="mr-2" />
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ChatPage;