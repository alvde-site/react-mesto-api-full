import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_handle_${props.name} ${
        props.card.isOpen && "popup_opened"
      }`}
    >
      <div className="image-viewing">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <figure className="image-viewing__img-card">
          <img
            src={props.card.link}
            alt={props.card.name}
            className="image-viewing__image"
          />
          <figcaption className="image-viewing__caption">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
