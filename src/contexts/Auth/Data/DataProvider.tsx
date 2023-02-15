import { useApi } from "../../../hooks/useApi";
import { DataContext } from "./DataContext";

export default function DataProvider({ children }: { children: JSX.Element }) {
  const api = useApi();

  async function storePanel(
    panel_name: string,
    panel_link: string,
    order: string,
    sector_id: number,
    category_id: number,
    subcategory_id: number,
    status: string
  ) {
    const store = await api.storePanel(panel_name, panel_link, order, sector_id, category_id, subcategory_id, status)

    if (store.status === 400 || store.status === 500) {
      return { status: false, message: store.data };
    }
    return { status: true };
  }

  async function getAllPanels() {
    const data = await api.getAllPanel()

    return data;
  }

  async function getOnePanel(id: number) {
    const data = await api.getOnePanel(id)

    return data;
  }

  async function updatePanel(id: number, panelDataToUpdate: Object) {
    const data = await api.updatePanel(id, panelDataToUpdate)

    return data
  }

  return (
    <DataContext.Provider value={{ storePanel, getAllPanels, getOnePanel, updatePanel }}>
      {children}
    </DataContext.Provider>
  )
}