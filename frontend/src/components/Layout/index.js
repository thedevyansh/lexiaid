import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Header from '../Header';
import AccessibilityBtn from '../AssessibilityBtn';

function Layout({ children }) {
  const inLearningArea = useRouteMatch('/learningarea');

  if (inLearningArea?.isExact) {
    return <>{children}</>;
  } else {
    return (
      <>
        <Header />
        <AccessibilityBtn onBottom={true} />
        {children}
      </>
    );
  }
}

export default Layout;
