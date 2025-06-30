import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import useConfig from 'hooks/useConfig';
import LogoSection from '../LogoSection';
// import SearchSection from './SearchSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import CartSection from './CartSection';
// import LocalizationSection from './LocalizationSection';
// import MegaMenuSection from './MegaMenuSection';
// import FullScreenSection from './FullScreenSection';
// import NotificationSection from './NotificationSection';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import { MenuOrientation, ThemeMode } from 'config';

// assets
import { IconMenu2, IconRobot, IconRobotOff } from '@tabler/icons-react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ chatOpen, onChatToggle }) => {
    const theme = useTheme();
    const downMD = useMediaQuery(theme.breakpoints.down('md'));

    const { mode, menuOrientation } = useConfig();
    const { menuMaster } = useGetMenuMaster();
    const drawerOpen = menuMaster?.isDashboardDrawerOpened || false;
    const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

    return (
        <>
            {/* logo & toggler button */}
            <Box sx={{ width: downMD ? 'auto' : 228, display: 'flex' }}>
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                {!isHorizontal && (
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            overflow: 'hidden',
                            transition: 'all .2s ease-in-out',
                            bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'secondary.light',
                            color: mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark',
                            '&:hover': {
                                bgcolor: mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark',
                                color: mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.light'
                            }
                        }}
                        onClick={() => handlerDrawerOpen(!drawerOpen)}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="20px" />
                    </Avatar>
                )}
            </Box>

            {/* DISABLED FOR E-COMMERCE AI AGENT POC - header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />

            {/* DISABLED FOR E-COMMERCE AI AGENT POC - mega-menu */}
            {/* <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <MegaMenuSection />
            </Box> */}

            {/* DISABLED FOR E-COMMERCE AI AGENT POC - live customization & localization */}
            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
            </Box> */}

            {/* DISABLED FOR E-COMMERCE AI AGENT POC - notification */}
            {/* <NotificationSection /> */}

            {/* DISABLED FOR E-COMMERCE AI AGENT POC - full screen toggler */}
            {/* <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                <FullScreenSection />
            </Box> */}

            {/* AI Chat Toggle */}
            <Box sx={{ ml: 0.5 }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        overflow: 'hidden',
                        transition: 'all .2s ease-in-out',
                        bgcolor: chatOpen 
                            ? (mode === ThemeMode.DARK ? 'primary.dark' : 'primary.main')
                            : (mode === ThemeMode.DARK ? 'dark.main' : 'secondary.light'),
                        color: chatOpen 
                            ? (mode === ThemeMode.DARK ? 'primary.contrastText' : 'primary.contrastText')
                            : (mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark'),
                        '&:hover': {
                            bgcolor: chatOpen 
                                ? (mode === ThemeMode.DARK ? 'primary.main' : 'primary.dark')
                                : (mode === ThemeMode.DARK ? 'secondary.main' : 'secondary.dark'),
                            color: chatOpen 
                                ? 'primary.contrastText'
                                : (mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.light')
                        }
                    }}
                    onClick={onChatToggle}
                    color="inherit"
                    title={chatOpen ? 'Close AI Shopping Agent' : 'Open AI Shopping Agent'}
                >
                    {chatOpen ? <IconRobotOff stroke={1.5} size="20px" /> : <IconRobot stroke={1.5} size="20px" />}
                </Avatar>
            </Box>

            {/* shopping cart */}
            <CartSection />

            {/* profile */}
            <ProfileSection />

            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </>
    );
};

Header.propTypes = {
    chatOpen: PropTypes.bool,
    onChatToggle: PropTypes.func
};

export default Header;
