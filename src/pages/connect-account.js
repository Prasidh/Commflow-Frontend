import Head from 'next/head';
import { Box, Button, Card, Container, Grid, Stack } from "@mui/material";
import EmailAnimation from "../components/EmailAnimation";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIs, BASE_URL_ } from "../const/Api";
import axios from "axios";
import { useEffect } from "react";

const Page = () => {
    const router = useRouter();

    const openPopup = async (url, width, height) => {
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const popupWindow = window.open(url, '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`);
    };

    const fetchUserData = async () => {
        await axios.post(APIs.USER.FIND_BY_EMAIL, {
            email: `${JSON.parse(sessionStorage.getItem("user")).email}`
        }).then(res => {
            sessionStorage.setItem("user", JSON.stringify(res.data))
            if (res.data.isAccountConnected) {
                toast.success("Email Connected successfully", { autoClose: 2000 })
                window.close()
                router.push('/')
            } else {
                toast.error("Email Not Connected yet", { autoClose: 2000 })
            }
        })
    }

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem("user")).isAccountConnected) {
            window.close()
            router.push('/')
        }
    }, [])

    return (
        <>
            <Head>
                <title>
                    Connect Your Email
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Grid container style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60%',
                    }} marginTop={"2rem"}>
                        <Grid item md={12} lg={12} sm={12}>
                            <Card style={{"box-shadow": "rgba(50, 50, 93, 0.25) 0px 4px 8px -2px, rgba(0, 0, 0, 0.3) 0px 2px 5px -2px"}}>
                                <div className={"mb-5 bg"}>
                                    <EmailAnimation/>
                                </div>
                                <Stack spacing={2} sx={{p: 5}}>
                                    <Button
                                        onClick={() => openPopup(`${APIs.CONNECT_ACCOUNT}/${JSON.parse(sessionStorage.getItem("user"))._id}`, 600, 600)}
                                        type={"submit"}
                                        variant="contained"
                                        className="px-4 py-2 mt-8 bg-amber-400 text-white w-full mt-4 flex justify-center items-center bg-white hover:bg-blue-200 hover:text-white text-gray-600 text-sm font-bold rounded-md">
                                        Connect Email Account
                                    </Button>
                                </Stack>
                                <div className={"flex w-full justify-center mb-5"}>
                                    <Button
                                        style={{"backgroundColor": "red"}}
                                        variant="contained"
                                        onClick={() => fetchUserData()} >
                                        verify
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                            />
                                        </svg>
                                    </Button>
                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
                <ToastContainer />
            </Box>
        </>
    )
}

export default Page;
