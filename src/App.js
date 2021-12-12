import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import LoadingSpinner from './components/UI/LoadingSpinner';

const CapitalizeWord = React.lazy(() => import('./pages/CapitalizeWord'));
const CapitalizeText = React.lazy(() => import('./pages/CapitalizeText'));

function App() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <MainHeader />
        <main>
          <Routes>
            <Route
              path="/"
              exact
              element={<Navigate to="/capitalizeMyWord" />}
            />
            <Route path="/capitalizeMyWord" element={<CapitalizeWord />} />
            <Route
              path="/capitalizeMyText"
              exact
              element={<CapitalizeText />}
            />
          </Routes>
        </main>
      </Suspense>
    </div>
  );
}

export default App;
