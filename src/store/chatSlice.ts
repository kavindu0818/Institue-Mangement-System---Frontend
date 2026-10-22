import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from '../types';

export interface ChatChannel {
  id: string;
  name: string;
  type: 'class' | 'direct';
  subject?: string;
  avatar?: string;
  lastMessage?: string;
  lastTime?: string;
  unreadCount: number;
}

const INITIAL_CHANNELS: ChatChannel[] = [
  {
    id: 'chan-1',
    name: 'Physics Alpha Batch (Class Discussion)',
    type: 'class',
    subject: 'Quantum Physics',
    avatar: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Do we need graph sheets for tomorrow lab?',
    lastTime: '10:45 AM',
    unreadCount: 2
  },
  {
    id: 'chan-2',
    name: 'Mathematics Olympiad Prep',
    type: 'class',
    subject: 'Pure Mathematics',
    avatar: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Problem set 4 solutions have been uploaded to Materials.',
    lastTime: 'Yesterday',
    unreadCount: 0
  },
  {
    id: 'chan-3',
    name: 'Prof. Sarah Jenkins (Teacher Direct)',
    type: 'direct',
    subject: 'Parent-Teacher Communication',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Alex has shown great progress in waves & optics!',
    lastTime: '11:20 AM',
    unreadCount: 1
  },
  {
    id: 'chan-4',
    name: 'Institute Helpdesk & Fees Support',
    type: 'direct',
    subject: 'Administration',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Receipt for INV-2026-089 has been generated successfully.',
    lastTime: 'Oct 12',
    unreadCount: 0
  }
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    channelId: 'chan-1',
    senderId: 'teach-1',
    senderName: 'Prof. Sarah Jenkins',
    senderRole: 'teacher',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    content: 'Good morning everyone! Reminder that chapter 4 practice problems are due this Thursday before 5 PM.',
    timestamp: '09:15 AM'
  },
  {
    id: 'msg-2',
    channelId: 'chan-1',
    senderId: 'stu-2',
    senderName: 'Sophia Chen',
    senderRole: 'student',
    senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    content: 'Thank you Professor! Will questions on Doppler effect be included in the mid-term quiz?',
    timestamp: '09:22 AM'
  },
  {
    id: 'msg-3',
    channelId: 'chan-1',
    senderId: 'teach-1',
    senderName: 'Prof. Sarah Jenkins',
    senderRole: 'teacher',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    content: 'Yes Sophia, both relativistic and classical Doppler shifts will be tested.',
    timestamp: '09:30 AM'
  },
  {
    id: 'msg-4',
    channelId: 'chan-1',
    senderId: 'stu-1',
    senderName: 'Alex Morgan',
    senderRole: 'student',
    senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    content: 'Do we need graph sheets for tomorrow lab?',
    timestamp: '10:45 AM'
  },
  {
    id: 'msg-5',
    channelId: 'chan-3',
    senderId: 'par-1',
    senderName: 'David Morgan',
    senderRole: 'parent',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'Hello Professor Jenkins, I wanted to check how Alex is performing in the practical lab sessions.',
    timestamp: '11:05 AM'
  },
  {
    id: 'msg-6',
    channelId: 'chan-3',
    senderId: 'teach-1',
    senderName: 'Prof. Sarah Jenkins',
    senderRole: 'teacher',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    content: 'Alex has shown great progress in waves & optics! Very attentive and scores top tier in problem solving.',
    timestamp: '11:20 AM'
  }
];

interface ChatState {
  channels: ChatChannel[];
  messages: ChatMessage[];
  activeChannelId: string;
}

const initialState: ChatState = {
  channels: INITIAL_CHANNELS,
  messages: INITIAL_MESSAGES,
  activeChannelId: 'chan-1'
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChannel: (state, action: PayloadAction<string>) => {
      state.activeChannelId = action.payload;
      const chan = state.channels.find(c => c.id === action.payload);
      if (chan) {
        chan.unreadCount = 0;
      }
    },
    sendMessage: (
      state,
      action: PayloadAction<{
        senderId: string;
        senderName: string;
        senderRole: any;
        senderAvatar: string;
        content: string;
        attachmentName?: string;
      }>
    ) => {
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        channelId: state.activeChannelId,
        senderId: action.payload.senderId,
        senderName: action.payload.senderName,
        senderRole: action.payload.senderRole,
        senderAvatar: action.payload.senderAvatar,
        content: action.payload.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        attachmentName: action.payload.attachmentName
      };
      state.messages.push(newMsg);

      const chan = state.channels.find(c => c.id === state.activeChannelId);
      if (chan) {
        chan.lastMessage = action.payload.content;
        chan.lastTime = 'Just now';
      }
    }
  }
});

export const { setActiveChannel, sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
