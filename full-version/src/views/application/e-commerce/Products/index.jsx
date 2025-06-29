import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SortOptions from './SortOptions';
import ProductEmpty from './ProductEmpty';
import ProductFilter from './ProductFilter';
import ProductFilterView from './ProductFilterView';

import ProductCard from 'ui-component/cards/ProductCard';
import FloatingCart from 'ui-component/cards/FloatingCart';
import SkeletonProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';

import useConfig from 'hooks/useConfig';
import { filterProducts } from 'api/products';
import { resetCart } from 'store/slices/cart';
import { dispatch, useSelector } from 'store';
import { appDrawerWidth, gridSpacing } from 'store/constant';

// assets
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// ==============================|| E-COMMERCE - PRODUCT GRID ||============================== //

const ProductsList = () => {
    const { borderRadius } = useConfig();
    const cart = useSelector((state) => state.cart);

    const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('lg'));
    const matchDownLG = useMediaQuery((theme) => theme.breakpoints.down('xl'));

    const [productLoading, setProductLoading] = useState(true);

    useEffect(() => {
        setProductLoading(false);
    }, []);

    // drawer
    const [open, setOpen] = useState(productLoading);

    const handleDrawerOpen = () => {
        setOpen((prevState) => !prevState);
    };

    // product data
    const initialProducts = useLoaderData();
    const [products, setProducts] = useState(initialProducts);

    useEffect(() => {
        // clear cart if complete order
        if (cart.checkout.step > 2) {
            dispatch(resetCart());
        }
    }, [cart.checkout.step]);

    // filter
    const initialState = {
        search: '',
        sort: 'low',
        gender: [],
        categories: ['all'],
        colors: [],
        price: '',
        rating: 0
    };
    const [filter, setFilter] = useState(initialState);

    // search filter
    const handleSearch = async (event) => {
        const newString = event?.target.value;
        setFilter({ ...filter, search: newString });
    };

    // sort options
    const [anchorEl, setAnchorEl] = useState(null);
    const openSort = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const filterIsEqual = (a1, a2) =>
        a1 === a2 ||
        (a1.length === a2.length &&
            a1.search === a2.search &&
            a1.sort === a2.sort &&
            a1.price === a2.price &&
            a1.rating === a2.rating &&
            JSON.stringify(a1.gender) === JSON.stringify(a2.gender) &&
            JSON.stringify(a1.categories) === JSON.stringify(a2.categories) &&
            JSON.stringify(a1.colors) === JSON.stringify(a2.colors));

    const handelFilter = (type, params, rating) => {
        setProductLoading(true);
        switch (type) {
            case 'gender':
                if (filter.gender.some((item) => item === params)) {
                    setFilter({ ...filter, gender: filter.gender.filter((item) => item !== params) });
                } else {
                    setFilter({ ...filter, gender: [...filter.gender, params] });
                }
                break;
            case 'categories':
                if (filter.categories.some((item) => item === params)) {
                    setFilter({ ...filter, categories: filter.categories.filter((item) => item !== params) });
                } else if (filter.categories.some((item) => item === 'all') || params === 'all') {
                    setFilter({ ...filter, categories: [params] });
                } else {
                    setFilter({ ...filter, categories: [...filter.categories, params] });
                }

                break;
            case 'colors':
                if (filter.colors.some((item) => item === params)) {
                    setFilter({ ...filter, colors: filter.colors.filter((item) => item !== params) });
                } else {
                    setFilter({ ...filter, colors: [...filter.colors, params] });
                }
                break;
            case 'price':
                setFilter({ ...filter, price: params });
                break;
            case 'search':
                setFilter({ ...filter, search: params });
                break;
            case 'sort':
                setFilter({ ...filter, sort: params });
                break;
            case 'rating':
                setFilter({ ...filter, rating: rating });
                break;
            case 'reset':
                setFilter(initialState);
                break;
            default:
            // no options
        }
    };

    const filterData = async (filter) => {
        await filterProducts(filter).then((response) => {
            setProducts(response.data);
            setProductLoading(false);
        });
    };

    useEffect(() => {
        filterData(filter);
    }, [filter]);

    useEffect(() => {
        setOpen(!matchDownLG);
    }, [matchDownLG]);

    // sort filter
    const handleMenuItemClick = (event, index) => {
        setFilter({ ...filter, sort: index });
        setAnchorEl(null);
    };

    const sortLabel = SortOptions.filter((items) => items.value === filter.sort);

    let productResult = <></>;
    if (products && products.length > 0) {
        productResult = products.map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    description={product.description}
                    offerPrice={product.offerPrice}
                    salePrice={product.salePrice}
                    rating={product.rating}
                    color={product.colors ? product.colors[0] : undefined}
                />
            </Grid>
        ));
    } else {
        productResult = (
            <Grid item xs={12} sx={{ mt: 3 }}>
                <ProductEmpty />
            </Grid>
        );
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={matchDownMD ? 0.5 : 2}>
                    <Grid item>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="h4">Shop</Typography>
                            <IconButton size="large" aria-label="go to shopping">
                                <ArrowForwardIosIcon sx={{ width: '0.875rem', height: '0.875rem', fontWeight: 500, color: 'grey.500' }} />
                            </IconButton>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 0.5, sm: 1, md: 1.5 }}>
                            <TextField
                                sx={{ width: { xs: 140, md: 'auto' } }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    )
                                }}
                                value={filter.search}
                                placeholder="Search Product"
                                size="small"
                                onChange={handleSearch}
                            />

                            <Typography sx={{ pl: 1.5, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>|</Typography>

                            <Button
                                disableRipple
                                onClick={handleDrawerOpen}
                                color="secondary"
                                startIcon={<FilterAltIcon sx={{ fontWeight: 500, color: 'secondary.200' }} />}
                            >
                                Filter
                            </Button>

                            <Typography sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>
                                |
                            </Typography>
                            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                <Typography variant="h5">Sort by: </Typography>
                                <Button
                                    id="demo-positioned-button"
                                    aria-controls="demo-positioned-menu"
                                    aria-haspopup="true"
                                    aria-expanded={openSort ? 'true' : undefined}
                                    onClick={handleClickListItem}
                                    sx={{ color: 'grey.500', fontWeight: 400 }}
                                    endIcon={<KeyboardArrowDownIcon />}
                                >
                                    {sortLabel.length > 0 && sortLabel[0].label}
                                </Button>
                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={openSort}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                >
                                    {SortOptions.map((option, index) => (
                                        <MenuItem
                                            sx={{ p: 1.5 }}
                                            key={index}
                                            selected={option.value === filter.sort}
                                            onClick={(event) => handleMenuItemClick(event, option.value)}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex' }}>
                    <Stack open={open}>
                        <ProductFilterView
                            filter={filter}
                            filterIsEqual={filterIsEqual}
                            handelFilter={handelFilter}
                            initialState={initialState}
                        />
                        <Grid container spacing={gridSpacing}>
                            {productLoading
                                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                      <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                                          <SkeletonProductPlaceholder />
                                      </Grid>
                                  ))
                                : productResult}
                        </Grid>
                    </Stack>
                    <Drawer
                        sx={{
                            ml: open ? 3 : 0,
                            height: matchDownLG ? '100vh' : 'auto',
                            flexShrink: 0,
                            zIndex: { xs: 1200, lg: open ? 1000 : -1 },
                            overflowX: 'hidden',
                            width: appDrawerWidth,
                            '& .MuiDrawer-paper': {
                                height: 'auto',
                                width: appDrawerWidth,
                                position: matchDownLG ? 'fixed' : 'relative',
                                border: 'none',
                                borderRadius: matchDownLG ? 0 : `${borderRadius}px`
                            }
                        }}
                        variant={matchDownLG ? 'temporary' : 'persistent'}
                        anchor="right"
                        open={open}
                        ModalProps={{ keepMounted: true }}
                        onClose={handleDrawerOpen}
                    >
                        {open && (
                            <PerfectScrollbar>
                                <ProductFilter filter={filter} handelFilter={handelFilter} />
                            </PerfectScrollbar>
                        )}
                    </Drawer>
                </Box>
            </Grid>
            <FloatingCart />
        </Grid>
    );
};

export default ProductsList;
