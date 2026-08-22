import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherPortal from './pages/TeacherPortal';
import SubjectView from './pages/SubjectView';
import ActivityView from './pages/ActivityView';
import { MainLayout } from './components/layout/MainLayout';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Login />} />
            
            <Route path="/student" element={
              <ProtectedRoute>
                <MainLayout>
                  <StudentDashboard />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/student/subject/:subjectId" element={
              <ProtectedRoute>
                <MainLayout>
                  <SubjectView />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/student/module/:moduleId" element={
              <ProtectedRoute>
                <MainLayout>
                  <ActivityView />
                </MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/teacher" element={
              <ProtectedRoute>
                <MainLayout>
                  <TeacherPortal />
                </MainLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
