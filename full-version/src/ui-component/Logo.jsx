// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// project imports
import { ThemeMode } from 'config';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| AICOMMERCE LOGO ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* AI Icon with Cart */}
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <ShoppingCartIcon 
                    sx={{ 
                        fontSize: 28,
                        color: theme.palette.primary.main,
                    }} 
                />
                <AutoAwesomeIcon 
                    sx={{ 
                        fontSize: 14,
                        color: theme.palette.secondary.main,
                        position: 'absolute',
                        top: -4,
                        right: -6
                    }} 
                />
            </Box>
            
            {/* AICommerce Text */}
            <Typography
                variant="h4"
                sx={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: theme.palette.mode === ThemeMode.DARK ? theme.palette.common.white : theme.palette.grey[900],
                    letterSpacing: '-0.5px',
                    fontFamily: theme.typography.fontFamily
                }}
            >
                AI
                <Box 
                    component="span" 
                    sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 600 
                    }}
                >
                    Commerce
                </Box>
            </Typography>
        </Box>
    );
};

export default Logo;
