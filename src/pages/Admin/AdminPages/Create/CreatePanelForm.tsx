import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormEvent, useContext, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useApi } from "../../../../hooks/useApi";

export default function CreatePanelForm() {
  const data = useApi()
  const navigate = useNavigate()

  const [panelName, setPanelName] = useState('');
  const [panelLink, setPanelLink] = useState('');

  const handleCreatePanel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created = await data.panel(panelName, panelLink)

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
            id="panel_name"
            name="panel_name"
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
            id="panel_link"
            name="panel_link"
            label="Link"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => setPanelLink(e.target.value)}
            value={panelLink}
          />
        </Grid>
        <Grid item xs={2} margin={'auto'}>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Salvar</Button>
        </Grid>
      </Grid>
      </Box>
    </Paper>
  )
}