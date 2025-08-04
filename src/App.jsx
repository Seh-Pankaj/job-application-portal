import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { UserProvider } from "./context/userContext";
import HomePage from "./pages/HomePage/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobPage, { jobLoader } from "./pages/JobPage/JobPage";
import ApplicationPage from "./pages/ApplicationPage/ApplicationPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import ApplicationSummaryPage from "./pages/ApplicationSummaryPage/ApplicationSummaryPage";
import ApplicationList from "./pages/ApplicationListPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="/job/:id" element={<JobPage />} loader={jobLoader}></Route>
        <Route path="/apply/:id" element={<ApplicationPage />}></Route>
        <Route
          path="/applications/:id"
          element={<ApplicationSummaryPage />}
        ></Route>
        <Route path="/applications" element={<ApplicationList />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    )
  );

  return (
    <>
      <Provider store={store}>
        <UserProvider>
          <RouterProvider router={router}></RouterProvider>
        </UserProvider>
      </Provider>
    </>
  );
}

export default App;
