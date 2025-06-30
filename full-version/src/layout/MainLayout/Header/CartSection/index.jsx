import { Link } from 'react-router-dom';
import { useSelector } from 'store';

// third party
import { sum } from 'lodash-es';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

// project imports
import useConfig from 'hooks/useConfig';
import { ThemeMode } from 'config';

// assets
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

// ==============================|| HEADER CART SECTION ||============================== //

const CartSection = () => {
    const theme = useTheme();
    const { mode } = useConfig();

    const cart = useSelector((state) => state.cart);
    const totalQuantity = sum(cart.checkout.products.map((item) => item.quantity));

    return (
        <Tooltip title="Shopping Cart" arrow>
            <IconButton
                component={Link}
                to="/apps/e-commerce/checkout"
                aria-label="cart"
                sx={{
                    ml: 2,
                    mr: 1
                }}
            >
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        transition: 'all .2s ease-in-out',
                        bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'primary.light',
                        color: mode === ThemeMode.DARK ? 'primary.main' : 'primary.dark',
                        '&:hover': {
                            bgcolor: mode === ThemeMode.DARK ? 'primary.main' : 'primary.dark',
                            color: mode === ThemeMode.DARK ? 'primary.light' : 'primary.light'
                        }
                    }}
                >
                    <Badge
                        badgeContent={totalQuantity}
                        color="error"
                        sx={{
                            '& .MuiBadge-badge': {
                                right: -8,
                                top: -8,
                                border: '2px solid',
                                borderColor: 'background.paper',
                                minWidth: '22px',
                                height: '22px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                padding: '0 4px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }
                        }}
                    >
                        <ShoppingCartTwoToneIcon stroke={1.5} size="22px" />
                    </Badge>
                </Avatar>
            </IconButton>
        </Tooltip>
    );
};

export default CartSection; 