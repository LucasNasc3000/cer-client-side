/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Decimal from "decimal.js";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../services/axios";
import { ModalRecipeContainer } from "./addRecipeStyled";

export function ModalRecipeChildren() {
  const [inputSearchValue, setInputSearchValue] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [quantity, setQuantity] = useState("");
  const [unitOrWeight, setUnitOrWeight] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const recipeItems = [];
  const recipeItemsToShow = [];

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

  // Converter unidades inteiras (segundo funcionários) para gramas (backend aceita)

  const ClerDirectExecution = () => {
    setQuantity("");
    setInputSearchValue("");
    setSearchResults([]);
  };

  const AddToRecipe = (e, supply) => {
    let formattedQuantity = "";

    // eslint-disable-next-line default-case
    switch (unitOrWeight) {
      case !unitOrWeight:
        toast.error("Tipo de quantidade não selecionada");
        return;

      case "unit":
        const unities = new Decimal(quantity);
        const toGrams = unities.mul(supply.weightPerUnit).toString();
        formattedQuantity = toGrams;
        break;

      case "g" || "ml":
        formattedQuantity = quantity;
        break;

      case "kg" || "L":
        const currentFormat = new Decimal(quantity);
        const toGramUnit = currentFormat.mul(1000);
        formattedQuantity = toGramUnit;
    }

    e.preventDefault();
    recipeItems.push({
      supplyId: supply.id,
      quantity: formattedQuantity,
    });

    recipeItemsToShow.push({
      supplyId: supply.id,
      name: supply.name,
      quantity: formattedQuantity,
    });

    ClerDirectExecution();
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

      <div className="filter-space">
        <p className="filter-select-label">Selecionar medida:</p>
        <select
          name="search-options"
          className="options"
          id="filter-select"
          onChange={(e) => setUnitOrWeight(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="unit">unidade</option>
          <option value="g">g</option>
          <option value="ml">ml</option>
          <option value="kg">kg</option>
          <option value="L">L</option>
        </select>
      </div>

      {recipeItemsToShow.length > 0 &&
        recipeItemsToShow.map((item) => (
          <div className="supply-list">
            <div className="label">insumo:</div>
            <div className="name">{item.name}</div>
            <div className="label">quantidade</div>
            <div className="quantity">
              {item.quantity + unitOrWeight !== "unit" && unitOrWeight}
            </div>
          </div>
        ))}

      <input type="text" onChange={(e) => setQuantity(e.target.value)} />
      <button type="button">Adicionar</button>
      <button type="button">Cancelar</button>
      <button type="button">Salvar</button>
    </ModalRecipeContainer>
  );
}
