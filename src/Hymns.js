import * as React from 'react';
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import LyricsIcon from '@mui/icons-material/Lyrics';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Brightness7 from '@mui/icons-material/Brightness7';
import Container from "@mui/material/Container";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider, CssBaseline  } from '@mui/material';

import hymns from "./songs.json";
import doctrines from "./doctrines.json";

import { Link, useNavigate } from "react-router-dom";

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Box } from '@mui/system';

const _ = require('lodash');

var source = null;

const light = createTheme({
  palette: {
    primary: {
      main: '#fbd53b',
      light: '#fbd53b',
      dark: '#c4a400'
    },
    success: {
      main: '#ccffcc',
    },
    warning: {
      main: '#fff0cc',
    },
    error: {
      main: '#ffcccc',
    },
    mode: 'light',
  }
})
const dark = createTheme({
  palette: {
    primary: {
      main: '#fbd53b',
      light: '#fbd53b',
      dark: '#c4a400',
    },
    success: {
      main: '#003300',
    },
    warning: {
      main: '#332400',
    },
    error: {
      main: '#330000',
    },
    text: {
      primary: 'white',
    },
    mode: 'dark',
  }
})

function Hymns(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [theme, setTheme] = React.useState(light);
  let navigate = useNavigate();

  function toggleDrawer() {
    setDrawerOpen(drawerOpen => !drawerOpen);
  }

  function toggleDarkMode() {
    theme === light ? setTheme(dark): setTheme(light)
  }

  function handleSearch(event){
    setSearch(event.target.value)
  }

  source = hymns
  const filteredSource = search.length > 0 ?
  source.filter(item =>  item.hymn.title.toLowerCase().includes(search.toLowerCase()) || item.hymn.number.toString().includes(search)) : source


  const rows = filteredSource.map((hymn) => {
    let color = 'transparent';
    if (hymn.notes === 'Removido') {
      color = theme.palette.error.main;
    }
    if (hymn.notes === 'Novo') {
      color = theme.palette.success.main;
    }
    if (hymn.notes === 'Alterado') {
      color = theme.palette.warning.main;
    }

    let category = _.find(doctrines.doctrines, { belief: [{id: hymn?.hymn?.subCategory}] })
    let subCategory = _.find(category.belief, {id: hymn?.hymn?.subCategory})

    return (
      <TableRow
        key={hymn.hymn.number}
        sx={{ bgcolor: color }}
        onClick={() => { navigate(`/hinario/${hymn.hymn.number}`)}}
      >
        <TableCell><Link to={`/hinario/${hymn.hymn.number}`} style={{textDecoration: 'none'}}>{hymn.hymn.number}</Link></TableCell>
        <TableCell>{hymn.hymn.title}</TableCell>
        <TableCell>{category?.name}</TableCell>
        <TableCell>{subCategory?.name}</TableCell>
      </TableRow>
    );
  });

  return (
    <ThemeProvider theme={theme}>
          <CssBaseline />
    <div className='app'>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HASD
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDarkMode}
          >
            <Brightness7 />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/hinario" onClick={toggleDrawer}>
              <ListItemIcon>
                <LyricsIcon></LyricsIcon>
              </ListItemIcon>
              <ListItemText>
              Hinos
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/hinario/antigo" onClick={toggleDrawer}>
              <ListItemIcon>
                <EventBusyIcon></EventBusyIcon>
              </ListItemIcon>
              <ListItemText>
              Hinos retirados
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/hinario/novo" onClick={toggleDrawer}>
              <ListItemIcon>
                <EventAvailableIcon></EventAvailableIcon>
              </ListItemIcon>
              Hinos introduzidos
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      </Drawer>
      <Container>
      <Box sx={{ m: 4 }} />
      <Typography variant="h4" component="span" gutterBottom align='center'>
      Hinário
      </Typography>
      <Box sx={{ m: 4 }} />
      <TextField
        className="search"
        label="Procurar"
        onChange={handleSearch}
        autoComplete="new-password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <Box sx={{ m: 4 }} />
      <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Hino</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Subcategoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
            </TableContainer>
      </Container>
      <footer>
        Desenvolvimento: Joel Calado. Informação: musicaeadoracao.com.br
      </footer>
    </div>
    </ThemeProvider>
  );
}



export default Hymns;
