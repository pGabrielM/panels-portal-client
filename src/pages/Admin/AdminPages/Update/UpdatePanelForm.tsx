import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControlLabel, Grid, IconButton, Paper, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useApi } from "../../../../hooks/useApi";
import { PanelDataProps } from "../../../../interfaces/PanelInterface";

export default function UpdatePanelForm() {
  const data = useApi()
  const [open, setOpen] = useState(false);
  const [panelData, setPanelData] = useState<any>({})

  const [allPanels, setAllPanels] = useState([])

  const getPanels = async () => {
    const panels = await data.getAllPanel()
    setAllPanels(panels)
  }

  useEffect(() => {
    getPanels()
  }, [])

  const rows = allPanels.map((panel: PanelDataProps) => {
    return {
      id: panel.id,
      name: panel.panel_name,
      link: panel.link,
      status: panel.status,
      order: panel.order,
      createdBy: panel.created_by,
      createdDate: panel.created_date
    }
  })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'link', headerName: 'Link', width: 200 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'order', headerName: 'Ordem', width: 80 },
    { field: 'createdBy', headerName: 'Criador por', width: 200 },
    { field: 'createdDate', headerName: 'Criado em', width: 300 },
  ];


  const handleClose = () => {
    setOpen(false);
  };

  async function handleUpdatePanel(id: number) {
    setOpen(true);
    const panel: PanelDataProps = await data.getOnePanel(id)
    setPanelData(panel)

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
        Selecione o indicador que você deseja atualizar
      </Typography>
      <Box height={800}>
        <DataGrid
          rows={rows}
          columns={columns}
          onSelectionModelChange={(id: any) => { handleUpdatePanel(id) }}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Indicador</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Alterar dados do indicador
            </DialogContentText>
            <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
              <Grid item xs={8}>
                <TextField
                  autoFocus
                  disabled
                  margin="dense"
                  label="Nome do indicador"
                  value={panelData.panel_name}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={2}>
                <Fab color="primary" aria-label="edit" size="small" >
                  <EditIcon />
                </Fab>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  autoFocus
                  disabled
                  margin="dense"
                  label="Link do indicador"
                  fullWidth
                  value={panelData.panel_link}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={2}>
                <Fab color="primary" aria-label="edit" size="small" >
                  <EditIcon />
                </Fab>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  disabled
                  margin="dense"
                  label="Criado por"
                  fullWidth
                  value={panelData.created_by_user}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Paper>
  )
}