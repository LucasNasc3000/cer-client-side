import { useEffect, useState } from "react";
import DoSearch from "../../services/search";
import { ModalRecipeContainer } from "./addRecipeStyled";

export function ModalRecipeChildren() {
  const [inputSearchValue, setInputSearchValue] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [quantity, setQuantity] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [chosenSupply, setChosenSupply] = useState({});

  // Exibindo as receitas conforme for salvando e botão de cancelar para limpar os campos (pesquisa e quantidade)
  useEffect(() => {
    if (!inputSearchValue.trim()) {
      setSearchResults([]); // ← fecha o dropdown se apagar o texto
      return;
    }

    async function SearchSupply() {
      const inArray = [];

      const searchSupply = await DoSearch(
        "supplies",
        "name",
        inputSearchValue,
        "SUPPLY_REAL_TIME"
      );

      if (typeof searchSupply === "undefined" || !searchSupply) return;

      if (Array.isArray(searchSupply)) {
        setSearchResults(searchSupply);
        return;
      }

      inArray.push(searchSupply);
      setSearchResults(inArray);
    }

    SearchSupply();
  }, [inputSearchValue]);

  return (
    <ModalRecipeContainer>
      <input
        type="text"
        className="input-search"
        onChange={(e) => setInputSearchValue(e.target.value)}
      />

      {searchResults.length > 0 && (
        <ul className="search-dropdown">
          {searchResults.map((item) => (
            <li
              key={item.id}
              className="search-dropdown-item"
              onClick={() => setChosenSupply(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}

      <input type="text" onChange={(e) => setQuantity(e.target.value)} />
      <button type="button">Salvar</button>
    </ModalRecipeContainer>
  );
}
