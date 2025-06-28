import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import NotFound from '../pages/NotFound'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import CompleteRegistration from '@/pages/CompleteRegistration'
import LinkTelegram from '@/pages/LinkTelegram'
import BrowseAravts from '@/pages/BrowseAravts'
import Learn from '@/pages/Learn'
import AdminPanel from '@/pages/AdminPanel'
import AravtDashboard from '@/pages/AravtDashboard'
import ProjectManagement from '@/pages/ProjectManagement'
import TasksManagement from '@/pages/TasksManagement'
import MemberManagement from '@/pages/MemberManagement'
import ProjectDetails from '@/pages/ProjectDetails'
import Profile from '@/pages/Profile'
import Wallet from '@/pages/Wallet'
import OffersManagement from '@/pages/OffersManagement'
import AravtDetails from '@/pages/AravtDetails'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/complete_registration" element={<CompleteRegistration/>} /> 
        <Route path="/link_telegram" element={<LinkTelegram/>} /> !!
      </Route>
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<AravtDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/dashboard" element={<AravtDashboard />} />
        <Route path="/aravts/:id" element={<AravtDetails/>} />
        <Route path="/projects" element={<ProjectManagement />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/tasks" element={<TasksManagement />} />
        <Route path="/members" element={<MemberManagement />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/offers" element={<OffersManagement />} />
        <Route path="/browse" element={<BrowseAravts /> }/>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
} 