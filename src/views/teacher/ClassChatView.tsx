import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MessageSquare, Search, CheckCheck, Users } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setActiveChannel, sendMessage } from '../../store/chatSlice';
import { Badge } from '../../components/common/Badge';

export const ClassChatView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { channels, messages, activeChannelId } = useAppSelector((state) => state.chat);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [inputText, setInputText] = useState('');
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChannel = channels.find((c) => c.id === activeChannelId) || channels[0];
  const channelMessages = messages.filter((m) => m.channelId === activeChannelId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [channelMessages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    dispatch(
      sendMessage({
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        senderAvatar: currentUser.avatar,
        content: inputText,
      })
    );
    setInputText('');
  };

  const filteredChannels = channels.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Class Discussion & Direct Communication
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Figma Screen: "Class chat" — Real-time subject discussion forum, doubt clearing, and parent-teacher channels
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[650px]">
        {/* Left Channels List */}
        <div className="border-r border-slate-100 flex flex-col bg-slate-50/50">
          <div className="p-4 border-b border-slate-100 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search channels..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredChannels.map((channel) => {
              const isActive = channel.id === activeChannelId;
              return (
                <button
                  key={channel.id}
                  onClick={() => dispatch(setActiveChannel(channel.id))}
                  className={`w-full p-3.5 text-left transition-all flex items-start gap-3 ${
                    isActive ? 'bg-white shadow-sm border-l-4 border-indigo-600' : 'hover:bg-white/60'
                  }`}
                >
                  <img
                    src={channel.avatar}
                    alt={channel.name}
                    className="w-9 h-9 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {channel.name}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {channel.lastTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {channel.lastMessage || 'No messages yet'}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[10px] text-indigo-600 font-medium">
                        {channel.subject}
                      </span>
                      {channel.unreadCount > 0 && (
                        <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                          {channel.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        <div className="md:col-span-2 lg:col-span-3 flex flex-col h-full bg-white">
          {/* Channel Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeChannel.avatar}
                alt={activeChannel.name}
                className="w-9 h-9 rounded-xl object-cover"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {activeChannel.name}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {activeChannel.subject} • Active Classroom Members
                </p>
              </div>
            </div>

            <Badge variant="success" size="sm" dot={true}>
              Active Channel
            </Badge>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30">
            {channelMessages.map((msg) => {
              const isMine = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${
                    isMine ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-800">
                        {isMine ? 'You' : msg.senderName}
                      </span>
                      <span className="text-[10px] text-slate-400 capitalize">
                        ({msg.senderRole})
                      </span>
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                        isMine
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-slate-100 flex items-center gap-2 bg-white"
          >
            <button
              type="button"
              onClick={() => alert('Attachment upload dialog')}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder={`Message #${activeChannel.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white"
            />
            <button
              type="submit"
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/20 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
