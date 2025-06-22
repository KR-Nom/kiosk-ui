// src/context/UserContext.js
import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // { name, studentId, role }

  const login = (name, studentId) => {
    const role = studentId === 'admin' ? 'admin' : 'student';
    setUser({ name, studentId, role });
  };

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
}
