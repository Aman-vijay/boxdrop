// src/context/UserContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";

interface SerializedUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  username: string | null;
  emailAddress: string | null;
}

interface UserContextType {
  user: SerializedUser | null;
}

const UserContext = createContext<UserContextType>({ user: null });

export const useGlobalUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();

  const [serializedUser, setSerializedUser] = useState<SerializedUser | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      setSerializedUser({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        username: user.username,
        emailAddress: user.emailAddresses?.[0]?.emailAddress || null,
      });
    }
  }, [isLoaded, user]);

  return (
    <UserContext.Provider value={{ user: serializedUser }}>
      {children}
    </UserContext.Provider>
  );
};
