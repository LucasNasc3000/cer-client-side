import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as actions from "../../store/modules/editSalesStatus/actions";
import { ModalEditSalesStatusContainer } from "./editSalesStyled";

export function ModalEditSalesStatusChildren({ status }) {
  const getUpdateSalesStatusDataIfExists = useSelector(
    (state) => state.editSalesStatus
  );

  const dispatch = useDispatch();

  const [statusState, setStatusState] = useState(status);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [returnToStock, setReturnToStock] = useState(false);

  useEffect(() => {
    if (
      !getUpdateSalesStatusDataIfExists ||
      Object.values(getUpdateSalesStatusDataIfExists).every((v) => !v)
    )
      return;

    // eslint-disable-next-line default-case
    switch (true) {
      case getUpdateSalesStatusDataIfExists.status:
        setStatusState(getUpdateSalesStatusDataIfExists.status);
        break;

      case getUpdateSalesStatusDataIfExists.reason:
        setReason(getUpdateSalesStatusDataIfExists.reason);
        break;

      case getUpdateSalesStatusDataIfExists.notes:
        setNotes(getUpdateSalesStatusDataIfExists.notes);
        break;

      case getUpdateSalesStatusDataIfExists.returnToStock:
        setReturnToStock(getUpdateSalesStatusDataIfExists.returnToStock);
        break;
    }
  }, [getUpdateSalesStatusDataIfExists]);

  const Cancel = (e) => {
    e.preventDefault();

    setNotes("");
    setReason("");
    setStatusState(status);
    setReturnToStock(false);

    dispatch(actions.clearUpdateSalesStatusData());
  };

  const HandleReturnToStock = () => {
    setReturnToStock((prev) => {
      const nextValue = prev === false;
      return nextValue;
    });
  };

  const SaveSalesStatusEdit = (e) => {
    e.preventDefault();

    if (!reason) {
      toast.error("Motivo não especificado");
      return;
    }

    const editSalesStatusData = {
      reason,
      status: statusState,
      notes: notes || "",
      returnToStock,
    };

    console.log(editSalesStatusData);

    dispatch(
      actions.editSalesStatus({
        ...editSalesStatusData,
      })
    );

    toast.success("Edição de status de venda salva");
  };

  return (
    <ModalEditSalesStatusContainer>
      <div className="status-wrapper">
        <p className="status-label">Status: </p>
        <select
          name="search-options"
          className="options-status"
          id="filter-select"
          onChange={(e) => setStatusState(e.target.value)}
          value={statusState}
        >
          <option value="">Selecionar status</option>
          <option value="finalizada">Finalizada</option>
          <option value="cancelada">Cancelada</option>
          <option value="pendente">Pendente</option>
        </select>
      </div>

      <div className="reason-wrapper">
        <p className="reason-label">Motivo: </p>
        <select
          name="search-options"
          className="options"
          id="filter-select"
          onChange={(e) => setReason(e.target.value)}
          value={reason}
        >
          <option value="">Selecionar motivo</option>
          <option value="perdido">perdido</option>
          <option value="cancelado pelo cliente">cancelado pelo cliente</option>
          <option value="cliente nao pagou">cliente nao pagou</option>
          <option value="atraso na entrega">atraso na entrega</option>
          <option value="cliente trocou de produto">
            cliente trocou de produto
          </option>
          <option value="pedido nao chegou ao cliente">
            pedido nao chegou ao cliente
          </option>
          <option value="produto com estoque insuficiente">
            produto com estoque insuficiente
          </option>
          <option value="outro">outro</option>
        </select>

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
          onClick={(e) => SaveSalesStatusEdit(e)}
        >
          Salvar
        </button>
        <button type="button" className="cancel-btn" onClick={(e) => Cancel(e)}>
          Cancelar
        </button>
        <input
          type="checkbox"
          className="use-stock-supplies"
          onChange={HandleReturnToStock}
          value={returnToStock}
        />
        <p className="return-to-stock-label">Devolver produtos ao estoque</p>
      </div>
    </ModalEditSalesStatusContainer>
  );
}

ModalEditSalesStatusChildren.propTypes = {
  status: PropTypes.string.isRequired,
};
