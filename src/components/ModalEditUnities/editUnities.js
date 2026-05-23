import PropTypes from "prop-types";
import { useState } from "react";
import { ModalEditUnitiesContainer } from "./editUnitiesStyled";

export function ModalEditUnitiesChildren({ currentUnities }) {
  const [unities, setUnities] = useState(currentUnities);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [difference, setDifference] = useState("LessThan");
  const originalUnities = currentUnities;

  if (originalUnities < unities) setDifference("MoreThan");

  return (
    <ModalEditUnitiesContainer>
      <p className="current-unities-label">Unidades: </p>
      <input
        type="number"
        className="current-unities"
        onChange={(e) => setUnities(e.target.value)}
        value={unities}
      />

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
      <button type="button" className="save-btn">
        Salvar
      </button>
      <button type="button" className="cancel-btn">
        Cancelar
      </button>
    </ModalEditUnitiesContainer>
  );
}

ModalEditUnitiesChildren.propTypes = {
  currentUnities: PropTypes.number.isRequired,
};
