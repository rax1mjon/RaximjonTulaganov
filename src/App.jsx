import { Suspense } from "react";
import { lazy } from "react";
import { Route, Router, Routes } from "react-router-dom";

const Layout = lazy(() => import("./Components/Layout/Layout"));
const Home = lazy(() => import("./Pages/Home/Home"));
const Project = lazy(() => import("./Pages/Project/Project"));
const Blog = lazy(() => import("./Pages/Blog/Blog"));
const Loading = lazy(() => import("./Components/Loading/Loading"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={"project/:id"} element={<Project />} />
            <Route path={"blog"} element={<Blog />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
