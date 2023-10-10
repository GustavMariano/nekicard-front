import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Card from "../../components/card";
import Header from "../../components/header";
import {
  HomeContainer,
  StyledLink,
  CardWrapper,
  SearchFormContainer,
  SearchInput,
} from "./styles";
import { Api } from "../../services/Api";
import { useNavigate } from "react-router-dom"; // Importe useHistory

interface CardData {
  id: number;
  nomeCompleto: string;
  email: string;
  foto: string;
}

export default function Home() {
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<CardData[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    Api.get<{ content: CardData[] }>("http://localhost:8080/perfil", config)
      .then((response) => {
        setCardData(response.data.content);
        setFilteredData(response.data.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      const filteredResults = cardData.filter((card) =>
        card.nomeCompleto.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filteredResults);
    };

    handleSearch();
  }, [searchQuery, cardData]);

  const navigateToEditProfile = (profileId: number) => {
    navigate(`/editar/perfil/${profileId}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return isAuthenticated ? (
    <>
      <Header />
      <SearchFormContainer>
        <BsSearch size={20} />
        <SearchInput
          type="text"
          placeholder="Pesquisar por nome"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchFormContainer>
      <HomeContainer>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {filteredData.map((card) => (
              <StyledLink to={`/perfil/${card.id}`} key={card.id}>
                <CardWrapper>
                  <Card
                    name={card.nomeCompleto}
                    email={card.email}
                    photoUrl={card.foto}
                    id={card.id.toString()}
                    onDelete={() => console.log("Excluir clicado")}
                    onEdit={() => navigateToEditProfile(card.id)}
                  />
                </CardWrapper>
              </StyledLink>
            ))}
          </>
        )}
      </HomeContainer>
    </>
  ) : null;
}
