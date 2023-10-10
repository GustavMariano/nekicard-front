import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 12px;
  background-color: ${props => props.theme["gray-600"]};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  width: 400px;
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  align-self: flex-start;
  color: ${props => props.theme["gray-300"]};
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: ${props => props.theme["gray-800"]};
  border: none;
  border-bottom: 1px solid ${props => props.theme["green-500"]}; 
  border-radius: 5px;
  color: ${props => props.theme["gray-300"]};
`;

export const FormButton = styled.button`
  background-color: ${props => props.theme["green-500"]};
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme["green-700"]};
  }
`;

