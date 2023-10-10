import { ThemeProvider } from "styled-components";
import Rotas from "./services/Routes";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { FormProvider } from "./contexts/FormContext";

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <FormProvider>
          <Rotas />
        </FormProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
