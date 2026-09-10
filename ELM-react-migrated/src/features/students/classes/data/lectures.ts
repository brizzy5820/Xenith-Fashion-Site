// Mock course content for the student lesson player.
//
// This is intentionally shaped the way a real API response would be so it can be
// swapped for a production data source later: each lesson is a list of ordered
// media blocks (video / audio / slides / text / pdf) plus optional downloadable
// resources. The media URLs below are public sample assets used only for the
// demo — replace `url` / `pdfUrl` with teacher-uploaded files in production.

export type LessonBlockType =
  | "video"
  | "audio"
  | "slides"
  | "text"
  | "pdf";

export interface Slide {
  title: string;
  bullets: string[];
  note?: string;
}

export interface LessonResource {
  id: string;
  label: string;
  href: string;
}

export interface LessonBlock {
  id: string;
  type: LessonBlockType;
  title: string;
  duration?: string;

  // video / audio
  url?: string;
  poster?: string;

  // slides
  slides?: Slide[];

  // text (lightweight markdown: "## " heading, "- " bullet, blank line = break)
  body?: string;

  // pdf
  pdfUrl?: string;
}

export interface Lesson {
  id: string;
  classId?: string;
  subject: string;
  title: string;
  description: string;
  instructor: string;
  duration?: string;
  blocks: LessonBlock[];
  resources?: LessonResource[];
}

const VIDEO_SAMPLE =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const AUDIO_SAMPLE = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export const lessons: Record<string, Lesson> = {
  "functions-and-limits": {
    id: "functions-and-limits",
    classId: "mathematics",
    subject: "Mathematics",
    title: "Functions and Limits",
    description:
      "An introduction to functions and the concept of a limit — the foundation of calculus.",
    instructor: "Mr. Adeyemi",
    duration: "42 min",
    blocks: [
      {
        id: "b1",
        type: "video",
        title: "Introduction to Functions",
        duration: "8:30",
        url: VIDEO_SAMPLE,
        poster:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=60",
      },
      {
        id: "b2",
        type: "text",
        title: "What is a Function?",
        body: `## Definition
A function is a rule that assigns each input exactly one output. We write f(x) to mean "f of x".

## Key ideas
- The domain is the set of allowed inputs.
- The range is the set of possible outputs.
- A vertical line test tells us if a graph is a function.

## Example
If f(x) = x² + 1, then f(3) = 10. The domain is all real numbers.`,
      },
      {
        id: "b3",
        type: "slides",
        title: "Limits — Lecture Slides",
        duration: "12:00",
        slides: [
          {
            title: "Limits",
            bullets: [
              "A limit describes the value a function approaches.",
              "Notation: lim(x→a) f(x) = L",
              "Limits can exist even when f(a) is undefined.",
            ],
            note: "Think of zooming in on a graph forever.",
          },
          {
            title: "One-sided Limits",
            bullets: [
              "Left-hand limit: approach from below.",
              "Right-hand limit: approach from above.",
              "The limit exists only when both sides agree.",
            ],
          },
          {
            title: "Evaluating Limits",
            bullets: [
              "Direct substitution first.",
              "Factor and cancel when you get 0/0.",
              "Use conjugates for radical expressions.",
            ],
            note: "Practice is the fastest way to build intuition.",
          },
        ],
      },
      {
        id: "b4",
        type: "audio",
        title: "Audio Summary — Limits in real life",
        duration: "6:15",
        url: AUDIO_SAMPLE,
      },
      {
        id: "b5",
        type: "pdf",
        title: "Downloadable Handout",
        pdfUrl: "/materials/functions-and-limits.pdf",
      },
    ],
    resources: [
      { id: "r1", label: "Functions & Limits (PDF)", href: "/materials/functions-and-limits.pdf" },
      { id: "r2", label: "Practice Worksheet", href: "/materials/functions-and-limits.pdf" },
    ],
  },

  differentiation: {
    id: "differentiation",
    classId: "mathematics",
    subject: "Mathematics",
    title: "Differentiation",
    description: "Learn how to find derivatives and what they tell us about a function.",
    instructor: "Mr. Adeyemi",
    duration: "38 min",
    blocks: [
      {
        id: "b1",
        type: "slides",
        title: "The Derivative",
        slides: [
          {
            title: "Derivative as a Rate of Change",
            bullets: [
              "f'(x) is the instantaneous rate of change.",
              "Geometrically it is the slope of the tangent.",
              "Power rule: d/dx xⁿ = n·xⁿ⁻¹",
            ],
          },
          {
            title: "Rules of Differentiation",
            bullets: [
              "Sum rule: (f + g)' = f' + g'",
              "Product rule: (fg)' = f'g + fg'",
              "Chain rule for composite functions.",
            ],
            note: "The chain rule appears everywhere — master it.",
          },
        ],
      },
      {
        id: "b2",
        type: "video",
        title: "Worked Examples",
        duration: "14:20",
        url: VIDEO_SAMPLE,
      },
      {
        id: "b3",
        type: "text",
        title: "Reading the Derivative",
        body: `## What the sign tells you
- f'(x) > 0 → the function is increasing.
- f'(x) < 0 → the function is decreasing.
- f'(x) = 0 → a possible turning point.

## Second derivative
The second derivative f''(x) tells us about concavity and is used to classify maxima and minima.`,
      },
      {
        id: "b4",
        type: "pdf",
        title: "Formula Sheet",
        pdfUrl: "/materials/differentiation.pdf",
      },
    ],
    resources: [{ id: "r1", label: "Formula Sheet (PDF)", href: "/materials/differentiation.pdf" }],
  },

  "applications-differentiation-1": {
    id: "applications-differentiation-1",
    classId: "mathematics",
    subject: "Mathematics",
    title: "Some Applications of Differentiation — Part I",
    description: "Using derivatives to solve optimisation and motion problems.",
    instructor: "Mr. Adeyemi",
    duration: "45 min",
    blocks: [
      {
        id: "b1",
        type: "video",
        title: "Optimisation Introduction",
        duration: "10:05",
        url: VIDEO_SAMPLE,
      },
      {
        id: "b2",
        type: "text",
        title: "Optimisation Steps",
        body: `## Solving an optimisation problem
1. Draw a diagram and define variables.
2. Write the quantity to optimise as a function.
3. Use the derivative to find critical points.
4. Check endpoints and confirm a maximum or minimum.

## Example
Find the rectangle of largest area for a fixed perimeter P.`,
      },
      {
        id: "b3",
        type: "slides",
        title: "Kinematics with Derivatives",
        slides: [
          {
            title: "Displacement, Velocity, Acceleration",
            bullets: [
              "v(t) = s'(t)",
              "a(t) = v'(t) = s''(t)",
              "Derivatives link position, speed and acceleration.",
            ],
          },
          {
            title: "Interpreting the Graph",
            bullets: [
              "Where v = 0 the object changes direction.",
              "Positive a means speeding up (when v > 0).",
            ],
          },
        ],
      },
      {
        id: "b4",
        type: "audio",
        title: "Revision Podcast",
        duration: "9:40",
        url: AUDIO_SAMPLE,
      },
      {
        id: "b5",
        type: "pdf",
        title: "Problem Set",
        pdfUrl: "/materials/applications-differentiation-1.pdf",
      },
    ],
    resources: [
      { id: "r1", label: "Problem Set (PDF)", href: "/materials/applications-differentiation-1.pdf" },
    ],
  },
};

export function getLesson(id: string | undefined): Lesson | undefined {
  if (!id) return undefined;
  return lessons[id];
}

export type LessonBlockTypeLabel = LessonBlockType;
