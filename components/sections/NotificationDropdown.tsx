"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Check, CheckCheck, Inbox, UserPlus, FolderGit, Settings, KeyRound, Loader2 } from "lucide-react";

interface NotificationItem {
  id: string;
  type: string; // NEW_LEAD, PROJECT_CREATED, CMS_UPDATED, LOGIN_ACTIVITY
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch notifications
  async function fetchNotifications() {
    try {
      const res = await fetch("/api/admin/notifications");
      const data = await res.json();
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  }

  useEffect(() => {
    fetchNotifications();
    // Poll every 45 seconds for new alerts in real-time
    const interval = setInterval(fetchNotifications, 45000);
    return () => clearInterval(interval);
  }, []);

  // Mark single as read
  async function markAsRead(id: string) {
    try {
      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );

      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error(err);
      fetchNotifications(); // Rollback
    }
  }

  // Mark all as read
  async function markAllAsRead() {
    try {
      // Optimistic update
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

      await fetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ readAll: true }),
      });
    } catch (err) {
      console.error(err);
      fetchNotifications(); // Rollback
    }
  }

  // Count unread
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Helper to choose item icon
  const getIcon = (type: string) => {
    switch (type) {
      case "NEW_LEAD":
        return <UserPlus size={14} className="text-blue-400" />;
      case "PROJECT_CREATED":
        return <FolderGit size={14} className="text-emerald-400" />;
      case "CMS_UPDATED":
        return <Settings size={14} className="text-amber-400" />;
      case "LOGIN_ACTIVITY":
        return <KeyRound size={14} className="text-cyan-400" />;
      default:
        return <Bell size={14} className="text-slate-400" />;
    }
  };

  // Helper to format dates relatively
  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  return (
    <div ref={containerRef} className="relative">
      {/* BELL TRIGGER ICON */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) fetchNotifications(); // Refresh list on open
        }}
        className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-[#0C1A3D]/60 rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
        aria-label="Toggle notifications menu"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 min-w-3.5 h-3.5 px-0.5 rounded-full bg-[#0066FF] border border-[#020612] text-[8px] font-bold text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
            {unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 rounded-xl border border-[#0E204A] bg-[#060F24] shadow-2xl shadow-black/80 z-50 overflow-hidden select-none">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#0E204A] bg-[#0C1A3D]/20">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              Notifications
              {unreadCount > 0 && (
                <span className="bg-[#0066FF]/10 text-[#0066FF] text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-[#0066FF]/20">
                  {unreadCount} new
                </span>
              )}
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[10px] font-semibold text-slate-400 hover:text-blue-400 flex items-center gap-1.5 transition-all duration-200"
              >
                <CheckCheck size={12} /> Mark all read
              </button>
            )}
          </div>

          {/* List items */}
          <div className="max-h-[320px] overflow-y-auto divide-y divide-[#0E204A]/40 scrollbar-thin scrollbar-thumb-[#142D66]">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center text-slate-500">
                <div className="w-10 h-10 rounded-full bg-[#0C1A3D]/30 border border-[#0E204A]/60 flex items-center justify-center mb-3">
                  <Inbox size={18} className="text-slate-500" />
                </div>
                <p className="text-xs font-semibold text-slate-300">All caught up!</p>
                <p className="text-[10px] text-slate-600 mt-1 max-w-[200px]">You have no recent administrative CRM updates or alerts.</p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`flex gap-3 p-3.5 transition-colors relative group ${
                    item.read ? "hover:bg-[#0C1A3D]/10" : "bg-[#0066FF]/5 hover:bg-[#0066FF]/8"
                  }`}
                >
                  {/* Icon Indicator */}
                  <div className="w-7 h-7 rounded-lg bg-[#0C1A3D] border border-[#142D66] flex items-center justify-center flex-shrink-0 shadow-inner">
                    {getIcon(item.type)}
                  </div>

                  {/* Message body */}
                  <div className="flex-1 min-w-0 pr-6">
                    <p className="text-[11.5px] font-bold text-slate-200 truncate">{item.title}</p>
                    <p className="text-xs text-slate-400 mt-1.5 leading-normal break-words">{item.message}</p>
                    <span className="text-[9px] text-slate-600 font-medium font-mono block mt-2">{formatTime(item.createdAt)}</span>
                  </div>

                  {/* Mark single read button */}
                  {!item.read && (
                    <button
                      onClick={() => markAsRead(item.id)}
                      className="absolute right-3.5 top-3.5 p-1 rounded-md text-slate-500 hover:text-[#25D366] hover:bg-[#0C1A3D]/80 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200"
                      title="Mark as read"
                    >
                      <Check size={12} />
                    </button>
                  )}

                  {/* Blue unread circular indicator */}
                  {!item.read && (
                    <span className="absolute right-3.5 bottom-3.5 w-1.5 h-1.5 rounded-full bg-[#0066FF] shadow-md shadow-blue-500/20" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
