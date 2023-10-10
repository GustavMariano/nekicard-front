import { AxiosError } from "axios";
import { Api } from "../../services/Api";
import ToastError from "../toasts/ToastError";
import ToastSuccess from "../toasts/ToastSuccess";
import { ToastContainer } from "react-toastify";
import {
  CardWrapper,
  CardImage,
  CardDetails,
  CardName,
  CardEmail,
  CardButtons,
} from "./styles";

interface CardProps {
  name: string;
  email: string;
  photoUrl: string;
  onEdit: () => void;
  onDelete: () => void;
  id: string;
}

const Card: React.FC<CardProps> = ({ name, email, photoUrl, onEdit, id }) => {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onEdit();
  };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  
    const confirmation = window.confirm("Tem certeza de que deseja excluir este perfil?");
  
    if (confirmation) {
      try {
        const token = localStorage.getItem("token");
        const response = await Api.delete(`/perfil/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
  
        if (response.status === 204) {
          ToastSuccess({ message: "Perfil excluído com sucesso!" });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          ToastError({ message: "Falha ao excluir o perfil." });
        }
      } catch (error) {
        if (error && (error as AxiosError)?.response?.status === 403) {
          ToastError({ message: "Erro de autenticação" });
        } else {
          ToastError({ message: "Erro ao excluir o perfil." });
        }
      }
    }
  };

  return (
    <CardWrapper>
      <ToastContainer />
      <CardImage src={photoUrl} alt={`Foto de ${name}`} />
      <CardDetails>
        <CardName>{name}</CardName>
        <CardEmail>{email}</CardEmail>
        <CardButtons>
          <button onClick={handleEditClick}>Editar</button>
          <button onClick={handleDeleteClick}>Excluir</button>
        </CardButtons>
      </CardDetails>
    </CardWrapper>
  );
};

export default Card;
