import styled from "styled-components";

export const CardWrapper = styled.div`
  background-color: ${(props) => props.theme["gray-600"]};
  border-radius: 8px;
  display: grid;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  width: calc(33.33% - 40px); /* Definindo largura responsiva com margem */
  min-width: 250px; /* Largura mínima para evitar que os cartões fiquem muito estreitos */
  flex: 1; /* Permite que os cartões se expandam para preencher o espaço disponível */
  overflow: hidden; /* Evita que o conteúdo interno transborde */
  transition: transform 0.2s ease; /* Adiciona uma transição suave */

  &:hover {
    transform: scale(1.05); /* Efeito de escala ao passar o mouse */
  }

  @media (max-width: 768px) {
    width: calc(50% - 40px); /* Duas colunas em telas menores */
  }

  @media (max-width: 480px) {
    width: calc(100% - 40px); /* Uma coluna em telas ainda menores */
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px; /* Defina a altura desejada para todas as imagens */
  object-fit: cover; /* Mantém a proporção e corta o excesso para preencher o espaço */
  border-radius: 8px 8px 0 0;
`;



export const CardDetails = styled.div`
  padding: 20px;
`;

export const CardName = styled.h2`
  font-size: 18px;
  margin: 0;
  color: ${(props) => props.theme["gray-100"]};
`;

export const CardEmail = styled.p`
  color: ${(props) => props.theme["gray-400"]};
  font-size: 14px;
  margin: 5px 0;
`;

export const CardButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  button {
    padding: 5px 10px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      opacity: 0.9;
    }

    &:first-child {
      margin-right: 5px;
      background-color: ${(props) => props.theme["gray-800"]};

      &:hover {
        background-color: ${(props) => props.theme["green-300"]};
      }
    }

    &:last-child {
      background-color: ${(props) => props.theme["red-500"]};

      &:hover {
        background-color: ${(props) => props.theme["red-700"]};
      }
    }
  }
`;