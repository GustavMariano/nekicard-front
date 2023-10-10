import logoImage from "../../assets/LogoNeki-1.png";
import {
  HeaderContainer,
  Logo,
  LogoutButton,
  CreateProfileButton,
} from "./styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { ModalCriarPerfil } from "../modalcriarperfil";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isHome = location.pathname === "/home";

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/home">
          <img src={logoImage} alt="Logo" />
        </Link>
      </Logo>
      {isHome && (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <CreateProfileButton>Criar Novo Perfil</CreateProfileButton>
          </Dialog.Trigger>
          <ModalCriarPerfil/>
        </Dialog.Root>
      )}
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </HeaderContainer>
  );
};

export default Header;
