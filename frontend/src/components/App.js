import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Main from "./main/Main";
import ImagePopup from "./imagePopup/ImagePopup";
import { ApiSet } from "../utils/Api";
import * as mestoAuth from "../utils/MestoAuth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation/PopupWithConfirmation";
import Register from "./Register/Register";
import Login from "./Login/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import success from "../../src/images/success.png";
import fail from "../../src/images/fail.png";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltipData, setIsInfoTooltipData] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isdeleteCard, setIsDeleteCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  });

  useEffect(() => {
    if (loggedIn) {
      Promise.all([ApiSet.getUserInfo(), ApiSet.getInitialCards()])
        .then(([userData, cards]) => {
          // cards = массив объектов карточке с сервера
          setCurrentUser(userData);
          const formattedData = cards.map((cardData) => {
            return {
              ...cardData,
              isOpen: false,
            };
          });
          setCards(formattedData);
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  });

  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит, действующий он или нет
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      // здесь будем проверять токен
      if (jwt) {
        // проверим токен
        mestoAuth
          .getContent(jwt)
          .then((res) => {
            if (res) {
              setEmail(res.data.email);
              // авторизуем пользователя
              setLoggedIn(true);
              history.push("/");
            }
          })
          .catch((err) => {
            console.log(`${err}`);
          });
      }
    }
  }

  function onRegister({ email, password }) {
    setIsLoading(true);
    mestoAuth
      .register({ email, password })
      .then((res) => {
        if (res.error) {
          setIsInfoTooltipPopupOpen(true);
          setIsInfoTooltipData({
            image: fail,
            title: res.error,
          });
          return;
        }
        history.push("/sign-in");
        setIsInfoTooltipPopupOpen(true);
        setIsInfoTooltipData({
          image: success,
          title: "Вы успешно зарегистрировались!",
        });
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setIsInfoTooltipData({
          image: fail,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onLogin({ email, password }) {
    setIsLoading(true);
    mestoAuth
      .login({ email, password })
      .then((res) => {
        if (res.message) {
          setIsInfoTooltipPopupOpen(true);
          setIsInfoTooltipData({
            image: fail,
            title: res.message,
          });
          return;
        }
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          history.push("/");
          return res;
        } else {
          return;
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setIsInfoTooltipData({
          image: fail,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    ApiSet.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  function handleConfirmCardDelete() {
    //Удаление карточки через ConfirmPopup
    setIsLoading(true);
    ApiSet.deleteCard(isdeleteCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== isdeleteCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    ApiSet.addCard({ name, link })
      .then((cardData) => {
        const newCard = { ...cardData, isOpen: false };
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    ApiSet.editUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    ApiSet.editAvatarInfo({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardClick(cardData) {
    cardData.isOpen = true;
    setSelectedCard(cardData);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handlePopupWithConfirmation(card) {
    //Настраивает открытие попапа подтверждения удаления
    setIsConfirmationPopupOpen(true);
    setIsDeleteCard(card);
  }

  function handleInfoTooltipPopup() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleToggleMenu() {
    setIsToggleMenu(!isToggleMenu);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {/* Поддерево, в котором будет доступен контекст */}
      <div className="page">
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            email={email}
            onSignOut={onSignOut}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onConfirmation={handlePopupWithConfirmation} //Настраивает открытие попапа подтверждения удаления
            onToggleMenu={handleToggleMenu}
            isToggleMenu={isToggleMenu}
          />
          <Route path="/sign-up">
            <Register
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              name="login-element"
              title="Регистрация"
              isOpen={true}
              onRegister={onRegister}
              isLoading={isLoading}
              buttonText="Зарегистрироваться"
              buttonLoadingText="Регистрация..."
            />
          </Route>
          <Route path="/sign-in">
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              name="login-element"
              title="Вход"
              isOpen={true}
              onLogin={onLogin}
              isLoading={isLoading}
              buttonText="Войти"
              buttonLoadingText="Войти..."
            />
          </Route>
          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdatePlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <PopupWithConfirmation
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleConfirmCardDelete}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          name="image-viewing"
        />
        <InfoTooltip
          name="infotooltip"
          isOpen={isInfoTooltipPopupOpen}
          onInfoTooltip={handleInfoTooltipPopup}
          onOpen={isInfoTooltipData}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
