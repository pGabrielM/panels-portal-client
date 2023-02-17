import { Box, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import CreatePanelForm from "./CreatePanelForm";

export default function CreatePanel() {
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
          <CreatePanelForm />
        </Grid>
      </Container>
    </Box>
  )
}