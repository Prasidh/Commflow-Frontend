import React from 'react';
import {Layout as DashboardLayout} from "../layouts/dashboard/Layout";
import {
    Box,
    Container,
    Stack,
    Typography
} from "@mui/material";
import { Disclosure } from '@headlessui/react'
import {AiOutlinePlus} from "react-icons/ai";

const faqs = [
    {
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        question: "What's the best thing about Switzerland?",
        answer:
            "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    // More questions...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Faqs = () => {

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });
    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

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
                                    FAQ
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >
                                </Stack>
                            </Stack>
                        </Stack>
                        <div className="bg-gray-50">
                            <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
                                <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
                                    <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                                        {faqs.map((faq) => (
                                            <Disclosure as="div" key={faq.question} className="pt-6">
                                                {({open}) => (
                                                    <>
                                                        <dt className="text-lg">
                                                            <Disclosure.Button
                                                                className="text-left w-full flex justify-between items-start text-gray-400">
                                                                <span
                                                                    className="font-medium text-gray-900">{faq.question}</span>
                                                                <span className="ml-6 h-7 flex items-center">
                          <AiOutlinePlus
                              className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                              aria-hidden="true"
                          />
                        </span>
                                                            </Disclosure.Button>
                                                        </dt>
                                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                            <p className="text-base text-gray-500">{faq.answer}</p>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};
Faqs.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Faqs;