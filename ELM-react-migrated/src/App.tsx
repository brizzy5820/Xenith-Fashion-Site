import { Outlet, Route, Routes } from "react-router-dom";
import { DashboardShell } from "@/components/layouts/DashboardShell";
import { Seo } from "@/components/seo/Seo";
import HomePage from "@/pages/HomePage";
import StudentsPage from "@/pages/StudentsPage";
import StudentDashboardPage from "@/pages/StudentDashboardPage";
import AssignmentsPage from "@/pages/AssignmentsPage";
import AssignmentDetailsPage from "@/pages/AssignmentDetailsPage";
import ClassesPage from "@/pages/ClassesPage";
import ClassDetailsPage from "@/pages/ClassDetailsPage";
import CoursePlayerPage from "@/pages/CoursePlayerPage";
import MaterialViewerPage from "@/pages/MaterialViewerPage";
import StudentProfilePage from "@/pages/StudentProfilePage";
import StudentProfileSectionPage from "@/pages/StudentProfileSectionPage";
import SchedulePage from "@/pages/SchedulePage";

function StudentLayout() {
  return (
    <DashboardShell role="student">
      <Outlet />
    </DashboardShell>
  );
}

function PublicHome() {
  return (
    <>
      <Seo title="ELM | Education Lifecycle Management" description="Education Lifecycle Management" canonical={window.location.origin + "/"} />
      <HomePage />
    </>
  );
}

function PrivatePage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Seo title={`${title} | ELM`} noIndex />
      {children}
    </>
  );
}

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<PublicHome />} />

        <Route path="/students" element={<StudentLayout />}>
          <Route index element={<PrivatePage title="Student Dashboard"><StudentsPage /></PrivatePage>} />
          <Route path="dashboard" element={<PrivatePage title="Student Dashboard"><StudentDashboardPage /></PrivatePage>} />
          <Route path="assignments" element={<PrivatePage title="Assignments"><AssignmentsPage /></PrivatePage>} />
          <Route path="assignments/:assignmentId" element={<PrivatePage title="Assignment"><AssignmentDetailsPage /></PrivatePage>} />
          <Route path="classes" element={<PrivatePage title="My Classes"><ClassesPage /></PrivatePage>} />
          <Route path="classes/:classId" element={<PrivatePage title="Class"><ClassDetailsPage /></PrivatePage>} />
          <Route path="profile" element={<PrivatePage title="Profile"><StudentProfilePage /></PrivatePage>} />
          <Route path="profile/:section" element={<PrivatePage title="Profile"><StudentProfileSectionPage /></PrivatePage>} />
          <Route path="schedule" element={<PrivatePage title="Timetable & Schedule"><SchedulePage /></PrivatePage>} />
        </Route>

        {/* Immersive lesson player + material viewer (full screen, no sidebar) */}
        <Route
          path="/students/classes/lectures/:lectureId"
          element={<PrivatePage title="Lesson"><CoursePlayerPage /></PrivatePage>}
        />
        <Route
          path="/students/materials/:materialId"
          element={<PrivatePage title="Material"><MaterialViewerPage /></PrivatePage>}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <Seo title="Page Not Found | ELM" noIndex />
      <div>
        <p className="text-sm font-medium text-brand-600">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900">Page not found</h1>
        <p className="mt-2 text-sm text-gray-500">The page you requested does not exist.</p>
      </div>
    </main>
  );
}
