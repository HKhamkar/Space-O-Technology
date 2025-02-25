import MailForm from "@/components/MailForm";
import { Box, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Submit Your Details
          </Typography>

          <MailForm />
        </Box>
      </Container>
    </>
  );
}
