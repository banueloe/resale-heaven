import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const path = router.pathname;
  const pages = [
    { label: "Buy", href: "/buy" },
    { label: "Inventory", href: "/inventory" },
    { label: "Accounting", href: "/accounting" },
  ];

  return (
    <Box sx={{ margin: 0, height: "100%" }}>
      <AppBar>
        <Toolbar>
          <Typography
            onClick={() => router.push("/home")}
            variant="h6"
            component="div"
            sx={{ cursor: "pointer", mr: 4 }}
          >
            Resale Heaven
          </Typography>
          {path != "/" &&
            pages.map((page) => (
              <Link href={page.href}>
                <Button key={page.label} sx={{ color: "white" }} onClick>
                  {page.label}
                </Button>
              </Link>
            ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
