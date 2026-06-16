/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { get, isArray } from "lodash";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../services/axios";
import { GetChangedFields } from "../../utils/GetChangedFields";
import { ModalEditRecipeContainer } from "./editRecipeStyled";

export function ModalEditRecipeChildren({ productId }) {
  const [recipeData, setRecipeData] = useState([]);
  const [recipeDataBackup, setRecipeDataBackup] = useState([]);
  const [originalRecipeData, setOriginalRecipeData] = useState({});

  useEffect(() => {
    async function SearchIngredient() {
      try {
        const searchIngredient = await axios.get(
          `/products/search/recipe?limit=20&offset=0&value=${productId}&forDisplay=false`
        );

        const results = searchIngredient.data[1];

        if (typeof results === "undefined" || !results) return;

        setRecipeData(results);
        setRecipeDataBackup(results);
        setOriginalRecipeData(
          Object.fromEntries(
            results.map((ingredient) => [ingredient.id, { ...ingredient }])
          )
        );
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
  }, [recipeData, productId]);

  const DeleteItem = (e, ingredient) => {
    e.preventDefault();

    const localRecipeData = [...recipeData];

    const findItemIndex = localRecipeData.findIndex(
      (i) => i.id === ingredient.id
    );

    localRecipeData.splice(findItemIndex);

    setRecipeData([...localRecipeData]);
  };

  const ClearDirectExecution = () => {
    setRecipeData(recipeDataBackup);
  };

  const Save = (e, objectData) => {
    e.preventDefault();

    const current = recipeData.find((p) => p.id === objectData.id);
    const original = originalRecipeData[objectData.id];

    const changedFields = GetChangedFields(original, current);

    // Colocar o changed fields no reduces com dispatch aqui
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

  return (
    <ModalEditRecipeContainer>
      <div className="ingredient-list-wrapper">
        {recipeData.map((ingredient) => {
          return (
            <div key={ingredient.id} className="data-wrap">
              <div className="name">{ingredient.supplyRealTime.name}</div>
              <input
                type="text"
                className="quantity"
                value={ingredient.quantity}
                onChange={(e) => HandleChange(e, ingredient.id)}
              />
              <button
                type="button"
                className="delete"
                onClick={(e) => DeleteItem(e, ingredient.id)}
              >
                <p className="delete-icon">✕</p>
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
