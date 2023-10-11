import React from 'react';
import {Layout as DashboardLayout} from "../layouts/dashboard/Layout";
import {
    Box, Card, CardContent,
    Container,
    Stack,
    Typography
} from "@mui/material";
import {BsCalendar} from "react-icons/bs";

const Settings = () => {
        const [isBlue, setIsBlue] = React.useState(false);

        const handleToggle = () => {
            setIsBlue(!isBlue);
        };
        return (
            <>
                <Box
                    style={{"box-shadow": "rgba(50, 50, 93, 0.25) 0px 4px 8px -2px, rgba(0, 0, 0, 0.3) 0px 2px 5px -2px"}}
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 8
                    }}
                >
                    <Container maxWidth="xl">
                        <Stack spacing={3}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                spacing={4}
                            >
                                <Stack spacing={1}>
                                    <Typography variant="h4">
                                        Settings
                                    </Typography>
                                    <Stack
                                        alignItems="center"
                                        direction="row"
                                        spacing={1}
                                    >
                                    </Stack>
                                </Stack>
                            </Stack>

                            <CardContent>
                                <div>
                                    <Card>
                                        <div className={"flex justify-between w-full py-3 items-center"}>
                                            <h3 className={"ms-5"}>Auto</h3>
                                            <input
                                                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-blue-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:bg-blue-400 checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                type="checkbox"
                                                role="switch"
                                                id="flexSwitchCheckDefault"
                                            />
                                        </div>
                                    </Card>
                                </div>
                                <div className={"mt-5 "}>
                                    <Card>
                                        <div className={"flex justify-between w-full items-center py-3"}>
                                            <h3 className={"ms-5"}>Email</h3>
                                            <h3 className={"me-5 bg-[#ecf0fa] text-[#5173d4] py-1 rounded px-2"}>
                                                view Email</h3>
                                        </div>
                                    </Card>
                                </div>
                                <div className={"mt-5"}>
                                    <Card>
                                        <div className={"flex justify-between w-full py-3 items-center"}>
                                            <h3 className={"ms-5"}>Calendar</h3>
                                            <span className={" bg-[#ecf0fa] text-[#5173d4] p-4 rounded me-5"}>
                                                <BsCalendar/>
                                            </span>
                                        </div>
                                    </Card>
                                </div>
                                <div className={"mt-5"}>
                                    <Card>
                                        <div className={"flex justify-between w-full py-3 items-center"}>
                                            <h3 className={"ms-5"}>Choose AI response style</h3>
                                            <h3 className={"me-5 bg-[#ecf0fa] text-[#5173d4] py-1 rounded px-2"}>
                                                Choose Style</h3>
                                        </div>
                                    </Card>
                                </div>

                            </CardContent>

                        </Stack>
                    </Container>
                </Box>
            </>
        );
    };
    Settings.getLayout = (page) => (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    );
    export default Settings;