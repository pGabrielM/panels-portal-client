import { createContext } from "react";

export type DataContextType = {
  storePanel: (
    panel_name: string,
    panel_link: string,
    order: string,
    sector_id: number,
    category_id: number,
    subcategory_id: number,
    status: string
  ) => Promise<Object>;
  getAllPanels: () => Promise<Object>;
  getOnePanel: (id: number) => Promise<Object>;
  updatePanel: (id: number, panelDataToUpdate: Object) => Promise<Object>
  storeRamification: (
    category_name: string,
    category_order: string,
    category_type: string,
    category_status: string,
    sector_id: string,
    category_id: string
  ) => Promise<Object>
  getAllSectors: () => Promise<Object>;
  getAllCategory: () => Promise<Object>;
}

export const DataContext = createContext<DataContextType>(null!);
