import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FormButton,
  FormGroup,
  FormInput,
  FormLabel,
  LoginContainer,
  LoginForm,
  Logo,
} from "./styles";

import logoImage from "../../assets/LogoNeki-1.png";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import { AxiosError } from "axios";
import ToastSuccess from "../../components/toasts/ToastSuccess";
import ToastError from "../../components/toasts/ToastError";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await Api.post("/login", {
        email,
        senha,
      });
      const token = response.data.token;
      const userId = response.data.userId;

      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);

      if (response.status === 200) {
        ToastSuccess({ message: "Login efetuado com sucesso!" });
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      }
    } catch (error) {
      if (error && (error as AxiosError)?.response?.status === 403) {
        ToastError({ message: "Login ou senha incorretos" });
      } else {
        ToastError({
          message:
            "Erro na requisição. Verifique sua conexão ou tente novamente mais tarde.",
        });
      }
    }
  };

  return (
    <LoginContainer>
      <ToastContainer />
      <LoginForm onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Logo src={logoImage} alt="Logo da sua empresa" />
        </div>
        <FormGroup>
          <FormLabel>E-mail</FormLabel>
          <div style={{ position: "relative" }}>
            <FormInput
              type="text"
              value={email}
              placeholder="seu@neki-it.com.br"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <FormLabel>Senha</FormLabel>
          <div style={{ position: "relative" }}>
            <FormInput
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
        </FormGroup>
        <FormButton type="submit">Entrar</FormButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
