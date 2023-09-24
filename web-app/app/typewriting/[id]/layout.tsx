import { Box } from "@mui/material";


export default function TypingPageLayout({
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