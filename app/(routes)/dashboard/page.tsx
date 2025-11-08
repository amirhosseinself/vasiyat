"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useWills,
  useCreateWill,
  useDeleteWill,
  useActivateWill,
  useDeactivateWill,
} from "@/hooks/useWills";
import {
  FileText,
  Users,
  CheckCircle,
  PlusCircle,
  Search,
  Filter,
  SortAsc,
  Loader2,
} from "lucide-react";
import Button from "@/components/utils/Button";
import WillCard from "@/components/dashboard/WillCard";
import StatsCard from "@/components/dashboard/StatsCard";
import { ConfirmDialog } from "@/components/utils/Modal";
import { Will } from "@/types/api";
import clsx from "clsx";
import { toast } from "sonner";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "draft" | "sent">("all");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");

  // Delete confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; will: Will | null }>({
    isOpen: false,
    will: null,
  });

  // Fetch wills
  const { data: willsData, isLoading, error } = useWills({ page, limit: 9 });

  // Mutations
  const deleteWill = useDeleteWill();
  const activateWill = useActivateWill();
  const deactivateWill = useDeactivateWill();

  // Calculate statistics
  const stats = useMemo(() => {
    if (!willsData?.data.data) return null;

    const wills = willsData.data.data;
    return {
      total: willsData.data.meta.total,
      active: wills.filter((w) => w.status === "active").length,
      draft: wills.filter((w) => w.status === "draft").length,
      sent: wills.filter((w) => w.status === "sent").length,
      totalRecipients: wills.reduce((sum, w) => sum + w.recipients.length, 0),
    };
  }, [willsData]);

  // Filter and sort wills
  const filteredWills = useMemo(() => {
    if (!willsData?.data.data) return [];

    let filtered = [...willsData.data.data];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (w) =>
          w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((w) => w.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return a.title.localeCompare(b.title, "fa");
      }
    });

    return filtered;
  }, [willsData, searchQuery, statusFilter, sortBy]);

  // Handlers
  const handleDeleteWill = async () => {
    if (!deleteConfirm.will) return;

    try {
      await deleteWill.mutateAsync({ id: deleteConfirm.will.id });
      toast.success("یادگار با موفقیت حذف شد");
      setDeleteConfirm({ isOpen: false, will: null });
    } catch (error) {
      toast.error("خطا در حذف یادگار");
    }
  };

  const handleActivateWill = async (will: Will) => {
    try {
      await activateWill.mutateAsync(will.id);
      toast.success("یادگار فعال شد");
    } catch (error) {
      toast.error("خطا در فعال‌سازی یادگار");
    }
  };

  const handleDeactivateWill = async (will: Will) => {
    try {
      await deactivateWill.mutateAsync(will.id);
      toast.success("یادگار غیرفعال شد");
    } catch (error) {
      toast.error("خطا در غیرفعال‌سازی یادگار");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white rtl">
      {/* Header */}
      <div className="bg-gradient-memory py-12 px-4">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              داشبورد یادگارها
            </h1>
            <p className="text-white/80 text-lg">
              مدیریت پیام‌ها و خاطرات خود
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 -mt-16">
            <StatsCard
              title="کل یادگارها"
              value={stats.total}
              icon={FileText}
              color="primary"
              delay={0}
            />
            <StatsCard
              title="یادگارهای فعال"
              value={stats.active}
              icon={CheckCircle}
              color="success"
              delay={0.1}
            />
            <StatsCard
              title="پیش‌نویس‌ها"
              value={stats.draft}
              subtitle="آماده فعال‌سازی"
              icon={FileText}
              color="warning"
              delay={0.2}
            />
            <StatsCard
              title="گیرندگان"
              value={stats.totalRecipients}
              subtitle="کل گیرندگان"
              icon={Users}
              color="secondary"
              delay={0.3}
            />
          </div>
        )}

        {/* Actions Bar */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="جستجو در یادگارها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pr-12 pl-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer"
              >
                <option value="all">همه وضعیت‌ها</option>
                <option value="active">فعال</option>
                <option value="draft">پیش‌نویس</option>
                <option value="sent">ارسال‌شده</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer"
              >
                <option value="date">جدیدترین</option>
                <option value="title">نام</option>
              </select>

              {/* Create Button */}
              <Button
                variant="gradient"
                size="md"
                icon={<PlusCircle size={20} />}
                href="/dashboard/create"
              >
                ایجاد یادگار جدید
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="animate-spin text-primary mx-auto mb-4" size={48} />
              <p className="text-gray-600">در حال بارگذاری...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600 text-lg font-medium">
              خطا در بارگذاری: {error.message}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredWills.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="bg-gradient-emotional w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
              <FileText className="text-white" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {searchQuery || statusFilter !== "all"
                ? "یادگاری یافت نشد"
                : "هنوز یادگاری ندارید"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || statusFilter !== "all"
                ? "فیلترهای خود را تغییر دهید"
                : "اولین یادگار خود را ایجاد کنید"}
            </p>
            <Button
              variant="primary"
              size="lg"
              icon={<PlusCircle size={20} />}
              href="/dashboard/create"
            >
              ایجاد یادگار جدید
            </Button>
          </motion.div>
        )}

        {/* Wills Grid */}
        {!isLoading && !error && filteredWills.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <AnimatePresence mode="popLayout">
                {filteredWills.map((will) => (
                  <WillCard
                    key={will.id}
                    will={will}
                    onEdit={(w) => {
                      // TODO: Navigate to edit page
                      console.log("Edit", w);
                    }}
                    onDelete={(w) => setDeleteConfirm({ isOpen: true, will: w })}
                    onActivate={handleActivateWill}
                    onDeactivate={handleDeactivateWill}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {willsData?.data.meta && willsData.data.meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  قبلی
                </Button>
                <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl border-2 border-gray-200">
                  <span className="text-gray-600">صفحه</span>
                  <span className="text-primary font-bold text-lg">{page}</span>
                  <span className="text-gray-600">از</span>
                  <span className="text-gray-900 font-bold text-lg">
                    {willsData.data.meta.totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === willsData.data.meta.totalPages}
                >
                  بعدی
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, will: null })}
        onConfirm={handleDeleteWill}
        title="حذف یادگار"
        message={`آیا از حذف یادگار "${deleteConfirm.will?.title}" اطمینان دارید؟ این عمل قابل بازگشت نیست.`}
        confirmText="حذف"
        cancelText="انصراف"
        variant="danger"
        isLoading={deleteWill.isPending}
      />
    </div>
  );
}
