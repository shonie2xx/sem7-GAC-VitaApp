import React, { Children, Component, Suspense, useContext, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { useIsAuthenticated } from '@azure/msal-react'
import Login from './views/pages/login/Login';
import DefaultLayout from './layout/DefaultLayout';
import PropTypes from 'prop-types';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  const isAuthenticated = useIsAuthenticated();

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Login />
    }
    return children
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
  };

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          {/* <Route exact path="/register" name="Register Page" element={<Register />} /> */}
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<ProtectedRoute><DefaultLayout/></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App
