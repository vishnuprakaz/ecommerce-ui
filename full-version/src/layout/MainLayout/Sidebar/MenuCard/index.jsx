import PropTypes from 'prop-types';
import { memo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { linearProgressClasses } from '@mui/material/LinearProgress';
import { ThemeMode } from 'config';

// assets
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
    const theme = useTheme();

    return (
        <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
            <Grid item>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6" sx={{ color: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'primary.800' }}>
                            Limited Time
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color="inherit">{`${Math.round(value)}% OFF`}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <LinearProgress
                    aria-label="discount offer progress"
                    variant="determinate"
                    value={value}
                    {...others}
                    sx={{
                        height: 10,
                        borderRadius: 30,
                        [`&.${linearProgressClasses.colorPrimary}`]: {
                            bgcolor: 'background.paper'
                        },
                        [`& .${linearProgressClasses.bar}`]: {
                            borderRadius: 5,
                            bgcolor: 'warning.main'
                        }
                    }}
                />
            </Grid>
        </Grid>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// ==============================|| SIDEBAR - MENU CARD ||============================== //

const MenuCard = () => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'warning.light',
                mb: 2.75,
                overflow: 'hidden',
                position: 'relative',
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: 157,
                    height: 157,
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.dark' : 'warning.200',
                    borderRadius: '50%',
                    top: -105,
                    right: -96
                }
            }}
        >
            <Box sx={{ p: 2 }}>
                <List disablePadding sx={{ m: 0 }}>
                    <ListItem alignItems="flex-start" disableGutters disablePadding>
                        <ListItemAvatar sx={{ mt: 0 }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.largeAvatar,
                                    color: 'warning.main',
                                    border: theme.palette.mode === ThemeMode.DARK ? '1px solid' : 'none',
                                    borderColor: 'warning.main',
                                    bgcolor: 'background.paper'
                                }}
                            >
                                <LocalOfferIcon fontSize="inherit" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ mt: 0 }}
                            primary={
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'warning.800' }}
                                >
                                    Special Offers
                                </Typography>
                            }
                            secondary={<Typography variant="caption">Free shipping on orders $50+</Typography>}
                        />
                    </ListItem>
                </List>
                <LinearProgressWithLabel value={25} />
            </Box>
        </Card>
    );
};

export default memo(MenuCard);
