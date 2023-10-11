import Head from 'next/head';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {
    Box,
    Stack,
    TextField,
    Typography, Unstable_Grid2 as Grid, useMediaQuery
} from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import axios from "axios";
import {APIs} from "../../const/Api";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
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
                        <img src={"/login.jpg"} width={800} />
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
    const router = useRouter();
    const isSmallDevice = useMediaQuery('(max-width:600px)');
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        fullname: "",
        email: "",
        password: "",
        role: ""
    })


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.email || !userData.fullname || !userData.password) {
            toast.warning('Please enter email, full name and password', {autoClose: 2000})
        } else {
            await axios.post(APIs.USER.SIGNUP, userData).then(res => {
                toast.success("User created successfully", {autoClose: 2000})
                setTimeout(() => {
                    router.push('/auth/login', {replace: true});
                }, 2000);
            }).catch(err => {
                toast.error("Something went wrong", {autoClose: 2000})
            })
        }
    }
    return (
        <>
            <Head>
                <title>Register | Email Meetings</title>
            </Head>
            <Box
                sx={{
                    backgroundColor: isSmallDevice ? '#4267cf' : '#f5f8ff',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',

                }}
            >
                <div className={"w-96 flex items-center justify-center rounded-md"}>
                    <div className=" md:px-3  rounded-md md:py-8 w-full bg-[#4267cf]"
                    >
                        <div className="px-4">
                            <Stack spacing={1} sx={{mb: 3}}>
                                <div className="mx-auto">
                                    <img src="/logo.jpg" width={120}/>
                                </div>
                                <Typography variant="h5" className="text-center text-white py-2">
                                    Sign Up
                                </Typography>
                                <div className={"w-full flex justify-center"}>
                                    <GoogleLogin
                                        className={'w-full'}
                                        onSuccess={credentialResponse => {
                                            const token = credentialResponse.credential;
                                            const credentialResponseDecoded = jwt_decode(token);
                                            console.log(credentialResponseDecoded);
                                            const updatedUserData = {
                                                ...userData,
                                                email: credentialResponseDecoded.email,
                                                fullname: credentialResponseDecoded.name,
                                                username: credentialResponseDecoded.name,
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
                    <span
                        className="px-4 text-sm text-white"
                        style={{backgroundColor: '#4267CF'}}
                    >
                      OR
                    </span>
                                    </div>
                                </div>
                            </Stack>
                            <form>
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={userData.fullname}
                                        onChange={(e) => {
                                            setUserData({
                                                ...userData,
                                                fullname: e.target.value
                                            })
                                        }}
                                        InputProps={{style: {color: 'white'}}}
                                        InputLabelProps={{style: {color: 'white'}}}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        onChange={(e) => setUserData({
                                            ...userData,
                                            email: e.target.value,
                                            username: e.target.value
                                        })}
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
                                            })
                                        }}
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
                                    className="px-4 py-2 mt-6 w-full mt-4 flex justify-center items-center bg-white hover:bg-blue-100 hover:text-gray-800 text-gray-800 text-sm font-bold rounded-md">
                                    Register
                                </button>
                                <ToastContainer/>
                            </form>
                        </div>
                        <p className="mb-0 m-4 mt-2 pt-1 text-sm md:text-sm text-gray-100">
                            <span>Already have an account?</span>
                            <Link href="/auth/login">
                                <span className="text-white font-bold px-4">Login</span>
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
        title="Automate Your Email"
        para="Effortless email automation for efficient communication. Get started today!"
        img="/login.jpg"
    >
        {page}
    </Layout>
);

export default Page;