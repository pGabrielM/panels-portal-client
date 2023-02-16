import { Box, CircularProgress, Grid, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../../contexts/Auth/Data/DataContext";
import { PanelDataProps } from "../../../../interfaces/PanelInterface";

export default function ListPanel() {
  const data = useContext(DataContext)

  const [allPanels, setAllPanels] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  async function getPanels() {
    const panels = await data.getAllPanels()
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

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>

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
              Lista de paineis
            </Typography>
            <Box height={800}>
              {isLoading
                ? <LinearProgress />
                : <DataGrid
                  rows={rows}
                  columns={columns}
                  disableSelectionOnClick
                />
              }
            </Box>
          </Paper>
        </Grid>
      </Container>
    </Box>
  )
}