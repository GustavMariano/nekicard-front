import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme["gray-600"]};
  color: ${props => props.theme["white"]};
  padding: 10px 20px;
  margin-bottom: 30px;
`;

export const Logo = styled.div`
  img {
    max-width: 100px;
  }
  outline: none;
`;

export const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid ${(props) => props.theme['green-300']};
  color: ${(props) => props.theme['green-300']};
  padding: 15px 30px; 
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px; 
  font-weight: bold;
  transition: transform 0.2s ease; 

  &:hover {
    background-color: ${props => props.theme["green-300"]};
    background: ${(props) => props.theme['green-300']};
    border-color: ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme['white']};
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export const CreateProfileButton = styled.button`
  background-color: ${props => props.theme["green-300"]};
  border: 1px solid ${(props) => props.theme['green-300']};
  color: ${(props) => props.theme['white']};
  padding: 15px 30px; 
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px; 
  font-weight: bold;
  transition: transform 0.2s ease; 

  &:hover {
    color: ${(props) => props.theme['white']};
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }
  &:hover {
    transform: scale(1.05);
  }
`;