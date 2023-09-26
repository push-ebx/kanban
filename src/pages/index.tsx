import { Routes, Route } from "react-router";
import {lazy} from "react";

const NotFoundPage = lazy(() => import("@/pages/not-found"));
const ProjectsList = lazy(() => import("@/pages/projects-list"));
const Project = lazy(() => import("@/pages/project"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectsList />} />
      <Route path="/:project_id" element={<Project />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};