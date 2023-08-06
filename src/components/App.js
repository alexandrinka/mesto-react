import { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import { api } from "../utils/api";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ isOpen: false, element: {} });
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    const handleEditProfile = () => {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    const handleAddPlace = () => {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    const handleEditAvatar = () => {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    const handleCardClick = (card) => {
        setSelectedCard({ ...selectedCard, isOpen: true, element: card });
    }

    const handlecloseAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({ ...selectedCard, isOpen: false });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.likeCard(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch(err => console.log("Ошибка в лайке:" + err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter((c) => c._id === card._id ? false : true);
            setCards(newCards);
        })
            .catch(err => console.log("Ошибка в удалении карточки:" + err));
    }

    function handleUpdateUser(newUserData) {
        api.updateInfoUser(newUserData)
            .then(data => {
                setCurrentUser(data);
                handlecloseAllPopups();
            })
            .catch(err => console.log("Ошибка в обновлении информации о пользователе:" + err));
    }

    function handleUpdateAvatar(newAvatar) {
        api.updateAvatar(newAvatar)
            .then(data => {
                setCurrentUser(data);
                handlecloseAllPopups();
            })
            .catch(err => console.log("Ошибка в обновлении аватара пользователя:" + err));
    }

    function handleAddPlaceSubmit(cardData) {
        api.createCard(cardData)
            .then(newCard => {
                setCards([newCard, ...cards]); 
                handlecloseAllPopups();
            })
            .catch(err => console.log("Ошибка в добавлении карточки:" + err));
    }

    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data);
            })
            .catch(err => {
                console.log("Ошибка в загрузке пользователькой информации:" + err);
            })
    }, []);

    useEffect(() => {
        api.getCards()
            .then((data) => {
                setCards(data);
            })
            .catch(err => {
                console.log("Ошибка в загрузке информации о карточках" + err);
            })
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatar}
                    onAddPlace={handleAddPlace}
                    onEditProfile={handleEditProfile}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                />
                <Footer />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={handlecloseAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={handlecloseAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup 
                    isOpen={isAddPlacePopupOpen}
                    onClose={handlecloseAllPopups}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={handlecloseAllPopups}>
                </ImagePopup>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
