import React, { useContext, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import axios from '../../axios';
import { useAuth } from '../../contexts/AuthContext';
import SignIn from '../../components/SignIn';

const SigninPage = () => {
  const { theme } = useContext(ThemeContext);
  const { setUser, csrfToken, role } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const isDarkMode = theme === 'dark';
  const [redirectPath, setRedirectPath] = React.useState(null);
  
  const validate = (email, password) => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return errors;
  };

  // login user
	const handleSubmit = async (e) => {
		e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

		const { email, password } = e.target.elements;
		const body = {
			email: email.value,
			password: password.value,
		};

    // Validation des champs
    const validationErrors = validate(email.value, password.value);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    } else {
      setErrors({ email: '', password: '' });
    }

    // Timeout for error message
    const timeoutId = setTimeout(() => {
      setErrorMessage('be patient you will be redirected to your dashboard at some point.');
      setIsLoading(false);
    }, 5000); 

    try {
      await csrfToken();
      const resp = await axios.post('/login', body);
      if (resp.status === 200) {
        clearTimeout(timeoutId);
        setUser(resp.data.user, resp.data.role);
        console.log('Role:', resp.data.role); // Ajoute ce log pour déboguer
        if (resp.data.role === 'admin') {
          setRedirectPath('/app/admin');
        } else {
          setRedirectPath('/app/profile');
        }
      }
    } catch (error) {
      // ...
    } finally {
      setIsLoading(false);
    }
		
	};

   // Form validation effect
   useEffect(() => {
    const { email, password } = errors;
    setFormValid(!email && !password);
  }, [errors]);

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <>
      <section className={`relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px] ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className={`shadow-three mx-auto max-w-[500px] rounded  px-6 py-10 sm:p-[60px] ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`mb-3 text-center text-2xl font-bold text-black sm:text-3xl ${isDarkMode ? 'text-white' : 'bg-white'}`}>
                  Sign in to your account
                </h3>
                
                <p className={`mb-11 text-center text-base font-medium text-body-color ${isDarkMode ? 'text-gray-500' : 'bg-white'}`}>
                  Login to your account for a faster checkout.
                </p>
                <button className={`border-stroke dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B]   ${isDarkMode ? 'hover:shadow-none text-white hover:text-white bg-gray-800 hover:border-sky-700 hover:bg-sky-700/20' : 'bg-white hover:border-sky-600 hover:text-sky-700'}`}>
                  <span className="mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_95:967)">
                        <path
                          d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_95:967">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <SignIn/>
                </button>

                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                  <p className={`w-full px-5 text-center text-base font-medium text-body-color ${isDarkMode ? 'text-gray-500' : ''}`}>
                    Or, sign in with your email
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                </div>
                <form
                  action="#"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className={`mb-3 block text-sm text-dark ${isDarkMode ? 'text-white' : ''} `}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your Email"
                      className={`border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 ${isDarkMode ? 'focus:shadow-none focus:border-[#2C303B] bg-[#3c3f49] border-transparent' : 'bg-white'}`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                    )}
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className={`mb-3 block text-sm text-dark ${isDarkMode ? 'text-white' : ''}`}
                    >
                      Your Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your Password"
                      className={`border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300   ${isDarkMode ? 'focus:shadow-none focus:border-[#2C303B] bg-[#3c3f49] border-transparent' : 'bg-white'}`}
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                    )}
                  </div>
                  <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <label
                        htmlFor="checkboxLabel"
                        className={`flex cursor-pointer select-none items-center text-sm font-medium text-body-color ${isDarkMode ? 'text-white' : 'bg-white'}`}
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="checkboxLabel"
                            className="sr-only"
                          />
                          <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                            <span className="opacity-0">
                              <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                  fill="#3056D3"
                                  stroke="#3056D3"
                                  strokeWidth="0.4"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        Keep me signed in
                      </label>
                    </div>
                    <div>
                      <a
                        href="#0"
                        className="text-sm font-medium text-sky-600 hover:underline"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <div className="mb-6">
                    <button 
                      type="submit" 
                      disabled={isLoading || Object.keys(errors).some(key => errors[key])} 
                      className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-sky-700 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? (
                        <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                      ) : (
                        'Sign in'
                      )}
                    </button>
                    {errorMessage && (
                      <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
                    )}
                  </div>
                </form>
                <p className={`text-center text-base font-medium text-body-color ${isDarkMode ? 'text-white' : 'bg-white'}`}>
                  Don’t you have an account?{" "}
                  <Link to="/app/auth/signin" className="text-sky-700 hover:underline">
                    Sign up
                  </Link>
                  
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
