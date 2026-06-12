/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from "prop-types";
import { ModalShowSaleItemsContainer } from "./showSaleItemsStyled";

export function ModalShowSaleItemsChildren({ saleItems }) {
  return (
    <ModalShowSaleItemsContainer>
      <div className="items-list-wrapper">
        {saleItems.map((item) => {
          return (
            <div key={item.id} className="items-list">
              <div className="name">{item.product.name}</div>
              <div className="quantity">{item.quantity}</div>
              <div className="price-at-sale">{item.priceAtSale}</div>
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
