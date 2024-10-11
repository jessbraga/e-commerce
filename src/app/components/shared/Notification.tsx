import React from 'react';
import { X } from 'lucide-react';

export type NotificationType = "default" | "success" | "alert" | "danger"

export interface NotificationConfig {
  message: string
  type?: NotificationType
  isVisible: boolean
}

interface NotificationProps {
  message: string
  visible: boolean
  type?: NotificationType
  timeout?: number
  onClose: () => void
}

function setNotificationColor(type: NotificationType) {
  let color
  switch (type) {
    case "default":
      color = "bg-black"
      break
    case "success":
      color = "bg-green-500"
      break
    case "alert":
      color = "bg-yellow-600"
      break
    case "danger":
      color = "bg-red-500"
      break
  }
  return color
}

export default function Notification({ 
  message,
  visible,
  onClose,
  type = "default",
  timeout = 5000
} : NotificationProps) {
  if (!visible) return null

  setTimeout(() => onClose(), timeout)

  return (
    <div 
      className={`fixed top-4 right-4 p-4 ${setNotificationColor(type)} text-white rounded-lg shadow-lg w-96`}> 
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button className="ml-4 text-sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
