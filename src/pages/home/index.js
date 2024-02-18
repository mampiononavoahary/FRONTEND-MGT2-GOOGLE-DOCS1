import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEllipsisV,
  faFolder,
  faPlus,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import apiDocs from '../../api/documents/document';
import Cookies from "js-cookie";

const Accueil = () => {
  const router = useRouter();

  useEffect(() => {
    apiDocs.getAllDocs()
      .then((res) => {
          if (!Cookies.get('token') && !localStorage.getItem("User")) {
            alert('Need to authenticate');
            router.push("/login");
          }
        });
  });

  const handleSwitchApp = (appName) => {
    console.log(`Switch to ${appName}`);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    router.push("/login");
  };

  const NewDoc = () => {
    router.push("/doc");
  }
  
  return (
    <section className="container-fluid bg-white h-screen">
      <header className="sticky top-0 flex items-center justify-between px-4 shadow-md z-10 bg-white">
        <div className="flex items-center">
          <button className="h-20 w-20 border-0">
            <FontAwesomeIcon
              icon={faFileAlt}
              size="2x"
              style={{ color: "blue" }}
            />
          </button>
          <h1 className="flex justify-center mt-2 md:inline-flex hidden text-gray-700 text-2xl">
            Docs
          </h1>
        </div>

        <div className="mx-5 md:-20 flex items-center px-5 py-2 bg-gray-100 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search"
            className="flex-grow px-5 text-base bg-transparent outline-none w-96"
          />
        </div>

        <div className="flex items-center">
          <button
            className="ml-5 md:ml-5 h-20 w-20 border-0 text-blue-600"
            onClick={() => handleSwitchApp("GoogleForms")}
          >
            <FontAwesomeIcon icon={faEllipsisV} size="2x" />
          </button>

          <button
            className="h-12 w-22 md:h-17 md:w-17 ml-4 md:ml-5   border-blue-500 text-blue-500 border-2 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-500 hover:text-white"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </header>

      <section>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-20 mt-10">
            <div className=" mb-4" onClick={() => NewDoc()}>
              <div className="relative h-60 w-48 border-2 cursor-pointer hover:border-gray-700 flex items-center justify-center">
                <button>
                  <FontAwesomeIcon icon={faPlus} size="3x" color="gray" />
                </button>
              </div>
              <p className="flex justify-center mt-2 font-semibold text-sm text-gray-700">Vierge</p>
            </div>

            <div className="mb-4">
              <div className="relative h-60 w-48 border-2 cursor-pointer hover:border-gray-700 flex items-center justify-center"></div>
              <p className="flex justify-center mt-2 font-semibold text-sm text-gray-700">CV</p>
            </div>

            <div className="mb-4">
              <div className="relative h-60 w-48 border-2 cursor-pointer hover:border-gray-700 flex items-center justify-center"></div>
              <p className="flex justify-center mt-2 font-semibold text-sm text-gray-700">LETTRE</p>
            </div>

            <div className="mb-4">
              <div className="relative h-60 w-48 border-2 cursor-pointer hover:border-gray-700 flex items-center justify-center"></div>
              <p className="flex justify-center mt-2 font-semibold text-sm text-gray-700">PROPOSITION</p>
            </div>
          </div>
          <div className="flex justify-center gap-20 mt-5">
            <div className="mb-4">
              <div className="relative h-60 w-48 border-2 cursor-pointer hover:border-gray-700 flex items-center justify-center"></div>
              <p className="flex justify-center mt-2 font-semibold text-sm text-gray-700">
                BROCHURE
              </p>
            </div>
            <div className="mb-4">
              <div className="relative h-60 w-48 border-2 cursor-pointer hover:border-gray-700 flex items-center justify-center"></div>
              <p className="flex justify-center mt-2 font-semibold text-sm text-gray-700">
                BROCHURE
              </p>
            </div>
            <div className="mb-4">
              <div className="relative h-60 w-48 border-2 cursor-pointer hover:border-gray-700 flex items-center justify-center"></div>
              <p className="flex justify-center mt-2 font-semibold text-sm text-gray-700">
                BROCHURE
              </p>
            </div>
            <div className="mb-4">
              <div className="relative h-60 w-48 border-2 cursor-pointer hover:border-gray-700 flex items-center justify-center"></div>
              <p className="flex justify-center mt-2 font-semibold text-sm text-gray-700">
                BROCHURE
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 mt-24 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My documents</h2>
            <div className="flex items-center gap-2">
              <p className="">Date Created</p>
              <FontAwesomeIcon icon={faFolder} size="3x" color="gray" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Accueil;
