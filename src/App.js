import React, { useState, useEffect } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
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

  const [gameTypes, setGameTypes] = useState([]);

  useEffect(() => {
    const fetchGameTypes = async () => {
      try {
        const snapshot = await getDocs(collection(db, "gameTypes"));
        const data = snapshot.docs.map(doc => doc.data());
        setGameTypes(data);
      } catch (error) {
        console.error("Error fetching game types:", error);
      }
    };

    fetchGameTypes();
  }, []);

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
    if (adminPassword === '9080') {
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


  const HomePage = () => (
    <div className="home-page">
      <div className="header">
        <div className="logo-section">
          <h1 className="main-title">ಗಮ್ಮತ್ತ್</h1>
          {/* <button onClick={() => createGentsGamesDocument()}>Create Ladies Games</button> */}
          <p className="subtitle">ಕುಂದಾಪ್ರ ಕನ್ನಡ ಸಂಸ್ಕ್ರತಿ ಪ್ರತಿಷ್ಠಾನ ಬೈಂದೂರು
          ಪ್ರಸ್ತುತಿ</p>
          <br/>
          
        </div>
        <div className="date-info">
          <span className="date">3 ಆಗಸ್ಟ್ 2025  ಭಾನುವಾರ</span>
          <span className="day">ನೆಲ್ಯಾಡಿ ಬೈಲ್ ಹಾಗೂ ಜೆ ಎನ್ ಆರ್ ಸಭಾಂಗಣ NH 66 ಯಡ್ತರೆ ಬೈಂದೂರು</span>
          <span className="day">ಮಾಹಿತಿಗಾಗಿ: 9986099687, 9481518382, 9900351095 </span>
        </div>
      </div>
      
      <div className="menu-container">
        <div className="menu-grid">
         <div className="menu-card" onClick={() => setCurrentView('registration')}>
            <h3>ಸಾಂಸ್ಕ್ರತಿಕ & ಆಟೋಟ ಸ್ಫರ್ಧೆಗಳಿಗೆ ನೋಂದಣಿ</h3>
            <p>Registration for events</p>
          </div>
          <div className="menu-card" onClick={() => setCurrentView('kambala')}>
            <h3>ಕಂಬಳಕ್ಕೆ ನೋಂದಣಿ</h3>
            <p>Kmabala Registration</p>
          </div>
          
          <div className="menu-card" onClick={() => setCurrentView('menu')}>
            <h3>ಆಟದ ಬಗ್ಗೆ ಮಾಹಿತಿ</h3>
            <p>Games Information</p>
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
        <h2>ಆಟದ ಬಗ್ಗೆ ಮಾಹಿತಿ</h2>
      </div>
  
      <div className="menu-list">
        <div className="menu-item">
          <h3>ನಿಮ್ಗಾಯ್ ನಮ್ ನಮ್ನಿ ಸ್ಪರ್ಧೆಗಳು:</h3>
  
          <h4>ಮಹಿಳೆಯರಿಗೆ:</h4>
          <ul>
            <li>ಹಗ್ಗಜಗ್ಗಾಟ</li>
            <li>ಥ್ರೋ ಬಾಲ್</li>
            <li>ಕೆಸರ್ ಗ್ಯದ್ದಿ ಓಟ</li>
            <li>ಮಡ್ಲ್ ನೇಯುದ್</li>
            <li>ಅಡಿಕೆ ಹಾಳ್ಯಂಗ್ ಎಳುದ್</li>
            <li>ತೆಂಗಿನ ಚ್ವಾಂಗಿ ಮಾದರಿ ತಯಾರ್ಸುದ್</li>
            <li>ಕೊಟ್ಟಿ ಸೆಡುದ್</li>
            <li>ಹೂಮಾಲಿ ಕಟ್ಟುದ್</li>
            <li>ಗುಡ್ನ ಆಟ</li>
            <li>ಚನ್ನೆಮಣಿ ಆಟ</li>
            <li>ಸಾಂಪ್ರದಾಯಿಕ ಗೀತೆ ಗಾಯನ</li>
            <li>ರಸಪ್ರಶ್ನೆ</li>
          </ul>
  
          <h4>ಪುರುಷರಿಗೆ:</h4>
          <ul>
            <li>ಹಗ್ಗಜಗ್ಗಾಟ</li>
            <li>ವಾಲಿಬಾಲ್</li>
            <li>ಕಬಡ್ಡಿ</li>
            <li>ಕೆಸರ್ ಗ್ಯದ್ದಿ ಓಟ</li>
            <li>ಅಡಿಕೆ ಹಾಳ್ಯಂಗ್ ಎಳುದ್</li>
            <li>ತೆಂಗಿನ ಚ್ವಾಂಗಿ ಮಾದರಿ ತಯಾರ್ಸುದ್</li>
            <li>ಬೀಸ್ ಬಲಿ - ರೌಂಡ್ ಬುಸುದ್</li>
            <li>ಚಿಟ್ ಬಿಲ್ ಶೂಟಿಂಗ್</li>
            <li>ಚನ್ನೆಮಣಿ ಆಟ</li>
            <li>ಸಾಂಪ್ರದಾಯಿಕ ಗೀತೆ ಗಾಯನ</li>
            <li>ರಸಪ್ರಶ್ನೆ</li>
          </ul>
  
          <h4>ಮಕ್ಕಳಿಗೆ:</h4>
          <ul>
            <li>ಕೆಸರ್ ಗ್ಯದ್ದಿ ಓಟ</li>
            <li>ಬೆನ್ ಚೆಂಡ್ ಆಟ</li>
            <li>ಲಿಂಬು ಚಮಚ ಓಟ</li>
            <li>ಗೂಟಕ್ಕೆ ಸುತ್ತಿ ಓಡುದ್</li>
            <li>ಅಡಿಕೆ ಹಾಳ್ಯಂಗ್ ಎಳುದ್</li>
            <li>ತೆಂಗಿನ ಚ್ವಾಂಗಿ ಮಾದರಿ ತಯಾರ್ಸುದ್</li>
            <li>ಭಾಷಣ — ವಿಷಯ: ಕುಂದಾಪ್ರ ಕನ್ನಡ ಗಾದೆ ವಿಸ್ತರಣೆ</li>
            <li>ಚಿತ್ರಕಲೆ</li>
            <li>ಛದ್ಮವೇಷ</li>
            <li>ರಸಪ್ರಶ್ನೆ</li>
          </ul>
        </div>
  
        <div className="menu-item">
          <h3>ನಿಯಮಗಳು:</h3>
          <ul>
            <li>ಎಲ್ಲಾ ವಿಜೇತರಿಗೂ ಆಕರ್ಷಕ ಬಹುಮಾನ & ಪ್ರಮಾಣಪತ್ರ ನೀಡಿ ಗೌರವಿಸಲಾಗುವುದು</li>
            <li>ಬೈಂದೂರು ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರ ವ್ಯಾಪ್ತಿಯ ನಾಗರಿಕರಿಗೆ ಭಾಗವಹಿಸಲು  ಅವಕಾಶ</li>
            <li>ಆಧಾರ್ ಕಾರ್ಡ್ ಕಡ್ಡಾಯ</li>
            <li>ಮಕ್ಕಳ ಕ್ರೀಡೆ ಹಾಗೂ ಸ್ಪರ್ಧೆಗಳಿಗೆ ಬೆಳಿಗ್ಗೆ ಗಂಟೆ 9ರ ತನಕ ನೊಂದಣಿಗೆ ಅವಕಾಶ</li>
            <li>ಸ್ಪರ್ಧೆಗಳನ್ನು ಬೇಗನೆ ಪ್ರಾರಂಭಿಸುವುದರಿಂದ ಎಲ್ಲಾ ಸ್ಪರ್ಧಾಳುಗಳು ಬೆಳಿಗ್ಗೆಯೇ ಉಪಸ್ಥಿತರಿರುವುದು</li>
            <li>ವಿದ್ಯಾರ್ಥಿಗಳು ಪೋಷಕರೊಂದಿಗೆ ಹಾಜರಾಗುವುದು ಹಾಗೂ ಸುರಕ್ಷಿತ ಸ್ಥಳದಲ್ಲಿ ನಿಂತು ಕಾರ್ಯಕ್ರಮ ವೀಕ್ಷಿಸುವುದು ಮತ್ತು ಭಾಗವಹಿಸುವುದು</li>
            <li>ಸ್ಪರ್ಧೆಗಳನ್ನು ಕೆಸರುಗದ್ದೆ ಹಾಗೂ ಹಾಲ್‌ನ ಹೊರಾಂಗಣ ಹಾಗೂ ಒಳಾಂಗಣದಲ್ಲಿ ನಡೆಸಲಾಗುತ್ತದೆ</li>
            <li>ನಿರ್ಣಾಯಕರ ತೀರ್ಮಾನವೇ ಅಂತಿಮ</li>
            <li>ಉಚಿತ ಪ್ರವೇಶ</li>
          </ul>
          <p>ಹ್ವಾಯ್, ನೀವ್ ತಪ್ದೇ ಬರ್ಕ್ — ಗಡ್ಜ್ ಗಮ್ಮತ್ ಮಾಡ್ವ!</p>
        </div>
  
        <div className="menu-item">
          <h3>ಮಾಹಿತಿಗಾಗಿ:</h3>
          <p>9986099687 | 9481518382 | 9900351095</p>
        </div>
      </div>
    </div>
  );
  

  const GameRegistration = (props) => {
    const [gameType, setGameType] = useState('');
    useEffect(() => {
      if (props.yy === 'kambala') {
        setGameType('kambala');
        setSpecificGame('kambala');
      }
    }, [props.yy]);
    
    const [specificGame, setSpecificGame] = useState('');
    const currentGameType = gameTypes.find(g => g.type === gameType);
    const currentGame = currentGameType?.games.find(g => g.id === specificGame);
    useEffect(() => {
      if (gameType === 'kambala') {
        setSpecificGame('kambala'); // default for kambala
      }
    }, [gameType]);
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
      if (!formData.name || !formData.phone || !formData.place) {
        alert('ದಯವಿಟ್ಟು ಎಲ್ಲ ಫೀಲ್ಡ್‌ಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ');
        return;
      }
      if ((specificGame === 'volleyball' || specificGame === 'kabaddi' || specificGame === "hagga-jaggata" || specificGame === "throwball" || specificGame === "haggu") && !formData.teamName) {
        alert('ತಂಡದ ಹೆಸರು ಅಗತ್ಯವಿದೆ');
        return;
      }
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
            <label>ಸ್ಫರ್ಧೆಗಳಿಗೆ ಆಯ್ಕೆ ಮಾಡಿ:</label>
            <select value={gameType} onChange={(e) => {
              setGameType(e.target.value);
              setSpecificGame('');
            }}
            disabled={!!specificGame}>
            <option value="" disabled>ಆಯ್ಕೆ ಮಾಡಿ</option>
            {gameTypes
              .filter(g => {
                if (!props.yy) {
                  return g.type !== 'kambala'; // hide kambala only when yy is empty
                }
              return true; // include all types otherwise
              })
              .map(g => (
                <option key={g.type} value={g.type}>
                    {g.label}
                </option>
            ))}

            </select>
          </div>


          {currentGameType && currentGameType.games.length > 0 && (
  <div className="specific-game-selector">
    <label>ಸ್ಫರ್ಧೆ ಆಯ್ಕೆ ಮಾಡಿ:</label>
    <select value={specificGame} onChange={(e) => setSpecificGame(e.target.value)}>
      <option value="">ಆಯ್ಕೆ ಮಾಡಿ</option>
      {currentGameType.games.map(game => (
        <option key={game.id} value={game.id}>{game.nameKn}</option>
      ))}
    </select>
  </div>
)}
          {gameType === 'kambala' && (
            <div>
              {/* You can show something else here if needed */}
              <p>ಕಂಬಳ ಸ್ಪರ್ಧೆ ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ</p>
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
                  required
                />
              </div>

              {(specificGame === 'volleyball' || specificGame === 'kabaddi' || specificGame === "hagga-jaggata" || specificGame === "throwball" || specificGame === "haggu") && (
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

{currentGame?.note && (
  <div className="form-group">
    <label>{currentGame.note}</label>
  </div>
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
  
  const AdminView = () => {
    
    const [selectedGame, setSelectedGame] = useState('');
  
    const gameOptions = Array.from(
      new Set(
        registrations.map(reg => {
          const gameGroup = gameTypes.find(g => g.type === reg.gameType);
          const game = gameGroup?.games.find(g => g.id === reg.specificGame);
          return {
            key: `${reg.gameType}-${reg.specificGame}`,
            label: `${gameGroup?.label || reg.gameType} - ${game?.nameKn || reg.specificGame}`
          };
        })
      )
    );
    
  
    const filteredRegistrations = registrations.filter(
      reg => `${reg.gameType}-${reg.specificGame}` === selectedGame
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
  {gameOptions.map((opt, idx) => (
    <option key={idx} value={opt.key}>{opt.label}</option>
  ))}
            </select>
          </div>
  
          {selectedGame && (
            <>
              <h3>ನೋಂದಣಿಗಳು:</h3>
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
      {currentView === 'registration' && <GameRegistration yy=""/>}
      {currentView === 'admin-login' && <AdminLogin />}
      {currentView === 'kambala' && <GameRegistration yy="kambala" />}
      {currentView === 'admin' && isAdminAuthenticated && <AdminView />}
    </div>
  );
};

export default App;
