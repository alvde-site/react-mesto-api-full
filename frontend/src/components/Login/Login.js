import { useState } from "react";
import Header from "../header/Header";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({ email, password });
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <Header login="Регистрация" loggedIn={props.loggedIn} to="/signup" />
      <div className="authorization">
        <form
          action="#"
          name={`${props.name}form`}
          className="auth-form auth-form_handle_auth"
          onSubmit={handleSubmit}
        >
          <h2 className="auth-form__title">{props.title}</h2>
          <label htmlFor="registername" className="auth-form__field">
            <input
              id="registeremail"
              type="email"
              className="auth-form__input auth-form__input_login_email"
              name="registeremail"
              placeholder="Email"
              required
              minLength="2"
              maxLength="30"
              value={email || ""}
              onChange={handleEmailChange}
            />
            <span
              id="error-registername"
              className="auth-form__input-error"
            ></span>
          </label>
          <label htmlFor="registerpassword" className="auth-form__field">
            <input
              id="registerpassword"
              type="password"
              className="auth-form__input auth-form__input_login_password"
              name="link"
              placeholder="Пароль"
              required
              value={password || ""}
              onChange={handlePasswordChange}
            />
            <span
              id="error-registerpassword"
              className="auth-form__input-error"
            ></span>
          </label>
          <button className="auth-form__submit" type="submit">
            {props.isLoading ? props.buttonLoadingText : props.buttonText}
          </button>
          <div className="auth-form__signin"></div>
        </form>
      </div>
    </>
  );
}

export default Login;
