import Head from 'next/head';
import {CacheProvider} from '@emotion/react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline} from '@mui/material';
import {createTheme as createMuiTheme, ThemeProvider} from '@mui/material/styles';
import 'simplebar-react/dist/simplebar.min.css';
import '../global.css'
import {GoogleOAuthProvider} from '@react-oauth/google';
import {AuthConsumer, AuthProvider} from "../contexts/AuthContext";
import {createEmotionCache} from "../utils/CreateEmotionCache";
import {createPalette} from "../components/theme/create-palette";
import {createComponents} from "../components/theme/CreateComponents";
import {createShadows} from "../components/theme/CreateShadows";
import {createTypography} from "../components/theme/CreateTypography";


function createTheme() {
    const palette = createPalette();
    const components = createComponents({ palette });
    const shadows = createShadows();
    const typography = createTypography();

    return createMuiTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1440
            }
        },
        components,
        palette,
        shadows,
        shape: {
            borderRadius: 8
        },
        typography
    });
}


const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    const getLayout = Component.getLayout ?? ((page) => page);

    const theme = createTheme();

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>
                    Gmail Meetings
                </title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <AuthProvider>
                    <GoogleOAuthProvider
                        clientId="680973383432-gosga785jlcji88vauuk7598c1v9g5lj.apps.googleusercontent.com">
                        <ThemeProvider theme={createTheme()}>
                            <CssBaseline/>
                            <AuthConsumer>
                                {
                                    (auth) => auth.isLoading
                                        ? <SplashScreen/>
                                        : getLayout(<Component {...pageProps} />)
                                }
                            </AuthConsumer>
                        </ThemeProvider>
                    </GoogleOAuthProvider>
                </AuthProvider>
            </LocalizationProvider>
        </CacheProvider>
    );
};

export default App;