import { createContext } from "react";
import { User } from "../../@types/User";

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<Object>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);
