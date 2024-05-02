'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";

const templateManagement = () => {

  const [templateList, setTemplateList] = useState([]);

  const fetchTemplates = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/template/getall`)
      .then((response) => {
        return response.json()
      })
      .then(data => {
        console.log(data);
        setTemplateList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchTemplates();
  }, [])

  const deleteTemplate = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/template/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Template deleted successfully');
          fetchTemplates();
        } else {
          toast.error('Failed to delete template');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to delete template');
      });
  }

  const displayTemplates = () => {
    if (templateList.length === 0) {
      return <h2>No templates found</h2>
    } else {
      return templateList.map((template) => {
        <li className="py-3 sm:py-4">
          <div className="grid grid-cols-5 gap-4 items-center ">
            <div className="flex-shrink-0">
              <img
                className="w-36 h-24 rounded-md border-white border-2"
                src={`${process.env.NEXT_PUBLIC_API_URL}/${template.image}`}
                alt={template.title}
              />
            </div>

            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm font-medium text-gray-900  dark:text-white">
                {template.title}
              </p>

            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-sm  text-gray-900  dark:text-white">
                {template.category}
              </p>
            </div>
            <div className=" min-w-0 ms-4">
              <p className="text-sm  text-gray-900  dark:text-white">
                {template.framework}
              </p>
            </div>

            <div className="min-w-0 ms-4">
              <p className="text-sm  text-gray-900  dark:text-white">
                <IconTrash size={24} color="red" className="cursor-pointer" onClick={() => deleteTemplate(template._id)} />
              </p>
            </div>
          </div>
        </li>
      })
    }
  }

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-blue-400 " style={{background:"#00246B"}}>
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-blue-500 rounded-lg sm:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <a href="#" className="flex ms-2 md:me-24">
                <img src="/ReactUIHub_Logo.png" className="h-14 me-3" alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  ReactUIHub
                </span>
              </a>
            </div>

            <div className="w-full">
              <form className="max-w-md mx-auto ">
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-blue-500 dark:text-blue-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-2 ps-8 text-sm text-blue-100 border border-blue-300 rounded-lg bg-blue-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-900 dark:border-blue-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Templates..."
                    required=""
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-blue-800 rounded-full focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-blue-100 rounded shadow dark:bg-blue-700 dark:divide-blue-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-blue-900 dark:text-white"
                      role="none"
                    >
                      User Name
                    </p>
                    <p
                      className="text-sm font-medium text-blue-900 truncate dark:text-blue-300"
                      role="none"
                    >
                      usermainid@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-blue-100 border-r border-blue-400 sm:translate-x-0" 
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto  " style={{background:"#00246B"}}>
          <ul className="space-y-2 font-medium ">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
              >
                <svg
                  className="w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>

                <Link href="/admin/dashboard">
                  <span className="ms-3 ">Dashboard</span>

                </Link>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Templates Management
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Analytics
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-blue-500 transition duration-75 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Setting</span>
              </a>
            </li>

          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64 " style={{background:"#CADCFC"}}>
        <div className="p-4  mt-14 ">
          <div className="p-4 text-2xl font-semibold  " style={{color:"#00246B"}}>
            <div>
              <h1>Template Management</h1>
            </div>
          </div>

          {/* <div className="flex items-center justify-center h-48 mb-4 rounded bg-blue-50 dark:bg-blue-800">
            <div className="w-full mx-5 my-10">
              <div className="p-10 flex border-2 " >
                n,njk
                <div className="flex">
                  <h1> kjkl

                  </h1>
                  <img src="/upload.png" alt="" className="w-24 h-24"/>
                </div>
              </div>
            </div>
          </div> */}

          <div className="w-full p-4 bg-blu border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700" style={{background:"#00246B"}}>
            <div className="flex items-center justify-start gap-4 mb-4">
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                React Native
              </a>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Next.js
              </a>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Gatsby
              </a>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Remix
              </a>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Vite
              </a>
            </div>
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <div className="grid grid-cols-5 gap-4 ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900  dark:text-white">
                        Preview
                      </p>
                    </div>

                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900  dark:text-white">
                        Edit
                      </p>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900  dark:text-white">
                        Visibility
                      </p>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900  dark:text-white">
                        Analytics
                      </p>
                    </div>

                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900  dark:text-white">
                        Delete
                      </p>
                    </div>
                  </div>
                </li>
                {
                  displayTemplates()
                }
              </ul>
            </div>
          </div>
          
          {/* dsvds */}
        </div>
      </div>
    </>
  );
};

export default templateManagement;