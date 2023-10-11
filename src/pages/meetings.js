import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {useCallback, useEffect, useRef, useState} from 'react';
import { APIs } from '../const/Api';
import axios from 'axios';
import { CompanyCard } from '../sections/companies/CompanyCard';
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
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const loadMore = async () => {
    const response = await axios.get(`${APIs.FETCH_ALL_MEETINGS}?page=${page}&limit=10`);
    console.log(response.data.meetings);
    setData(prevData => [...prevData, ...response.data.meetings]);
    setPage(prevPage => prevPage + 1);
  };
  useEffect(() => {
    const handleObserver = (entities, observer) => {
      const target = entities[0];
      if (target.isIntersecting) {
        loadMore();
      }
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();

  }, []);

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <>
      <Head>
        <title>
          Meetings | Email Meetings
        </title>
      </Head>
      <Box
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
                  Meetings
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
            </Stack>
            {/*   Meetings Show */}
            <Grid container spacing={2}>
              {
                data.map(company => {
                  return <Grid
                    xs={12}
                    md={6}
                    lg={4}
                    key={company.id}
                  >
                    <CompanyCard company={company}/>
                  </Grid>;
                })
              }
            </Grid>
            <div className={'loading-text w-full flex justify-center'} ref={loader}>
              <CircularProgress />
            </div>

            {/*  End Meetings Show*/}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
);

export default Page;
