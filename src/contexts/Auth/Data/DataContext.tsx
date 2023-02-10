import { createContext } from "react";

export type DataContextType = {
  storePanel: (panelName: string, link: string, status: string, order: string) => Promise<Object>;
}

export const DataContext = createContext<DataContextType>(null!);
