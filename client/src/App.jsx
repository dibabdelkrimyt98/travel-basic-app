import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
// import PackageDetails from './pages/PackageDetails'; // Future step

function App() {
  return (
    <Router>
      <div className="App bg-[#081121] min-h-screen font-sans selection:bg-[#0B67FF] selection:text-white">
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* Future Routes */}
          {/* <Route path="/package/:id" element={<PackageDetails />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;