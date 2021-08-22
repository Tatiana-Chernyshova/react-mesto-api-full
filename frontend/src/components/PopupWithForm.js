function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, children }) {

  return (
    <article className={`overlay page__overlay page__overlay_${isOpen && 'active'}`}>
      <form
        className={`popup popup_type_form popup_do_${name}`}
        name={`form-${name}`}
        onSubmit={onSubmit}
        >
        <h2 className="popup__heading">{title}</h2>
        <fieldset className="popup__input-container">
          {children}
          <button type="submit" className="popup__submit" aria-label="Сохранить" 
          >{buttonText}</button>
        </fieldset>
        <button className="popup__button popup__button_close" type="button" aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </form>
    </article>
  );

}

export default PopupWithForm;
