// import React, { createContext, useState, useEffect } from 'react';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//     const [theme, setTheme] = useState('light');

//     // Charger le thème à partir du localStorage ou définir le thème par défaut
//     useEffect(() => {
//         const storedTheme = localStorage.getItem('theme') || 'light';
//         setTheme(storedTheme);
//         document.documentElement.className = storedTheme;
//     }, []);

//     // Fonction pour basculer entre light et dark
//     const toggleTheme = () => {
//         const newTheme = theme === 'light' ? 'dark' : 'light';
//         setTheme(newTheme);
//         localStorage.setItem('theme', newTheme);
//         document.documentElement.className = newTheme;
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };


import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    // Charger le thème à partir du localStorage ou définir le thème par défaut
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
        document.documentElement.className = storedTheme;
        document.body.className = storedTheme === 'dark' ? 'bg-gray-900' : '';
    }, []);

    // Fonction pour basculer entre light et dark
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.className = newTheme;
        document.body.className = newTheme === 'dark' ? 'bg-gray-900' : '';
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
