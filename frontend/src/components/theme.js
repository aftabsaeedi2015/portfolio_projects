import { createTheme } from "@mui/material"
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1F1F1F',
            dark: '#151515',
            light: '#4b4b4b',
            contrastText: '#fff'
        },
        secondary: {
            main: '#ff4545',
            dark: '#b23030',
            light: '#ff6a6a',
            contrastText: '#000'
        },
        text: {
            primary: '#FFFFFF',
            dark: '#808080'
        }
    }

})
export default theme
