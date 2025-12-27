import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App bg-[#081121] min-h-screen selection:bg-[#0B67FF] selection:text-white">
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* Placeholder for the next step: 
            <Route path="/package/:id" element={<PackageDetails />} /> 
          */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;