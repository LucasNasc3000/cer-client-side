/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Decimal from "decimal.js";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { ModalShowSaleItemsContainer } from "./showSaleItemsStyled";

export function ModalShowSaleItemsChildren({ saleItems }) {
  const GetTotalPricePerItem = (item) => {
    try {
      const decimalQuantity = new Decimal(item.quantity);
      return decimalQuantity.mul(item.priceAtSale).toString();
    } catch (error) {
      toast.error("Não foi possível obter o preço total por item da venda");
      // eslint-disable-next-line consistent-return, no-useless-return
      return;
    }
  };

  return (
    <ModalShowSaleItemsContainer>
      <div className="items-list-wrapper">
        {saleItems.map((item) => {
          return (
            <div key={item.id} className="data-wrap">
              <div className="name">{item.product.name}</div>
              <div className="quantity">{item.quantity}</div>
              <div className="price-at-sale">{item.priceAtSale}</div>
              <div className="total-price-per-item">
                {GetTotalPricePerItem(item)}
              </div>
            </div>
          );
        })}
      </div>
    </ModalShowSaleItemsContainer>
  );
}

ModalShowSaleItemsChildren.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  saleItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};
