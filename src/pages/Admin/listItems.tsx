import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to={'/admin'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItemButton>
    </Link>
    <Link to={'/admin/create'}>
      <ListItemButton>
        <ListItemIcon>
          <AddToQueueIcon />
        </ListItemIcon>
        <ListItemText primary="Adicionar Painel" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);