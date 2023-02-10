import { useApi } from "../../../hooks/useApi";
import { DataContext } from "./DataContext";

export default function DataProvider({ children }: { children: JSX.Element }) {
  const api = useApi();

  async function storePanel(panelName: string, link: string, status: string, order: string) {
    const store = await api.storePanel(panelName, link, status, order)
    
    if (store.status === 400 || store.status === 500) {
      return {status: false, message: store.data};
    }
    return {status: true};
  }
  
  async function getAllPanels() {
    const data = await api.getAllPanel()

    return data;
  }

  async function getOnePanel(id: number) {
    const data = await api.getOnePanel(id)

    return data;
  }

  return (
    <DataContext.Provider value={{ storePanel, getAllPanels, getOnePanel }}>
      {children}
    </DataContext.Provider>
  )
}