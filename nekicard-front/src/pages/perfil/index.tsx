import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../services/Api";
import {
  ProfileWrapper,
  ProfileImage,
  ProfileName,
  ProfileEmail,
  ProfileInfo,
  ProfileLabel,
  ProfileLink,
} from "./styles";
import Header from "../../components/header";

interface ProfileData {
  id: number;
  email: string;
  nomeCompleto: string;
  nomeSocial: string | null;
  dataNasc: string;
  foto: string;
  telefone: string;
  redesSociais: {
    linkedin: string;
    github: string;
    instagram: string;
    facebook: string;
  };
}

const Perfil = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Api.get<ProfileData>(`http://localhost:8080/perfil/${id}`)
      .then((response) => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do perfil:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Header />
      <ProfileWrapper>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {profileData && (
              <>
                <ProfileImage src={profileData.foto} alt={`Foto de ${profileData.nomeCompleto}`} />
                <ProfileName>{profileData.nomeCompleto}</ProfileName>
                <ProfileEmail>{profileData.email}</ProfileEmail>
                <ProfileInfo>
                  {profileData.nomeSocial !== null && profileData.nomeSocial !== "" && (
                    <p>
                      <ProfileLabel>Nome Social:</ProfileLabel> {profileData.nomeSocial}
                    </p>
                  )}
                  {profileData.dataNasc !== null && profileData.dataNasc !== "" && (
                    <p>
                      <ProfileLabel>Data de Nascimento:</ProfileLabel>{" "}
                      {new Date(profileData.dataNasc).toLocaleDateString()}
                    </p>
                  )}
                  {profileData.telefone !== null && profileData.telefone !== "" && (
                    <p>
                      <ProfileLabel>Telefone:</ProfileLabel> {profileData.telefone}
                    </p>
                  )}
                  <ul>
                    {profileData.redesSociais.linkedin !== null && profileData.redesSociais.linkedin !== "" && (
                      <li>
                        <ProfileLabel>LinkedIn:</ProfileLabel>{" "}
                        <ProfileLink href={`${profileData.redesSociais.linkedin}`} target="_blank" rel="noopener noreferrer">
                          {profileData.redesSociais.linkedin}
                        </ProfileLink>
                      </li>
                    )}
                    {profileData.redesSociais.github !== null && profileData.redesSociais.github !== "" && (
                      <li>
                        <ProfileLabel>Github:</ProfileLabel>{" "}
                        <ProfileLink href={`${profileData.redesSociais.github}`} target="_blank" rel="noopener noreferrer">
                          {profileData.redesSociais.github}
                        </ProfileLink>
                      </li>
                    )}
                    {profileData.redesSociais.instagram !== null && profileData.redesSociais.instagram !== "" && (
                      <li>
                        <ProfileLabel>Instagram:</ProfileLabel>{" "}
                        <ProfileLink href={`${profileData.redesSociais.instagram}`} target="_blank" rel="noopener noreferrer">
                          {profileData.redesSociais.instagram}
                        </ProfileLink>
                      </li>
                    )}
                    {profileData.redesSociais.facebook !== null && profileData.redesSociais.facebook !== "" && (
                      <li>
                        <ProfileLabel>Facebook:</ProfileLabel>{" "}
                        <ProfileLink href={`${profileData.redesSociais.facebook}`} target="_blank" rel="noopener noreferrer">
                          {profileData.redesSociais.facebook}
                        </ProfileLink>
                      </li>
                    )}
                  </ul>
                </ProfileInfo>
              </>
            )}
          </>
        )}
      </ProfileWrapper>
    </>
  );
};

export default Perfil;
