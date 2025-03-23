//  * theme
//  *
//  * This file defines a custom Material-UI theme for the application.
//  * It configures the color palette and overrides default styles for components like buttons.
//  *

import { createTheme } from "@mui/material"

export const theme = createTheme({
    palette: {
        primary: {
            main: "#000",
        },

        error: {
            main: "#cd736d",
        },

        secondary: {
            main: "#cd736d",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#fff",
                },
            },
        },
    },
})

