import { useState } from 'react';
import '../CSS/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Profile from './Profile.jsx';
import LoginComp from './LoginComp.jsx';
import RegisterComp from './RegisterComp.jsx';
import HeaderLanding from './HeaderLanding.jsx'; 
// function App() {
//     const [currentForm, setCurrentForm] = useState('login');
//     const toggleForm = () => {
//       setCurrentForm((prevForm) => (prevForm === 'login' ? 'register' : 'login'));
//     };
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     // const toggleLoggedInState = () => {
//     //   setIsLoggedIn((prevState) => (prevState === 'loggedout' ? 'loggedin' : 'loggedout'));
//     // };
//      const handleLogin = () => {
//         setIsLoggedIn(true);
//     };

//     const handleLogout = () => {
//         setIsLoggedIn(false);
//     };
//     return(
      
//       <div className='App'>
//         {/* {isLoggedIn ? (
//             <Header_Landing onLogOut={handleLogout} />
//           ) : (
//             <Header onLogIn={handleLogin} />
//           )
//         } */}
//         {/* <HeaderLanding/> */}
//         {/* <Header/> */}
//         <Router>
//           <Routes>
//             <Route path = "/" element = {<Home/>}/>
//             <Route path="/login"   
//               element={
//                 currentForm === 'login' ? (
//                   // <LoginComp onFormSwitch={toggleForm} onLoginSuccess={toggle_loggedinstate}/>
//                   // <LoginComp onFormSwitch={toggleForm} onLoginSuccess={handleLogin}/>
//                   <LoginComp onFormSwitch={toggleForm}/>
//                 ) : 
//                 (
//                   <RegisterComp onFormSwitch={toggleForm} />
//                 )
//               }
//               />
//             <Route path="/profile" element={<Profile />} />
//           </Routes>
//         </Router>
//         <Footer/>
//         </div>
//     );
// }

// export default App


function App() {
    const [currentForm, setCurrentForm] = useState('login');
    const [isLoggedIn, setIsLoggedIn] = useState('loggedout');

    const toggleForm = () => {
        setCurrentForm(prevForm => (prevForm === 'login' ? 'register' : 'login'));
    };

    const toggleLoggedInState = () => {
        setIsLoggedIn(prevState => (prevState === 'loggedout' ? 'loggedin' : 'loggedout'));
    };

    return (
        <Router>
            <div className='App'>
                {isLoggedIn === 'loggedout' ? (
                    <Header onLogIn={toggleLoggedInState} />
                ) : (
                    <HeaderLanding onLogOut={toggleLoggedInState} />
                )}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={
                            currentForm === 'login' ? (
                                <LoginComp onFormSwitch={toggleForm} />
                            ) : (
                                <RegisterComp onFormSwitch={toggleForm} />
                            )
                        }
                    />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
