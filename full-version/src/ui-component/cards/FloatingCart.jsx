import { Link } from 'react-router-dom';
import { useSelector } from 'store';

// third partys
import { sum } from 'lodash-es';

// project imports
import { ThemeMode } from 'config';

// material-ui
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

// ==============================|| CART ITEMS - FLOATING BUTTON ||============================== //

const FloatingCart = () => {
    const theme = useTheme();

    const cart = useSelector((state) => state.cart);
    const totalQuantity = sum(cart.checkout.products.map((item) => item.quantity));

    return (
        <Fab
            component={Link}
            to="/apps/e-commerce/checkout"
            size="large"
            sx={{
                top: '50%',
                position: 'fixed',
                right: 0,
                zIndex: 1200,
                boxShadow: theme.customShadows.warning,
                bgcolor: 'warning.dark',
                color: 'warning.light',
                borderRadius: '8px',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                '&:hover': { bgcolor: 'warning.main' }
            }}
        >
            <IconButton disableRipple aria-label="cart" sx={{ '&:hover': { bgcolor: 'transparent' } }} size="large">
                <Badge
                    showZero
                    badgeContent={totalQuantity}
                    color="error"
                    sx={{ '& .MuiBadge-badge': { right: 0, top: 3, border: '2px solid', borderColor: 'background.paper', px: 0.5 } }}
                >
                    <ShoppingCartTwoToneIcon sx={{ color: theme.palette.mode === ThemeMode.DARK ? 'background.paper' : 'text.primary' }} />
                </Badge>
            </IconButton>
        </Fab>
    );
};

export default FloatingCart;
