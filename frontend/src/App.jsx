import React from 'react'
import { useAuth } from "@clerk/clerk-react";
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { Navigate } from 'react-router'
import { Routes ,Route } from 'react-router'
import toast from 'react-hot-toast'
import * as Sentry from "@sentry/react";
import CallPage from './pages/CallPage'


const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <SentryRoutes>
      <Route path="/" element={isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />} />
      <Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />} />

      <Route
        path="/call/:id"
        element={isSignedIn ? <CallPage /> : <Navigate to={"/auth"} replace />}
      />

      <Route
        path="*"
        element={isSignedIn ? <Navigate to={"/"} replace /> : <Navigate to={"/auth"} replace />}
      />
    </SentryRoutes>
  );






//first version of routing
  // return (
  //   <>

  //   <SignedIn>
  //   <SentryRoutes>
  //       <Route path="/" element={<HomePage />} />
  //       <Route path="/auth" element={<Navigate to={"/"} replace />} />  
  //     </SentryRoutes>
  //   </SignedIn>


  //   <SignedOut>
  //   <SentryRoutes>
  //       <Route path="/auth" element={<AuthPage />} />
  //       <Route path="*" element={<Navigate to={"/auth"} replace />} />
  //     </SentryRoutes>
  //   </SignedOut>
  // </>
  // )
}

export default App
