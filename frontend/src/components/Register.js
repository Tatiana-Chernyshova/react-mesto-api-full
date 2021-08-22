import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register(props) {
  return (
    <AuthForm
      title="Регистрация"
      text="Email"
      buttonText="Зарегистрироваться"
      onSubmit={props.onSubmit}
    >
      <Link to="/signin" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </AuthForm>
  );
}

export default Register;
