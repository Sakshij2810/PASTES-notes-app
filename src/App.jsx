import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Paste from "./pages/Paste";
import ViewPaste from "./pages/ViewPaste";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);

function App() {
  return (
    <div className="w-full h-screen text-white  bg-black">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
