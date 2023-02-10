import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControlLabel, Grid, IconButton, Paper, Switch, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { PanelDataProps } from "../../../../interfaces/PanelInterface";
import { DataContext } from "../../../../contexts/Auth/Data/DataContext";

export default function UpdatePanelForm() {
  const data = useContext(DataContext)

  const [allPanels, setAllPanels] = useState<any>([])
  const [panelData, setPanelData] = useState<PanelDataProps>()
  const [panelStatus, setPanelStatus] = useState(true)
  const [open, setOpen] = useState(false);

  const getPanels = async () => {
    const panels = await data.getAllPanels()
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
    const UniquePanelData: any = await data.getOnePanel(id)
    setPanelData(UniquePanelData)

    if (UniquePanelData.status === 'disabled') {
      return setPanelStatus(false)
    }
    setPanelStatus(true)
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
          <Box display={'flex'} justifyContent={'space-between'} >
          <DialogTitle>{`Indicador ${panelData?.panel_name}`}</DialogTitle>
            <Fab color="primary" style={{margin: 10}} aria-label="edit" size="medium">
              <EditIcon />
            </Fab>
          </Box>
          <DialogContent>
            <DialogContentText>
              Alterar dados do indicador
            </DialogContentText>
            <Grid container spacing={4} direction="row" justifyContent="left" alignItems="center">
              <Grid item xs={8}>
                <TextField
                  autoFocus
                  disabled
                  margin="dense"
                  label="Nome do indicador"
                  value={panelData?.panel_name}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  autoFocus
                  disabled
                  margin="dense"
                  label="Link do indicador"
                  fullWidth
                  value={panelData?.link}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  autoFocus
                  disabled
                  margin="dense"
                  label="Criado por"
                  fullWidth
                  value={panelData?.created_date}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  disabled
                  margin="dense"
                  label="Criado por"
                  fullWidth
                  value={panelData?.created_by}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  disabled
                  margin="dense"
                  label="Criado em"
                  fullWidth
                  value={panelData?.created_date}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox checked={panelStatus} disabled />} label={panelStatus ? 'Ativo' : 'Inativo'} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Salvar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Paper>
  )
}