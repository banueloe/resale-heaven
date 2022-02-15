import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

export default function Header() {
  const router = useRouter();
  const path = router.pathname;
  const pages = ["Buy", "Inventory", "Accounting"];
  return (
    <Box sx={{ flexGrow: 1, margin: 0, height: "100%" }}>
      <AppBar>
        <Toolbar>
          <Typography
            onClick={() => router.push("/")}
            variant="h6"
            component="div"
            sx={{ cursor: "pointer", flexGrow: 1 }}
          >
            Resale Heaven
          </Typography>

          {/* {pages.map((page) => (
            <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
              {page}
            </Button>
          ))} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
