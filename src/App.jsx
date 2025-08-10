
import HomePage from './pages/HomePage.jsx'
import './index.css'
import IdeaInputPage from "./pages/IdeaInputPage.jsx";
import {Routes, Route} from "react-router-dom";
import AnalysisLoadingPage from "./pages/AnalysisLoadingPage.jsx";
import AnalysisResultsPage from "./pages/AnalysisResultsPage.jsx";
import AIContentLoadingPage from "./pages/AIContentLoadingPage.jsx";
import AIContentResultsPage from "./pages/AIContentResultsPage.jsx";
import SNSTestResultsPage from "./pages/SNSTestResultsPage.jsx";
import FinalReportPage from "./pages/FinalReportPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/idea-input" element={<IdeaInputPage />} />
                <Route path="/analysis-loading" element={<AnalysisLoadingPage />} />
                <Route path="/analysis-results" element={<AnalysisResultsPage />} />
                <Route path="/ai-content-loading" element={<AIContentLoadingPage />} />
                <Route path="/ai-content-results" element={<AIContentResultsPage />} />
                <Route path="/sns-test-results" element={<SNSTestResultsPage />} />
                <Route path="/final-report" element={<FinalReportPage />} />
                <Route path="/login" element={<SignupPage />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;