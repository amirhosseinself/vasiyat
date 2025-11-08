"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Calendar,
  Edit3,
  Trash2,
  CheckCircle,
  Circle,
  Image,
  Video,
  FileAudio,
  Paperclip
} from "lucide-react";
import { Will } from "@/types/api";
import Button from "../utils/Button";
import clsx from "clsx";

interface WillCardProps {
  will: Will;
  onEdit?: (will: Will) => void;
  onDelete?: (will: Will) => void;
  onActivate?: (will: Will) => void;
  onDeactivate?: (will: Will) => void;
}

const WillCard = ({
  will,
  onEdit,
  onDelete,
  onActivate,
  onDeactivate,
}: WillCardProps) => {
  const isActive = will.status === "active";
  const isDraft = will.status === "draft";
  const isSent = will.status === "sent";

  const statusConfig = {
    active: {
      label: "فعال",
      color: "bg-green-100 text-green-700 border-green-200",
      icon: CheckCircle,
      dotColor: "bg-green-500",
    },
    draft: {
      label: "پیش‌نویس",
      color: "bg-gray-100 text-gray-700 border-gray-200",
      icon: Circle,
      dotColor: "bg-gray-400",
    },
    sent: {
      label: "ارسال‌شده",
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: CheckCircle,
      dotColor: "bg-blue-500",
    },
  };

  const currentStatus = statusConfig[will.status];

  // Get media file count by type
  const mediaCount = {
    images: will.mediaFiles?.filter((m) => m.type === "image").length || 0,
    videos: will.mediaFiles?.filter((m) => m.type === "video").length || 0,
    audios: will.mediaFiles?.filter((m) => m.type === "audio").length || 0,
    documents: will.mediaFiles?.filter((m) => m.type === "document").length || 0,
  };

  const totalMedia = will.mediaFiles?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Status Bar */}
      <div
        className={clsx(
          "h-2",
          isActive && "bg-gradient-to-r from-green-400 to-green-600",
          isDraft && "bg-gradient-to-r from-gray-300 to-gray-400",
          isSent && "bg-gradient-to-r from-blue-400 to-blue-600"
        )}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 rtl">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="text-primary" size={24} />
              <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                {will.title}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed line-clamp-2 mb-3">
              {will.content}
            </p>
          </div>

          {/* Status Badge */}
          <div
            className={clsx(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border",
              currentStatus.color
            )}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className={clsx("w-2 h-2 rounded-full", currentStatus.dotColor)} />
            </motion.div>
            <span>{currentStatus.label}</span>
          </div>
        </div>

        {/* Meta Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {/* Recipients */}
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={18} className="text-primary" />
            <span className="text-sm">
              {will.recipients.length} گیرنده
            </span>
          </div>

          {/* Media Files */}
          {totalMedia > 0 && (
            <div className="flex items-center gap-2 text-gray-600">
              <Paperclip size={18} className="text-secondary" />
              <span className="text-sm">{totalMedia} فایل</span>
            </div>
          )}

          {/* Date */}
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={18} className="text-accent" />
            <span className="text-sm">
              {new Date(will.createdAt).toLocaleDateString("fa-IR")}
            </span>
          </div>
        </div>

        {/* Media Preview Icons */}
        {totalMedia > 0 && (
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            {mediaCount.images > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-600 rounded-lg text-xs">
                <Image size={14} />
                <span>{mediaCount.images}</span>
              </div>
            )}
            {mediaCount.videos > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 rounded-lg text-xs">
                <Video size={14} />
                <span>{mediaCount.videos}</span>
              </div>
            )}
            {mediaCount.audios > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs">
                <FileAudio size={14} />
                <span>{mediaCount.audios}</span>
              </div>
            )}
            {mediaCount.documents > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-600 rounded-lg text-xs">
                <Paperclip size={14} />
                <span>{mediaCount.documents}</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 rtl">
          {isDraft && onActivate && (
            <Button
              variant="primary"
              size="sm"
              icon={<CheckCircle size={16} />}
              onClick={() => onActivate(will)}
            >
              فعال‌سازی
            </Button>
          )}

          {isActive && onDeactivate && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeactivate(will)}
            >
              غیرفعال‌سازی
            </Button>
          )}

          {onEdit && !isSent && (
            <Button
              variant="ghost"
              size="sm"
              icon={<Edit3 size={16} />}
              onClick={() => onEdit(will)}
            >
              ویرایش
            </Button>
          )}

          {onDelete && !isSent && (
            <Button
              variant="ghost"
              size="sm"
              icon={<Trash2 size={16} />}
              onClick={() => onDelete(will)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              حذف
            </Button>
          )}
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-emotional opacity-5 rounded-full blur-2xl -z-10" />
    </motion.div>
  );
};

export default WillCard;
