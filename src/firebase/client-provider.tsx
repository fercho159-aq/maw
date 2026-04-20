
'use client';

import { ReactNode, useContext } from 'react';
import {
  AuthContext,
  FirebaseAppContext,
  FirestoreContext,
  FirebaseProvider,
} from './provider';
import { initializeFirebase } from '.';

// This component is no longer responsible for initialization,
// but ensures that the context is available on the client.
export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const app = useContext(FirebaseAppContext);
  const auth = useContext(AuthContext);
  const firestore = useContext(FirestoreContext);

  // If the context is not yet available, we can show a loading state
  // or just return the children, assuming the parent provider will handle it.
  if (!app || !auth || !firestore) {
    // This can be a loading spinner or some fallback UI
    return <>{children}</>;
  }

  // The provider is already wrapping the layout, so we just return children.
  return <>{children}</>;
}
