import { Button, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from "../Fragments/Footer";
import useAuth from '../../hooks/useAuth';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AuthlayoutProps } from '@/services/types';
import Link from 'next/link';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

const Authlayout: React.FC<AuthlayoutProps> = (props) => {
    const {children, navType, withFooter, varianHead, style, customHead="", mainLayout=false, customLogo="", userPhoto=true} = props
    const {logOut, status} = useAuth();
    const [user_photo, setPhotoUrl] = useState<string | null>(null);
    const handleLogout = () => {
      logOut();
    }
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedPhoto = localStorage.getItem("user_photo");
        setPhotoUrl(storedPhoto);
      }
    }, []);

    useEffect(() => {
      if (status) {
        window.location.href = "/login";
      }
    }, [status]);
    
    return (
        <>
        <Disclosure as="nav" className="bg-white-800">
        <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${varianHead}`}>
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              {navType != "auth" &&
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>}
            </div>
            <div className="flex flex-1 items-center sm:items-stretch">
              <div className="flex shrink-0 items-center">
                {customLogo != "" ? (
                  <div>
                    {customLogo}
                  </div>
                ) : (
                <div>
                <Link href="/">
                <Image
                  alt="Your Company"
                  src="/assets/logo.svg"
                  width={200}
                  height={32}
                />
                </Link>
                </div>
                )}
              </div>
            </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {(navType != "auth" && customHead == "")  ?
            (
              <Link
                  key="kategori"
                  href="/category"
                  aria-current={undefined}
                  className={classNames('hover:opacity-75',
                  'rounded-md px-3 py-2 text-sm font-medium hide-sm',
                  )}
              >
              Kategori
              </Link>
            ) : (
              <div className=''>
                {customHead}
              </div>
            )}
                {/* Profile dropdown */}
                {userPhoto && (
                <Menu as="div" className="relative ml-3 hidden sm:block">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {user_photo != null ? (
                      <Image
                        alt=""
                        src={user_photo}
                        width={10}
                        height={10}
                        className="size-8 rounded-full"
                      />
                      ) : (
                      <Image
                        alt=""
                        width={10}
                        height={10}
                        src="/assets/default-user.jpg"
                        className="size-8 rounded-full"
                      />
                      )}
                    </MenuButton>
                  </div>
                  <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <Button
                      onClick={() => {window.location.href = "/profile"}}
                      className="block px-4 py-2 w-full text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                    >
                      Profile
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => {window.location.href = "/classes"}}
                      className="block px-4 py-2 w-full text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                    >
                      Kelas Saya
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => {window.location.href = "/orders"}}
                      className="block px-4 py-2 w-full text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                    >
                      Pesanan Saya
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={handleLogout}
                      className="block px-4 py-2 w-full text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                    >
                      Sign out
                    </Button>
                  </MenuItem>
                </MenuItems>
                </Menu>
              )}
              </div>
          </div>
        </div>
  
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
          <DisclosureButton
                key="kategori"
                as="a"
                href="/category"
                aria-current={undefined}
                className={classNames('hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                Kategori
              </DisclosureButton>
              <DisclosureButton
                key="logout"
                as="a"
                href="/login"
                aria-current={undefined}
                className={classNames('hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                Sign Out
              </DisclosureButton>
              {user_photo != null ? (
                      <Image
                        alt=""
                        src={user_photo}
                        width={10}
                        height={10}
                        className="size-8 rounded-full mx-4"
                      />
                      ) : (
                      <Image
                        alt=""
                        width={10}
                        height={10}
                        src="/assets/default-user.jpg"
                        className="size-8 rounded-full mx-4"
                      />
                      )}
          </div>
        </DisclosurePanel>
      </Disclosure>
      {mainLayout == true ? (
        <div className="" style={style}>
        {children}
        </div>
      ) : (
        <div className="content" style={style}>
        {children}
        </div>
      )}
      {withFooter == true && <Footer />}
      </>
    )
}

export default Authlayout