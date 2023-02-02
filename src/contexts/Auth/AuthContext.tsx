import { createContext } from "react";
import { User } from "../../@types/User";

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string, saveToken: boolean) => Promise<Object>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);
