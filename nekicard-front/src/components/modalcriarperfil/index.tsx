import React, { ChangeEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay } from "./styles";
import { X } from "phosphor-react";
import { useForm } from "../../contexts/FormContext";
import ToastSuccess from "../toasts/ToastSuccess";
import ToastError from "../toasts/ToastError";
import { AxiosError } from "axios";
import { Api } from "../../services/Api";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";

export function ModalCriarPerfil() {
  const { formData, updateFormData } = useForm();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email é obrigatório")
      .matches(
        /^[a-zA-Z0-9._%+-]+@(neki-it\.com\.br|neki\.com\.br)$/,
        "E-mail deve terminar com @neki-it.com.br ou @neki.com.br"
      ),
    nomeCompleto: Yup.string().required("Nome Completo é obrigatório"),
    dataNasc: Yup.string()
      .required("Data de nascimento é obrigatória")
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Data deve estar no formato (yyyy-mm-dd)"
      ),
    foto: Yup.string().required("Foto é obrigatória"),
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const token = localStorage.getItem("token");
      console.log("Dados do formulário:", formData);

      const response = await Api.post("/perfil", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log(formData);
        ToastSuccess({ message: "Perfil criado com sucesso!" });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.errors.forEach((errorMessage) => {
          ToastError({ message: errorMessage });
        });
      } else if (error && (error as AxiosError)?.response?.status === 403) {
        ToastError({ message: "Erro de autenticação" });
      } else if (error && (error as AxiosError)?.response?.status === 400) {
        ToastError({ message: "Esse Email já está cadastrado" });
      } else {
        ToastError({
          message:
            "Erro na requisição. Verifique sua conexão ou tente novamente mais tarde.",
        });
      }
    }
  };

  return (
    <Dialog.Portal>
      <ToastContainer />
      <Overlay />

      <Content>
        <Dialog.Title>Novo Perfil</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="nomeCompleto"
            placeholder="Nome Completo"
            value={formData.nomeCompleto}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="nomeSocial"
            placeholder="Nome Social"
            value={formData.nomeSocial || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="dataNasc"
            placeholder="Data de nascimento"
            value={formData.dataNasc}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="foto"
            placeholder="Foto"
            value={formData.foto}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="linkedin"
            placeholder="Linkedin"
            value={formData.linkedin || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="github"
            placeholder="Github"
            value={formData.github || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="instagram"
            placeholder="Instagram"
            value={formData.instagram || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="facebook"
            placeholder="Facebook"
            value={formData.facebook || ""}
            onChange={handleInputChange}
          />

          <button type="submit">Criar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
