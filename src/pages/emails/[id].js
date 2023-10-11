import { Layout as DashboardLayout } from '../../layouts/dashboard/Layout';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { APIs } from '../../const/Api';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoReply } from 'react-icons/go';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SiGooglebard } from 'react-icons/si';
import { Spinner } from '@material-tailwind/react';
import { addHours, format, parse } from 'date-fns';

const now = new Date();
const EmailDetail = () => {
  const [emailData, setEmailData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [addMeeting, setAddMeeting] = useState({
    title: 'Meeting Title',
    location: 'Meeting Location',
    description: 'Meeting Description',
    startDateTime: '2023-10-08T10:00:00',
    endDateTime: '2023-10-08T11:00:00',
    timeZone: 'Asia/Karachi',
    attendees: [
      { email: 'fahadqureshi.se@gmail.com' },
      { email: 'hassohail01@gmail.com' },
      { email: 'hassohail01@gmail.com' },
      { email: 'mujtabashaikh2018@gmail.com' }
    ]
  });

  const [reply, setReply] = useState({
    replyText: ''
  });
  const [showReplyCard, setShowReplyCard] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const fetchEmailDetails = async () => {
    await axios.get(APIs.GET_EMAIL_BY_ID + id).then(res => {
      setEmailData(res.data);
    });
  };
  useEffect(() => {
    fetchEmailDetails();
  }, []);
  const createMarkup = () => {
    return { __html: emailData };
  };
  const toggleReplyCard = () => {
    setShowReplyCard(!showReplyCard);
  };

  async function handleReply() {
    try {
      await axios.post(APIs.REPLY_EMAIL_BY_ID + id, reply).then(res => {
        toast.success(res.data.message, { autoClose: 2000 });
        setShowReplyCard(false);
        setReply({ replyText: '' });
      });
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 2000 });
    }
  }

  const handleChange = (e) => {
    const newReplyText = e.target.value;
    setReply({ replyText: newReplyText });
  };
  const createMeetings = async () => {
    try {
      await axios.post(APIs.CREAT_SCHEDULE_MEETINGS, addMeeting).then(res => {
        toast.success(res.data.message, { autoClose: 2000 });
      });
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 2000 });
    }
  };
  const autoReply = async () => {
    setIsReply(true);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = emailData;
    const plainText = tempDiv.textContent || tempDiv.innerText;
    try {
      await axios.get(APIs.REPLY_EMAIL_BY_AI + plainText).then(res => {
        toast.success(res.data.message, { autoClose: 2000 });
        setReply({ replyText: res.data.reply });
        setIsReply(false);
        toast.success(res.data.message, { autoClose: 2000 });
      }).catch(err => {
        toast.error(err.response.data.message, { autoClose: 2000 });
        setIsReply(false);
      });
    } catch (error) {
      setIsReply(false);
    }
  };

  const scheduleMeeting = async () => {
    setIsLoading(true);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = emailData;
    const plainText = tempDiv.textContent || tempDiv.innerText;
    let extractedEntities;
    // try {
    //   await axios.get(APIs.CREAT_MEETING_BY_AI + plainText + 'bye').then((res) => {
    //     setAddMeeting({
    //       ...addMeeting,
    //       title: 'Not Found',
    //       location: extractedEntities.LOCATION || 'Not Found',
    //       description: extractedEntities.DESCRIPTION || 'Not Found',
    //       startDateTime: extractedEntities.DATE || format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    //       endDateTime: format(addHours(new Date(), 1),
    //         'yyyy-MM-dd\'T\'HH:mm:ss'),
    //       attendees: emailObjects || [null]
    //     });
    //     console.log();
    //     setIsLoading(false);
    //     createMeetings();
    //   }).catch(err => {
    //     toast.error(err.response.data.message, { autoClose: 2000 });
    //   });
    // } catch (error) {
    //   setIsLoading(false);
    // }
    await axios.post(APIs.CREAT_SCHEDULE_MEETINGS, addMeeting).then(() => {
      toast.success('Meeting Created, Check Meetings Tab', { autoClose: 2000 });
      setIsLoading(false);
    }).catch(err => {
      toast.error(err.response.data.message, { autoClose: 2000 });
      setIsLoading(false);
    });
  };

  return (
    <>
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
                  Email
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
              {
                isLoading ? <Spinner className="h-8 w-8" color="blue"/>
                  :
                  <Button
                    variant="contained"
                    onClick={scheduleMeeting}
                  >
                    Schedule Meetings
                  </Button>
              }

            </Stack>
            <p dangerouslySetInnerHTML={createMarkup()}/>
          </Stack>
          <div className={'mt-8'}>
            {!showReplyCard && (
              <Button onClick={toggleReplyCard} variant="outlined" className="rounded-full mt-14">
                <div className={'flex justify-center  items-center space-x-2'}>
                  <GoReply size={18}/>
                  <span> Reply</span>
                </div>
              </Button>
            )}
          </div>
          {showReplyCard && (
            <div className="w-full mx-auto mt-4 p-4 bg-white rounded-lg shadow-lg">
              <div className={'w-full flex justify-end mt-2 me-2 '}>
                {

                  isReply ? <Spinner className="h-8 w-8" color="blue"/> :
                    <div className={' cursor-pointer '}>
                      <SiGooglebard color={'#d9604c'} size={28} onClick={autoReply}/>
                    </div>
                }

              </div>
              <div className="mt-2">
                            <textarea
                              value={reply.replyText}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                              rows="4" placeholder="Write your reply..."></textarea>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleReply}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                  Send
                </button>
                <button onClick={toggleReplyCard}
                        className="ml-2 px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring focus:border-gray-300">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Container>
        <ToastContainer/>
      </Box>
    </>
  );
};
EmailDetail.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default EmailDetail;
