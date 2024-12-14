import React, { useContext } from "react";
import NavLink from "./NavLink";
import DescriptionTitle from "./Common/descriptionTitle";
import Section from "./Section";
import { ThemeContext } from '../contexts/ThemeContext';

function Details() {
    const { theme } = useContext(ThemeContext);
  return (
    <>
      <DescriptionTitle description="Features" center  className="mt-10"/>
      <>
        <div className="grid grid-rows-3 grid-flow-col gap-4 mt-20">
          {/* Première section */}
          <div
            id="details"
            className="lg:max-h-[500px] flex flex-col sm:flex-row sm:overflow-hidden justify-center max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 p-12 rounded-2xl text-white"
          >
            <iframe
              className="w-full lg:w-[500px] h-[400px] sm:w-[500px] border rounded-2xl sm:mb-0"
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F3JNmDeIdKdLb2SUu7jwZkQ%2FDesignFast-%255BFigma-Library%255D%3Ftype%3Ddesign%26node-id%3D19%253A1905%26mode%3Ddesign%26t%3DYA658wRrzPSf0jVB-1"
              allowFullScreen
            ></iframe>
            <p className="text-black ml-4 mt-5">
              <span className={` text-3xl font-extrabold sm:text-4xl flex mb-10 ${theme === "dark" ? "text-white" : "text-black"}`}>
                🤖 Document generator
              </span>
              <ul className="text-gray-500">
                <li className={`p-2 ${theme === "dark" ? "text-white" : "text-black"}`}>No form just copy paste and upload your information.</li>
                <li className={`p-2 ${theme === "dark" ? "text-gray-500" : "text-black"}`}>
                    <span className='text-sky-500'>●</span> choose the type of document to generate
                </li>
                <li className={`p-2 ${theme === "dark" ? "text-gray-500" : "text-black"}`}><span className='text-sky-500'>●</span> paste the link to the document recipient's website</li>
                <li className={`p-2 ${theme === "dark" ? "text-gray-500" : "text-black"}`}><span className='text-sky-500'>●</span> download your cv or linkedin profile in pdf format</li>
                <li className={`p-2 ${theme === "dark" ? "text-gray-500" : "text-black"}`}><span className='text-sky-500'>●</span> view, edit or choose from several different template types and translate your document into more than 20 languages</li>
              </ul>
            </p>
          </div>

          {/* Deuxième section */}
          <div
            id="details"
            className="lg:max-h-[500px] flex flex-col sm:flex-row sm:overflow-hidden justify-center max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 p-12 rounded-2xl text-white mt-1"
          >
            <p className="text-black mr-5 mt-5">
              <span className={`text-3xl font-extrabold sm:text-4xl flex mb-10 ${theme === "dark" ? "text-white" : "text-black"}`}>
                🎨 Personalization and electronic signature
              </span>
              <ul className="text-gray-500">
                <li className={`p-2 ${theme === "dark" ? "text-white" : "text-black"}`}>modify the generated document as you wish or download it</li>
                <li className={`p-2 ${theme === "dark" ? "text-gray-500" : "text-black"}`}><span className='text-sky-500'>●</span> change the characters, fonts or colors of the text</li>
                <li className={`p-2 ${theme === "dark" ? "text-gray-500" : "text-black"}`}><span className='text-sky-500'>●</span> add titles, paragraph, or delete existing text to replace it</li>
                <li className={`p-2 ${theme === "dark" ? "text-gray-500" : "text-black"}`}><span className='text-sky-500'>●</span> add electronic signatures to your documents or forms and various diagrams</li>
                <li className={`p-2 ${theme === "dark" ? "text-gray-500" : "text-black"}`}><span className='text-sky-500'>●</span> insert images or logos into your document or geometric shapes</li>
              </ul>
            </p>
            <iframe
              className="w-full lg:w-[500px] h-[400px] sm:w-[500px] border rounded-2xl sm:mb-0"
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F3JNmDeIdKdLb2SUu7jwZkQ%2FDesignFast-%255BFigma-Library%255D%3Ftype%3Ddesign%26node-id%3D12%253A225%26mode%3Ddesign%26t%3DhGvWVOeM3wUYSp65-1"
              allowFullScreen
            ></iframe>
          </div>

          {/* Troisième section */}
          <div
            id="details"
            className="lg:max-h-[500px] flex flex-col sm:flex-row sm:overflow-hidden justify-center max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 p-12 rounded-2xl text-white"
          >
            <iframe
              className="w-full lg:w-[500px] h-[400px] sm:w-[500px] border rounded-2xl sm:mb-0"
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F3JNmDeIdKdLb2SUu7jwZkQ%2FDesignFast-%255BFigma-Library%255D%3Ftype%3Ddesign%26node-id%3D22%253A1079%26mode%3Ddesign%26t%3DhGvWVOeM3wUYSp65-1"
              allowFullScreen
            ></iframe>
            <p className="text-black ml-4 mt-5">
              <span className={`text-3xl font-extrabold sm:text-4xl flex mb-10 ${theme === "dark" ? "text-white" : "text-black"}`}>
                📧 Web Apps
              </span>
              <ul className="text-gray-500">
                <li className={`p-2 ${theme === "dark" ? "text-white" : "text-black"}`}>the generated and personalized document remains only to send it to your recipient directly on the platform</li>
                <li className={`p-2 ${theme === "dark" ? "text-gray-500" : "text-black"}`}><span className='text-sky-500'>●</span> send your document by email with a personalized message</li>
                <li className={`p-2 ${theme === "dark" ? "text-gray-500" : "text-black"}`}><span className='text-sky-500'>●</span> track the opening of the email, to ensure that your recipient has opened the document</li>
                <li className={`p-2 ${theme === "dark" ? "text-gray-500" : "text-black"}`}><span className='text-sky-500'>●</span> Simplified interfaces</li>
                <li className={`p-2 ${theme === "dark" ? "text-gray-500" : "text-black"}`}><span className='text-sky-500'>●</span> schedule the sending of your documents at your convenience</li>
              </ul>
            </p>
          </div>
        </div>
      </>
    </>
  );
}

export default Details;
