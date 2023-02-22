import { useApi } from "../../hooks/useApi";
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
      return { status: false, message: store.data.message };
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
  async function storeRamification(
    category_name: string,
    category_order: string,
    category_type: string,
    category_status: string,
    sector_id: string,
    category_id: string
  ) {
    const storeRamification = await api.storeRamification(category_name, category_order, category_type, category_status, sector_id, category_id )

    if (storeRamification.status === 400 || storeRamification.status === 500) {
      return { status: false, message: storeRamification.data.message };
    }
    return { status: true };

  }

  async function getAllSectors() {
    const data = await api.getAllSectors()

    return data;
  }
  async function getAllCategory() {
    const data = await api.getAllCategory()

    return data;
  }

  return (
    <DataContext.Provider value={{ storePanel, getAllPanels, getOnePanel, updatePanel, storeRamification, getAllSectors, getAllCategory }}>
      {children}
    </DataContext.Provider>
  )
}