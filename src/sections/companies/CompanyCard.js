import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import {
    Box,
    Card,
    CardContent,
    Divider,
    Stack,
    SvgIcon,
    Typography,
    IconButton,
    Collapse,
} from '@mui/material';
import {FiExternalLink} from 'react-icons/fi';
import {FaRegHandshake} from 'react-icons/fa';
import {format, parseISO} from 'date-fns';
import {utcToZonedTime} from 'date-fns-tz';
import {styled} from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';


const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
export const CompanyCard = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const {company, index} = props;
    const timeZone = 'Asia/Kolkata';

    const formatMeetingDate = (isoDate, timeZone) => {
        const parsedDate = parseISO(isoDate);
        const zonedDate = utcToZonedTime(parsedDate, timeZone);

        const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ss', {
            timeZone,
        });

        return formattedDate;
    };

    const createMarkup = () => {
        return {__html: company.description};
    };


    return (
        <Card sx={{maxWidth: 395}}
              style={{"box-shadow": "rgba(50, 50, 93, 0.25) 0px 4px 8px -2px, rgba(0, 0, 0, 0.3) 0px 2px 5px -2px"}}
        >
            <div className={"w-full flex justify-end items-center  h-12"}>
                <a
                    href={`${company.meetingLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className={"w-8 pr-8"}>
                        <FiExternalLink size={22}/>
                    </div>
                </a>
            </div>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 2,
                    }}
                >
                    <FaRegHandshake size={30}/>
                </Box>
                <Typography align="center" gutterBottom variant="h5">
                    {company.summary}
                </Typography>
                <div className={"w-full flex justify-center items-center align-middle"}>
                    <div className={"w-8 mt-4 mb-1"}>
                        <ExpandMore
                            style={{"background-color": "#4267cf"}}
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon fontSize="medium" style={{"color": "white"}}/>
                        </ExpandMore>
                    </div>
                </div>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography align="center" variant="body1">
                        <p dangerouslySetInnerHTML={createMarkup()}/>
                    </Typography>
                    <Typography align="center" variant="body1">
                        <h1 className={"text-2xl mt-3 font-bold"}>Location</h1>
                        <div className={"flex justify-center"}>
                            {company.location}
                        </div>
                    </Typography>
                    <div>
                        <div className={"w-full mt-3 justify-center flex"}>
                            <h1 className={"text-2xl font-bold"}>Attendees</h1>
                        </div>
                        <Typography align="center" variant="body1">
                            {company.attendees.map((itm) => (
                                <>
                                    <div className="flex mt-4 items-center gap-4">
                                        <Avatar style={{"background-color": "#4267cf"}}>
                                            <Typography variant="body1">{itm.email.charAt(0)}</Typography>
                                        </Avatar>
                                        <div>
                                            <Typography variant="h7">{itm.email}</Typography>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </Typography>
                    </div>
                </Collapse>
            </CardContent>
            <Divider/>
            <div className={"w-full flex justify-between mt-2 items-center mb-5 "}>
                <div className={"w-1/2"}>
                    <div className={"flex font-bold justify-center"}>
                        Start Time
                    </div>

                    <div className={"w-25 ml-10 md:ml-0 flex justify-center items-center mx-auto"}>
                        {formatMeetingDate(company.start, timeZone)}
                    </div>
                </div>
                <div className={"w-1/2"}>
                    <div className={"flex font-bold justify-center"}>
                        End Time
                    </div>
                    <div className={"flex justify-center ml-10 md:ml-0 items-center"}>
                        {formatMeetingDate(company.end, timeZone)}
                    </div>
                </div>
            </div>
        </Card>
    );
};

CompanyCard.propTypes = {
    company: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    totalCards: PropTypes.number.isRequired, // Total number of cards
};
