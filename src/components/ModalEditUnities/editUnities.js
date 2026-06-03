import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as actions from "../../store/modules/editUnitiesData/actions";
import { ModalEditUnitiesContainer } from "./editUnitiesStyled";

// adicionar as props do objeto inteiro
export function ModalEditUnitiesChildren({ currentUnities, savedData }) {
  const dispatch = useDispatch();

  const [unities, setUnities] = useState(
    savedData?.addUnities > 0
      ? currentUnities + savedData.addUnities
      : currentUnities - (savedData?.takeUnities || 0)
  );
  const [reason, setReason] = useState(
    savedData?.addUnitiesReason || savedData?.takeUnitiesReason || ""
  );
  const [notes, setNotes] = useState(savedData?.notes || "");
  const [difference, setDifference] = useState("LessThan");
  const [useStockSupplies, setUseStockSupplies] = useState(false);

  const originalUnities = currentUnities;

  useEffect(() => {
    if (Number(originalUnities) < Number(unities)) {
      setDifference("MoreThan");
    } else {
      setDifference("LessThan");
    }
  }, [unities, originalUnities]);

  useEffect(() => {
    if (!savedData || Object.values(savedData).every((v) => !v)) return;

    if (savedData.addUnities > 0) {
      setUnities(currentUnities + savedData.addUnities);
      setReason(savedData.addUnitiesReason);
    } else if (savedData.takeUnities > 0) {
      setUnities(currentUnities - savedData.takeUnities);
      setReason(savedData.takeUnitiesReason);
    }

    if (savedData.notes) setNotes(savedData.notes);
  }, [savedData, currentUnities]);

  const Cancel = (e) => {
    e.preventDefault();

    setUnities(originalUnities);
    setNotes("");
    setReason("");
    setDifference("LessThan");

    dispatch(actions.clearUpdateUnitiesData());
  };

  const HandleUseStockSupplies = () => {
    setUseStockSupplies((prev) => {
      const nextValue = prev === false;
      return nextValue;
    });
  };

  const SaveUnitiesEdit = (e) => {
    e.preventDefault();

    if (!reason) {
      toast.error("Motivo não especificado");
      return;
    }

    if (unities === originalUnities) {
      toast.error("Unidades não editadas");
      return;
    }

    const editUnitiesData = {
      addUnities: 0,
      takeUnities: 0,
      addUnitiesReason: "",
      takeUnitiesReason: "",
      notes: notes || "",
      useStockSupplies,
    };

    if (difference === "MoreThan") {
      editUnitiesData.addUnities = unities - originalUnities;
      editUnitiesData.addUnitiesReason = reason;
    }

    if (difference === "LessThan") {
      editUnitiesData.takeUnities = originalUnities - unities;
      editUnitiesData.takeUnitiesReason = reason;
    }

    dispatch(
      actions.editUnities({
        ...editUnitiesData,
      })
    );

    toast.success("Edição de unidades salva");
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
        <input
          type="checkbox"
          className="use-stock-supplies"
          onChange={HandleUseStockSupplies}
          value={useStockSupplies}
          disabled={difference !== "MoreThan"}
        />
        <p
          className={
            difference === "MoreThan"
              ? "use-stock-supplies-label"
              : "use-stock-supplies-label-disabled"
          }
        >
          Usar insumos em estoque
        </p>
      </div>
    </ModalEditUnitiesContainer>
  );
}

ModalEditUnitiesChildren.defaultProps = {
  savedData: {},
};

ModalEditUnitiesChildren.propTypes = {
  currentUnities: PropTypes.number.isRequired,
  savedData: PropTypes.objectOf(PropTypes.string || PropTypes.number),
};
