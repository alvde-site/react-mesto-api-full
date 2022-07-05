import { useState, useEffect, useContext } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
    >
      <label htmlFor="profilename" className="form__field">
        <input
          id="profilename"
          type="text"
          className="form__input form__input_profile_name"
          name="profilename"
          placeholder="Введите имя"
          required
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span id="error-profilename" className="form__input-error"></span>
      </label>
      <label htmlFor="profilejob" className="form__field">
        <input
          id="profilejob"
          type="text"
          className="form__input form__input_profile_job"
          name="profilejob"
          placeholder="Введите профессию"
          required
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span id="error-profilejob" className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
