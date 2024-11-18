import AboutSectionOne from "../../components/About/AboutSectionOne";
import AboutSectionTwo from "../../components/About/AboutSectionTwo";
import Breadcrumb from '../../components/Common/Breadcrumb';  

// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "About Page | Free Next.js Template for Startup and SaaS",
//   description: "This is About Page for Startup Nextjs Template",
//   // other metadata
// };

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="Docxtalk is an innovative solution that revolutionizes the way you interact with your PDF documents. More than just a PDF reader, our application allows you to ask questions directly to your documents and get clear and precise answers in real time, whether by text or audio."
      />
      <AboutSectionTwo />
      <AboutSectionOne />
    </>
  );
};

export default AboutPage;
