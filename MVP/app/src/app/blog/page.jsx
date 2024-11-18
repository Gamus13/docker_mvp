import React, { useContext, useState, useEffect } from 'react';
import axios from '../../axios';
import SingleBlog from '../../components/Blog/SingleBlog';
import Breadcrumb from '../../components/Common/Breadcrumb';
import { ThemeContext } from '../../contexts/ThemeContext';

const Blog = () => {
  const { theme } = useContext(ThemeContext);
  const [blogs, setBlogs] = useState([]); // Initialiser à un tableau vide

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    // Faire une requête pour obtenir les articles de blog depuis l'API
    axios.get('/posts') // Assure-toi que cette URL est correcte
      .then(response => {
        // Si la réponse contient des données, on les stocke dans l'état
        if (response.data && Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          console.error('Format de données inattendu:', response.data);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des articles:', error);
      });
  }, []);

  return (
    <>
      <Breadcrumb
        pageName="Blog Grid"
        description="Welcome to the official Docxtalk blog! Here, we share ideas, tips, and resources to help you get the most out of our innovative solution that lets you talk with your PDF documents."
        className={isDarkMode ? "text-white bg-gray-900" : "text-black bg-gray-100"}
      />

      <section className={`pb-[120px] pt-[120px] ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogs.length > 0 ? ( // Vérifie que blogs n'est pas vide
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                >
                  <SingleBlog blog={blog} className={isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} />
                </div>
              ))
            ) : (
              <p className={isDarkMode ? "text-white" : "text-black"}>Aucun article de blog n'est disponible pour le moment.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
