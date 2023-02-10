import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent, useContext, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useApi } from "../../../../hooks/useApi";


export default function CreatePanelForm() {
  const data = useApi()

  const [panelName, setPanelName] = useState('');
  const [panelLink, setPanelLink] = useState('');
  const [panelStatus, setPanelStatus] = useState('');
  const [panelOrder, setPanelOrder] = useState('');

  console.log(panelStatus)
  console.log(panelOrder)

  const handleCreatePanel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const created = await data.storePanel(panelName, panelLink, panelStatus, panelOrder)

    return created
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
      <Box component="form" onSubmit={handleCreatePanel} noValidate sx={{ mt: 1 }}>
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
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Ordem de exibição</InputLabel>
              <Select
                defaultValue={''}
                label="Ordem de exibição"
                onChange={(e) => setPanelOrder(e.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
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