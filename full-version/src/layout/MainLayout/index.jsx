import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

// project imports
import { AIProductFilterProvider } from 'contexts/AIProductFilterContext';
import { AIHighlightProvider } from 'contexts/AIHighlightContext';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import Customization from '../Customization';
import Header from './Header';
import Sidebar from './Sidebar';
import AIChatSidebar from './AIChatSidebar';
import HorizontalBar from './HorizontalBar';
import AuthGuard from 'utils/route-guard/AuthGuard';
import navigation from 'menu-items';
import useConfig from 'hooks/useConfig';
import { dispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';

// assets
import { IconChevronRight } from '@tabler/icons-react';
import { useGetMenuMaster } from 'api/menu';
import { MenuOrientation, ThemeMode } from 'config';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' && prop !== 'chatOpen' })(
    ({ theme, open, chatOpen, layout }) => ({
        ...theme.typography.mainContent,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create(
            'margin',
            open
                ? {
                      easing: theme.transitions.easing.easeOut,
                      duration: theme.transitions.duration.enteringScreen
                  }
                : {
                      easing: theme.transitions.easing.sharp,
                      duration: theme.transitions.duration.leavingScreen
                  }
        ),
        [theme.breakpoints.up('md')]: {
            marginLeft: open ? 0 : -(260 - 20),
            marginRight: chatOpen ? 0 : -(360 - 20), // Account for AI chat sidebar
            width: `calc(100% - ${open ? 260 : 20}px - ${chatOpen ? 360 : 0}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            marginRight: chatOpen ? '380px' : '20px',
            width: `calc(100% - ${260}px - ${chatOpen ? 360 : 0}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            marginRight: chatOpen ? '370px' : '10px',
            width: `calc(100% - ${260}px - ${chatOpen ? 360 : 0}px)`,
            padding: '16px'
        }
    })
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));
    const { container, drawerType, menuOrientation, mode } = useConfig();

    const { menuMaster } = useGetMenuMaster();
    const drawerOpen = menuMaster?.isDashboardDrawerOpened || false;

    // AI Chat state - toggle functionality for better UX
    const [chatOpen, setChatOpen] = useState(true);

    const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

    // Handle left drawer
    const leftDrawerOpened = useMemo(() => drawerOpen, [drawerOpen]);
    useEffect(() => {
        if (drawerType === 'temporary') {
            dispatch(openDrawer(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (drawerType === 'temporary') {
            dispatch(openDrawer(false));
        }
    }, [drawerType]);

    const condition = !isHorizontal ? leftDrawerOpened : false;

    const header = useMemo(
        () => (
            <Toolbar sx={{ p: isHorizontal ? 1.25 : 2.5 }}>
                <Header chatOpen={chatOpen} onChatToggle={() => setChatOpen(!chatOpen)} />
            </Toolbar>
        ),
        [isHorizontal, chatOpen]
    );

    return (
        <AIProductFilterProvider>
            <AIHighlightProvider>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    {/* header */}
                    <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0} sx={{ bgcolor: mode === ThemeMode.DARK ? 'dark.dark' : 'background.default' }}>
                        {header}
                        {isHorizontal && <HorizontalBar />}
                    </AppBar>

                    {/* horizontal menu-list bar */}
                    {isHorizontal && <HorizontalBar />}

                    {/* left sidebar */}
                    {!isHorizontal && <Sidebar drawerOpen={condition} drawerToggle={() => dispatch(openDrawer(!drawerOpen))} />}

                    {/* main content */}
                    <Main theme={theme} open={condition} chatOpen={chatOpen} layout={container}>
                        <Outlet />
                    </Main>

                    {/* AI Chat Sidebar - Right side */}
                    <AIChatSidebar open={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />

                    {/* DISABLED FOR E-COMMERCE AI AGENT POC - live customization panel */}
                    {/* <Customization /> */}
                </Box>
            </AIHighlightProvider>
        </AIProductFilterProvider>
    );
};

export default MainLayout;
