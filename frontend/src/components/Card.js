import React from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardLike, onCardDelete, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = card.owner._id === currentUser._id;
    const isOwn = card.owner === currentUser._id;
  // console.log(card.key)
  // console.log(currentUser._id)
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `elements__button-delete ${!isOwn && 'elements__button-delete_hidden'}`
  );
  
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = card.likes.some(i => i._id === currentUser._id);
  // console.log(card.likes.some(i => i._id === currentUser._id))
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  // const cardLikeButtonClassName = (
  //   `elements__button-like ${isLiked && 'elements__button-like_active'}`
  // );

  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };
  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="elements__item">
      <img
        className="elements__image"
        src={card.link? card.link : card.data.link} 
        alt={card.name} 
        onClick={handleClick}
      />
      <div className="elements__box">
        <h2 className="elements__caption">{card.name? card.name : card.data.name}</h2>
        {/* <h2 className="elements__caption">{console.log(card.data? card.data : card)}</h2> */}
        <div className="elements__like-box">
          <button
            // className={cardLikeButtonClassName}
            type="button"
            aria-label="Мне нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__number">{card.data? card.data.likes.length : card.likes.length}</p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      ></button>
    </div>
  );
}

export default Card;
