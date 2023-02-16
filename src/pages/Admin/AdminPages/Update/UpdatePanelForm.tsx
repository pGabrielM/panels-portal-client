import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, FormControlLabel, Grid, IconButton, Paper, Switch, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FormEvent, useContext, useEffect, useState } from "react";
import { PanelDataProps } from "../../../../interfaces/PanelInterface";
import { DataContext } from "../../../../contexts/Auth/Data/DataContext";

interface UpdatePanelProps {
  panel_id?: number
  panel_name?: String
  panel_link?: String
  order?: Number
  sector_id?: Number
  category_id?: Number
  subcategory_id?: Number
  status?: String
  created_by?: string
  created_date?: Date
}

export default function UpdatePanelForm() {
  const data = useContext(DataContext)

  const [allPanels, setAllPanels] = useState<any>([]);
  const [panelData, setPanelData] = useState<PanelDataProps>();
  const [panelStatus, setPanelStatus] = useState(true);
  const [open, setOpen] = useState(false);
  const [formEditMode, setFormEditMode] = useState(true);
  const [currentPanelId, setCurrentPanelId] = useState<number>(0);

  const [panelFormName, setPanelFormName] = useState<any>();
  const [panelFormLink, setPanelFormLink] = useState<any>();
  const [panelFormOrder, setPanelFormOrder] = useState<any>();
  const [panelFormSectorId, setPanelFormSectorId] = useState<any>();
  const [panelFormCategoryId, setPanelFormCategoryId] = useState<any>();
  const [panelFormSubCategoryId, setPanelFormSubCategoryId] = useState<any>();
  const [panelFormStatus, setPanelFormStatus] = useState<any>();

  const rows = allPanels.map((panel: PanelDataProps) => {
    return {
      id: panel.panel_id,
      name: panel.panel_name,
      link: panel.panel_link,
      order: panel.order,
      sectorId: panel.sector_id != null ? panel.sector_id : 'Não possui' ,
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

  async function getPanels() {
    const panels = await data.getAllPanels()
    setAllPanels(panels)
  }

  useEffect(() => {
    getPanels()
  }, [])

  async function handleGetPanelToUpdate(id: number) {
    const UniquePanelData: any = await data.getOnePanel(id)
    const panelIsDisabled = UniquePanelData.status === 'disabled'

    setPanelFormName(null)
    setPanelFormLink(null)
    setPanelFormStatus(null)
    setPanelFormOrder(null)
    setPanelFormSectorId(null)
    setPanelFormCategoryId(null)
    setPanelFormSubCategoryId(null)

    setPanelData(UniquePanelData)
    setFormEditMode(true)
    setOpen(true);
    setCurrentPanelId(id);

    if (panelIsDisabled) {
      return setPanelStatus(false)
    }

    setPanelStatus(true)
  }

  async function handleUpdatePanel(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    var panelDataToUpdate: UpdatePanelProps = {}

    if(panelFormName !== null) panelDataToUpdate.panel_name = panelFormName
    if(panelFormLink !== null) panelDataToUpdate.panel_link = panelFormLink
    if(panelFormOrder !== null) panelDataToUpdate.order = panelFormOrder
    if(panelFormSectorId !== null) panelDataToUpdate.sector_id = panelFormSectorId
    if(panelFormCategoryId !== null) panelDataToUpdate.category_id = panelFormCategoryId
    if(panelFormSubCategoryId !== null) panelDataToUpdate.subcategory_id = panelFormSubCategoryId
    if(panelFormStatus !== null) panelDataToUpdate.status = panelFormStatus
    
    await data.updatePanel(currentPanelId, panelDataToUpdate)

    getPanels();
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

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
          onSelectionModelChange={(id: any) => { handleGetPanelToUpdate(id) }}
        />
        <Dialog open={open} onClose={handleClose}>
          <Box display={'flex'} justifyContent={'space-between'} >
            <DialogTitle>{`Indicador ${panelData?.panel_name}`}</DialogTitle>
            <FormControlLabel control={<Switch defaultChecked={false} />} label="Editar" onClick={(e) => { setFormEditMode(!(e.target as HTMLInputElement).checked) }} />
          </Box>
          <Box component="form" onSubmit={handleUpdatePanel}>
            <DialogContent>
              <DialogContentText>
                Alterar dados do indicador
              </DialogContentText>
              <Grid container spacing={4} direction="row" justifyContent="left" alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    required
                    autoFocus
                    disabled={formEditMode}
                    margin="dense"
                    label="Nome do indicador"
                    defaultValue={panelData?.panel_name}
                    fullWidth
                    variant="standard"
                    onChange={(e) => {setPanelFormName(e.target.value)}}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    autoFocus
                    disabled={formEditMode}
                    margin="dense"
                    label="Link do indicador"
                    fullWidth
                    defaultValue={panelData?.panel_link}
                    variant="standard"
                    onChange={(e) => {setPanelFormLink(e.target.value)}}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    autoFocus
                    disabled={formEditMode}
                    margin="dense"
                    label="Ordem do indicador"
                    fullWidth
                    defaultValue={panelData?.order}
                    variant="standard"
                    onChange={(e) => {setPanelFormOrder(e.target.value)}}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    autoFocus
                    disabled={formEditMode}
                    margin="dense"
                    label="ID Setor"
                    fullWidth
                    defaultValue={panelData?.sector_id}
                    variant="standard"
                    onChange={(e) => {setPanelFormSectorId(e.target.value)}}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    autoFocus
                    disabled={formEditMode}
                    margin="dense"
                    label="ID Categoria"
                    fullWidth
                    defaultValue={panelData?.category_id}
                    variant="standard"
                    onChange={(e) => {setPanelFormCategoryId(e.target.value)}}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    autoFocus
                    disabled={formEditMode}
                    margin="dense"
                    label="ID Subcategoria"
                    fullWidth
                    defaultValue={panelData?.subcategory_id}
                    variant="standard"
                    onChange={(e) => {setPanelFormSubCategoryId(e.target.value)}}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    autoFocus
                    disabled={formEditMode}
                    margin="dense"
                    label="Status"
                    fullWidth
                    defaultValue={panelData?.status}
                    variant="standard"
                    onChange={(e) => {setPanelFormStatus(e.target.value)}}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    autoFocus
                    disabled
                    margin="dense"
                    label="Criado por"
                    fullWidth
                    defaultValue={panelData?.created_by}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    autoFocus
                    disabled
                    margin="dense"
                    label="Criado em"
                    fullWidth
                    defaultValue={panelData?.created_date}
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
              {!formEditMode &&
                <Button type="submit">Salvar</Button>
              }
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </Paper>
  )
}