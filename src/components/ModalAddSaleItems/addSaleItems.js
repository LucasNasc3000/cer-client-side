/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { get } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../services/axios";
import * as actions from "../../store/modules/saleItems/actions";
import { ModalAddSaleItemsContainer } from "./addSaleItemsStyled";

export function ModalAddSaleItemsChildren() {
  const getSaleItemsIfExists = useSelector((state) => state.saleItems);

  const dispatch = useDispatch();

  const [inputSearchValue, setInputSearchValue] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [productData, setProductData] = useState({});
  const [saleItemsToShow, setSaleItemsToShow] = useState([]);
  const [saleItemsToShowFromRedux, setSaleItemsToShowFromRedux] = useState([]);

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

    async function SearchProduct() {
      const inArray = [];

      try {
        const searchProduct = await axios.get(
          `/products/search/name?limit=20&offset=0&value=${inputSearchValue}&productType=PRODUCT&forDisplay=true`
        );

        const results = searchProduct.data[1];

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

    SearchProduct();
  }, [inputSearchValue]);

  useEffect(() => {
    if (getSaleItemsIfExists.saleItems.length < 1) return;
    setSaleItemsToShowFromRedux(getSaleItemsIfExists.saleItemsToShow);
  }, [getSaleItemsIfExists]);

  const ClerDirectExecution = () => {
    setQuantity("");
    setInputSearchValue("");
    setSearchResults([]);
    setSaleItemsToShow([]);
    setSaleItemsToShowFromRedux([]);
  };

  const PartialClerDirectExecution = () => {
    setQuantity("");
    setInputSearchValue("");
    setSearchResults([]);
    setSaleItemsToShow([]);
  };

  const AddItem = (e, product) => {
    e.preventDefault();
    isSelecting.current = true;

    setProductData(product);
    setInputSearchValue(product.name);
    setSearchResults([]);
  };

  const SaveItems = (e) => {
    e.preventDefault();

    const formattedData = [];

    // eslint-disable-next-line array-callback-return
    saleItemsToShow.map((i) => {
      formattedData.push({
        product: i.product,
        quantity: i.quantity,
      });
    });

    dispatch(actions.saleItems({ formattedData, saleItemsToShow }));

    PartialClerDirectExecution();

    toast.success("Itens salvos");
  };

  const Clear = (e) => {
    e.preventDefault();

    dispatch(actions.clearSaleItems());

    ClerDirectExecution();
  };

  const DeleteItem = (e, itemData) => {
    e.preventDefault();

    const localSITS = [...saleItemsToShow];

    const findItemIndex = localSITS.findIndex(
      (i) => i.quantity === itemData.quantity && i.name === itemData.name
    );

    localSITS.splice(findItemIndex);

    setSaleItemsToShow([...localSITS]);
  };

  function PreSave(e) {
    e.preventDefault();

    if (!quantity || Object.values(productData).every((value) => !value)) {
      toast.error("Quantidade não especificada ou produto não escolhido");
      return;
    }

    const saleItemsToShowData = {
      product: productData.id,
      name: productData.name,
      quantity,
    };

    setSaleItemsToShow((prev) => [...prev, saleItemsToShowData]);
  }

  return (
    <ModalAddSaleItemsContainer>
      <div className="search-wrapper">
        <p className="input-label">Produto:</p>
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
                  onClick={(e) => AddItem(e, item)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="quantity-wrapper">
        <input
          type="number"
          className="input-quantity"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
      </div>

      <div className="product-list-wrapper">
        {saleItemsToShow.length > 0
          ? saleItemsToShow.map((item) => {
              return (
                <div key={item.productId} className="product-list">
                  <div className="data-wrap">
                    <div className="name">{item.name}</div>
                    <div className="quantity">{item.quantity}</div>
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
          : saleItemsToShowFromRedux.map((item) => {
              return (
                <div key={item.productId} className="product-list">
                  <div className="data-wrap">
                    <div className="name">{item.name}</div>
                    <div className="quantity">{item.quantity}</div>
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
        <button type="button" className="cancel" onClick={(e) => Clear(e)}>
          Cancelar
        </button>
      </div>

      <button type="button" className="save" onClick={(e) => SaveItems(e)}>
        Salvar
      </button>
    </ModalAddSaleItemsContainer>
  );
}
