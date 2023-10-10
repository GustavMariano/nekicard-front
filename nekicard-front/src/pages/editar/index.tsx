import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../../services/Api";
import * as Yup from "yup"; // Importe o Yup
import {
  ButtonContainer,
  CancelButton,
  EditProfileContainer,
  InputField,
  InputLabel,
  ProfileForm,
  SaveButton,
} from "./styles";
import { ToastContainer } from "react-toastify";
import ToastSuccess from "../../components/toasts/ToastSuccess";
import { AxiosError } from "axios";
import ToastError from "../../components/toasts/ToastError";

const Editar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState({
    id: id,
    email: "",
    nomeCompleto: "",
    nomeSocial: null,
    dataNasc: "",
    foto: "",
    telefone: "",
    redesSociais: {
      linkedin: "",
      github: "",
      instagram: "",
      facebook: "",
    },
  });

  // Função para formatar a data de nascimento
  const formatDataNasc = (dataNasc: string) => {
    if (!dataNasc) {
      return "";
    }

    const date = new Date(dataNasc);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    Api.get(`/perfil/${id}`, config)
      .then((response) => {
        const formattedDataNasc = formatDataNasc(response.data.dataNasc);
        setProfileData({
          ...response.data,
          dataNasc: formattedDataNasc,
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do perfil:", error);
      });
  }, [id]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email é obrigatório")
      .matches(
        /^[a-zA-Z0-9._%+-]+@(neki-it\.com\.br|neki\.com\.br)$/,
        "E-mail deve terminar com @neki-it.com.br ou @neki.com.br"
      ),
    nomeCompleto: Yup.string().required("Nome Completo é obrigatório"),
    dataNasc: Yup.string()
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Data deve estar no formato (yyyy-mm-dd)"
      ),
    // Adicione validações adicionais conforme necessário
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Tratamento para campos de rede social
    if (name.startsWith("redesSociais.")) {
      const socialName = name.split(".")[1];
      setProfileData({
        ...profileData,
        redesSociais: {
          ...profileData.redesSociais,
          [socialName]: value,
        },
      });
    } else if (name === "dataNasc") {
      setProfileData({
        ...profileData,
        dataNasc: value,
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await validationSchema.validate(profileData, { abortEarly: false });

      const response = await Api.put(`/perfil`, profileData, config);

      if (response.status === 200) {
        ToastSuccess({ message: "Perfil atualizado com sucesso!" });
        setTimeout(() => {
          navigate(`/perfil/${id}`);
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

  const handleCancel = () => {
    navigate(`/home`);
  };

  return isAuthenticated ? (
    <>
    <ToastContainer />
      <Header />
      <EditProfileContainer>
        <h2>Editar Perfil</h2>
        <ProfileForm>
          <InputLabel>Email</InputLabel>
          <InputField
            type="text"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            placeholder={profileData.email}
          />

          <InputLabel>Nome Completo</InputLabel>
          <InputField
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            value={profileData.nomeCompleto}
            onChange={handleInputChange}
            placeholder={profileData.nomeCompleto}
          />

          <InputLabel>Nome Social</InputLabel>
          <InputField
            type="text"
            id="nomeSocial"
            name="nomeSocial"
            value={profileData.nomeSocial || ""}
            onChange={handleInputChange}
            placeholder={profileData.nomeSocial || ""}
          />

          <InputLabel>Data de Nascimento</InputLabel>
          <InputField
            type="text"
            id="dataNasc"
            name="dataNasc"
            value={profileData.dataNasc}
            onChange={handleInputChange}
            placeholder="yyyy-mm-dd"
          />

          <InputLabel>Foto</InputLabel>
          <InputField
            type="text"
            id="foto"
            name="foto"
            value={profileData.foto}
            onChange={handleInputChange}
            placeholder={profileData.foto}
          />

          <InputLabel>Telefone</InputLabel>
          <InputField
            type="text"
            id="telefone"
            name="telefone"
            value={profileData.telefone || ""}
            onChange={handleInputChange}
            placeholder={profileData.telefone || ""}
          />

          <InputLabel>Linkedin</InputLabel>
          <InputField
            type="text"
            id="linkedin"
            name="redesSociais.linkedin"
            value={profileData.redesSociais.linkedin || ""}
            onChange={handleInputChange}
            placeholder={profileData.redesSociais.linkedin || ""}
          />

          <InputLabel>Github</InputLabel>
          <InputField
            type="text"
            id="github"
            name="redesSociais.github"
            value={profileData.redesSociais.github || ""}
            onChange={handleInputChange}
            placeholder={profileData.redesSociais.github || ""}
          />

          <InputLabel>Instagram</InputLabel>
          <InputField
            type="text"
            id="instagram"
            name="redesSociais.instagram"
            value={profileData.redesSociais.instagram || ""}
            onChange={handleInputChange}
            placeholder={profileData.redesSociais.instagram || ""}
          />

          <InputLabel>Facebook</InputLabel>
          <InputField
            type="text"
            id="facebook"
            name="redesSociais.facebook"
            value={profileData.redesSociais.facebook || ""}
            onChange={handleInputChange}
            placeholder={profileData.redesSociais.facebook || ""}
          />
        </ProfileForm>

        <ButtonContainer>
          <SaveButton onClick={handleSave}>Salvar</SaveButton>
          <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
        </ButtonContainer>
      </EditProfileContainer>
    </>
  ) : null;
};

export default Editar;
