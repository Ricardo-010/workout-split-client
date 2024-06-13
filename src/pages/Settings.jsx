import { Box } from "@mui/material";
import Header from "../modules/header/components/header-component";
import Settings from "../modules/settings/components/settings-component";
/**
 * This component renders the settings page.
 *
 * @returns {ReactNode} A React element that renders the settings page.
 */
export default function SettingsPage() {
  return (
    <>
      <Header />
      <Box sx={{ maxWidth: "md", mx: "auto", mt: 4 }}>
        <Settings />
      </Box>
    </>
  );
}
