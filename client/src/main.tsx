import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@fontsource-variable/inter";
import "katex/dist/katex.min.css";
import "./index.css";
import { AppProvider, useStudyHeartbeat } from "./lib/app";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Syllabus } from "./pages/Syllabus";
import { ConceptPage } from "./pages/Concept";
import { DiagnosticPage } from "./pages/Diagnostic";
import { RevisionPage } from "./pages/Revision";
import { MasteryMap } from "./pages/MasteryMap";
import { TestsPage } from "./pages/Tests";
import { TakeTest } from "./pages/TakeTest";
import { TestReport } from "./pages/TestReport";
import { Analytics } from "./pages/Analytics";
import { Notebook } from "./pages/Notebook";
import { SettingsPage } from "./pages/Settings";
import { PrintReport } from "./pages/PrintReport";

function App() {
  useStudyHeartbeat();
  return (
    <Routes>
      <Route path="/tests/:id/take" element={<TakeTest />} />
      <Route path="/report" element={<PrintReport />} />
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="syllabus" element={<Syllabus />} />
        <Route path="syllabus/:subjectId" element={<Syllabus />} />
        <Route path="concept/:id" element={<ConceptPage />} />
        <Route path="diagnostic/:id" element={<DiagnosticPage />} />
        <Route path="revision" element={<RevisionPage />} />
        <Route path="mastery" element={<MasteryMap />} />
        <Route path="tests" element={<TestsPage />} />
        <Route path="tests/:id/report" element={<TestReport />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="notebook" element={<Notebook />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider><App /></AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
