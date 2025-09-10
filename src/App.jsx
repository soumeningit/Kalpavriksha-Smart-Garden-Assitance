import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import LogIn from "./Pages/SignIn";
import Verification from "./Pages/Verification";
import ForgetPassword from "./Pages/ForgetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import Contact from "./Pages/Contact";
import FeaturePage from "./Pages/FeaturePage";
import WorkPage from "./Pages/WorkPage";
import AboutPage from "./Pages/AboutPage";
import Pricing from "./Pages/Price";
import TermsAndConditions from "./Pages/TermsAndCondition";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Disclaimer from "./Pages/Disclaimer";
import Dashboard from "./Dashboard/main";
import Profile from "./Dashboard/Components/Profile";
import SettingPage from "./Dashboard/Settings/SettingPage";
import MyGarden from "./Dashboard/Components/MyGarden";
import PrivateChat from "./Dashboard/Components/PrivateChat";
import OAuth from "./Pages/OAuth";
import Verify from "./Pages/Verify";
import ErrorPage from "./Pages/ErrorPage";
import ProtectedRoute from "./Components/CustomHook/ProtectedRoute";
import LocationFinder from "./Dashboard/Components/LocationFinder";
import Community from "./Dashboard/Community/Community";
// import Test from "./Pages/Test";
import SharedContentPage from "./Dashboard/Community/SharedContentPage";
import PlantIdentificationDetails from "./Dashboard/GardenAssitance/PlantIdentifier/PlantIdentificationDetails";
import GardenAssistanceMain from "./Dashboard/GardenAssitance/GardenAssistanceMain";
import RecentDetectionDetails from "./Dashboard/GardenAssitance/DetectProblem/RecentDetectionDetails";
import BlogEditor from "./Blog/Components/BlogEditor";
import BlogMain from "./Blog/BlogMain";
import ProtectedBlogRoute from "./Components/CustomHook/ProtectedBlogRoute";
import CreatePostPage from "./Blog/Pages/CreatePostPage";
import AllPosts from "./Blog/Pages/AllPosts";
import UserPost from "./Blog/Pages/UserPost";
import BlogDashboard from "./Blog/Pages/BlogDashboard";
import BlogDetailsPage from "./Blog/Pages/BlogDetailsPage";
import EditPost from "./Blog/Pages/EditPost";
import ProtectedLogIn from "./Components/CustomHook/ProtectedLogIn";
import ChatWithLLM from "./Dashboard/Components/ChatWithLLM";
import ChatNotice from "./Components/CustomHook/ChatNotice";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/register/verify/:verifyToken/uid/:userId"
          element={<Verify />}
        />
        <Route
          path="/sign-in"
          element={
            <ProtectedLogIn>
              <LogIn />
            </ProtectedLogIn>
          }
        />
        <Route path="/verify" element={<Verification />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/features" element={<FeaturePage />} />
        <Route path="/how-it-works" element={<WorkPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/share/:postId" element={<SharedContentPage />} />
        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/community" element={<Community />} />
          <Route path="/dashboard/settings" element={<SettingPage />} />
          <Route
            path="/dashboard/identifier"
            element={<GardenAssistanceMain />}
          />
          <Route path="/dashboard/my-garden" element={<MyGarden />} />
          <Route path="/dashboard/private-message" element={<PrivateChat />} />
          <Route
            path="/dashboard/location-finder"
            element={<LocationFinder />}
          />
          <Route
            path="/dashboard/plant-identifier/plant-details/:id"
            element={<PlantIdentificationDetails />}
          />
          <Route
            path="/dashboard/recent-problem-detection/plant-details/:documentId"
            element={<RecentDetectionDetails />}
          />
          <Route
            path="/dashboard/chat-with-llm"
            element={
              <ChatNotice>
                <ChatWithLLM />
              </ChatNotice>
            }
          />
        </Route>
        <Route path="/user/login" element={<OAuth />} />
        {/* <Route path="/test" element={<Test />} /> */}

        <Route
          element={
            <ProtectedBlogRoute>
              <BlogMain />
            </ProtectedBlogRoute>
          }
        >
          <Route path="/blog/dashboard" element={<BlogDashboard />} />
          <Route path="/blog/create-post" element={<CreatePostPage />} />
          <Route path="/blog/all-posts" element={<AllPosts />} />
          <Route path="/blog/user-post" element={<UserPost />} />
          <Route path="/blog/details/:postId" element={<BlogDetailsPage />} />
          <Route path="/blog/edit/:postId" element={<EditPost />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
