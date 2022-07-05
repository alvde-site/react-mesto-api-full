import { useEffect, useState } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";

function AddPlacePopup(props) {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdatePlace({
      name: place,
      link,
    });
  }

  useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-element"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
    >
      <label htmlFor="addname" className="form__field">
        <input
          id="addname"
          type="text"
          className="form__input form__input_add_name"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={place || ""}
          onChange={handlePlaceChange}
        />
        <span id="error-addname" className="form__input-error"></span>
      </label>
      <label htmlFor="addlink" className="form__field">
        <input
          id="addlink"
          type="url"
          className="form__input form__input_add_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link || ""}
          onChange={handleLinkChange}
        />
        <span id="error-addlink" className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
