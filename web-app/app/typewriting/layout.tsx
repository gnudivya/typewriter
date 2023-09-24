import { Box } from "@mui/material";


export default function TypewritingLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return(
    <Box>
        {children}
    </Box>
    )
  }