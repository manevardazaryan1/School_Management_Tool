import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#000', // Changes the primary color
        },

        error: {
            main: '#cd736d', // Your desired error color (Material Design red)
        },

        secondary: {
            main: '#cd736d', // Replace with your desired red color
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#fff', // Changes button text color
                },
            },
        },
    },
});

