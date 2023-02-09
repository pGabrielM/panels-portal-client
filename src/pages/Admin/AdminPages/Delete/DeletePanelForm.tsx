import { Button, Checkbox, FormControlLabel, Grid, IconButton, Paper, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef, GridRowId, GridRowsProp, GridSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../../hooks/useApi";

interface PanelDataProps {
  id: number
  panel_name: String
  panel_link: String
  created_by_user: String
}

export default function DeletePanelForm() {
  const data = useApi()
  const [allPanels, setAllPanels] = useState([])
  const [panelsToDelete, setPanelsToDelete] = useState([])

  const getPanels = async () => {
    const panels = await data.getAllPanel()
    setAllPanels(panels)
  }

  useEffect(() => {
    getPanels()
  }, [])

  const rows = allPanels.map((panel: PanelDataProps, key) => {
    return { id: panel.id, name: panel.panel_name, link: panel.panel_link, createdBy: panel.created_by_user }
  })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Nome', width: 300 },
    { field: 'link', headerName: 'Link', width: 300 },
    { field: 'createdBy', headerName: 'Criador por', width: 280 },
  ];

  async function handleDeletePanels() {
    for(let i = 0; i < panelsToDelete.length; i++) {
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
        Qual indicador você deseja remover?
      </Typography>
      <Box height={800}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(id: any) => {setPanelsToDelete(id)}}
        />
      </Box>
      <Grid item xs={2} margin={'auto'}>
        <Button onClick={handleDeletePanels} fullWidth variant="contained" sx={{ mt: 4, mb: 2 }}>Remover</Button>
      </Grid>
    </Paper>
  )
}