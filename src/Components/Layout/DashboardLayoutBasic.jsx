import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout'; 
import Home from '../Sidebarpages/Home/Home'
import Lecture from '../Sidebarpages/Lecture/Lecture';
import MasterData from '../MasterData/MasterData';
import Logout from '../Logout/Logout';


const NAVIGATION = [
  
  {
    segment: 'Home',
    title: 'Home',
    icon: <HomeIcon/>,
  },
  {
    segment: 'Lecture',
    title: 'Lecture',
    icon: <ImportContactsIcon/>,
  },
  {
    segment: 'MasterData',
    title: 'MasterData',
    icon: <TextSnippetIcon/>,
  },
  
  
  {
    kind: 'divider',
  },
  {
    segment: 'Logout',
    title: 'Logout',
    icon: <TextSnippetIcon/>,
  },
  
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
    
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >

      {pathname === "/Home" && <Home />}
      {pathname === "/Lecture" && <Lecture/>}  
      {pathname === "/MasterData" && <MasterData/>} {/* Display Newpage content */}
    </Box>
  );
}


DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/Home');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);


  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

export default DashboardLayoutBasic;