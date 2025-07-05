import React, { useState, useEffect } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from 'firebase/firestore';

// Firebase config (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyC5ts8XqlBqYFvLRJ-8RyYMPsyBTHd0PK0",
  authDomain: "kpl-2025-d10a5.firebaseapp.com",
  projectId: "kpl-2025-d10a5",
  storageBucket: "kpl-2025-d10a5.appspot.com",
  messagingSenderId: "82956843654",
  appId: "1:82956843654:web:c6c3decc8935bd0c472f07",
  // measurementId: "G-EMJQYXKXTB"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [registrations, setRegistrations] = useState([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Fetch data when admin logs in
  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchRegistrations();
    }
  }, [isAdminAuthenticated]);

  const fetchRegistrations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'registrations'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === '1234') {
      setIsAdminAuthenticated(true);
      setCurrentView('admin');
    } else {
      alert('ಅಮಾನ್ಯ ಪಾಸ್‌ವರ್ಡ್! (Invalid Password!)');
    }
  };

  const handleRegistration = async (formData) => {
    try {
      const data = { ...formData, registrationDate: new Date().toLocaleDateString() };
      await addDoc(collection(db, 'registrations'), data);
      alert('ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ! (Registration Successful!)');
      setCurrentView('home');
    } catch (err) {
      alert('ನೋಂದಣಿ ವಿಫಲವಾಗಿದೆ! (Registration Failed)');
      console.error(err);
    }
  };


// import React, { useState } from 'react';
// import './App.css';

// const App = () => {
//   const [currentView, setCurrentView] = useState('home');
//   const [registrations, setRegistrations] = useState([]);
//   const [adminPassword, setAdminPassword] = useState('');
//   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

//   const handleAdminLogin = () => {
//     if (adminPassword === '1234') {
//       setIsAdminAuthenticated(true);
//       setCurrentView('admin');
//     } else {
//       alert('ಅಮಾನ್ಯ ಪಾಸ್‌ವರ್ಡ್! (Invalid Password!)');
//     }
//   };

