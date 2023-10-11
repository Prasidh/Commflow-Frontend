import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/Logo';
import LottieAnimation from "../../components/LottieAnimation";
// TODO: Change subtitle text
import { useMediaQuery } from '@mui/material';
export const Layout = (props) => {
  const { children } = props;
  const title = props.title;
  const img = props.img;
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
            <img src={img} width={800} />
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