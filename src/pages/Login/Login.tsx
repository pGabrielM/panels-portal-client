import { styled } from "@stitches/react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Grow, Slide, Snackbar, Zoom } from "@mui/material";
import { PortalHeaderLogo } from "../Portal/PortalHeader/PortalHeaderLogo";

const theme = createTheme();

export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saveToken, setSaveToken] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isLogged = await auth.login(email, password, saveToken);

    if (isLogged) {
      navigate('/admin')
    } else {
      setError(false)
      setTimeout(() => setError(true), 100)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 14 }}>
          <PortalHeaderLogo />
        </Box>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Box height={50}>
              <Zoom in={error}>
                <Alert severity="error" sx={{ width: '100%' }}>E-mail ou senha invalidos!</Alert>
              </Zoom>
            </Box>
            <Typography component="h1" variant="h5" textAlign={'center'}>
              Faça login para sua conta
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Login"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <FormControlLabel
              control={<Checkbox checked={saveToken} onChange={(e) => setSaveToken(e.target.checked)} value={saveToken} color="primary" />}
              label="Lembrar de mim"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid textAlign={'center'}>
              <Link href="/portal" variant="body2">
                Portal de indicadores
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>


  )
}
