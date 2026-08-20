import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as actions from "../../store/modules/editUnitiesDataSupplies/actions";
import { ModalEditUnitiesSuppliesContainer } from "./editUnitiesSuppliesStyled";

export function ModalEditUnitiesSuppliesChildren({ quantityProp, savedData }) {
  const dispatch = useDispatch();

  const [unities, setUnities] = useState(
    savedData?.quantity > 0 ? savedData.quantity : quantityProp
  );
  const [reason, setReason] = useState(savedData?.reason || "");
  const [details, setDetails] = useState(savedData?.details || "");
  const [subQuantityWarn, setSubQuantityWarn] = useState(false);

  useEffect(() => {
    if (Number(unities) < quantityProp) {
      setSubQuantityWarn(true);
    } else {
      setSubQuantityWarn(false);
    }
  }, [quantityProp, subQuantityWarn, unities]);

  const Cancel = (e) => {
    e.preventDefault();

    setUnities(quantityProp);
    setDetails("");
    setReason("");

    dispatch(actions.clearUpdateUnitiesSupplyData());
  };

  const SaveUnitiesEdit = (e) => {
    e.preventDefault();

    if (!reason) {
      toast.error("Motivo não especificado");
      return;
    }

    if (Number(unities) < quantityProp) {
      toast.error("Saídas não devem ser registradas nesta página");
      return;
    }

    if (unities === quantityProp) {
      toast.info("Nenhuma mudança detectada");
      return;
    }

    const editUnitiesSupplyData = {
      quantity: unities,
      reason,
      details: details || "",
    };

    dispatch(
      actions.editUnitiesSupply({
        ...editUnitiesSupplyData,
      })
    );

    toast.success("Mudanças salvas");
  };

  return (
    <ModalEditUnitiesSuppliesContainer>
      <div className="unities-wrapper">
        <p className="current-unities-label">Quantidade: </p>
        <input
          type="number"
          className="current-unities"
          onChange={(e) => setUnities(e.target.value)}
          value={unities}
        />
        {subQuantityWarn && (
          <p className="sub-quantity-warn">
            Saídas de insumos devem ser feitas na página de saídas
          </p>
        )}
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
          <option value="entrada">entrada</option>
          <option value="reposicao">reposição</option>
          <option value="ajuste">ajuste</option>
          <option value="doacao">doação</option>
          <option value="correcao de perda">correção de perda</option>
          <option value="outro">outro</option>
        </select>

        <div className="details-wrapper">
          <p className="details-label">Notas: </p>
          <textarea
            type=""
            className="details"
            rows={50}
            cols={120}
            onChange={(e) => setDetails(e.target.value)}
            value={details}
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
    </ModalEditUnitiesSuppliesContainer>
  );
}

ModalEditUnitiesSuppliesChildren.defaultProps = {
  savedData: {},
};

ModalEditUnitiesSuppliesChildren.propTypes = {
  quantityProp: PropTypes.number.isRequired,
  savedData: PropTypes.objectOf(PropTypes.string || PropTypes.number),
};
