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
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Brightness7 from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';
import Container from "@mui/material/Container";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider, CssBaseline  } from '@mui/material';

import oldToNew from "./data/1996_to_2022.json";
import newToOld from "./data/2022_to_1996.json";

import { Link } from "react-router-dom";

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Box } from '@mui/system';

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

function App(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [theme, setTheme] = React.useState(light);

  function toggleDrawer() {
    setDrawerOpen(drawerOpen => !drawerOpen);
  }

  function toggleDarkMode() {
    theme === light ? setTheme(dark): setTheme(light)
  }

  function handleSearch(event){
    setSearch(event.target.value)
  }


    const filteredSource = search.length > 0 ?
    source.filter(item =>  item.title.toLowerCase().includes(search.toLowerCase()) || item.original_number.toString().includes(search)) : source


  if (props.which === 'old') {
    source = oldToNew
  } else {
    source = newToOld
  }

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

    return (
      <TableRow
        key={hymn.original_number}
        sx={{ bgcolor: color }}
      >
        <TableCell>{hymn.original_number}</TableCell>
        <TableCell>{hymn.title}</TableCell>
        <TableCell>{hymn.new_number}</TableCell>
        <TableCell>{hymn.new_title}</TableCell>
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
            Correspondência de Hinos
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
      {props.which === 'old' ? "Hinos retirados" : "Hinos introduzidos"}
      </Typography>
      <Typography variant="body1" gutterBottom style={{marginTop: 15}}>
        A informação aqui disponibilizada vem do site musicaeadoracao.com.br, tendo sido originalmente criada por <strong>Lucas Pereira de Freitas</strong>. <br/>
        Navegue no menu entre os hinos que foram retirados (correspondência entre o hinário de 1996 e o de 2022) ou os que foram introduzidos (correspondência entre o hinário de 2022 e o de 1996).<br/>
        Para mais serviços e ferramentas de apoio à sua igreja local visite <a href="https://adv7.pt">adv7.pt</a>.
      </Typography>
      <div className='colors'>
        <div className='colorExplanation'>
          <div style={{backgroundColor: theme.palette.error.main }}></div>
          <span>Removido</span>
        </div>
        <div className='colorExplanation'>
          <div style={{backgroundColor: theme.palette.success.main }}></div>
          <span>Novo</span>
        </div>
        <div className='colorExplanation'>
          <div style={{backgroundColor: theme.palette.warning.main }}></div>
          <span>Alterado</span>
        </div>
      </div>
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
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Hino</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Novo número</TableCell>
              <TableCell>Título</TableCell>
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



export default App;
