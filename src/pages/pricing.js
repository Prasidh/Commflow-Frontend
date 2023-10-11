import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import {Box, Stack, Typography} from "@mui/material";
import {Modal, TextField} from '@mui/material';
import {Tab, TabPanel, Tabs, TabsBody, TabsHeader, Textarea} from "@material-tailwind/react";
import {Button} from "@material-tailwind/react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Layout as DashboardLayout} from "../layouts/dashboard/Layout";
import {APIs} from "../const/Api";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {AiFillDelete} from "react-icons/ai";

const data = [

    {
        label: "User",
        value: "user",
    },
    {
        label: "Posted Tweets",
        value: "posted",
    },
];
const Pricing = () =>{
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState("")
    const [selectedTab, setSelectedTab] = useState(data[0].value);
    const [openPricingModal, setOpenPricingModal] = useState(false);
    const [subscriptionData, setSubscriptionData] = useState({});
    const [allSubscriptionData, setAllSubscriptionData] = useState({});
    const [selectedSub, setSelectedSub] = useState({})
    const [subsData, setSubsData] = useState({
        subscriptionTitle: "",
        subscriptionDescription: "",
        subscriptionType: "",
        subscriptionPrice: 10
    })

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("user"));
        console.log(userData.role)
        if (userData) {
            setUser(userData);
        } else {
            console.log("User data not found in sessionStorage.");
        }
    }, []);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const handleTabChange = (value) => {
        setSelectedTab(value);
    };

    const updateModalOpen = (itm) => {
        GetAllSubscription();
        GetAllSubscriptionById();
        setSelectedSub(itm)
        console.log(itm)
        setOpenPricingModal(true);
    };

    const handleClosePricingModal = () => {
        setOpenPricingModal(false);
    };

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("user"));
        console.log(userData.role);
        if (userData) {
            GetAllSubscription();
            GetAllSubscriptionById();
            setUser(userData);
        } else {
            console.log("User data not found in sessionStorage.");
        }
    }, []);
    const GetAllSubscription = async () => {
        try {
            const response = await axios.get(APIs.SUBSCRIPTION.GET_ALL_SUBSCRIPTION);
            setAllSubscriptionData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateSubs = async () => {
        try {
            await axios.put(APIs.SUBSCRIPTION.UPDATE_SUBSCRIPTION + `${selectedSub._id}`, selectedSub).then(res => {
                toast.success("Subscription Updated successfully", {autoClose:2000})
                GetAllSubscription();
                GetAllSubscriptionById();
                setOpenPricingModal(false);            })
        } catch (e) {
            toast.error("Something went wrong", {autoClose:2000})
        }

    };

    const SubscribeNow = async (itm) => {
        try {
            await axios.post(APIs.SUBSCRIPTION.SUBSCRIBE,{
                userId: JSON.parse(sessionStorage.getItem("user"))._id,
                subscriptionId: itm._id,
            }).then(res => {
                console.log(res.data)
                GetAllSubscription();
                GetAllSubscriptionById();
                toast.success(res.data.message, {autoClose:2000})
            })

        }catch (e) {
            toast.error("Something went wrong", {autoClose:2000})
        }
    }
    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("user"));
        console.log(userData.role);
        if (userData) {
            GetAllSubscriptionById();
            GetAllSubscription();
            setUser(userData);
        } else {
            console.log("User data not found in sessionStorage.");
        }
    }, []);
    const GetAllSubscriptionById = async () => {
        try {
            const response = await axios.get(APIs.SUBSCRIPTION.GET_ALL_SUBSCRIPTION_BY_ID + `${(JSON.parse(sessionStorage.getItem("user")))._id}`);
            setSubscriptionData(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const DeleteSubscription = async () => {
        try {
            await axios.delete(APIs.SUBSCRIPTION.DELETE_PLANE + `${JSON.parse(sessionStorage.getItem("user"))._id}`).then(res =>{
                GetAllSubscriptionById();
                GetAllSubscription();
                toast.success(res.data.massage, {autoClose: 2000});
            })
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", {autoClose: 2000});
        }
    };
    const subDelete = async (itemId) => {
        try {
            await axios.delete(APIs.SUBSCRIPTION.DELETE_SUBSCRIPTION + `${itemId}`);
            toast.success("Subscription Deleted successfully", {autoClose: 2000});
            GetAllSubscriptionById();
            GetAllSubscription();
        } catch (error) {
            toast.error("Something went wrong", {autoClose: 2000});
            console.log(error);
        }
    };
    const createSubs = async () => {
        try {
            await axios.post(APIs.SUBSCRIPTION.ADD_SUBSCRIPTION, subsData).then(res => {
                toast.success("Subscription added successfully", {autoClose:2000})
                GetAllSubscriptionById();
                GetAllSubscription();
                setOpen(false);
            })
        } catch (e) {
            toast.error("Something went wrong", {autoClose:2000})
        }
    };

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: "space-between", width: '100%'}}>
                <Typography variant="h4" sx={{mb: 5, ml: 2}}>
                    Manage Subscriptions
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mr={5}>
                    {
                        user && user.role === "ADMIN" &&
                        <Button variant="contain" onClick={handleOpen}
                        style={{"backgroundColor": "#3B82F6", "color": "white"}}
                        >
                            Custom Plane
                        </Button>
                    }
                </Stack>
            </Box>
            <ToastContainer />
            {
                user && user.role === "ADMIN" ?
                   <div className={"w-full justify-center flex"}>
                       <div className={'grid md:w-11/12 w-11/12 my-8 ms-4 me-5 place-items-center grid-cols-1 mx-auto my-auto gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'}>
                           <>
                               {
                                   allSubscriptionData?.subscriptions && allSubscriptionData?.subscriptions.map((itm)=>{
                                       return (
                                           <>
                                               <div className="p-4 w-full hover:scale-105 duration-500 rounded-lg bg-white shadow-indigo-50 shadow-md"
                                                    style={{"box-shadow": "rgba(50, 50, 93, 0.25) 0px 4px 8px -2px, rgba(0, 0, 0, 0.3) 0px 2px 5px -2px"}}>
                                                   <div className={" w-full flex justify-between"}>
                                                       {
                                                           user && user.role === "ADMIN" &&
                                                           <div className={"mx-3 mt-3 cursor-pointer"}>
                                                               <AiFillDelete color="red" size={20} onClick={() => subDelete(itm._id)} />
                                                           </div>
                                                       }
                                                       <div className={"mx-3 cursor-pointer cursor-pointer"}>
                                                           {
                                                               user && user.role === "ADMIN" && <ModeEditOutlineOutlinedIcon color={"primary"} onClick={()=> updateModalOpen(itm)} />
                                                           }
                                                       </div>
                                                   </div>
                                                   <div className=" flex items-center h-56  justify-between p-4">
                                                       <div>
                                                           <h2 className="text-gray-900 text-lg font-bold">
                                                               {itm.subscriptionTitle}
                                                           </h2>
                                                           <h3 className="mt-2 text-xl font-bold text-indigo-500 text-left">
                                                               ${itm.subscriptionPrice}
                                                           </h3>
                                                           <li className="text-sm mt-4 mb-2 list-inside font-semibold text-gray-600">
                                                               {itm.subscriptionDescription}
                                                           </li>
                                                           {/*<Link to={"https://buy.stripe.com/test_7sI9CHe14gGbd207ss"}>*/}
                                                           <button className="text-sm mt-6 px-4 py-2 bg-[#4267cf] text-white rounded-lg  tracking-wider hover:bg-indigo-500 outline-none" onClick={()=> SubscribeNow(itm)}>
                                                               Add to cart
                                                           </button>
                                                           {/*</Link>*/}
                                                       </div>
                                                       <div className="bg-gradient-to-tr from-indigo-500 to-indigo-400 w-32 h-32  rounded-full shadow-2xl shadow-[#4267cf] border-white  border-dashed border-2  flex justify-center items-center ">
                                                           <div>
                                                               <h1 className="text-white text-2xl">{itm.subscriptionType}</h1>
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>

                                           </>
                                       )
                                   })
                               }
                               <Modal
                                   open={openPricingModal}
                                   onClose={handleClosePricingModal}
                                   sx={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       justifyContent: 'center',
                                   }}
                               >
                                   <Card
                                       sx={{
                                           display: 'flex',
                                           flexDirection: 'column',
                                           padding: '20px',
                                           alignItems: 'space-between',
                                           justifyContent: 'space-between',
                                           width: '100%',
                                           height: '70%',
                                           borderRadius: '10px',
                                           maxWidth: '600px',
                                       }}
                                   >
                                       <h2 className={" text-2xl"}>Edit Subscription Plane :</h2>
                                       <TextField label="Title" fullWidth value={selectedSub.subscriptionTitle && selectedSub.subscriptionTitle}
                                                  onChange={(e) => setSelectedSub({...selectedSub, subscriptionTitle: e.target.value})}/>
                                       <TextField label="Price" fullWidth value={selectedSub.subscriptionPrice && selectedSub.subscriptionPrice}
                                                  onChange={(e) => setSelectedSub({...selectedSub, subscriptionPrice: e.target.value})}/>
                                       <Textarea label="Description" value={selectedSub.subscriptionDescription && selectedSub.subscriptionDescription}
                                                 onChange={(e) => setSelectedSub({...selectedSub, subscriptionDescription: e.target.value})}/>
                                       <div
                                           sx={{
                                               display: 'flex',
                                               justifyContent: 'flex-end',
                                               marginTop: '20px',
                                           }}
                                       >
                                           <Box
                                               sx={{
                                                   display: 'flex',
                                                   padding: '20px',
                                                   alignItems: 'space-between',
                                                   justifyContent: 'space-between',
                                                   flexDirection: 'row-reverse'
                                               }}>
                                               <Button variant="contained" color="primary" onClick={updateSubs}>
                                                   Done
                                               </Button>
                                               <Button variant="outlined" color="red" onClick={handleClose}>
                                                   Cancel
                                               </Button>
                                           </Box>
                                       </div>
                                   </Card>
                               </Modal>
                           </>
                       </div>
                   </div>
                    :
                    <Tabs id="custom-animation" className={"my-4 mx-1"} value={selectedTab} onChange={handleTabChange}>

                        <TabsHeader>
                            <Tab value="user">
                                New Offers
                            </Tab>
                            <Tab value="posted">
                                Subscribed Planes
                            </Tab>
                        </TabsHeader>
                        <TabsBody
                            animate={{
                                initial: {y: 250},
                                mount: {y: 0},
                                unmount: {y: 250},
                            }}
                        >
                            <TabPanel value="user">
                                <div className={'grid place-items-center grid-cols-1 mx-auto my-auto gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'}>
                                    {
                                        allSubscriptionData?.subscriptions && allSubscriptionData?.subscriptions.map((itm)=>{
                                            return (
                                                <>
                                                    <div className="p-4 w-full hover:scale-105 duration-500 rounded-lg bg-white shadow-indigo-50 shadow-md"
                                                         style={{"box-shadow": "rgba(50, 50, 93, 0.25) 0px 4px 8px -2px, rgba(0, 0, 0, 0.3) 0px 2px 5px -2px"}}>
                                                        <div className={" w-full flex justify-between"}>
                                                            {
                                                                user && user.role === "ADMIN" && <PriceDeleteModal getAll={GetAllSubscription} subId={itm._id}/>
                                                            }
                                                            <div className={"mx-3 cursor-pointer cursor-pointer"}>
                                                                {
                                                                    user && user.role === "ADMIN" && <ModeEditOutlineOutlinedIcon color={"primary"} onClick={()=> updateModalOpen(itm)} />
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className=" flex items-center h-56  justify-between p-4">
                                                            <div>
                                                                <h2 className="text-gray-900 text-lg font-bold">
                                                                    {itm.subscriptionTitle}
                                                                </h2>
                                                                <h3 className="mt-2 text-xl font-bold text-indigo-500 text-left">
                                                                    ${itm.subscriptionPrice}
                                                                </h3>
                                                                <li className="text-sm mt-4 mb-2 list-inside font-semibold text-gray-600">
                                                                    {itm.subscriptionDescription}
                                                                </li>
                                                                {/*<Link to={"https://buy.stripe.com/test_7sI9CHe14gGbd207ss"}>*/}
                                                                <button className="text-sm mt-6 px-4 py-2 bg-[#4267cf] text-white rounded-lg  tracking-wider hover:bg-indigo-500 outline-none" onClick={()=> SubscribeNow(itm)}>
                                                                    Add to cart
                                                                </button>
                                                                {/*</Link>*/}
                                                            </div>
                                                            <div className="bg-gradient-to-tr from-indigo-500 to-indigo-400 w-32 h-32  rounded-full shadow-2xl shadow-[#4267cf] border-white  border-dashed border-2  flex justify-center items-center ">
                                                                <div>
                                                                    <h1 className="text-white text-2xl">{itm.subscriptionType}</h1>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel value="posted">
                                <div className={'grid place-items-center grid-cols-1 mx-auto my-auto gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'}>
                                    <>
                                        {
                                            subscriptionData?.userSubscriptions && subscriptionData?.userSubscriptions.map((itm) => {
                                                return (
                                                    <>
                                                        <div
                                                            className="py-6 w-full hover:scale-105 duration-500 rounded-lg bg-white shadow-indigo-50 shadow-md">
                                                            <div className={" w-full flex justify-between"}>
                                                                {
                                                                    user && user.role === "ADMIN" && <PriceDeleteModal subId={itm._id}/>
                                                                }
                                                                <div className={"mx-3 cursor-pointer cursor-pointer"}>
                                                                    {
                                                                        user && user.role === "ADMIN" &&
                                                                        <ModeEditOutlineOutlinedIcon color={"primary"}/>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className=" flex items-center h-56  justify-between p-4">
                                                                <div>
                                                                    <h2 className="text-gray-900 text-lg font-bold">
                                                                        Subscription Date
                                                                    </h2>
                                                                    <li className="text-sm mt-4 mb-2 list-inside font-semibold text-gray-600">
                                                                        {new Date(itm.subscribeDate).toLocaleString()}
                                                                    </li>
                                                                    <h2 className="text-gray-900 text-lg font-bold">
                                                                        Expiry Date
                                                                    </h2>
                                                                    <li className="text-sm mt-4 mb-2 list-inside font-semibold text-gray-600">
                                                                        {new Date(itm.expiryDate).toLocaleString()}
                                                                    </li>
                                                                    <button
                                                                        className="text-sm mt-6 px-4 py-2 bg-red-400 text-white rounded-lg  tracking-wider hover:bg-indigo-500 outline-none"
                                                                        onClick={DeleteSubscription}>
                                                                        Cancel Plane
                                                                    </button>
                                                                </div>
                                                                <div
                                                                    className="bg-gradient-to-tr from-indigo-500 to-indigo-400 w-32 h-32  rounded-full shadow-2xl shadow-[#304FFE] border-white  border-dashed border-2  flex justify-center items-center ">
                                                                    <div>
                                                                        <h1 className="text-white text-2xl">{itm.subscriptionTitle}</h1>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                        <ToastContainer/>
                                    </>
                                </div>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
            }
            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        alignItems: 'space-between',
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '70%',
                        borderRadius: '10px',
                        maxWidth: '600px',
                    }}
                >
                    <h2 className={" text-2xl"}>Add Custom Plane :</h2>
                    <TextField label="Title" fullWidth value={subsData.subscriptionTitle}
                               onChange={(e) => setSubsData({...subsData, subscriptionTitle: e.target.value})}/>
                    <TextField label="Type (Monthly , Yearly)" fullWidth value={subsData.subscriptionType}
                               onChange={(e) => setSubsData({...subsData, subscriptionType: e.target.value})}/>
                    <TextField label="Price" fullWidth value={subsData.subscriptionPrice}
                               onChange={(e) => setSubsData({...subsData, subscriptionPrice: e.target.value})}/>
                    <Textarea label="Description" value={subsData.subscriptionDescription}
                              onChange={(e) => setSubsData({...subsData, subscriptionDescription: e.target.value})}/>
                    <div
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '20px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                padding: '20px',
                                alignItems: 'space-between',
                                justifyContent: 'space-between',
                                flexDirection: 'row-reverse'
                            }}>
                            <Button variant="contained" color="primary" onClick={createSubs}>
                                Done
                            </Button>
                            <Button variant="outlined" color="red" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Box>
                    </div>
                </Card>
            </Modal>
        </>
    );
}
Pricing.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Pricing