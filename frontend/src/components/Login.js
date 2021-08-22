import React from "react";
import AuthForm from "./AuthForm";

function Login({ onSubmit }) {
  return (
    <AuthForm
      title="Вход"
      buttonText="Войти"
      onSubmit={onSubmit}
    ></AuthForm>
  );
}

export default Login;