//   const handleRegistration = (formData) => {
//     setRegistrations([...registrations, { ...formData, id: Date.now() }]);
//     alert('ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ! (Registration Successful!)');
//     setCurrentView('home');
//   };

  const HomePage = () => (
    <div className="home-page">
      <div className="header">
        <div className="logo-section">
          <h1 className="main-title">ಗಮ್ಮತ್ತ್</h1>
          <p className="subtitle">ಕುಂದಾಪ್ರ ಕನ್ನಡ ಸಂಸ್ಕ್ರತಿ ಪ್ರತಿಷ್ಠಾನ ಬೈಂದೂರು
          ಪ್ರಸ್ತುತಿ</p>
        </div>
        <div className="date-info">
          <span className="date">3 ಆಗಸ್ಟ್ 2025  ಭಾನುವಾರ</span>
          <span className="day">ನೆಲ್ಯಾಡಿ ಬೈಲ್ ಹಾಗೂ ಜೆ ಎನ್ ಆರ್ ಸಭಾಂಗಣ NH 66 ಯಡ್ತರೆ ಬೈಂದೂರು</span>
        </div>
      </div>
      
      <div className="menu-container">
        <div className="menu-grid">
          <div className="menu-card" onClick={() => setCurrentView('menu')}>
            <h3>ಮುಖ್ಯ ಮೆನು</h3>
            <p>Main Menu</p>
          </div>
          <div className="menu-card" onClick={() => setCurrentView('registration')}>
            <h3>ಆಟದ ನೋಂದಣಿ</h3>
            <p>Game Registration</p>
          </div>
          <div className="menu-card" onClick={() => setCurrentView('kambala')}>
            <h3>ಕಂಬಳಕ್ಕೆ ನೋಂದಣಿ</h3>
            <p>Kmabala Registration</p>
          </div>
          <div className="menu-card" onClick={() => setCurrentView('admin-login')}>
            <h3>ಅಡ್ಮಿನ್ ವ್ಯೂ</h3>
            <p>Admin View</p>
          </div>
        </div>
      </div>
      
      <div className="footer-image">
        <div className="kids-running">
          <span>🏃‍♂️🏃‍♀️🏃‍♂️🏃‍♀️🏃‍♂️</span>
        </div>
        <p className="footer-text">ಭಾಷಾ ಪ್ರೀತಿಯಲ್ಲಿ ಮುಂಗಾರು ಮಳೆಯಲ್ಲಿ ನಮ್ಮೂರು ಕೆಸರು ಗದ್ದೆಯಲ್ಲಿ...   ಭಾಷಿ ಅಲ್ಲ, ಬದ್ಕ್!</p>
        <br />
        <p>© 2025 mpshetty. All rights reserved.        </p>
      </div>
    </div>
  );

  const MainMenu = () => (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => setCurrentView('home')}>← ಹಿಂದೆ</button>
        <h2>ಮುಖ್ಯ ಮೆನು</h2>
      </div>
      <div className="menu-list">
      <div className="menu-item">
          <h3>ಕಂಬಳ</h3>
        </div>
        <div className="menu-item">
          <h3>ಒಳಗಿನ ಆಟಗಳು (Indoor Games)</h3>
          <ul>
            <li>ಗುಡ್ನ (Gudna)</li>
            <li>ಚೆನ್ನಿಮಣಿ (Channemani)</li>
          </ul>
        </div>
        <div className="menu-item">
          <h3>ಹೊರಗಿನ ಆಟಗಳು (Outdoor Games)</h3>
          <ul>
            <li><strong>ತಂಡ:</strong> ವಾಲಿಬಾಲ್, ಕಬಡ್ಡಿ</li>
            <li><strong>ವೈಯಕ್ತಿಕ:</strong> ಗುಂಡೆಸೆತ</li>
          </ul>
        </div>
        <div className="menu-item">
          <h3>Games Rules</h3>
          <p>waiting for update</p>
        </div>
      </div>
    </div>
  );

  const GameRegistration = () => {
    const [gameType, setGameType] = useState('');
    const [specificGame, setSpecificGame] = useState('');
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      teamName: '',
      place: '',
    });

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
      const registrationData = {
        ...formData,
        gameType,
        specificGame,
        registrationDate: new Date().toLocaleDateString()
      };
      handleRegistration(registrationData);
    };

    return (
      <div className="page">
        <div className="page-header">
          <button className="back-btn" onClick={() => setCurrentView('home')}>← ಹಿಂದೆ</button>
          <h2>ಆಟದ ನೋಂದಣಿ</h2>
        </div>
        
        <div className="registration-form">
          <div className="game-type-selector">
            <label>ಆಟದ ಪ್ರಕಾರ ಆಯ್ಕೆ ಮಾಡಿ:</label>
            <select value={gameType} onChange={(e) => setGameType(e.target.value)}>
              <option value="">ಆಯ್ಕೆ ಮಾಡಿ</option>
              <option value="indoor">ಒಳಗಿನ ಆಟಗಳು</option>
              <option value="outdoor">ಹೊರಗಿನ ಆಟಗಳು</option>
            </select>
          </div>

          {gameType === 'indoor' && (
            <div className="specific-game-selector">
              <label>ಆಟ ಆಯ್ಕೆ ಮಾಡಿ:</label>
              <select value={specificGame} onChange={(e) => setSpecificGame(e.target.value)}>
                <option value="">ಆಯ್ಕೆ ಮಾಡಿ</option>
                <option value="gudna">ಗುಡ್ನ</option>
                <option value="channemani">ಚೆನ್ನಿಮಣಿ</option>
              </select>
            </div>
          )}

          {gameType === 'outdoor' && (
            <div className="specific-game-selector">
              <label>ಆಟ ಆಯ್ಕೆ ಮಾಡಿ:</label>
              <select value={specificGame} onChange={(e) => setSpecificGame(e.target.value)}>
                <option value="">ಆಯ್ಕೆ ಮಾಡಿ</option>
                <option value="volleyball">ವಾಲಿಬಾಲ್ (ತಂಡ)</option>
                <option value="kabaddi">ಕಬಡ್ಡಿ (ತಂಡ)</option>
                <option value="shorts">ಗುಂಡೆಸೆತ (ವೈಯಕ್ತಿಕ)</option>
              </select>
            </div>
          )}

          {specificGame && (
            <div className="registration-details">
              <div className="form-group">
                <label>ಹೆಸರು (Name):</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* <div className="form-group">
                <label>ವಯಸ್ಸು (Age):</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div> */}

              <div className="form-group">
                <label>ಫೋನ್ ಸಂಖ್ಯೆ (Phone):</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>ಸ್ಥಳ (Place):</label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                />
              </div>

              {(specificGame === 'volleyball' || specificGame === 'kabaddi') && (
                <>
                  <div className="form-group">
                    <label>ತಂಡದ ಹೆಸರು (Team Name):</label>
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* <div className="form-group">
                    <label>ತಂಡದ ಸದಸ್ಯರು (Team Members):</label>
                    <textarea
                      name="teamMembers"
                      value={formData.teamMembers}
                      onChange={handleInputChange}
                      placeholder="ಸದಸ್ಯರ ಹೆಸರುಗಳನ್ನು ಪ್ರತ್ಯೇಕ ಸಾಲಿನಲ್ಲಿ ಬರೆಯಿರಿ"
                      required
                    />
                  </div> */}
                </>
              )}

              <button onClick={handleSubmit} className="submit-btn">ನೋಂದಣಿ ಮಾಡಿ</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const AdminLogin = () => (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => setCurrentView('home')}>← ಹಿಂದೆ</button>
        <h2>ಅಡ್ಮಿನ್ ಲಾಗಿನ್</h2>
      </div>
      <div className="admin-login">
        <div className="form-group">
          <label>ಪಾಸ್‌ವರ್ಡ್ (Password):</label>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ"
          />
        </div>
        <button onClick={handleAdminLogin} className="submit-btn">ಲಾಗಿನ್</button>
      </div>
    </div>
  );
  const Kambala = () => (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => setCurrentView('home')}>← ಹಿಂದೆ</button>
        <h2>KAMBALA</h2>
      </div>
      <div className="admin-login">
        <div className="form-group">
          <label>Will update soon</label>
          
        </div>
        
      </div>
    </div>
  );

  // const AdminView = () => {
  //   const groupedRegistrations = registrations.reduce((acc, reg) => {
  //     const key = `${reg.gameType}-${reg.specificGame}`;
  //     if (!acc[key]) acc[key] = [];
  //     acc[key].push(reg);
  //     return acc;
  //   }, {});

  //   return (
  //     <div className="page">
  //       <div className="page-header">
  //         <button className="back-btn" onClick={() => {
  //           setCurrentView('home');
  //           setIsAdminAuthenticated(false);
  //           setAdminPassword('');
  //         }}>← ಹಿಂದೆ</button>
  //         <h2>ಅಡ್ಮಿನ್ ವ್ಯೂ - ನೋಂದಣಿಗಳು</h2>
  //       </div>
        
  //       <div className="admin-content">
  //         {Object.keys(groupedRegistrations).length === 0 ? (
  //           <p>ಇನ್ನೂ ಯಾವುದೇ ನೋಂದಣಿಗಳಿಲ್ಲ</p>
  //         ) : (
  //           Object.entries(groupedRegistrations).map(([gameKey, regs]) => (
  //             <div key={gameKey} className="game-section">
  //               <h3>{regs[0].specificGame} - {regs[0].gameType}</h3>
  //               <div className="registrations-list">
  //                 {regs.map((reg) => (
  //                   <div key={reg.id} className="registration-card">
  //                     <h4>{reg.name}</h4>
  //                     <p>ವಯಸ್ಸು: {reg.age}</p>
  //                     <p>ಫೋನ್: {reg.phone}</p>
  //                     {reg.place && <p>ಸ್ಥಳ: {reg.place}</p>}
  //                     {reg.teamName && <p>ತಂಡ: {reg.teamName}</p>}
  //                     {/* {reg.teamMembers && <p>ಸದಸ್ಯರು: {reg.teamMembers}</p>} */}
  //                     <p>ನೋಂದಣಿ ದಿನಾಂಕ: {reg.registrationDate}</p>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           ))
  //         )}
  //       </div>
  //     </div>
  //   );
  // };
  const AdminView = () => {
    const [selectedGame, setSelectedGame] = useState('');
  
    const gameOptions = Array.from(
      new Set(registrations.map(reg => `${reg.gameType} - ${reg.specificGame}`))
    );
  
    const filteredRegistrations = registrations.filter(
      reg => `${reg.gameType} - ${reg.specificGame}` === selectedGame
    );
  
    return (
      <div className="page">
        <div className="page-header">
          <button className="back-btn" onClick={() => {
            setCurrentView('home');
            setIsAdminAuthenticated(false);
            setAdminPassword('');
          }}>← ಹಿಂದೆ</button>
          <h2>ಅಡ್ಮಿನ್ ವ್ಯೂ - ನೋಂದಣಿಗಳು</h2>
        </div>
  
        <div className="admin-content">
          <div className="form-group">
            <label>ಆಟ ಆಯ್ಕೆಮಾಡಿ:</label>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
            >
              <option value="">ಆಟ ಆಯ್ಕೆಮಾಡಿ</option>
              {gameOptions.map((gameKey, idx) => (
                <option key={idx} value={gameKey}>{gameKey}</option>
              ))}
            </select>
          </div>
  
          {selectedGame && (
            <>
              <h3>{selectedGame} ಗೆ ನೋಂದಣಿಗಳು:</h3>
              {filteredRegistrations.length === 0 ? (
                <p>ಈ ಆಟಕ್ಕೆ ಯಾವುದೇ ನೋಂದಣಿಗಳು ಇಲ್ಲ.</p>
              ) : (
                <div className="registrations-list">
                  {filteredRegistrations.map((reg) => (
                    <div key={reg.id} className="registration-card">
                      <h4>{reg.name}</h4>
                      <p>ಫೋನ್: {reg.phone}</p>
                      {reg.place && <p>ಸ್ಥಳ: {reg.place}</p>}
                      {reg.teamName && <p>ತಂಡ: {reg.teamName}</p>}
                      <p>ನೋಂದಣಿ ದಿನಾಂಕ: {reg.registrationDate}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };
  

  return (
    <div className="app">
      {currentView === 'home' && <HomePage />}
      {currentView === 'menu' && <MainMenu />}
      {currentView === 'registration' && <GameRegistration />}
      {currentView === 'admin-login' && <AdminLogin />}
      {currentView === 'kambala' && <Kambala />}
      {currentView === 'admin' && isAdminAuthenticated && <AdminView />}
    </div>
  );
};

export default App;