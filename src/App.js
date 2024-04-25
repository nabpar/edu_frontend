import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import Course from "./pages/Course";
import Exaam from "./pages/Exaam";
import Settings from "./pages/Settings";
import Changepass from "./pages/ChangePass";
import AuthContextProvider from "./hooks/useAuth";
import Protected from "./utils/Protected";
import Addcourses from "./pages/Addcourses";
import Addsubject from "./pages/Addsubject";
// import { Advertisment } from "./pages/Advertisment";
// import { Area } from "./pages/Area";
import CourseSubjects from "./pages/CourseSubjects";
import AdminProfile from "./components/AdminProfile";
import Contact from "./pages/Contact";
// import Courses2 from "./pages/Courses2";
import Addblogsdata from "./pages/Addblogsdata";
import Addfiles from "./pages/Addfiles";
import AddSyllabus from "./pages/AddSyallabus";
import SubjectDetail from "./pages/SubjectDetail";
import Messages from "./pages/Messages";
import BlogDetail from "./pages/BlogDetail";
import PublicChangePassword from "./pages/PublicChangePassword";
import ResetPasswordEmail from "./pages/ResetPasswordEmail";
import AddTopic from "./pages/AddTopic";
import Unauthorized from "./pages/Unauthorized";
import RoleBased from "./utils/RoleBased";
import ViewAssignedTopics from "./pages/ViewAssignedTopics";
import AddTopicData from "./pages/AddTopicData";
import ReviewContent from "./pages/ReviewContent";
import AdminContentEdit from "./pages/AdminContentEdit";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import SubjectDetailTopic from "./pages/SubjectDetailTopic";

function App() {
  return (
    <AuthContextProvider>
      {/* <NotificationsProvider> */}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="blogs">
            <Route path="" element={<Blogs />} />
            <Route path=":blogid" element={<BlogDetail />} />
          </Route>

          <Route path="contact" element={<Contact />} />
          <Route path="all-courses" element={<Course/>} />
          <Route path="all-courses">
            <Route path=":courseid" element={<CourseSubjects />} />
            <Route path=":courseid/:subjectid" element={<SubjectDetail />} />
            <Route path=":courseid/:subjectid/:topicid" element={<SubjectDetailTopic />} />
          </Route>
          <Route path="reset-password" element={<ResetPasswordEmail />} />
          <Route
            path="reset-password/:uid/:token/"
            element={<PublicChangePassword />}
          />
        </Route>

        <Route element={<Protected />}>
          <Route element={<PrivateLayout />}>
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/exam" element={<Exaam />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/changepass" element={<Changepass />} />
            <Route path="/course" element={<Course />} />

            <Route path="course">
              <Route path=":courseid" element={<CourseSubjects />} />
              <Route path=":courseid/:subjectid" element={<SubjectDetail />} />
              <Route path=":courseid/:subjectid/:topicid" element={<SubjectDetailTopic />} />
            </Route>
            <Route element={<RoleBased roles={["TEACHER", "ADMIN"]} />}>
              <Route path="/addtopic" element={<AddTopic />} />
              <Route path="/addblogsdata" element={<Addblogsdata />} />
            </Route>
            <Route element={<RoleBased roles={["TEACHER"]} />}>
              <Route path="/assigned-topics" element={<ViewAssignedTopics />}/>
              <Route path="/assigned-topics/:topicid" element={<AddTopicData />} />
            </Route>
            <Route element={<RoleBased roles={["ADMIN"]} />}>
              <Route path="/addfiles" element={<Addfiles />} />
              <Route path="/addsyllabus" element={<AddSyllabus />} />
              <Route path="/addcourse" element={<Addcourses />} />
              <Route path="/addsubject" element={<Addsubject />} />
              <Route path="/review-content" element={<ReviewContent/>} />
              <Route path="/review-content/:topicid" element={<AdminContentEdit/>} />
              {/* <Route path="/area" element={<Area />} />
              <Route path="/advertisment" element={<Advertisment />} /> */}
            </Route>
            <Route path="messages" element={<Messages />} />
            <Route path="notifications" element={<Notifications/>} />
          </Route>
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {/* </NotificationsProvider> */}
    </AuthContextProvider>
  );
}

export default App;
