
import { Sidebar } from "../components/layouts/Sidebar";
export default function Home() {
  return (
    <main className="min-h-screen md:ml-64">
      <Sidebar role='admin' />
      <h1 className="px-6 py-10 text-3xl font-bold sm:px-18">Welcome to ELM</h1>
    </main>
  );
}