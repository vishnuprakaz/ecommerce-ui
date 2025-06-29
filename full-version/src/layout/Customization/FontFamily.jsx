// material-ui
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import { ThemeMode } from 'config';

// ==============================|| CUSTOMIZATION - FONT FAMILY ||============================== //

const FontFamilyPage = () => {
    const { mode, fontFamily, onChangeFontFamily } = useConfig();

    const handleFontChange = (event) => {
        onChangeFontFamily(event.target.value);
    };

    const fonts = [
        {
            id: 'inter',
            value: `'Inter', sans-serif`,
            label: 'Inter'
        },
        {
            id: 'poppins',
            value: `'Poppins', sans-serif`,
            label: 'Poppins'
        },
        {
            id: 'roboto',
            value: `'Roboto', sans-serif`,
            label: 'Roboto'
        }
    ];

    const bgColor = mode === ThemeMode.DARK ? 'dark.800' : 'grey.50';
    const bgActiveColor = mode === ThemeMode.DARK ? 'primary.800' : 'primary.light';

    return (
        <Stack p={2} spacing={2.5} sx={{ width: '100%' }}>
            <Typography variant="h5">FONT STYLE</Typography>
            <RadioGroup aria-label="payment-card" name="payment-card" value={fontFamily} onChange={handleFontChange}>
                <Grid container spacing={1.25}>
                    {fonts.map((item, index) => (
                        <Grid item xs={12} key={index}>
                            <MainCard content={false} sx={{ p: 0.75, bgcolor: fontFamily === item.value ? bgActiveColor : bgColor }}>
                                <MainCard
                                    content={false}
                                    border
                                    sx={{
                                        p: 1.75,
                                        borderWidth: 1,
                                        ...(fontFamily === item.value && { borderColor: 'primary.main' })
                                    }}
                                >
                                    <FormControlLabel
                                        sx={{ width: 1 }}
                                        control={<Radio value={item.value} sx={{ display: 'none' }} />}
                                        label={
                                            <Typography variant="h5" sx={{ pl: 2, fontFamily: item.value }}>
                                                {item.label}
                                            </Typography>
                                        }
                                    />
                                </MainCard>
                            </MainCard>
                        </Grid>
                    ))}
                </Grid>
            </RadioGroup>
        </Stack>
    );
};

export default FontFamilyPage;
