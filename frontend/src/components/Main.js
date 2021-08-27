import React from 'react';
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className="profile__avatar-container">
          <img
            alt="" className="profile__avatar"
            src={currentUser.avatar} 
          />
          <button
            className="profile__button profile__avatar-edit"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
          </div>
          <button
            className="profile__button profile__button_edit"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__button profile__button_add"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements content__elements">
        {cards.map((obj) => (
          <Card 
          card={obj} 
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
          key={obj._id}
          />
        ) )}
      </section>
    </main>
  );
}

export default Main;
