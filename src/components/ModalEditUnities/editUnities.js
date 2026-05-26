import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/modules/editUnitiesData/actions";
import { ModalEditUnitiesContainer } from "./editUnitiesStyled";

export function ModalEditUnitiesChildren({ currentUnities }) {
  const getEditedUnitiesIfExists = useSelector(
    (state) => state.editUnitiesData
  );

  const dispatch = useDispatch();

  const [unities, setUnities] = useState(currentUnities);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [difference, setDifference] = useState("LessThan");
  const originalUnities = currentUnities;

  useEffect(() => {
    if (originalUnities < unities) setDifference("MoreThan");
  }, [unities, originalUnities]);

  useEffect(() => {
    if (Object.values(getEditedUnitiesIfExists).every((value) => !value))
      // eslint-disable-next-line no-useless-return
      return;

    function SetValues() {
      if (getEditedUnitiesIfExists.addUnities > 0) {
        setUnities((prev) => prev + getEditedUnitiesIfExists.addUnities);
        setReason(getEditedUnitiesIfExists.addUnitiesReason);
      }

      if (getEditedUnitiesIfExists.takeUnities > 0) {
        setUnities((prev) => prev + getEditedUnitiesIfExists.takeUnities);
        setReason(getEditedUnitiesIfExists.takeUnitiesReason);
      }

      if (getEditedUnitiesIfExists.notes) {
        setNotes(getEditedUnitiesIfExists.notes);
      }
    }

    SetValues();
  }, [getEditedUnitiesIfExists]);

  const Cancel = (e) => {
    e.preventDefault();

    setUnities(originalUnities);
    setNotes("");
    setReason("");
    setDifference("LessThan");

    dispatch(actions.clearUpdateUnitiesData());
  };

  const SaveUnitiesEdit = (e) => {
    e.preventDefault();

    dispatch(
      actions.editUnities({
        addUnities: unities || 0,
        takeUnities: unities || 0,
        addUnitiesReason: reason || "",
        takeUnitiesReason: reason || "",
        notes: notes || "",
      })
    );
  };

  return (
    <ModalEditUnitiesContainer>
      <div className="unities-wrapper">
        <p className="current-unities-label">Unidades: </p>
        <input
          type="number"
          className="current-unities"
          onChange={(e) => setUnities(e.target.value)}
          value={unities}
        />
      </div>

      <div className="reason-wrapper">
        <p className="reason-label">Motivo: </p>

        {difference === "LessThan" ? (
          <select
            name="search-options"
            className="options"
            id="filter-select"
            onChange={(e) => setReason(e.target.value)}
            value={reason}
          >
            <option value="">Selecionar motivo</option>
            <option value="vencido">vencido</option>
            <option value="perdido">perdido</option>
            <option value="danificado">danificado</option>
            <option value="roubado">roubado</option>
            <option value="desperdício">desperdício</option>
            <option value="venda">venda</option>
            <option value="outro">outro</option>
          </select>
        ) : (
          <select
            name="search-options"
            className="options"
            id="filter-select"
            onChange={(e) => setReason(e.target.value)}
            value={reason}
          >
            <option value="">Selecionar motivo</option>
            <option value="compra de fornecedor">compra de fornecedor</option>
            <option value="ajuste de inventario">ajuste de inventario</option>
            <option value="devolucao">devolucao</option>
            <option value="correcao de erro">correcao de erro</option>
            <option value="outro">outro</option>
          </select>
        )}

        <div className="notes-wrapper">
          <p className="notes-label">Notas: </p>
          <textarea
            type=""
            className="notes"
            rows={50}
            cols={120}
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            readOnly={reason === "other"}
          />
        </div>
      </div>

      <div className="buttons-wrapper">
        <button
          type="button"
          className="save-btn"
          onClick={(e) => SaveUnitiesEdit(e)}
        >
          Salvar
        </button>
        <button type="button" className="cancel-btn" onClick={(e) => Cancel(e)}>
          Cancelar
        </button>
      </div>
    </ModalEditUnitiesContainer>
  );
}

ModalEditUnitiesChildren.propTypes = {
  currentUnities: PropTypes.number.isRequired,
};
