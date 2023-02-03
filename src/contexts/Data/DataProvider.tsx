import { useApi } from "../../hooks/useApi";
import { DataContext } from "./DataContext";

export default function DataProvider({children}: {children: JSX.Element}) {
  const api = useApi();

  async function panel(panelName: string, panelLink: string) {
    const data = await api.panel(panelName, panelLink)

    if(data) {
      return true
    }
    return false
  }

  return (
    <DataContext.Provider value={{panel}}>
      {children}
    </DataContext.Provider>
  )
}