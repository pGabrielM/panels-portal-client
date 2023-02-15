import { Alert, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent, useContext, useState } from "react";
import { DataContext } from "../../../../contexts/Auth/Data/DataContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CreatePanelProps {
  status?: boolean
  message?: string
}

export default function CreatePanelForm() {
  const data = useContext(DataContext)

  const [panelName, setPanelName] = useState('');
  const [panelLink, setPanelLink] = useState('');
  const [panelOrder, setPanelOrder] = useState<any>();
  const [panelSectorId, setPanelSectorId] = useState<any>();
  const [panelCategoryId, setPanelCategoryId] = useState<any>();
  const [panelSubCategoryId, setPanelSubCategoryId] = useState<any>();
  const [panelStatus, setPanelStatus] = useState('');

  const handleCreatePanel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createPanel: CreatePanelProps = await data.storePanel(
      panelName,
      panelLink,
      panelOrder,
      panelSectorId,
      panelCategoryId,
      panelSubCategoryId,
      panelStatus
    )

    if (createPanel.status) {
      toast.success('Indicador criado com sucesso!')
    } else {
      toast.error(createPanel.message);
    }
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 540,
        width: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Preencha o formulário para adicionar um novo indicador.
      </Typography>
      <Box component="form" onSubmit={handleCreatePanel} sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Nome do painel"
              fullWidth
              variant="standard"
              onChange={(e) => setPanelName(e.target.value)}
              value={panelName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Link"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(e) => setPanelLink(e.target.value)}
              value={panelLink}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Ordem de exibição"
              type={'number'}
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(e) => setPanelOrder(e.target.value)}
              value={panelOrder}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Código setor"
              type={'number'}
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(e) => setPanelSectorId(e.target.value)}
              value={panelSectorId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Código categoria"
              type={'number'}
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(e) => setPanelCategoryId(e.target.value)}
              value={panelCategoryId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Código subcategoria"
              type={'number'}
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(e) => setPanelSubCategoryId(e.target.value)}
              value={panelSubCategoryId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                defaultValue={''}
                label="Status"
                onChange={(e) => setPanelStatus(e.target.value)}
              >
                <MenuItem value={'active'}>Ativo</MenuItem>
                <MenuItem value={'disabled'}>Inativo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} margin={'auto'}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Salvar</Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}