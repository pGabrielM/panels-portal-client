import { createContext } from "react";

export type DataContextType = {
  panel: (panelName: string, panelLink: string) => Promise<Boolean>;
}

export const DataContext = createContext<DataContextType>(null!);
