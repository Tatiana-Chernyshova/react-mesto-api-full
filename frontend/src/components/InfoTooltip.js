function InfoTooltip({ image, message, isOpen, onClose }) {
  

    return (
      <article 
      className={`overlay page__overlay page__overlay_type_look page__overlay_${isOpen && 'active'}`}>
      <div className="popup popup_type_auth">
        <figure className="popup__info">
          <img 
          src={image} 
          alt={message}
          className="popup__info_image"
          />
          <figcaption className="popup__info_message">
          {message}
          </figcaption>
        </figure>
        <button className="popup__button popup__button_close" type="button" aria-label="Закрыть"
        onClick={onClose}
        ></button>
      </div>
    </article>
    );
}

export default InfoTooltip;
