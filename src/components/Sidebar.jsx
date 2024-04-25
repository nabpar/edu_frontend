import React, { useState, useEffect } from 'react'
import Logo from "../assets/Edulogoo.png";
import { CgProfile } from "react-icons/cg";
import { GiOpenBook } from "react-icons/gi";
import { FaSortDown, FaSortUp,FaBlog  } from "react-icons/fa";
import { AiOutlineRightCircle,AiOutlineFileAdd } from 'react-icons/ai'
import { RiSettings4Line,RiMessage2Line, RiAdminFill  } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlinePassword } from "react-icons/md";
import { ImAddressBook } from "react-icons/im";
import { MdOutlineAddCard,MdOutlineFormatListNumbered,MdOutlinePlayLesson   } from "react-icons/md";
import { BsDatabaseGear } from "react-icons/bs";
import { FaChalkboardTeacher,FaUserGraduate  } from "react-icons/fa";
import { FcAdvertising } from "react-icons/fc";
import { MdWorkspaces,MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';



const LinkMenuItem = ({ menu, index, open }) => {
    return (

        <Link to={menu?.link} key={index} className={`flex mx-4 items-center text-sm gap-3.5 font medium p-2 hover:bg-gray-800 rounded-md`} >
            <div className='relative group'>
                {React.createElement(menu?.icon, { size: "20" })}

            </div>
            <h2 style={{
                transitionDelay: `${index + 3}00ms`,
            }}
                className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}
            </h2>
        </Link>
    )
}

