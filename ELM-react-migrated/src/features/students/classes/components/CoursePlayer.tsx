"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  FileText,
  Headphones,
  Presentation,
  Type,
  Video,
  Download,
} from "lucide-react";
import type { Lesson, LessonBlock, Slide } from "@/features/students/classes/data/lectures";

const blockMeta: Record<
  LessonBlock["type"],
  { label: string; icon: React.ElementType; tint: string }
> = {
  video: { label: "Video", icon: Video, tint: "bg-brand-100 text-brand-700" },
  audio: { label: "Audio", icon: Headphones, tint: "bg-amber-100 text-amber-700" },
  slides: { label: "Slides", icon: Presentation, tint: "bg-violet-100 text-violet-700" },
  text: { label: "Reading", icon: Type, tint: "bg-sky-100 text-sky-700" },
  pdf: { label: "PDF", icon: FileText, tint: "bg-rose-100 text-rose-700" },
};

export function CoursePlayer({ lesson }: { lesson: Lesson }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [completed, setCompleted] = useState(false);

  const total = lesson.blocks.length;
  const activeBlock = lesson.blocks[current];

  useEffect(() => {
    setVisited((prev) => new Set(prev).add(current));
  }, [current]);

  const progress = Math.round((visited.size / total) * 100);

  const goTo = (index: number) => {
    if (index < 0 || index >= total) return;
    setCurrent(index);
  };

  const goBack = () => {
    if (lesson.classId) navigate(`/students/classes/${lesson.classId}`);
    else navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/60 via-[#f4faf6] to-white">
      {/* Sticky lesson bar */}
      <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={goBack}
            aria-label="Back to class"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-700 transition hover:bg-brand-50"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium uppercase tracking-wide text-brand-500">
              {lesson.subject} • Lesson
            </p>
            <h1 className="truncate text-sm font-semibold text-brand-900 sm:text-base">
              {lesson.title}
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setCompleted((value) => !value)}
            className={clsx(
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition",
              completed
                ? "bg-brand-500 text-white hover:bg-brand-600"
                : "border border-brand-200 bg-white text-brand-700 hover:bg-brand-50"
            )}
          >
            <Check size={14} />
            {completed ? "Completed" : "Mark complete"}
          </button>
        </div>

        <div className="h-1 w-full bg-brand-100">
          <div
            className="h-full bg-brand-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-5 sm:px-6 xl:grid-cols-3">
        {/* Player */}
        <section className="xl:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
            <BlockRenderer block={activeBlock} />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <span className="text-xs font-medium text-muted-foreground">
              {current + 1} of {total} • {blockMeta[activeBlock.type].label}
            </span>

            <button
              type="button"
              onClick={() => goTo(current + 1)}
              disabled={current === total - 1}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* Outline */}
        <aside className="xl:col-span-1">
          <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
            <div className="border-b border-brand-100 px-4 py-3">
              <h2 className="text-sm font-semibold text-brand-900">Lesson outline</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">{lesson.duration}</p>
            </div>

            <ul className="divide-y divide-brand-100">
              {lesson.blocks.map((block, index) => {
                const meta = blockMeta[block.type];
                const Icon = meta.icon;
                const isActive = index === current;
                const isVisited = visited.has(index);
                return (
                  <li key={block.id}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      className={clsx(
                        "flex w-full items-center gap-3 px-4 py-3 text-left transition",
                        isActive ? "bg-brand-50" : "hover:bg-brand-50/60"
                      )}
                    >
                      <span
                        className={clsx(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          meta.tint
                        )}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={clsx(
                            "block truncate text-sm font-medium",
                            isActive ? "text-brand-900" : "text-brand-800"
                          )}
                        >
                          {block.title}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {meta.label}
                          {block.duration ? ` • ${block.duration}` : ""}
                        </span>
                      </span>
                      {isVisited && (
                        <Check size={15} className="shrink-0 text-brand-500" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {lesson.resources && lesson.resources.length > 0 && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
              <div className="border-b border-brand-100 px-4 py-3">
                <h2 className="text-sm font-semibold text-brand-900">Resources</h2>
              </div>
              <ul className="divide-y divide-brand-100">
                {lesson.resources.map((resource) => (
                  <li key={resource.id}>
                    <a
                      href={resource.href}
                      download
                      className="flex items-center gap-3 px-4 py-3 text-left transition hover:bg-brand-50/60"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                        <FileText size={16} />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-brand-800">
                        {resource.label}
                      </span>
                      <Download size={15} className="shrink-0 text-brand-500" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function BlockRenderer({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case "video":
      return <VideoBlock block={block} />;
    case "audio":
      return <AudioBlock block={block} />;
    case "slides":
      return <SlidesBlock block={block} />;
    case "text":
      return <TextBlock block={block} />;
    case "pdf":
      return <PdfBlock block={block} />;
    default:
      return null;
  }
}

function BlockHeader({ block }: { block: LessonBlock }) {
  const meta = blockMeta[block.type];
  const Icon = meta.icon;
  return (
    <div className="flex items-center gap-2 border-b border-brand-100 px-4 py-3">
      <span className={clsx("flex h-7 w-7 items-center justify-center rounded-md", meta.tint)}>
        <Icon size={15} />
      </span>
      <h3 className="text-sm font-semibold text-brand-900">{block.title}</h3>
      {block.duration && (
        <span className="ml-auto text-xs text-muted-foreground">{block.duration}</span>
      )}
    </div>
  );
}

function VideoBlock({ block }: { block: LessonBlock }) {
  return (
    <div>
      <BlockHeader block={block} />
      <div className="bg-black">
        <video
          controls
          className="aspect-video w-full"
          src={block.url}
          poster={block.poster}
        >
          Your browser does not support the video element.
        </video>
      </div>
    </div>
  );
}

function AudioBlock({ block }: { block: LessonBlock }) {
  return (
    <div>
      <BlockHeader block={block} />
      <div className="flex flex-col items-center gap-4 px-4 py-8">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <CirclePlay size={30} />
        </span>
        <p className="text-sm font-medium text-brand-900">{block.title}</p>
        <audio controls className="w-full" src={block.url}>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}

function SlidesBlock({ block }: { block: LessonBlock }) {
  const slides = block.slides ?? [];
  const [index, setIndex] = useState(0);
  const slide: Slide | undefined = slides[index];

  if (!slide) {
    return (
      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
        No slides available.
      </div>
    );
  }

  return (
    <div>
      <BlockHeader block={block} />
      <div className="px-4 py-5">
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white shadow-inner">
          <span className="absolute left-4 top-4 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">
            Slide {index + 1} / {slides.length}
          </span>
          <div className="max-w-xl text-center">
            <h4 className="text-2xl font-bold sm:text-3xl">{slide.title}</h4>
            <ul className="mt-4 space-y-2 text-left text-sm text-white/90 sm:text-base">
              {slide.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            {slide.note && (
              <p className="mt-5 rounded-lg bg-white/10 px-3 py-2 text-xs text-white/80">
                {slide.note}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="inline-flex items-center gap-1 rounded-lg border border-brand-200 bg-white px-3 py-1.5 text-sm font-medium text-brand-700 transition hover:bg-brand-50 disabled:opacity-40"
          >
            <ChevronLeft size={15} />
            Prev
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={clsx(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-5 bg-brand-500" : "w-2 bg-brand-200 hover:bg-brand-300"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
            disabled={index === slides.length - 1}
            className="inline-flex items-center gap-1 rounded-lg border border-brand-200 bg-white px-3 py-1.5 text-sm font-medium text-brand-700 transition hover:bg-brand-50 disabled:opacity-40"
          >
            Next
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TextBlock({ block }: { block: LessonBlock }) {
  const content = useMemo(() => parseText(block.body ?? ""), [block.body]);
  return (
    <div>
      <BlockHeader block={block} />
      <article className="space-y-3 px-5 py-5 text-sm leading-6 text-brand-900">
        {content}
      </article>
    </div>
  );
}

function PdfBlock({ block }: { block: LessonBlock }) {
  return (
    <div>
      <BlockHeader block={block} />
      <div className="p-4">
        <div className="overflow-hidden rounded-xl border border-brand-100">
          <iframe
            title={block.title}
            src={`${block.pdfUrl}#view=FitH`}
            className="h-[70vh] w-full"
          />
        </div>
        <a
          href={block.pdfUrl}
          download
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
        >
          <Download size={16} />
          Download PDF
        </a>
      </div>
    </div>
  );
}

function parseText(body: string): React.ReactNode[] {
  const lines = body.split("\n");
  const out: React.ReactNode[] = [];
  let para: string[] = [];
  let list: string[] = [];
  let key = 0;

  const flushPara = () => {
    if (para.length) {
      out.push(
        <p key={key++} className="text-brand-800">
          {para.join(" ")}
        </p>
      );
      para = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      out.push(
        <ul key={key++} className="list-disc space-y-1 pl-5 text-brand-800">
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.trim() === "") {
      flushPara();
      flushList();
    } else if (line.startsWith("## ")) {
      flushPara();
      flushList();
      out.push(
        <h3 key={key++} className="text-base font-semibold text-brand-900">
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      flushPara();
      list.push(line.slice(2));
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();

  return out;
}
