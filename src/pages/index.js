import Head from 'next/head';
import UserInbox from "../components/UserInbox";
import Dashboard from "../components/Dashboard";
import {useCallback, useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import {withAuthGuard} from "../hocs/WithAuthGuard";
import {usePathname} from "next/navigation";
import {TopNav} from "../layouts/dashboard/TopNav";
import {SideNav} from "../layouts/dashboard/SideNav";



const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
        paddingLeft: SIDE_NAV_WIDTH
    }
}));

const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
});

const Layout = withAuthGuard((props) => {
    const { children } = props;
    const pathname = usePathname();
    const [openNav, setOpenNav] = useState(false);

    const handlePathnameChange = useCallback(
        () => {
            if (openNav) {
                setOpenNav(false);
            }
        },
        [openNav]
    );

    useEffect(
        () => {
            handlePathnameChange();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pathname]
    );

    return (
        <>
            <TopNav onNavOpen={() => setOpenNav(true)} />
            <SideNav
                onClose={() => setOpenNav(false)}
                open={openNav}
            />
            <LayoutRoot>
                <LayoutContainer>
                    {children}

                </LayoutContainer>
            </LayoutRoot>
        </>
    );
});

const Page = () => {
    const [user, setUser] = useState("")

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("user"));
        if (userData) {
            setUser(userData);
        } else {
            console.log("User data not found in sessionStorage.");
        }
    }, []);
    return (
        <>
            <Head>
                <title>Inbox | Email Meetings</title>
            </Head>
            {
                user && user.role === "ADMIN" ?
                    <Dashboard/>
                    :
                    <UserInbox/>
            }
        </>
    );
};

Page.getLayout = (page) => (
    <Layout>{page}</Layout>
);

export default Page;

