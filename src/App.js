import { Route, Routes, Navigate } from 'react-router-dom';

import MainHeader from './components/MainHeader';

import CapitalizeWord from './pages/CapitalizeWord';
import CapitalizeText from './pages/CapitalizeText';

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" exact element={<Navigate to="/capitalizeMyWord" />} />
          <Route path="/capitalizeMyWord" element={<CapitalizeWord />} />
          <Route path="/capitalizeMyText" exact element={<CapitalizeText />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
