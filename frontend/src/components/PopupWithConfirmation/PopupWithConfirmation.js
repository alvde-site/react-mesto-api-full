import React from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";

function PopupWithConfirmation(props) {
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onConfirmDelete();
  }

  return (
    <PopupWithForm
      name="remove-confirm"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Да"
      buttonLoadingText="Удаление..."
    ></PopupWithForm>
  );
}

export default PopupWithConfirmation;
