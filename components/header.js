import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1, margin: 0, height: "100%"}}>
      <AppBar position="absolute">
        <Toolbar>
          <Typography onClick={()=> router.push("/")} variant="h6" component="div" sx={{ cursor: 'pointer', flexGrow: 1 }}>
            Resale Heaven
          </Typography>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}
