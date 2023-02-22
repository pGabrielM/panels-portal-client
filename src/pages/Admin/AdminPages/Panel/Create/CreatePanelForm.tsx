import { Alert, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent, useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from "../../../../../contexts/Data/DataContext";

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
      toast.success('Painel criado com sucesso!')
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
            <FormControl fullWidth>
              <InputLabel>Ordem de exibição</InputLabel>
              <Select
                label="Ordem de exibição"
                onChange={(e) => setPanelOrder(e.target.value)}
              >
                {
                  Array.from({ length: 11}, (e, key) => {
                    if(key != 0) {
                      return <MenuItem value={key}>{key}</MenuItem>
                    }
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Codigo do setor</InputLabel>
              <Select
                label="Codigo do setor"
                onChange={(e) => setPanelSectorId(e.target.value)}
              >
                {
                  Array.from({ length: 11}, (e, key) => {
                    return <MenuItem value={key != 0 ? key : NaN}>{key != 0 ? key : 'Não possui'}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
              <InputLabel>Codigo da categoria</InputLabel>
              <Select
                label="Codigo da categoria"
                onChange={(e) => setPanelCategoryId(e.target.value)}
              >
                {
                  Array.from({ length: 11}, (e, key) => {
                    return <MenuItem value={key != 0 ? key : NaN}>{key != 0 ? key : 'Não possui'}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
              <InputLabel>Codigo da subcategoria</InputLabel>
              <Select
                label="Codigo da subcategoria"
                onChange={(e) => setPanelSubCategoryId(e.target.value)}
              >
                {
                  Array.from({ length: 11}, (e, key) => {
                    return <MenuItem value={key != 0 ? key : NaN}>{key != 0 ? key : 'Não possui'}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
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