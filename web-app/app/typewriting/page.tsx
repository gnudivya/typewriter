import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import Link from "next/link";

export default function TypewritingPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={100}>
        Select your typing script
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href="/typewriting/123">
            <ListItemText primary="Bun vs Node.js: Everything you need to know"  />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
