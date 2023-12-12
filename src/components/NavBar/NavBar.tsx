import { AppBar, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Rick And Morty Characters App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
