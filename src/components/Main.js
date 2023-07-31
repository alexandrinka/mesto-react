import Jacques_Yves_Cousteau from '../images/Jacques_Yves_Cousteau.jpg';
import React from 'react'
import Card from './Card';

export default function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick, userInfo, cards }) {
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__image" onClick={onEditAvatar}>
                        <img className="profile__avatar" src={userInfo.avatar} alt="Аватар" />
                    </div>
                    <div className="profile__info">
                        <div className="profile__edit">
                            <h1 className="profile__title">{userInfo.name}</h1>
                            <button type="button" className="profile__symbol-edit" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__subtitle">{userInfo.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((item) => (
                        <Card
                            key={item['_id']}
                            card={item}
                            onCardClick = {onCardClick} />)
                    )}
                </ul>
            </section>
        </main>
    )
}
