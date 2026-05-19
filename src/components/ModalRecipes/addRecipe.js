/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Decimal from "decimal.js";
import { get } from "lodash";
import { useEffect, useRef, useState } from "react";
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
  const [useStockSupplies, setUseStockSupplies] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [supplyData, setSupplyData] = useState({});
  const [recipeItemsToShow, setRecipeItemsToShow] = useState([]);
  const [recipeItemsToShowFromRedux, setRecipeItemsToShowFromRedux] = useState(
    []
  );

  const isSelecting = useRef(false);

  // Exibindo as receitas conforme for salvando e botão de cancelar para limpar os campos (pesquisa e quantidade)
  useEffect(() => {
    if (isSelecting.current) {
      isSelecting.current = false; // ← reseta a flag e pula a busca
      return;
    }

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
          if (errors.length > 0) console.log(errors);
        }
      }
    }

    SearchSupply();
  }, [inputSearchValue]);

  useEffect(() => {
    if (getRecipeDataIfExists.productIngredient.length < 1) return;
    setRecipeItemsToShowFromRedux(getRecipeDataIfExists.productIngredient);
  }, [getRecipeDataIfExists]);

  const ClerDirectExecution = () => {
    setQuantity("");
    setInputSearchValue("");
    setSearchResults([]);
    setUnitOrWeight("");
    setRecipeItemsToShow([]);
    setRecipeItemsToShowFromRedux([]);
    setUseStockSupplies(false);
  };

  const PartialClerDirectExecution = () => {
    setQuantity("");
    setInputSearchValue("");
    setSearchResults([]);
    setUnitOrWeight("");
    setRecipeItemsToShow([]);
  };

  const AddToRecipe = (e, supply) => {
    e.preventDefault();
    isSelecting.current = true;

    setSupplyData(supply);
    setInputSearchValue(supply.name);
    setSearchResults([]);
  };

  const SaveRecipe = (e) => {
    e.preventDefault();

    dispatch(actions.recipeData({ recipeItemsToShow, useStockSupplies }));

    PartialClerDirectExecution();
  };

  const ClearRecipe = (e) => {
    e.preventDefault();

    dispatch(actions.clearRecipeData());

    ClerDirectExecution();
  };

  const DeleteItem = (e, itemData) => {
    e.preventDefault();

    const localRITS = [...recipeItemsToShow];

    const findItemIndex = localRITS.findIndex(
      (i) => i.quantity === itemData.quantity && i.name === itemData.name
    );

    localRITS.splice(findItemIndex);

    setRecipeItemsToShow([...localRITS]);
  };

  const HandleUseStockSupplies = () => {
    setUseStockSupplies((prev) => {
      const nextValue = prev === false;
      return nextValue;
    });
  };

  function PreSave(e) {
    e.preventDefault();

    if (!quantity || !unitOrWeight) {
      toast.error("Quantidade ou unidade não especificados");
      return;
    }

    let formattedQuantity = "";

    // eslint-disable-next-line default-case
    switch (unitOrWeight) {
      case "unidades":
        const unities = new Decimal(quantity);
        const toGrams = unities.mul(supplyData.weightPerUnit).toString();
        formattedQuantity = toGrams;
        break;

      case "g":
      case "ml":
        formattedQuantity = quantity;
        break;

      case "kg":
      case "L":
        const currentFormat = new Decimal(quantity);
        const toGramUnit = currentFormat.mul(1000);
        formattedQuantity = toGramUnit;
    }

    const recipeItemsToShowData = {
      supplyId: supplyData.id,
      name: supplyData.name,
      quantity: formattedQuantity,
      unit: unitOrWeight,
    };

    setRecipeItemsToShow((prev) => [...prev, recipeItemsToShowData]);
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

      <div className="quantity-wrapper">
        <p className="quantity-label">Quantidade:</p>
        <div className="filter-space">
          <select
            name="search-options"
            className="options"
            id="filter-select"
            onChange={(e) => setUnitOrWeight(e.target.value)}
            value={unitOrWeight}
          >
            <option value="">Selecionar medida</option>
            <option value="unidades">unidade</option>
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
          value={quantity}
        />
      </div>

      <div className="supply-list-wrapper">
        {recipeItemsToShow.length > 0
          ? recipeItemsToShow.map((item) => {
              return (
                <div key={item.id} className="supply-list">
                  <div className="data-wrap">
                    <div className="name">{item.name}</div>
                    <div className="quantity">{item.quantity}</div>
                    <div className="unit-type">{item.unit}</div>
                    <button
                      type="button"
                      className="delete"
                      onClick={(e) => DeleteItem(e, item)}
                    >
                      <p className="delete-icon">✕</p>
                    </button>
                  </div>
                </div>
              );
            })
          : recipeItemsToShowFromRedux.map((item) => {
              return (
                <div key={item.id} className="supply-list">
                  <div className="data-wrap">
                    <div className="name">{item.name}</div>
                    <div className="quantity">{item.quantity}</div>
                    <div className="unit-type">{item.unit}</div>
                    <button
                      type="button"
                      className="delete"
                      onClick={(e) => DeleteItem(e, item)}
                    >
                      <p className="delete-icon">✕</p>
                    </button>
                  </div>
                </div>
              );
            })}
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
        <input
          type="checkbox"
          className="use-stock-supplies"
          onChange={HandleUseStockSupplies}
          value={useStockSupplies}
        />
        <p className="use-stock-supplies-label">Usar insumos em estoque</p>
      </div>

      <button type="button" className="save" onClick={(e) => SaveRecipe(e)}>
        Salvar
      </button>
    </ModalRecipeContainer>
  );
}
