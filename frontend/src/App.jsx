import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import ClubDashboard from './pages/ClubDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EventsList from './pages/EventsList';
import Leaderboard from './pages/Leaderboard';
import AIAnalytics from './pages/AIAnalytics';
import VolunteerManagement from './pages/VolunteerManagement';
import Gallery from './pages/EventGallery';
import CertificatePage from './pages/Certificates';
import AdminApprovals from './pages/AdminApprovals';
import ClubApprovals from './pages/ClubApprovals';
import ProtectedRoute from './components/ProtectedRoute';
import CreateEvent from './pages/CreateEvent';
import EventRegister from './pages/EventRegister';
import ClubManageEvents from './pages/ManageEvents'
import EventDetails from './pages/EventDetails';
import MyEvents from './pages/MyEvents';
import Suggestions from './pages/Suggestions';
import EditEvent from './pages/EditEvent';
import About from './pages/About';


export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path='/about' element={<About/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route
  path="/admin"
  element={
    <ProtectedRoute roles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/club"
  element={
    <ProtectedRoute roles={["club"]}>
      <ClubDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/student"
  element={
    <ProtectedRoute roles={["student"]}>
      <StudentDashboard />
    </ProtectedRoute>
  }
/>


      {/* Admin */}
<Route path="/manage-events" element={<ProtectedRoute roles={["admin"]}><AdminApprovals/></ProtectedRoute>} />
<Route path="/clubs/pending" element={<ProtectedRoute roles={["admin"]}><ClubApprovals/></ProtectedRoute>} />


{/* Club */}
<Route path="/create-event" element={<ProtectedRoute roles={["club"]}><CreateEvent/></ProtectedRoute>} />
<Route path="/club/manage-events" element={<ProtectedRoute roles={["club"]}><ClubManageEvents/></ProtectedRoute>} />
<Route path="/club/volunteers" element={<ProtectedRoute roles={["club"]}><VolunteerManagement/></ProtectedRoute>} />
<Route path="/club/leaderboard" element={<ProtectedRoute roles={["club"]}><Leaderboard/></ProtectedRoute>} />
<Route path="/club/analytics" element={<ProtectedRoute roles={["club"]}><AIAnalytics/></ProtectedRoute>} />

{/* Student */}
<Route path="/events" element={<ProtectedRoute roles={["student"]}><EventsList/></ProtectedRoute>} />
<Route path="/gallery" element={<ProtectedRoute roles={["student","club"]}><Gallery/></ProtectedRoute>} />
<Route path="/certificates" element={<ProtectedRoute roles={["student"]}><CertificatePage/></ProtectedRoute>} />
<Route path="/events" element={<ProtectedRoute roles={["student"]}><EventsList/></ProtectedRoute>} />
<Route path="/events/:id" element={
  <ProtectedRoute roles={["student","club","admin"]}>
    <EventDetails/>
  </ProtectedRoute>
}/>

<Route path="/event/:id/register" element={
  <ProtectedRoute roles={["student"]}>
    <EventRegister/>
  </ProtectedRoute>
}/>

<Route path="/my-events" element={
  <ProtectedRoute roles={["student"]}>
    <MyEvents/>
  </ProtectedRoute>
}/>

<Route path="/edit-event/:id" element={
  <ProtectedRoute roles={["club"]}>
    <EditEvent/>
  </ProtectedRoute>
}/>

<Route path="/suggestions" element={
  <ProtectedRoute roles={["student"]}>
    <Suggestions/>
  </ProtectedRoute>
}/>
<Route
  path="/leaderboard"
  element={
    <ProtectedRoute roles={["admin", "student", "club"]}>
      <Leaderboard />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}
