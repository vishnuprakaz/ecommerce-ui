import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// =============================|| USER NUM CARD ||============================= //

const UserCountCard = ({ primary, secondary, iconPrimary, color }) => {
    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <Card sx={{ bgcolor: color, position: 'relative', color: '#fff' }}>
            <CardContent>
                <Box
                    sx={{
                        position: 'absolute',
                        left: -17,
                        bottom: 0 - 27,
                        color: '#fff',
                        transform: 'rotate(25deg)',
                        '&> svg': {
                            width: 100,
                            height: 100,
                            opacity: 0.35
                        }
                    }}
                >
                    {primaryIcon}
                </Box>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item sm={12}>
                        <Typography variant="h3" align="center" color="inherit">
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="body1" align="center" color="inherit">
                            {primary}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

UserCountCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    iconPrimary: PropTypes.object,
    color: PropTypes.string
};

export default UserCountCard;
