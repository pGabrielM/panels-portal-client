import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import HomeIcon from '@mui/icons-material/Home';;
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to={'/admin'}>
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
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
    <Link to={'/admin/delete'}>
      <ListItemButton>
        <ListItemIcon>
          <CancelPresentationIcon />
        </ListItemIcon>
        <ListItemText primary="Remover Painel" />
      </ListItemButton>
    </Link>
    <Link to={'/admin/update'}>
      <ListItemButton>
        <ListItemIcon>
          <BrowserUpdatedIcon />
        </ListItemIcon>
        <ListItemText primary="Atualizar Painel" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);