import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthGate } from './components/AuthGate'
import { EnhancedHomePage } from './components/EnhancedHomePage'
import { AboutPage } from './components/AboutPage'
import { VisionPage } from './components/VisionPage'
import { ProgramsPage } from './components/ProgramsPage'
import { DocumentationPage } from './components/DocumentationPage'
import { EnhancedCandidateSelection } from './components/EnhancedCandidateSelection'
import { EnhancedClassTypeSelection } from './components/EnhancedClassTypeSelection'
import { EnhancedFeedbackOverview } from './components/EnhancedFeedbackOverview'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return (
      <AuthGate onAuthenticated={() => setIsAuthenticated(true)}>
        <div />
      </AuthGate>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnhancedHomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/documentation/:moduleId" element={<DocumentationPage />} />
        <Route path="/candidates" element={<EnhancedCandidateSelection />} />
        <Route path="/candidate/:candidateId/class-type" element={<EnhancedClassTypeSelection />} />
        <Route path="/candidate/:candidateId/feedback/:moduleId/:sessionType" element={<EnhancedFeedbackOverview />} />
      </Routes>
    </Router>
  )
}

export default App