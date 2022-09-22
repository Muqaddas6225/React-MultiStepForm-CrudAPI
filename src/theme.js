import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette:{
        primary: {
            main: "#1A97DC"
        },
        secondary:{
            main: "#444444",
            light: "#747474"
            
        },
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1290,
          xl: 1536,
        },
      },
     
    typography: {
        h3:{ 
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '1.5rem',
            '@media (max-width:600px)': {
            fontSize: '1rem',
            fontWeight: 400,
            },
          
        },
        h4:{ 
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '1.125rem',
            '@media (max-width:600px)': {
            fontSize: '1.1rem',
            fontWeight: 300,
            lineHeight: '82.5%'
            },   
        },
    },
    // spacing: [0, 4, 8, 16, 32, 64],

       
    
})
