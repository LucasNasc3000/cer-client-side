/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { get, isArray } from "lodash";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { LuSave } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../services/axios";
import * as actions from "../../store/modules/recipeEdit/actions";
import { ModalEditRecipeContainer } from "./editRecipeStyled";

export function ModalEditRecipeChildren({ productId }) {
  const getRecipeEditedDataIfExists = useSelector((state) => state.recipeEdit);

  const dispatch = useDispatch();

  const [recipeData, setRecipeData] = useState([]);
  const [recipeDataBackup, setRecipeDataBackup] = useState([]);
  const [preSavedIngredients, setPreSavedIngredients] = useState([]);
  const [originalRecipeData, setOriginalRecipeData] = useState({});

  const hasFetched = useRef(false);
  const deletedIngredients = useRef([]);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    async function SearchIngredient() {
      try {
        const searchIngredient = await axios.get(
          `/products/search/recipe?limit=20&offset=0&value=${productId}&forDisplay=false`
        );

        const results = searchIngredient.data[1];

        if (typeof results === "undefined" || !results) return;

        if (
          getRecipeEditedDataIfExists.updateProductIngredientToShow.length > 0
        ) {
          setRecipeData(
            getRecipeEditedDataIfExists.updateProductIngredientToShow
          );
        } else {
          setRecipeData(results);
        }

        setRecipeDataBackup(results);
      } catch (err) {
        const errors = get(err, "response.data.message", []);

        if (err) {
          // eslint-disable-next-line default-case
          switch (true) {
            case err instanceof TypeError:
              toast.error("Erro de tratamento de dados");
              break;

            case errors.length > 0:
              if (!isArray(errors)) {
                toast.error(errors);
                break;
              }

              errors.map((error) => toast.error(error));
              break;

            case err && errors.length < 1:
              toast.error("Erro desconhecido ao tentar buscar produto");
              break;
          }
        }
      }
    }

    SearchIngredient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DeleteItem = (e, ingredient) => {
    e.preventDefault();

    setRecipeData((prevData) =>
      prevData.map((data) => {
        if (data.id === ingredient.id) {
          data.isActive = false;
        }
        return data;
      })
    );

    const localRecipeData = [...recipeData];

    const findItemIndex = localRecipeData.findIndex(
      (i) => i.id === ingredient.id
    );

    const deleted = localRecipeData.splice(findItemIndex, 1);

    deletedIngredients.current.push(...deleted);

    setRecipeData(localRecipeData);
  };

  const ClearDirectExecution = () => {
    setRecipeData(recipeDataBackup);
    dispatch(actions.clearRecipeEdit());
  };

  const Save = (e) => {
    e.preventDefault();

    const formattedData = [];
    const formattedDataDeletedIngredients = [];

    recipeData.map((i) => {
      formattedData.push({
        id: i.id,
        supplyId: i.supplyRealTime.id,
        quantity: i.quantity,
        disableIngredient: !i.isActive,
      });
    });

    deletedIngredients.current.map((i) => {
      formattedDataDeletedIngredients.push({
        id: i.id,
        supplyId: i.supplyRealTime.id,
        quantity: i.quantity,
        disableIngredient: !i.isActive,
      });
    });

    formattedData.push(...formattedDataDeletedIngredients);

    dispatch(actions.recipeEdit({ formattedData }));

    toast.success("Alterações salvas");
  };

  const Clear = (e) => {
    e.preventDefault();
    ClearDirectExecution();
  };

  const HandleChange = (e, ingredientId) => {
    const { name, value } = e.target;

    setRecipeData((prevData) =>
      prevData.map((item) =>
        item.id === ingredientId ? { ...item, [name]: value } : item
      )
    );
  };

  const PreSave = (e, ingredientData) => {
    e.preventDefault();
    dispatch(actions.recipeEditPreSave({ preSavedData: recipeData }));
  };

  // Caso se queira cancelar antes ou depois de salvar
  const Cancel = (e, ingredientId) => {
    e.preventDefault();

    const findElementBackup = recipeDataBackup.find(
      (i) => i.id === ingredientId
    );

    if (!findElementBackup) return;

    setRecipeData((prevData) =>
      prevData.map((data) =>
        data.id === ingredientId ? { ...findElementBackup } : data
      )
    );
  };

  return (
    <ModalEditRecipeContainer>
      <div className="ingredient-list-wrapper">
        {recipeData.map((ingredient) => {
          return (
            <div key={ingredient.id} className="data-wrap">
              <div className="name">{ingredient.supplyRealTime.name}</div>
              <input
                type="number"
                className="quantity"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => HandleChange(e, ingredient.id)}
              />
              <button
                type="button"
                className="delete"
                onClick={(e) => DeleteItem(e, ingredient)}
              >
                <MdOutlineDelete className="delete-icon" />
              </button>
              <button
                type="button"
                className="save"
                onClick={(e) => PreSave(e, ingredient)}
              >
                <LuSave className="save-icon" />
              </button>
              <button
                type="button"
                className="cancel"
                onClick={(e) => Cancel(e, ingredient.id)}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      <div className="button-wrapper">
        <button type="button" className="add" onClick={(e) => Save(e)}>
          Adicionar
        </button>
        <button type="button" className="cancel" onClick={(e) => Clear(e)}>
          Cancelar
        </button>
      </div>
    </ModalEditRecipeContainer>
  );
}

ModalEditRecipeChildren.propTypes = {
  productId: PropTypes.string.isRequired,
};
