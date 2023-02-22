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
  storeCategory: (categoryName: string, categoryOrder: string, categoryType: string, categoryStatus: string) => Promise<Object>
}

export const DataContext = createContext<DataContextType>(null!);
