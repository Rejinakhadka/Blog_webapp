import React, { useState } from "react";
import { BsMedium } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import Modal from "../../../utils/Modal";
import { Blog } from "../../../Context/Context";
import Loading from "../../Loading/Loading";
import "./styles.css";

const HomeHeader = () => {
  const { userLoading ,setPublish} = Blog();


  const [searchModal, setSearchModal] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header className="border-b border-gray-200">
        {userLoading && <Loading />}
        <div className="size h-[60px] flex items-center justify-between w-[95%] md:w-[95%] mx-auto">
          <div className="flex items-center gap-3">
            <Link to={"/"}>
              <span className="text-3xl">Medium</span>
            </Link>
            <Search modal={searchModal} setModal={setSearchModal} />
          </div>

          <div className="flex items-center gap-3 sm:gap-7">
            <span
              onClick={() => setSearchModal(true)}
              className="flex sm:hidden text-3xl text-gray-300 cursor-pointer">
              <CiSearch />
            </span>
            {pathname === "/write" ? (
              <button
                onClick={() => setPublish(true)}
                className="btn !bg-green-700 !py-1 !text-white !rounded-full">
                Publish
              </button>
            ) : (
              <Link
                to="/write"
                className="hidden md:flex items-center gap-1 text-gray-500">
                <span className="text-3xl">
                  <LiaEditSolid />
                </span>
                <span className="text-sm mt-2">Write</span>
              </Link>
            )}
            <span className="text-3xl text-gray-500 cursor-pointer">
              <IoMdNotificationsOutline />
            </span>
          </div>
        </div>
      </header>

      <section className="gradient-banner">
        <h1 className="font-medium">Be a Part of Medium</h1>
      </section>
    </>
  );
};

export default HomeHeader;
