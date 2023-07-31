import { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import { api } from "../utils/api";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({isOpen: false, element: {}});
    const [userInfo, setUserInfo] = useState({});
    const [cards, setCards] = useState([]);

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
        setSelectedCard({...selectedCard, isOpen: true, element: card});
    }

    const handlecloseAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({...selectedCard, isOpen: false});
    }

    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setUserInfo(data);
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
        <div className="page">
            <Header />
            <Main
                onEditAvatar={handleEditAvatar}
                onAddPlace={handleAddPlace}
                onEditProfile={handleEditProfile}
                onCardClick={handleCardClick}
                userInfo={userInfo}
                cards={cards}
            />
            <Footer />

            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                onClose={handlecloseAllPopups}
                title={"Редактировать профиль"}
                name={"edit-profile"}
                buttonName={"Сохранить"}>
                <input className="popup__field popup__field_type_name" type="text" name="name" id="name-profile"
                    placeholder="Имя" required minLength="2" maxLength="40" />
                <span className="popup__field-error name-profile-error"></span>
                <input className="popup__field popup__field_type_about-me" type="text" name="about"
                    placeholder="Обо мне" id="about-me" required minLength="2" maxLength="200" />
                <span className="popup__field-error about-me-error"></span>
            </PopupWithForm>
            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                onClose={handlecloseAllPopups}
                title={"Новое место"}
                name={"add-place"}
                buttonName={"Создать"}>
                <input className="popup__field popup__field_type_name-place" type="text" name="name" id="name-place"
                    placeholder="Название" required minLength="2" maxLength="30" />
                <span className="popup__field-error name-place-error"></span>
                <input className="popup__field popup__field_type_link" type="url" name="link" id="link-place"
                    placeholder="Ссылка на картинку" required />
                <span className="popup__field-error link-place-error"></span>
            </PopupWithForm>
            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                onClose={handlecloseAllPopups}
                title={"Обновить аватар"}
                name={"update-avatar"}
                buttonName={"Сохранить"}>
                <input className="popup__field popup__field_type_link" type="url" name="link" id="avatar-image"
                    placeholder="Ссылка на картинку" required />
                <span className="popup__field-error avatar-image-error"></span>
            </PopupWithForm>
            <ImagePopup
                card={selectedCard}
                onClose={handlecloseAllPopups}>
            </ImagePopup>
        </div>
    );
}

export default App;
