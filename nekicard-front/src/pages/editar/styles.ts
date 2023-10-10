import styled from "styled-components";

export const EditProfileContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

export const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export const InputLabel = styled.label`
  margin-top: 10px;
  font-weight: bold;
  color: ${(props) => props.theme["gray-200"]}; 
`;

export const InputField = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  border: none;
  font-weight: bold;
  color: ${(props) => props.theme["gray-300"]}; 
  background-color: ${(props) => props.theme["gray-700"]}; 
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const SaveButton = styled.button`
  background-color: ${(props) => props.theme["green-300"]}; 
  color: ${(props) => props.theme["white"]}; 
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  background-color: ${(props) => props.theme["gray-600"]}; 
  color: ${(props) => props.theme["white"]}; 
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;