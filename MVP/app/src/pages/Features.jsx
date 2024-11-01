
import React from 'react';
import URLInput from './URLInput';
import FileUpload from './FileUpload';
import LongTextInput from './LongTextInput';
import PdfUpdateModal from '../components/PdfUpdateModal';
import LoadPdfButton from '../components/LoadPdfButton';
// import GoogleLoginButton from './GoogleLoginButton';

function Features() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        {/* <h1 className='text-sm font-medium text-sky-400  mb-8'><strong>Generate your document</strong></h1> */}
        <h1 className="text-2xl text-center font-bold text-sky-400 mb-8">
          <strong>Generate your document</strong>
        </h1>

        <LongTextInput className="w-full mb-4" />
        <URLInput className="w-full mb-4" />
        <FileUpload className="w-full mb-4" />
        <PdfUpdateModal/>
        {/* <LoadPdfButton/> */}
        {/* <GoogleLoginButton className="w-full mb-4" /> */}
      </div>
    </>
    
  );
}

export default Features;
