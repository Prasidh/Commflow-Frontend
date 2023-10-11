import {useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/navigation';
import {
    Box,
    Stack,
    TextField,
    Typography, Unstable_Grid2 as Grid
} from '@mui/material';
import {useMediaQuery} from '@mui/material';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputAdornment from '@mui/material/InputAdornment';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import Link from "next/link";
import axios from "axios";
import {APIs} from "../../const/Api";
import {useParams} from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import {useAuthContext} from "../../contexts/AuthContext";
import PropTypes from "prop-types";


const Layout = (props) => {
    const { children } = props;
    const title = props.title;
    const para = props.para;
    const isSmallDevice = useMediaQuery('(max-width:600px)');
    return (
        <Box

            component="main"
            sx={{
                display: 'flex',
                flex: '1 1 auto'
            }}

        >
            <Grid
                container
                sx={{ flex: '1 1 auto' }}
            >
                {/*Left */}

                <Grid
                    xs={isSmallDevice ? false : 12}
                    lg={6}
                    sx={{
                        alignItems: 'center',
                        background: 'background.paper',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        '& img': {
                            maxWidth: '100%',

                        }
                    }}
                >
                    <div className={"hidden md:inline"}>
                        <div>
                            <h1 className=" text-center text-4xl font-bold mb-4"
                                style={{color: "#4267CF"}}>
                                {title}
                            </h1>
                            <p className={"text-gray-900 text-xl text-center px-12 my-2"}>{para}</p>
                        </div>
                        <img src={"/Signin.jpg"} width={800} />
                    </div>
                </Grid>


                {/*Right */}
                <Grid
                    xs={12}
                    lg={6}
                    sx={{
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        borderRadius: '1px'
                    }}
                >
                    {children}
                </Grid>
            </Grid>
        </Box>
    );
};

Layout.prototypes = {
    children: PropTypes.node
};
const Page = () => {
    const isSmallDevice = useMediaQuery('(max-width:600px)');
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })
    const router = useRouter();
    const {connectedStatus} = useParams();
    const authContext = useAuthContext();
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            toast.warning('Please enter email or password',{autoClose:2000})
        } else {
            await axios.post(APIs.USER.LOGIN, userData).then(res => {
                const user = res.data
                authContext.signIn(user.email, user.password);
                toast.success("User Login successfully",{autoClose:2000})
                sessionStorage.setItem("user", JSON.stringify(res.data))
                setTimeout(() => {
                    if (res.data.role==="ADMIN" || res.data.Admin==="true") {
                        router.push('/', {replace: true});
                    }else{
                        router.push('/connect-account', {replace: true});
                    }
                }, 1000);
            }).catch(err => {
                toast.error("Invalid email or password",{autoClose:2000})
            })
        }
    }
    const responseGoogle = (response) => {
        if (response.profileObj) {
            console.log(response)
            const { email } = response.profileObj;
            setUserData({ ...userData, email });
            handleSubmit();
        }
    };
    return (
        <>
            <Head>
                <title>
                    Login | Email Meetings
                </title>
            </Head>

            <Box

                sx={{
                    backgroundColor: isSmallDevice ? '#4267cf' : '#f5f8ff',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <div className={"w-96 flex items-center justify-center rounded-md"}>
                    <div className=" md:px-3  rounded-md md:py-16 w-full bg-[#4267cf]">

                        <div className="px-4">
                            <Stack
                                spacing={1}
                                sx={{mb: 3}}
                            >
                                <div className={"mx-auto"}>
                                    <img src="/logo.jpg" width={120}/>
                                </div>
                                <Typography variant="h5" className="text-center text-white py-2">
                                    Sign In
                                </Typography>
                                <div className={"w-full flex justify-center"}>
                                    <GoogleLogin
                                        className="w-full"
                                        width={"100%"}
                                        style={{ width: '100%' }}
                                        onSuccess={credentialResponse => {
                                            const token = credentialResponse.credential;
                                            const credentialResponseDecoded = jwt_decode(token);
                                            console.log(credentialResponseDecoded);
                                            const updatedUserData = {
                                                ...userData,
                                                email: credentialResponseDecoded.email,
                                            };
                                            setUserData(updatedUserData);
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}
                                    />
                                </div>
                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-b border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                  <span className=" px-4 text-sm text-white"
                        style={{backgroundColor: '#4267CF'}}
                  >OR</span>
                                    </div>
                                </div>

                            </Stack>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    onChange={(e) => setUserData({...userData, email: e.target.value, username: e.target.value})}
                                    value={userData.email}
                                    InputProps={{style: {color: 'white'}}}
                                    InputLabelProps={{style: {color: 'white'}}}
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    onChange={(e) => {
                                        setUserData({
                                            ...userData,
                                            password: e.target.value
                                        })}}
                                    value={userData.password}
                                    type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password' based on showPassword state
                                    InputProps={{
                                        style: {color: 'white'},
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <div onClick={handleTogglePasswordVisibility}
                                                     style={{cursor: 'pointer', color: "white"}}>
                                                    {showPassword ? <FaEye/> : <FaEyeSlash/>}
                                                </div>
                                            </InputAdornment>
                                        ),
                                    }}
                                    InputLabelProps={{style: {color: 'white'}}}
                                />

                            </Stack>
                            <button
                                onClick={handleSubmit}
                                type={"submit"}
                                className="px-4 py-2 mt-8 w-full mt-4 flex justify-center items-center bg-white hover:bg-blue-100 hover:text-gray-800 text-gray-600 text-sm font-bold rounded-md">
                                Login
                            </button>
                            <ToastContainer/>
                        </div>

                        <p className=" mt-2 m-4 pt-1 text-sm md:text-sm text-gray-100">
                            <span> {`Don't have an account?`}</span>
                            <Link href={"/auth/register"}>
                                <span className="text-white font-bold px-2">Register</span>
                            </Link>
                        </p>

                    </div>
                </div>
            </Box>

        </>
    );
};

Page.getLayout = (page) => (
    <Layout
        title="Efficient User Access"
        para="Access your email automation tools efficiently and get more done in less time."
        img="/Signin.jpg"
    >
        {page}
    </Layout>
);

export default Page;