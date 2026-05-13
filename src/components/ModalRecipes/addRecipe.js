/* eslint-disable jsx-a11y/control-has-associated-label */
import { get } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../services/axios";
import { ModalRecipeContainer } from "./addRecipeStyled";

export function ModalRecipeChildren() {
  const [inputSearchValue, setInputSearchValue] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [quantity, setQuantity] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const recipeItems = [];

  // Exibindo as receitas conforme for salvando e botão de cancelar para limpar os campos (pesquisa e quantidade)
  useEffect(() => {
    if (!inputSearchValue.trim()) {
      setSearchResults([]); // ← fecha o dropdown se apagar o texto
      return;
    }

    async function SearchSupply() {
      const inArray = [];

      try {
        const searchSupply = await axios.get(
          `/supplies/search/name?limit=20&offset=0&value=${inputSearchValue}&supplyType=SUPPLY_REAL_TIME&forDisplay=true`
        );

        const results = searchSupply.data[1];

        if (typeof results === "undefined" || !results) return;

        if (Array.isArray(results)) {
          setSearchResults(results);
          return;
        }

        inArray.push(results);
        setSearchResults(inArray);
      } catch (err) {
        const errors = get(err, "response.data.message", []);

        if (err) {
          if (errors.length > 0) toast.error(errors);
        }
      }
    }

    SearchSupply();
  }, [inputSearchValue]);

  const AddToRecipe = (e, supply) => {
    e.preventDefault();
    recipeItems.push(supply);
  };

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
            <li key={item.id} className="search-dropdown-item">
              <button type="button" onClick={(e) => AddToRecipe(e, item)} />
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
