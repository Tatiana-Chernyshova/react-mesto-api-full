function ImagePopup({ card, isOpen, onClose }) {

    return (
      <article 
      className={`overlay page__overlay page__overlay_type_look page__overlay_${isOpen && 'active'}`}>
      <div className="popup popup_type_image popup_do_look">
        <figure className="popup__figure">
          <img 
          src={card.link} 
          alt={card.name} 
          className="popup__image"
          />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
        <button className="popup__button popup__button_close" type="button" aria-label="Закрыть"
        onClick={onClose}
        ></button>
      </div>
    </article>
    );
}

export default ImagePopup;
