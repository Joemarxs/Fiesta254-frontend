import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}
interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
interface MessagesState {
  messages: Message[];
  conversations: Conversation[];
  activeConversation: string | null;
  isLoading: boolean;
  error: string | null;
}
// Mock messages data
const initialMessages: Message[] = [{
  id: '1',
  senderId: '1',
  receiverId: '2',
  content: 'Hi there! I have a question about your Summer Music Festival.',
  timestamp: '2023-06-20T14:30:00Z',
  read: true
}, {
  id: '2',
  senderId: '2',
  receiverId: '1',
  content: 'Hello! Sure, what would you like to know?',
  timestamp: '2023-06-20T14:35:00Z',
  read: true
}, {
  id: '3',
  senderId: '1',
  receiverId: '2',
  content: 'Is there parking available at the venue?',
  timestamp: '2023-06-20T14:37:00Z',
  read: true
}, {
  id: '4',
  senderId: '2',
  receiverId: '1',
  content: 'Yes, there is a large parking lot available for attendees. It costs $10 for the day.',
  timestamp: '2023-06-20T14:40:00Z',
  read: false
}, {
  id: '5',
  senderId: '3',
  receiverId: '1',
  content: "Hello, I'm interested in your Tech Conference. Do you offer student discounts?",
  timestamp: '2023-06-21T09:15:00Z',
  read: true
}, {
  id: '6',
  senderId: '1',
  receiverId: '3',
  content: 'Hi! Yes, we offer a 30% discount for students with valid ID. You can select the student ticket option during checkout.',
  timestamp: '2023-06-21T09:30:00Z',
  read: true
}];
// Generate conversations from messages
const generateConversations = (messages: Message[]): Conversation[] => {
  const conversationMap = new Map<string, Conversation>();
  messages.forEach(message => {
    // Create a unique ID for the conversation between these two users
    const participantIds = [message.senderId, message.receiverId].sort();
    const conversationId = `conv_${participantIds.join('_')}`;
    if (!conversationMap.has(conversationId)) {
      conversationMap.set(conversationId, {
        id: conversationId,
        participants: participantIds,
        lastMessage: message.content,
        lastMessageTime: message.timestamp,
        unreadCount: message.read ? 0 : 1
      });
    } else {
      const conversation = conversationMap.get(conversationId)!;
      const messageTime = new Date(message.timestamp);
      const lastMessageTime = new Date(conversation.lastMessageTime);
      if (messageTime > lastMessageTime) {
        conversation.lastMessage = message.content;
        conversation.lastMessageTime = message.timestamp;
      }
      if (!message.read) {
        conversation.unreadCount += 1;
      }
    }
  });
  return Array.from(conversationMap.values());
};
const initialState: MessagesState = {
  messages: initialMessages,
  conversations: generateConversations(initialMessages),
  activeConversation: null,
  isLoading: false,
  error: null
};
export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
      state.conversations = generateConversations(action.payload);
    },
    sendMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
      // Update conversations
      const participantIds = [action.payload.senderId, action.payload.receiverId].sort();
      const conversationId = `conv_${participantIds.join('_')}`;
      const existingConversation = state.conversations.find(conv => conv.id === conversationId);
      if (existingConversation) {
        existingConversation.lastMessage = action.payload.content;
        existingConversation.lastMessageTime = action.payload.timestamp;
        if (!action.payload.read) {
          existingConversation.unreadCount += 1;
        }
      } else {
        state.conversations.push({
          id: conversationId,
          participants: participantIds,
          lastMessage: action.payload.content,
          lastMessageTime: action.payload.timestamp,
          unreadCount: action.payload.read ? 0 : 1
        });
      }
    },
    markAsRead: (state, action: PayloadAction<{
      messageIds: string[];
    }>) => {
      const {
        messageIds
      } = action.payload;
      messageIds.forEach(id => {
        const message = state.messages.find(m => m.id === id);
        if (message && !message.read) {
          message.read = true;
          // Update unread count in conversation
          const participantIds = [message.senderId, message.receiverId].sort();
          const conversationId = `conv_${participantIds.join('_')}`;
          const conversation = state.conversations.find(conv => conv.id === conversationId);
          if (conversation && conversation.unreadCount > 0) {
            conversation.unreadCount -= 1;
          }
        }
      });
    },
    markConversationAsRead: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;
      const conversation = state.conversations.find(conv => conv.id === conversationId);
      if (conversation) {
        const participantIds = conversation.participants;
        state.messages.forEach(message => {
          const msgParticipants = [message.senderId, message.receiverId].sort();
          const belongsToConversation = msgParticipants.every(id => participantIds.includes(id));
          if (belongsToConversation && !message.read) {
            message.read = true;
          }
        });
        conversation.unreadCount = 0;
      }
    },
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversation = action.payload;
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      const index = state.messages.findIndex(m => m.id === action.payload);
      if (index !== -1) {
        state.messages.splice(index, 1);
        state.conversations = generateConversations(state.messages);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});
export const {
  setMessages,
  sendMessage,
  markAsRead,
  markConversationAsRead,
  setActiveConversation,
  deleteMessage,
  setLoading,
  setError
} = messagesSlice.actions;
export default messagesSlice.reducer;