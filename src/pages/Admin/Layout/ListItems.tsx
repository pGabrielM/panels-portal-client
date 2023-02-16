import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DvrIcon from '@mui/icons-material/Dvr';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import HomeIcon from '@mui/icons-material/Home';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';

export default function ListItems() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      <Link to={'/admin'}>
        <ListItemButton>
          <ListItemIcon >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
      </Link>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Paineis" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={'/admin/create'}>
            <ListItemButton>
              <ListItemIcon>
                <AddToQueueIcon />
              </ListItemIcon>
              <ListItemText primary="Adicionar Paineis" />
            </ListItemButton>
          </Link>
          <Link to={'/admin/list'}>
            <ListItemButton>
              <ListItemIcon>
                <DvrIcon />
              </ListItemIcon>
              <ListItemText primary="Listar Paineis" />
            </ListItemButton>
          </Link>
          <Link to={'/admin/update'}>
            <ListItemButton>
              <ListItemIcon>
                <BrowserUpdatedIcon />
              </ListItemIcon>
              <ListItemText primary="Atualizar Paineis" />
            </ListItemButton>
          </Link>
          <Link to={'/admin/delete'}>
            <ListItemButton>
              <ListItemIcon>
                <CancelPresentationIcon />
              </ListItemIcon>
              <ListItemText primary="Remover Paineis" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  );
}
