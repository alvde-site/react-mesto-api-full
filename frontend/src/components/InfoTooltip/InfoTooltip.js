import React from "react";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_handle_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <div className="info-tooltip">
          <img
            className="info-tooltip__image"
            src={props.onOpen.image}
            alt={props.onOpen.title}
          />
          <h2 className="info-tooltip__title">{props.onOpen.title}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
