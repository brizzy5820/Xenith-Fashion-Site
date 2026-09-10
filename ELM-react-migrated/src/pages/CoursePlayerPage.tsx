"use client";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { getLesson } from "@/features/students/classes/data/lectures";
import { CoursePlayer } from "@/features/students/classes/components/CoursePlayer";

export default function CoursePlayerPage() {
  const { lectureId } = useParams();
  const lesson = getLesson(lectureId);

  if (!lesson) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <p className="text-sm font-medium text-brand-600">Lesson not found</p>
          <h1 className="mt-2 text-2xl font-semibold text-brand-900">
            This lesson isn't available
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The lesson you're looking for may not have been published yet.
          </p>
          <Link
            to="/students/classes"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            <BookOpen size={16} />
            Back to my classes
          </Link>
        </div>
      </main>
    );
  }

  return <CoursePlayer lesson={lesson} />;
}
