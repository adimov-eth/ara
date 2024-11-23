import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import CompleteRegistration from '@/pages/CompleteRegistration'
import BrowseAravts from '@/pages/BrowseAravts'
import ExploreFeatures from '@/pages/ExploreFeatures'
import AdminPanel from '@/pages/AdminPanel'
import AravtDashboard from '@/pages/AravtDashboard'
import ProjectManagement from '@/pages/ProjectManagement'
import TasksManagement from '@/pages/TasksManagement'
import MemberManagement from '@/pages/MemberManagement'
import ProjectDetails from '@/pages/ProjectDetails'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/complete_registration" element={<CompleteRegistration/>} />
      <Route path="/explore" element={<ExploreFeatures />} />
      <Route path="/browse" element={<BrowseAravts />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/dashboard" element={<AravtDashboard />} />
        <Route path="/projects" element={<ProjectManagement />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/tasks" element={<TasksManagement />} />
        <Route path="/members" element={<MemberManagement />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
} 