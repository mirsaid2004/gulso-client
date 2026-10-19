"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useComments } from "@/features/comments/api/get-comments";
import { useCreateComment } from "@/features/comments/api/create-comment";
import { getOrdersQueryOptions } from "@/features/orders/api/get-orders";
import { OrderStatus } from "@/types/enums";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductReviewsProps {
  productId: number | string;
  reviewCount?: number;
}

const AVATAR_COLORS = [
  "bg-primary/10 text-primary",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-violet-100 text-violet-600",
  "bg-amber-100 text-amber-600",
];

function getInitials(username: string) {
  return username
    .replace(/^@/, "")
    .split(/[\s_]/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || username.slice(0, 2).toUpperCase();
}

function getAvatarColor(username: string) {
  let hash = 0;
  for (const ch of username) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffffff;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function formatDate(iso: string, t: ReturnType<typeof useTranslations>) {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86_400_000);
  if (diffDays === 0) return t("reviewsSection.timeAgo.today");
  if (diffDays === 1) return t("reviewsSection.timeAgo.yesterday");
  if (diffDays < 7) return t("reviewsSection.timeAgo.daysAgo", { count: diffDays });
  if (diffDays < 30) return t("reviewsSection.timeAgo.weeksAgo", { count: Math.floor(diffDays / 7) });
  if (diffDays < 365) return t("reviewsSection.timeAgo.monthsAgo", { count: Math.floor(diffDays / 30) });
  return t("reviewsSection.timeAgo.yearsAgo", { count: Math.floor(diffDays / 365) });
}

function StarRow({ rating, interactive = false, value = 0, onChange }: {
  rating?: number;
  interactive?: boolean;
  value?: number;
  onChange?: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const display = interactive ? (hovered || value) : (rating ?? 0);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => interactive && onChange?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Icon
            icon={display >= star ? "material-symbols:star-rounded" : "material-symbols:star-outline-rounded"}
            className={`w-4 h-4 ${display >= star ? "text-amber-400" : "text-slate-300"} ${interactive ? "hover:text-amber-400 transition-colors" : ""}`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ comment, t }: { comment: import("@/types").CommentResponse; t: ReturnType<typeof useTranslations> }) {
  const initials = getInitials(comment.username);
  const colorClass = getAvatarColor(comment.username);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-6 flex flex-col gap-3 h-full">
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-black shrink-0 text-sm shadow-inner ${colorClass}`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-sm text-slate-900 truncate">@{comment.username}</p>
          <p className="text-xs font-semibold text-slate-400">{formatDate(comment.commentDate, t)}</p>
        </div>
      </div>
      <StarRow rating={comment.rating} />
      <p className="text-[14px] text-slate-700 leading-relaxed font-medium flex-1">
        "{comment.content}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
        <div className="flex items-center gap-1.5">
          <button className="flex items-center justify-center text-slate-400 hover:text-primary p-1.5 rounded-full transition-colors active:scale-95">
            <Icon icon="material-symbols:thumb-up-outline-rounded" className="w-4 h-4" />
          </button>
          <span className="text-xs font-black text-slate-600">{comment.likesCount}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="flex items-center justify-center hover:text-rose-500 text-slate-400 p-1.5 rounded-full transition-colors active:scale-95">
            <Icon icon="material-symbols:thumb-down-outline-rounded" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewForm({ productId, t }: { productId: number | string; t: ReturnType<typeof useTranslations> }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const { mutate, isPending } = useCreateComment({
    productId,
    mutationConfig: {
      onSuccess: () => {
        setContent("");
        setRating(0);
        setSubmitted(true);
      },
    },
  });

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 text-center">
        <Icon icon="material-symbols:check-circle-rounded" className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
        <p className="font-black text-emerald-700 text-base">{t("reviewsSection.submitted.title")}</p>
        <p className="text-sm text-emerald-600 font-medium mt-1">{t("reviewsSection.submitted.subtitle")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
        <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
          <Icon icon="material-symbols:rate-review-outline-rounded" className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-black text-slate-900 text-base tracking-tight">{t("reviewsSection.form.title")}</h3>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t("reviewsSection.form.rating")}</p>
        <StarRow interactive value={rating} onChange={setRating} />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t("reviewsSection.form.content")}</p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder={t("reviewsSection.form.placeholder")}
          className="w-full resize-none bg-slate-50 border border-slate-200 focus:border-primary focus:ring-0 rounded-2xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-colors"
        />
      </div>

      <button
        onClick={() => {
          if (!content.trim() || rating === 0 || isPending) return;
          mutate({ content: content.trim(), rating });
        }}
        disabled={!content.trim() || rating === 0 || isPending}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
      >
        {isPending ? (
          <Icon icon="line-md:loading-twotone-loop" className="w-5 h-5" />
        ) : (
          <>
            <Icon icon="material-symbols:send-rounded" className="w-4 h-4" />
            {t("reviewsSection.form.submit")}
          </>
        )}
      </button>
    </div>
  );
}

export function ProductReviews({ productId, reviewCount }: ProductReviewsProps) {
  const t = useTranslations("Product");
  const { status } = useSession();
  const { data: commentsData, isLoading } = useComments(productId);
  const { data: ordersData } = useQuery({
    ...getOrdersQueryOptions(),
    enabled: status === "authenticated",
  });

  const comments = commentsData?.data ?? [];

  const hasPurchased =
    status === "authenticated" &&
    (ordersData?.data ?? []).some(
      (order) =>
        order.status === OrderStatus.COMPLETED &&
        order.items.some((item) => item.productId === Number(productId))
    );

  const count = reviewCount ?? comments.length;

  return (
    <div className="mt-16 sm:mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t("reviewsSection.title")}
          {count > 0 && (
            <span className="ml-3 text-base font-bold text-slate-400">({count})</span>
          )}
        </h2>
        {hasPurchased && (
          <a
            href="#review-form"
            className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            <Icon icon="material-symbols:rate-review-outline-rounded" className="w-4 h-4" />
            {t("reviewsSection.writeReview")}
          </a>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <Icon icon="line-md:loading-twotone-loop" className="w-8 h-8 text-primary" />
        </div>
      ) : comments.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 p-10 text-center">
          <Icon icon="material-symbols:reviews-outline-rounded" className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-black text-slate-500 text-base">{t("reviewsSection.empty.title")}</p>
          <p className="text-sm text-slate-400 font-medium mt-1">{t("reviewsSection.empty.subtitle")}</p>
        </div>
      ) : (
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            className="pb-10"
          >
            {comments.map((comment) => (
              <SwiperSlide key={comment.id} className="h-auto">
                <ReviewCard comment={comment} t={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {hasPurchased && (
        <div id="review-form" className="mt-8 max-w-lg">
          <ReviewForm productId={productId} t={t} />
        </div>
      )}
    </div>
  );
}
