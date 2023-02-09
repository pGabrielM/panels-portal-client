import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControlLabel, Grid, IconButton, Paper, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useApi } from "../../../../hooks/useApi";

interface PanelDataProps {
  id: number
  panel_name: String
  panel_link: String
  created_by_user: String
}

export default function UpdatePanelForm() {
  const data = useApi()
  const [open, setOpen] = useState(false);
  const [panelData, setPanelData] = useState<any>({})

  const [allPanels, setAllPanels] = useState([])

  const getPanels = async () => {
    const panels = await data.getAllPanel()
    console.log(panels)
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


  const handleClose = () => {
    setOpen(false);
  };

  console.log(typeof panelData)

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