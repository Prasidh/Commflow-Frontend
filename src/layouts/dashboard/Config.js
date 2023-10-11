import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import {MdOutlineForwardToInbox, MdOutlinePaid} from "react-icons/md";
import {GrGroup} from "react-icons/gr";
import {TbUsersGroup} from "react-icons/tb";
import {AiOutlineQuestionCircle} from "react-icons/ai";

export const items = [
  // {
  //   title: 'Inbox',
  //   path: '/',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ChartBarIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: 'Dashboard',
    path: '/',
    icon: (
      <SvgIcon fontSize="medium">
          <MdOutlineForwardToInbox/>
      </SvgIcon>
    )
  },
  {
    title: 'Meetings',
    path: '/meetings',
    icon: (
      <SvgIcon fontSize="medium">
        <TbUsersGroup color="white" className={"bg-white text-white"}/>
      </SvgIcon>
    )
  },
    {
        title: 'Subscriptions',
        path: '/pricing',
        icon: (
            <SvgIcon fontSize="medium">
                <MdOutlinePaid />
            </SvgIcon>
        )
    },
  {
    title: 'Profile',
    path: '/account',
    icon: (
      <SvgIcon fontSize="medium">
        <UserIcon />
      </SvgIcon>
    )
  },
    {
        title: 'FAQ',
        path: '/faqs',
        icon: (
            <SvgIcon fontSize="medium">
                <AiOutlineQuestionCircle/>
            </SvgIcon>
        )
    },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="medium">
        <CogIcon />
      </SvgIcon>
    )
  }

  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];
