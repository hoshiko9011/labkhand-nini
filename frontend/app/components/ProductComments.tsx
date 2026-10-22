"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: string;
  name: string;
  text: string;
  createdAt: string;
  likes: number;
};

type ProductCommentsProps = {
  productSlug: string;
  productTitle: string;
  /** Logged-in users can moderate (delete) comments */
  isAdmin?: boolean;
};

const commentsKey = (slug: string) => "labkhand-comments:" + slug;
const likedKey = (slug: string) => "labkhand-liked:" + slug;

function loadComments(slug: string): Comment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(commentsKey(slug));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Comment[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((c) => ({
      ...c,
      likes: typeof c.likes === "number" ? c.likes : 0,
    }));
  } catch {
    return [];
  }
}

function saveComments(slug: string, comments: Comment[]) {
  try {
    localStorage.setItem(commentsKey(slug), JSON.stringify(comments));
  } catch {
    // ignore quota / private mode errors
  }
}

function loadLiked(slug: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(likedKey(slug));
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function saveLiked(slug: string, liked: Set<string>) {
  try {
    localStorage.setItem(likedKey(slug), JSON.stringify([...liked]));
  } catch {
    // ignore
  }
}

export default function ProductComments({
  productSlug,
  productTitle,
  isAdmin = false,
}: ProductCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setComments(loadComments(productSlug));
    setLikedIds(loadLiked(productSlug));
    setReady(true);
  }, [productSlug]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedText = text.trim();

    if (trimmedName.length < 2) {
      setError("لطفاً نام خودت رو بنویس (حداقل ۲ حرف).");
      return;
    }
    if (trimmedText.length < 3) {
      setError("نظر کوتاه‌تر از این نمی‌شه! کمی بیشتر بنویس.");
      return;
    }
    if (trimmedText.length > 500) {
      setError("نظر خیلی بلنده. حداکثر ۵۰۰ حرف.");
      return;
    }

    const next: Comment = {
      id: String(Date.now()),
      name: trimmedName.slice(0, 40),
      text: trimmedText,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    const updated = [next, ...comments];
    setComments(updated);
    saveComments(productSlug, updated);
    setText("");
  }

  function toggleLike(id: string) {
    const already = likedIds.has(id);
    const nextLiked = new Set(likedIds);
    if (already) nextLiked.delete(id);
    else nextLiked.add(id);

    const updated = comments.map((c) => {
      if (c.id !== id) return c;
      const delta = already ? -1 : 1;
      return { ...c, likes: Math.max(0, (c.likes || 0) + delta) };
    });

    setLikedIds(nextLiked);
    setComments(updated);
    saveLiked(productSlug, nextLiked);
    saveComments(productSlug, updated);
  }

  function handleDelete(id: string) {
    if (!isAdmin) return;
    if (!window.confirm("این نظر حذف بشه؟")) return;

    const updated = comments.filter((c) => c.id !== id);
    setComments(updated);
    saveComments(productSlug, updated);

    const nextLiked = new Set(likedIds);
    nextLiked.delete(id);
    setLikedIds(nextLiked);
    saveLiked(productSlug, nextLiked);
  }

  function formatDate(iso: string) {
    try {
      return new Intl.DateTimeFormat("fa-IR", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  }

  return (
    <section
      className="mt-12 rounded-[2rem] border border-[#f0e4e3] bg-white/80 p-6 sm:p-8"
      aria-labelledby="comments-heading"
    >
      <h2
        id="comments-heading"
        className="text-xl font-black text-[#443a3c] sm:text-2xl"
      >
        نظرات درباره «{productTitle}»
      </h2>
      <p className="mt-2 text-sm text-[#817477]">
        تجربه‌ات رو با بقیه والدین به اشتراک بذار. نظرات روی این دستگاه ذخیره
        می‌شن.
        {isAdmin && (
          <span className="mt-1 block text-xs font-semibold text-[#a84766]">
            حالت مدیر: می‌تونی نظرات رو حذف کنی.
          </span>
        )}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="comment-name"
            className="mb-1.5 block text-sm font-semibold text-[#553d44]"
          >
            نام
          </label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            placeholder="مثلاً مامانِ کوچولو"
            className="w-full rounded-2xl border border-[#f0e4e3] bg-[#fffaf6] px-4 py-3 text-sm outline-none transition focus:border-[#c65f7d]"
          />
        </div>

        <div>
          <label
            htmlFor="comment-text"
            className="mb-1.5 block text-sm font-semibold text-[#553d44]"
          >
            نظرت
          </label>
          <textarea
            id="comment-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            maxLength={500}
            placeholder="کیفیت، اندازه، حس کوچولو…"
            className="w-full resize-y rounded-2xl border border-[#f0e4e3] bg-[#fffaf6] px-4 py-3 text-sm outline-none transition focus:border-[#c65f7d]"
          />
        </div>

        {error && (
          <p className="text-sm font-semibold text-[#a84766]" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="rounded-full bg-[#c65f7d] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a84766]"
        >
          ثبت نظر
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {!ready ? (
          <p className="text-sm text-[#817477]">در حال بارگذاری نظرات…</p>
        ) : comments.length === 0 ? (
          <p className="rounded-2xl bg-[#fff0f3] px-4 py-5 text-sm text-[#817477]">
            هنوز نظری ثبت نشده. اولین نفر باش! 💕
          </p>
        ) : (
          comments.map((c) => {
            const liked = likedIds.has(c.id);
            return (
              <article
                key={c.id}
                className="rounded-2xl border border-[#f0e4e3] bg-[#fffaf6] px-4 py-4"
              >
                <header className="flex flex-wrap items-baseline justify-between gap-2">
                  <strong className="text-sm font-bold text-[#553d44]">
                    {c.name}
                  </strong>
                  <time
                    dateTime={c.createdAt}
                    className="text-xs text-[#a49a9c]"
                  >
                    {formatDate(c.createdAt)}
                  </time>
                </header>
                <p className="mt-2 text-sm leading-7 text-[#443a3c]">{c.text}</p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleLike(c.id)}
                    className={
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition " +
                      (liked
                        ? "border-[#c65f7d] bg-[#fff0f3] text-[#a84766]"
                        : "border-[#f0e4e3] bg-white text-[#69595d] hover:border-[#c65f7d] hover:text-[#a84766]")
                    }
                    aria-pressed={liked}
                    aria-label={liked ? "برداشتن لایک" : "لایک کردن نظر"}
                  >
                    <span aria-hidden="true">{liked ? "♥" : "♡"}</span>
                    <span>{new Intl.NumberFormat("fa-IR").format(c.likes || 0)}</span>
                  </button>

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => handleDelete(c.id)}
                      className="rounded-full border border-[#f0e4e3] bg-white px-3 py-1.5 text-xs font-bold text-[#a84766] transition hover:border-[#c65f7d] hover:bg-[#fff0f3]"
                    >
                      حذف
                    </button>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
