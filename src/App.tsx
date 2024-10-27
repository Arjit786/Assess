import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AssessmentCreator from './components/AssessmentCreator';
import AssessmentView from './components/AssessmentView';
import AssessmentList from './components/AssessmentList';
import Results from './components/Results';
import InterviewScheduler from './components/InterviewScheduler';
import Credits from './components/Credits';
import Feedback from './components/Feedback';
import NewAssessment from './components/NewAssessment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NewAssessment />} />
          <Route path="new-assessment" element={<NewAssessment />} />
          <Route path="create-assessment" element={<AssessmentCreator />} />
          <Route path="assessment/:id" element={<AssessmentView />} />
          <Route path="assessments" element={<AssessmentList />} />
          <Route path="results" element={<Results />} />
          <Route path="scheduler" element={<InterviewScheduler />} />
          <Route path="credits" element={<Credits />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;