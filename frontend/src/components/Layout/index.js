import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Header from '../Header';

function Layout({ children }) {
  const inLearningArea = useRouteMatch('/learningarea');

  if (inLearningArea?.isExact) {
    return (
      <>
        {children}
      </>
    );
  } else {
    return (
      <>
        <Header />
        {children}
      </>
    );
  }
}

export default Layout;
