import { Routes, Route } from "react-router";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";
import ZeroLesson from "./pages/ZeroLesson";
import Program from "./pages/Program";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Start from "./pages/Start";
import Cabinet from "./pages/Cabinet";
import Lesson from "./pages/Lesson";
import Relapse from "./pages/Relapse";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nulevoy-urok" element={<ZeroLesson />} />
        <Route path="/programma" element={<Program />} />
        <Route path="/kak-eto-rabotaet" element={<HowItWorks />} />
        <Route path="/ob-avtore" element={<About />} />
        <Route path="/nachat" element={<Start />} />
        <Route path="/kabinet" element={<Cabinet />} />
        <Route path="/urok/:lessonId" element={<Lesson />} />
        <Route path="/esli-sorvalsya" element={<Relapse />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-24">
      <h1 className="font-serif text-3xl font-bold text-ink">Такой страницы нет</h1>
      <p className="mt-4 text-ink-muted">Ничего страшного. Вернёмся к тому, что есть.</p>
      <a href="/" className="link-quiet mt-6 inline-block min-h-[44px]">
        На главную →
      </a>
    </div>
  );
}
