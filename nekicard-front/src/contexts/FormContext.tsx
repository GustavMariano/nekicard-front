import { createContext, useContext, useState, ReactNode } from 'react';

interface FormData {
  email: string;
  nomeCompleto: string;
  nomeSocial: string | null;
  dataNasc: string;
  foto: string;
  telefone: string | null;
  linkedin: string;
  github: string;
  instagram: string;
  facebook: string;
}

interface FormContextType {
  formData: FormData;
  updateFormData: (field: string, value: string | null) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}

interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    nomeCompleto: '',
    nomeSocial: null,
    dataNasc: '',
    foto: '',
    telefone: null,
    linkedin: '',
    github: '',
    instagram: '',
    facebook: '',
  });

  const updateFormData = (field: string, value: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
}
