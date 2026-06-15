/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Decimal from "decimal.js";
import { get } from "lodash";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../services/axios";
import * as actions from "../../store/modules/addIngredientsData/actions";
import { ModalAddIngredientsContainer } from "./addIngredientsStyled";

export function ModalAddIngredientsChildren({ productData }) {
  const getIngredientsDataIfExists = useSelector(
    (state) => state.addIngredients
  );

  const dispatch = useDispatch();

  const [inputSearchValue, setInputSearchValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitOrWeight, setUnitOrWeight] = useState("");
  const [useStockSupplies, setUseStockSupplies] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [supplyData, setSupplyData] = useState({});
  const [ingredientsToShow, setIngredientsToShow] = useState([]);
  const [ingredientsToShowFromRedux, setIngredientsToShowFromRedux] = useState(
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
    if (getIngredientsDataIfExists.addProductIngredient.length < 1) return;
    setIngredientsToShowFromRedux(
      getIngredientsDataIfExists.addProductIngredientToShow
    );
  }, [getIngredientsDataIfExists]);

  const ClerDirectExecution = () => {
    setQuantity("");
    setInputSearchValue("");
    setSearchResults([]);
    setUnitOrWeight("");
    setIngredientsToShow([]);
    setIngredientsToShowFromRedux([]);
    setUseStockSupplies(false);
  };

  const PartialClerDirectExecution = () => {
    setQuantity("");
    setInputSearchValue("");
    setSearchResults([]);
    setUnitOrWeight("");
    setIngredientsToShow([]);
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

    const formattedData = [];

    // eslint-disable-next-line array-callback-return
    ingredientsToShow.map((i) => {
      formattedData.push({
        supplyId: i.supplyId,
        productId: productData.id,
        quantity: i.quantity,
      });
    });

    dispatch(
      actions.addIngredients({
        addProductIngredient: formattedData,
        addProductIngredientToShow: ingredientsToShow,
      })
    );

    PartialClerDirectExecution();

    toast.success("Receita salva");
  };

  const ClearRecipe = (e) => {
    e.preventDefault();

    dispatch(actions.clearAddIngredients());

    ClerDirectExecution();
  };

  const DeleteItem = (e, itemData) => {
    e.preventDefault();

    const localRITS = [...ingredientsToShow];

    const findItemIndex = localRITS.findIndex(
      (i) => i.quantity === itemData.quantity && i.name === itemData.name
    );

    localRITS.splice(findItemIndex);

    setIngredientsToShow([...localRITS]);
  };

  const HandleUseStockSupplies = () => {
    setUseStockSupplies((prev) => {
      const nextValue = prev === false;
      return nextValue;
    });
  };

  function PreSave(e) {
    e.preventDefault();

    if (
      !quantity ||
      !unitOrWeight ||
      Object.values(supplyData).every((value) => !value)
    ) {
      toast.error(
        "Quantidade ou unidade não especificados ou insumos não escolhidos"
      );
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

    const ingredientsToShowData = {
      supplyId: supplyData.id,
      name: supplyData.name,
      quantity: formattedQuantity,
      unit: unitOrWeight,
    };

    setIngredientsToShow((prev) => [...prev, ingredientsToShowData]);
  }

  return (
    <ModalAddIngredientsContainer>
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
        {ingredientsToShow.length > 0
          ? ingredientsToShow.map((item) => {
              return (
                <div key={item.supplyId} className="supply-list">
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
          : ingredientsToShowFromRedux.map((item) => {
              return (
                <div key={item.supplyId} className="supply-list">
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
      </div>

      <button type="button" className="save" onClick={(e) => SaveRecipe(e)}>
        Salvar
      </button>
    </ModalAddIngredientsContainer>
  );
}

ModalAddIngredientsChildren.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  productData: PropTypes.objectOf(PropTypes.string || PropTypes.number)
    .isRequired,
};
