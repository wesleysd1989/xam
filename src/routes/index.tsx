import React from 'react';
import { Routes as ReactDOMRoutes, Route } from 'react-router-dom';


import {
  Dashboard,
  SignIn,
} from '../pages';

const Routes: React.FC = () => {
  return (
    <ReactDOMRoutes>
      <Route path="/" element={<SignIn />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </ReactDOMRoutes>
  );
};

export default Routes;
