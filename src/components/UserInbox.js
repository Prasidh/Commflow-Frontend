import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { TfiReload } from 'react-icons/tfi';
import { CustomersTable } from '../sections/customer/CustomersTable';
import { Layout as DashboardLayout } from '../layouts/dashboard/Layout';
import { useSelection } from '../hooks/UseSelection';
import axios from 'axios';
import { APIs } from '../const/Api';
import { applyPagination } from '../utils/ApplyPagination';
import { Spinner } from '@material-tailwind/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useCustomers = (data, page, rowsPerPage) => {
  return useMemo(() => {
    if (data && data.emails) {
      return applyPagination(data.emails, page, rowsPerPage);
    } else {
      return [];
    }
  }, [data, page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const UserInbox = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const customers = useCustomers(data, page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //     if (isLoading) {
  //         document.documentElement.classList.add('loading');
  //     } else {
  //         document.documentElement.classList.remove('loading');
  //     }
  // }, [isLoading]);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );
  useEffect(() => {
    const storedEmails = JSON.parse(sessionStorage.getItem('emails'));
    if (storedEmails) {
      setData(storedEmails);
    } else {
      fetchEmails();
    }
  }, []);

  const fetchEmails = async () => {
    setIsLoading(true);
    await axios.get(APIs.GET_EMAILS).then((res) => {
      sessionStorage.setItem('emails', JSON.stringify(res.data));
      setData(res.data);
      setIsLoading(false);
    }).catch(err => {
      toast.error("Something went wrong", { autoClose: 2000 });
      setIsLoading(false);
    });
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}
            >
              <Stack spacing={1}>
                <Typography variant="h4">Inbox</Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                ></Stack>
              </Stack>
              <div className={'flex justify-center items-center w-56 cursor-pointer '}>
                {
                  isLoading ? <Spinner className="h-10 w-10" color="blue"/> :
                    <TfiReload size={'30px'} onClick={() => fetchEmails()}/>
                }

                {/*<Button*/}
                {/*    variant="contained"*/}
                {/*    style={{*/}
                {/*        'box-shadow':*/}
                {/*            'rgba(50, 50, 93, 0.25) 0px 4px 8px -2px, rgba(0, 0, 0, 0.3) 0px 2px 5px -2px'*/}
                {/*    }}*/}
                {/*>*/}
                {/*    Schedule Meetings*/}
                {/*</Button>*/}
              </div>
            </Stack>
            <CustomersTable
              count={data && data.emails ? data.emails.length : 0}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
        <ToastContainer/>
      </Box>
    </>
  );
};
UserInbox.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default UserInbox;