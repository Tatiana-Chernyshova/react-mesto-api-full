import React from "react";

function AuthForm({ title, buttonText, onSubmit, children }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
      setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
      setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
      evt.preventDefault();
      onSubmit(password, email);
  }

  return (
    <article className="page__auth">
      <form className="auth" name="auth" onSubmit={handleSubmit}>
        <h2 className="auth__heading">{title}</h2>
        <fieldset className="auth__input-container">
          <input
            type="text"
            className="auth__input"
            id="email"
            name="email"
            placeholder="Email"
            value={email || ''}
            required
            onChange={handleEmailChange}
          />
          <input
            type="password"
            className="auth__input"
            id="password"
            name="password"
            placeholder="Пароль"
            value={password || ''}
            required
            onChange={handlePasswordChange}
          />
          <button
            type="submit"
            className="auth__submit"
            aria-label="auth__submit"
          >
            {buttonText}
          </button>
          {children}
        </fieldset>
      </form>
    </article>
  );
}

export default AuthForm;
