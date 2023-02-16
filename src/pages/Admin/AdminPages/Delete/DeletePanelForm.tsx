import { Button, Grid, LinearProgress, Paper, Toolbar, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useApi } from "../../../../hooks/useApi";
import { PanelDataProps } from "../../../../interfaces/PanelInterface";



export default function DeletePanelForm() {
  const data = useApi()
  const [allPanels, setAllPanels] = useState([])
  const [panelsToDelete, setPanelsToDelete] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getPanels = async () => {
    const panels = await data.getAllPanel()
    setAllPanels(panels)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    getPanels()
  }, [])

  const rows = allPanels.map((panel: PanelDataProps) => {
    return {
      id: panel.panel_id,
      name: panel.panel_name,
      link: panel.panel_link,
      order: panel.order,
      sectorId: panel.sector_id != null ? panel.sector_id : 'Não possui',
      categoryId: panel.category_id != null ? panel.category_id : 'Não possui',
      subCategoryId: panel.subcategory_id != null ? panel.subcategory_id : 'Não possui',
      status: panel.status,
      createdBy: panel.created_by,
      createdDate: panel.created_date
    }
  })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'link', headerName: 'Link', width: 180 },
    { field: 'order', headerName: 'Ordem', width: 75 },
    { field: 'sectorId', headerName: 'ID Setor', width: 100 },
    { field: 'categoryId', headerName: 'ID Categoria', width: 100 },
    { field: 'subCategoryId', headerName: 'ID Subcategoria', width: 130 },
    { field: 'status', headerName: 'Status', width: 80 },
    { field: 'createdBy', headerName: 'Criador por', width: 120 },
    { field: 'createdDate', headerName: 'Criado em', width: 200 },
  ];

  async function handleDeletePanels() {
    for (let i = 0; i < panelsToDelete.length; i++) {
      await data.deletePanel(panelsToDelete[i])
      getPanels()
    }

    return data
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 800,
        width: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Qual painel você deseja remover?
      </Typography>
      <Box height={800}>
        {isLoading
          ? <LinearProgress />
          : <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(id: any) => { setPanelsToDelete(id) }}
          />
        }
      </Box>
      <Grid item xs={2} margin={'auto'}>
        <Button onClick={handleDeletePanels} fullWidth variant="contained" sx={{ mt: 4, mb: 2 }}>Remover</Button>
      </Grid>
    </Paper>
  )
}