// import React from 'react';

// // Données de menu en tant que tableau d'objets JavaScript
// const menuData = [
//   {
//     id: 1,
//     title: "Home",
//     path: "/",
//     newTab: false,
//   },
//   {
//     id: 2,
//     title: "About",
//     path: "/about",
//     newTab: false,
//   },
//   {
//     id: 33,
//     title: "Blog",
//     path: "/blog",
//     newTab: false,
//   },
//   {
//     id: 3,
//     title: "Support",
//     path: "/contact",
//     newTab: false,
//   },
//   {
//     id: 4,
//     title: "Pages",
//     newTab: false,
//     submenu: [
//       {
//         id: 41,
//         title: "About Page",
//         path: "/about",
//         newTab: false,
//       },
//       {
//         id: 42,
//         title: "Contact Page",
//         path: "/contact",
//         newTab: false,
//       },
//       {
//         id: 43,
//         title: "Blog Grid Page",
//         path: "/blog",
//         newTab: false,
//       },
//       {
//         id: 44,
//         title: "Blog Sidebar Page",
//         path: "/blog-sidebar",
//         newTab: false,
//       },
//       {
//         id: 45,
//         title: "Blog Details Page",
//         path: "/blog-details",
//         newTab: false,
//       },
//       {
//         id: 46,
//         title: "Sign In Page",
//         path: "/signin",
//         newTab: false,
//       },
//       {
//         id: 47,
//         title: "Sign Up Page",
//         path: "/signup",
//         newTab: false,
//       },
//       {
//         id: 48,
//         title: "Error Page",
//         path: "/error",
//         newTab: false,
//       },
//     ],
//   },
// ];

// const Menu = () => {
//   return (
//     <nav>
//       <ul>
//         {menuData.map((menuItem) => (
//           <li key={menuItem.id}>
//             <a href={menuItem.path} target={menuItem.newTab ? "_blank" : "_self"} rel={menuItem.newTab ? "noopener noreferrer" : undefined}>
//               {menuItem.title}
//             </a>
//             {menuItem.submenu && (
//               <ul>
//                 {menuItem.submenu.map((submenuItem) => (
//                   <li key={submenuItem.id}>
//                     <a href={submenuItem.path} target={submenuItem.newTab ? "_blank" : "_self"} rel={submenuItem.newTab ? "noopener noreferrer" : undefined}>
//                       {submenuItem.title}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;


const menuData = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/app/",
    submenu: [
      {
        id: 55,
        title: "business",
        path: "/about",
        newTab: false,
      },
      {
        id: 55,
        title: "business",
        path: "/about",
        newTab: false,
      },
    ],
  },
  // {
  //   id: 5,
  //   title: "Home",
  //   title: "/home",
  //   newTab: false,
  //   // submenu: [
      
  //   //   // {
  //   //   //   id: 45,
  //   //   //   title: "business",
  //   //   //   path: "/business",
  //   //   //   newTab: false,
  //   //   // },
  //   //   // {
  //   //   //   id: 46,
  //   //   //   title: "particular",
  //   //   //   path: "/",
  //   //   //   newTab: false,
  //   //   // },
     
  //   // ],
  // },  
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 33,
    title: "Blog",
    path: "/blog",
    newTab: false,
  },
  {
    id: 3,
    title: "affiliation",
    path: "/contact",
    newTab: false,
  },
  {
    id: 4,
    title: "Libraries",
    path: "/library",
    newTab: false,
  },
  {
    id: 5,
    title: "Language",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "About Page",
        path: "/about",
        newTab: false,
      },
      {
        id: 42,
        title: "Contact Page",
        path: "/contact",
        newTab: false,
      },
      {
        id: 43,
        title: "Blog Grid Page",
        path: "/blog",
        newTab: false,
      },
      {
        id: 44,
        title: "Blog Sidebar Page",
        path: "/blog-sidebar",
        newTab: false,
      },
      {
        id: 45,
        title: "Blog Details Page",
        path: "/blog-details",
        newTab: false,
      },
      {
        id: 46,
        title: "Sign In Page",
        path: "/signin",
        newTab: false,
      },
      {
        id: 47,
        title: "Sign Up Page",
        path: "/signup",
        newTab: false,
      },
      {
        id: 48,
        title: "Error Page",
        path: "/error",
        newTab: false,
      },
    ],
  },
];

export default menuData;
