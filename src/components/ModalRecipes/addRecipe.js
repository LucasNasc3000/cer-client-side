/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Decimal from "decimal.js";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../services/axios";
import * as actions from "../../store/modules/recipeData/actions";
import { ModalRecipeContainer } from "./addRecipeStyled";

export function ModalRecipeChildren() {
  const getRecipeDataIfExists = useSelector((state) => state.recipeData);

  const dispatch = useDispatch();

  const [inputSearchValue, setInputSearchValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitOrWeight, setUnitOrWeight] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [supplyData, setSupplyData] = useState({});
  const [recipeItemsToShow, setRecipeItemsToShow] = useState([]);
  const recipeItems = [];
  const searchInput = document.querySelector(".input-search");

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

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (Object.keys(getRecipeDataIfExists).length < 1) return;

    setRecipeItemsToShow({ ...getRecipeDataIfExists });
  }, [getRecipeDataIfExists, recipeItemsToShow]);

  const ClerDirectExecution = () => {
    setQuantity("");
    setInputSearchValue("");
    setSearchResults([]);
  };

  const AddToRecipe = (e, supply) => {
    e.preventDefault();

    setSupplyData(supply);
    setInputSearchValue(supply.name);
    setSearchResults([]);

    setSearchResults([]);
  };

  const SaveRecipe = (e) => {
    e.preventDefault();

    dispatch(actions.recipeData({ recipeItemsToShow }));

    ClerDirectExecution();
  };

  const ClearRecipe = (e) => {
    e.preventDefault();

    dispatch(actions.clearRecipeData());

    ClerDirectExecution();
  };

  function PreSave(e) {
    e.preventDefault();

    let formattedQuantity = "";

    // eslint-disable-next-line default-case
    switch (unitOrWeight) {
      case !unitOrWeight:
        toast.error("Tipo de quantidade não selecionada");
        return;

      case "unit":
        const unities = new Decimal(quantity);
        const toGrams = unities.mul(supplyData.weightPerUnit).toString();
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

    recipeItems.push({
      supplyId: supplyData.id,
      quantity: formattedQuantity,
    });

    setRecipeItemsToShow({
      supplyId: supplyData.id,
      name: supplyData.name,
      quantity: formattedQuantity,
    });
  }

  return (
    <ModalRecipeContainer>
      <div className="search-wrapper">
        <p className="input-label">Insumo:</p>
        <input
          type="text"
          className="input-search"
          onChange={(e) => setInputSearchValue(e.target.value)}
          value={inputSearchValue}
        />

        {searchResults.length > 0 && (
          <ul className="search-dropdown">
            {searchResults.map((item) => (
              <li key={item.id} className="search-dropdown-item">
                <button
                  type="button"
                  className="item-button"
                  onClick={(e) => AddToRecipe(e, item)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        )}
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

      <div className="quantity-wrapper">
        <p className="quantity-label">Quantidade:</p>
        <div className="filter-space">
          <select
            name="search-options"
            className="options"
            id="filter-select"
            onChange={(e) => setUnitOrWeight(e.target.value)}
          >
            <option value="">Selecionar medida</option>
            <option value="unit">unidade</option>
            <option value="g">g</option>
            <option value="ml">ml</option>
            <option value="kg">kg</option>
            <option value="L">L</option>
          </select>
        </div>
        <input
          type="text"
          className="input-quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="button-wrapper">
        <button type="button" className="add" onClick={(e) => PreSave(e)}>
          Adicionar
        </button>
        <button
          type="button"
          className="cancel"
          onClick={(e) => ClearRecipe(e)}
        >
          Cancelar
        </button>
      </div>

      <button type="button" className="save" onClick={(e) => SaveRecipe(e)}>
        Salvar
      </button>
    </ModalRecipeContainer>
  );
}
