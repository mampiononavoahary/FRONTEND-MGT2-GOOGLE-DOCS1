import React, { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars , faFolder, faShare} from '@fortawesome/free-solid-svg-icons';
import DocEditor from "../../components/docs/DocEditor.tsx";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Doc() {
  const [fichierOptionsVisible, setFichierOptionsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('token') && !localStorage.getItem("User")) {
      alert('Need to authenticate');
      router.push("/login");
    }
  }, [router]);

  const toggleFichierOptions = () => {
    setFichierOptionsVisible(!fichierOptionsVisible);
  };  

  const goBack = () => {
    router.push("/home");
  }

  return (
    <div className='container-fluid bg-white'>
      <header className='flex justify-between items-center p-3 pb-1 bg-white'>
        <span className='cursor-pointer' onClick={() => goBack()}>
          <FontAwesomeIcon icon={faFolder} size="2x" style={{ color: 'blue' }} />
        </span> 
        <div className='flex-grow px-2'>
          <h2 className="ml-4 text-2xl font-semibold text-gray-600">Document sans titre</h2>
          <div className='flex items-center text-sm space-x-3  h-8 text-gray-600 ml-3'>
            <p className='option cursor-pointer hover:bg-gray-100
            transition  duration-200 case-out p-2 rounded-lg ' onClick={toggleFichierOptions}>Fichier</p>
            {/* Autres options */}
          </div>
          {fichierOptionsVisible && (
            <div className='flex items-center text-sm space-x-3 h-8 text-gray-600 ml-3'>
              <button className='option cursor-pointer hover:bg-gray-100
                transition  duration-200 case-out p-2 rounded-lg'>
                Nouveau
              </button>
              <button className='option cursor-pointer hover:bg-gray-100
                transition  duration-200 case-out p-2 rounded-lg'>
                Télécharger
              </button>
            </div>
          )}
        </div> 
        <button className="bg-blue-500 hidden md:inline-flex h-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <FontAwesomeIcon icon={faShare} className="mr-2" />
          Partager
        </button>
        {/* Avatar */}
      </header>
      <DocEditor />
    </div>
  );
}
