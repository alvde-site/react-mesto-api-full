import { useRef, useEffect } from "react";
import PopupWithForm from "../popupWithForm/PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
    >
      <label htmlFor="addavatar" className="form__field">
        <input
          id="addavatar"
          type="url"
          className="form__input form__input_add_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span id="error-addavatar" className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
