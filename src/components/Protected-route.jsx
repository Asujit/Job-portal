// import { useUser } from "@clerk/react";
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { isSignedIn, isLoaded, user } = useUser();
//   const { pathname } = useLocation();

//   if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
//     return <Navigate to="/?sign-in=true" />;
//   }

//   if (
//     user !== undefined &&
//     !user?.unsafeMetadata?.role &&
//     pathname !== "/onboarding"
//   )
//     return children;
// };

// export default ProtectedRoute;

import { useUser } from "@clerk/react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  // wait for clerk to load
  if (!isLoaded) {
    return null;
  }

  // user not signed in
  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

//   onboarding protection
    if (
      !user?.unsafeMetadata?.role &&
      pathname !== "/onboarding"
    ) {
      return <Navigate to="/onboarding" />;
    }

  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  )
    return <Navigate to="/onboarding" />;

  // signed in + allowed
  return children;
};

export default ProtectedRoute;



// import { useUser } from "@clerk/react";
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { isSignedIn, isLoaded, user } = useUser();
//   const { pathname } = useLocation();

//   // wait for clerk
//   if (!isLoaded) {
//     return null;
//   }

//   // not signed in
//   if (!isSignedIn) {
//     return <Navigate to="/?sign-in=true" />;
//   }

//   // no role selected
//   if (
//     !user?.unsafeMetadata?.role &&
//     pathname !== "/onboarding"
//   ) {
//     return <Navigate to="/onboarding" />;
//   }

//   // candidate trying recruiter page
//   if (
//     user?.unsafeMetadata?.role === "candidate" &&
//     pathname === "/post-job"
//   ) {
//     return <Navigate to="/jobs" />;
//   }

//   // recruiter trying candidate-only page
//   // optional future protection

//   return children;
// };

// export default ProtectedRoute;