const ToggleMenuItem = ({ menu, index, open }) => {

    const [submenuOpen, setSubmenuOpen] = useState(false);

    const toggleSubmenu = () => {
        setSubmenuOpen(prevVal => !prevVal)
    }

    useEffect(() => {
        !open && setSubmenuOpen(false)
        return () => {
        }
    }, [open])



    return (
        <>

            <div onClick={toggleSubmenu} key={index} className={`flex mx-4 hover:cursor-pointer items-center text-sm gap-3.5 font medium p-2 hover:bg-gray-800 rounded-md`} >
                <div className='relative group'>
                    {React.createElement(menu?.icon, { size: "20" })}

                </div>
                <h2 style={{
                    transitionDelay: `${index + 3}00ms`,
                }}
                    className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}
                </h2>
                <span style={{
                    transitionDelay: `${index + 3}00ms`,
                }}
                    className={`inline-flex justify-end w-full items-center duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{
                        submenuOpen ?
                            <FaSortUp /> :
                            <FaSortDown />
                    }
                </span>


            </div>
            {submenuOpen && open ?
                <div className='ml-5 border-l-2'>
                    {
                        menu.submenus.map(
                            (submenuItem, subindex) => (
                                <LinkMenuItem key={index + subindex} menu={submenuItem} index={index + subindex} open={open} />
                            )
                        )
                    }
                </div>
                :
                <></>
            }
        </>

    )
}
const Sidebar = ({ open, toggleSidebar }) => {
    const sidemenus = [
        { name: "Profile", link: "/profile", icon: CgProfile, has_submenus: false, allowedRoles: ['*'] },
        { name: "Course", link: "/course", icon: GiOpenBook, has_submenus: false, allowedRoles: ['*'] },
        { name: "Exam", link: "/exam", icon: BsPencilSquare, margin: true, has_submenus: false, allowedRoles: ['STUDENT'] },
        {
            name: "Manage", icon: BsDatabaseGear, has_submenus: true, allowedRoles: ['*'],
            submenus: [
                { name: "Add Courses", link: "/addcourse", icon: ImAddressBook, has_submenus: false, allowedRoles: ['ADMIN'] },
                { name: "Add Subject", link: "/addsubject", icon: MdOutlineAddCard, has_submenus: false, allowedRoles: ['ADMIN'] },
                { name: "Add Topic", link: "/addtopic", icon: MdOutlinePlayLesson, has_submenus: false, allowedRoles: ['ADMIN','TEACHER'] },
                { name: "Assigned Topic", link: "/assigned-topics", icon: MdOutlinePlayLesson, has_submenus: false, allowedRoles: ['TEACHER'] },
                { name: "Review Content", link: "/review-content", icon: MdOutlinePlayLesson, has_submenus: false, allowedRoles: ['ADMIN'] },
                { name: "Add Files", link: "/addfiles", icon: AiOutlineFileAdd, has_submenus: false, allowedRoles: ['ADMIN'] },
                { name: "Add Syllabus", link: "/addsyllabus", icon: MdOutlineFormatListNumbered, allowedRoles: ['ADMIN'] },
                { name: "Add Blogs", link: "/addblogsdata", icon: FaBlog, allowedRoles: ['ADMIN','TEACHER'] },
            ]
        },
        {
            name: "Settings",
            link: "/settings",
            icon: RiSettings4Line,
            has_submenus: true,
            allowedRoles:['*'],
            submenus: [
                { name: "Change password", link: "/changepass", icon: MdOutlinePassword, allowedRoles: ['*'] },
            ]
        },
        {
            name: "Advertisment",
            link: "/advertisment",
            icon: FcAdvertising,
            has_submenus: true,
            submenus: [
                { name: "Area", link: "/area", icon: MdWorkspaces, allowedRoles: ['ADMIN'] },
            ]
        },
        { name: "Messages", link: "/messages", icon: RiMessage2Line, allowedRoles: ['ADMIN'] },
        { name: "Notifications", link: "/notifications", icon: MdNotifications , allowedRoles: ['*'] },
    ];
    
    const {user}=useAuth()
    const roleIcons={
        STUDENT:<FaUserGraduate />,
        TEACHER:<FaChalkboardTeacher/>,
        ADMIN:<RiAdminFill/>
    }
    const [filteredSidemenus, setFilteredSidemenus] = useState(sidemenus);
    

    useEffect(() => {
        // Filter sidemenus based on user's role
        const filteredMenu = [];
for (const menu of sidemenus) {
    // Check if menu has allowedRoles defined and user's role is included
    if (menu.allowedRoles && (menu.allowedRoles.includes(user?.role) || menu.allowedRoles.includes('*'))) {
        const filteredSubmenus = [];
        // If menu has submenus, filter them based on allowedRoles
        if (menu.has_submenus) {
            for (const submenu of menu.submenus) {
                // If submenu has allowedRoles defined
                if (submenu.allowedRoles) {
                    // Check if user's role is included or if wildcard is present
                    if (submenu.allowedRoles.includes(user?.role) || submenu.allowedRoles.includes('*')) {
                        filteredSubmenus.push(submenu);
                    }
                } else {
                    // If allowedRoles not defined, consider submenu accessible to all roles
                    filteredSubmenus.push(submenu);
                }
            }
            // Check if any submenus are accessible
            if (filteredSubmenus.length > 0) {
                // Update submenu array for the menu item
                const filteredMenuObj = { ...menu, submenus: filteredSubmenus };
                filteredMenu.push(filteredMenuObj);
            }
        } else {
            // If menu has no submenus, add it to the filtered list
            filteredMenu.push(menu);
        }
    }
}
                                
        console.log('Final Menu:',filteredMenu)
        setFilteredSidemenus(filteredMenu);
        // console.log(filteredMenu)
        // console.log(filteredSidemenus)
    }, []);

    return (
        <>
            <div className={`bg-gray-700 h-screen md:h-full ${open ? 'w-64 z-10 absolute top-0 left-0 md:relative md:z-0' : ' fixed top-0 left-0 md:w-16 md:relative w-0'} duration-500 text-gray-100`}>
                {
                    open ?
                        <h2 className='font-semibold text-white text-2xl p-3 ml-5 overflow-x-hidden'>
                            {user?.role}
                        </h2>
                        :
                        <div className='flex justify-center items-center'>
                        <h2 className='font-semibold text-2xl text-center text-white p-3 ml-0 overflow-x-hidden'>
                            {roleIcons[user?.role]}
                        </h2>
                        </div>


                }
                <div className='h-14 overflow-x-hidden md:hidden'>
                    <div className="w-32 h-full object-cover">
                        <img src={Logo} className="scale-75" />
                    </div>

                </div>
                <span onClick={toggleSidebar} className='invisible md:visible absolute -right-2.5 top-2.5 bg-gray-700 rounded-full cursor-pointer md:block'>
                    <AiOutlineRightCircle className={`w-6 h-6 ${open && 'rotate-180'}`} />
                </span>
                <div className='mt-4 md:mt-10 flex flex-col gap-4 relative overflow-x-hidden'>

                    {
                        filteredSidemenus.map((menuitem, index) => (

                            menuitem.has_submenus ?
                                <ToggleMenuItem key={index} menu={menuitem} index={index} open={open} /> :
                                <LinkMenuItem key={index} menu={menuitem} index={index} open={open} />
                        )
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Sidebar
