import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  background-color: ${(props) => props.theme["gray-700"]};
  padding: 20px;
  border-radius: 18px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  margin-top: 20vh;
`;

export const ProfileImage = styled.img`
  width: 150px; /* Defina a largura desejada para a imagem */
  height: 150px; /* Defina a altura desejada para a imagem */
  max-width: 100%; /* Evita que a imagem se estique além da largura máxima definida */
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
`;

export const ProfileName = styled.h1`
  font-size: 24px;
  margin: 0;
  ${(props) => props.theme["white"]};
`;

export const ProfileEmail = styled.p`
  font-size: 18px;
  margin: 10px 0;
  ${(props) => props.theme['white']};
  padding-bottom: 15px;
  border-bottom: 2px solid ${(props) => props.theme['gray-600']}; /* Cor do border-bottom */
`;

export const ProfileInfo = styled.div`
  text-align: center;
  margin-top: 20px;
  ${(props) => props.theme['white']};

  ul {
    list-style: none;  
    padding: 0;  
  }
`;

export const ProfileLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
  ${(props) => props.theme["white"]};
`;

export const ProfileLink = styled.a`
  color: ${(props) => props.theme["green-300"]};  
  text-decoration: none;  
  margin-right: 10px;  
  display: inline-block;

  &:hover {
    color: ${(props) => props.theme["blue-500"]}; 
  }
`;