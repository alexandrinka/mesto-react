import React from 'react'

export default function Card({ onCardClick, card }) {
    function handleCardClick() {
        onCardClick(card);
    }

    return (
        <li className="elements__list-item">
            <button type="button" className="elements__trash"></button>
            <div className="elements__container_img">
                <img className="elements__img" src={card.link} alt={`${card.name}`} onClick={handleCardClick}/>
            </div>
            <div className="elements__description">
                <h2 className="elements__name">{card.name}</h2>
                <div className="elements__like">
                    <button type="button" className="elements__heart"></button>
                    <p className="elements__count-like">{card.likes.lenght}</p>
                </div>
            </div>
        </li>
    )
}
