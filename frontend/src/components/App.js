import React from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from '../utils/auth.js';

import infoTooltipSuccess from '../images/success.svg'; 
import infoTooltipFail from '../images/fail.svg'; 

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState({message: '', image: ''});
  const [currentUserEmail, setCurrentUserEmail] = React.useState('');

  function handleIsEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleIsAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleIsEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(el) {
    setImagePopupOpen(true);
    setSelectedCard(el);
  }
  
  function handleUpdateUser(el) {
    api.setUserData(el)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(e => { console.log(e) })  
  }

  function handleUpdateAvatar(el) {
    api.editUserAvatar(el)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(e => { console.log(e) })  
  }

  function handleAddPlaceSubmit(el) {
    api.addCard(el)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(e => { console.log(e) })  
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setInfoPopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
    })
      .catch(e => { console.log(e) });
  }

  function handleCardDelete(card) {
    console.log(card._id)
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(c => c._id !== card._id);
        setCards(newCards);
    })
      .catch(e => { console.log(e) });
  }

  function setInfoTooltipFail() {
    setInfoTooltip({
        message: 'Что-то пошло не так! Попробуйте еще раз.',
        image: infoTooltipFail
    })
  }

  function handleRegister(password, email) {
    auth.register(password, email)
        .then((res) => {
            history.push('/singin');
            
            setInfoTooltip({
                message: 'Вы успешно зарегистрировались!',
                image: infoTooltipSuccess
            });
            setInfoPopupOpen(true);
        })
        .catch((err) => {
            setInfoTooltipFail();
            setInfoPopupOpen(true);
        })
  }

  function handleLogin(password, email) {
    auth.login(password, email)
        .then((res) => {
          if (res) {
            localStorage.setItem('token', res.token)
            setCurrentUserEmail(email);
            setLoggedIn(true);
            history.push('/');
            setInfoTooltip({
                message: 'Вы успешно авторизовались!',
                image: infoTooltipSuccess
            });
            setInfoPopupOpen(true);
        }
    })
    .catch(() => {
        setInfoTooltipFail();
        setInfoPopupOpen(true);
        })
  }

  function checkToken() {
    const token = localStorage.getItem('token')

    if (token) {
      auth.getToken(token)
        .then(res => {
          setCurrentUserEmail(res.email)
          setLoggedIn(true)
        })
        .catch(e => { console.log(e) }) 
    }
  }

  function handleSignOut() {
    localStorage.removeItem('token')
    setLoggedIn(false);
    setCurrentUserEmail('');
    history.push('/signin')
  }

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/')
      Promise.all([api.getUserData(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData.reverse());
      })
      .catch(e => { console.log(e) })
    }
    
  }, [loggedIn, history])

  React.useEffect(() => { 
    checkToken();
  }) 

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">

          <Header
            loggedIn={loggedIn}
            userEmail={currentUserEmail}
            onSignOut={handleSignOut}
          />

          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onAddPlace={handleIsAddPlacePopupOpen}
              onEditAvatar={handleIsEditAvatarPopupOpen}
              onEditProfile={handleIsEditProfilePopupOpen}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <Route path='/signup'>
              <Register
                onSubmit={handleRegister}
              />
            </Route>

            <Route path='/signin'>
              <Login
                onSubmit={handleLogin}
              />
            </Route>

            <Route>
              {loggedIn ? <Redirect to='/' /> : <Redirect to='signin' />}
            </Route>
          </Switch>
          {loggedIn && <Footer />}


          <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateAvatar}
          />

          <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleAddPlaceSubmit}
          />

          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />

          <InfoTooltip
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
            message={isInfoTooltip.message}
            image={isInfoTooltip.image}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
