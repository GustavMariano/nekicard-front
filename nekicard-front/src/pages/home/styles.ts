import { Link } from "react-router-dom";
import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 20px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  flex: 0 0 calc(33.33% - 20px);
  max-width: calc(33.33% - 20px);
  box-sizing: border-box;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const SearchFormContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center; /* Centralize verticalmente */
  max-width: 30vw;
  margin: 0 auto; /* Centralize horizontalmente */
  padding: 0 10px;
  margin-bottom: 60px; /* Adicione algum espaçamento nas laterais se necessário */

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border-radius: 6px;
  border: 0;
  background: ${(props) => props.theme['gray-900']};
  color: ${(props) => props.theme['gray-300']};
  padding: 1rem;

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  border: 0;
  padding: 1rem;
  background: transparent;
  border: 1px solid ${(props) => props.theme['green-300']};
  color: ${(props) => props.theme['green-300']};
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-300']};
    border-color: ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme['white']};
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }
`;