/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosSearch, IoMdPaper } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import { Modal } from "../../components/Modal";
import { ModalEditUnitiesChildren } from "../../components/ModalEditUnities/editUnities";
import { ModalRecipeChildren } from "../../components/ModalRecipes/addRecipe";
import axios from "../../services/axios";
import GetBossId from "../../services/getBossId";
import GetData from "../../services/getData";
import Register from "../../services/register";
import DoSearch from "../../services/search";
import Update from "../../services/update";
import * as actionsEditUnities from "../../store/modules/editUnitiesData/actions";
import * as actions from "../../store/modules/recipeData/actions";
import {
  NewProduct,
  ProductsContainer,
  ProductsSpace,
  SearchSpace,
} from "./styled";

export default function Products() {
  const headerid = useSelector((state) => state.auth.headerid);
  const emailStored = useSelector((state) => state.auth.emailHeaders);
  const permissions = useSelector((state) => state.auth.permissions);
  const getRecipeDataIfExists = useSelector((state) => state.recipeData);
  const getEditedUnitiesIfExists = useSelector(
    (state) => state.editUnitiesData
  );

  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [lowStock, setLowStock] = useState("");
  const [price, setPrice] = useState("");
  const [unities, setUnities] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [productsDataBackup, setProductsDataBackup] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsBackup, setSearchResultsBackup] = useState([]);
  const searchProduct = document.querySelector(".product-search");
  const [bossId, setBossId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [rerender, setReRender] = useState(false);
  const [openModalId, setOpenModalId] = useState("");
  const [openAddRecipe, setOpenAddRecipe] = useState(false);

  useEffect(() => {
    async function ExecuteGetBossId() {
      const get = await GetBossId(headerid, emailStored);

      if (typeof get === "undefined" || !get) return;

      setBossId(get);
    }

    ExecuteGetBossId();
  }, [bossId, emailStored, headerid]);

  useEffect(() => {
    async function headerIdCheck() {
      try {
        if (!headerid || headerid === "") {
          const bossData = await axios.get(
            `/employees/search/email?value=${emailStored}`
          );
          setEmployeeId(bossData.data.id);
          return;
        }
        setEmployeeId(headerid);
      } catch (e) {
        toast.error("Erro ao verificar id");
      }
    }

    headerIdCheck();
  }, [headerid, emailStored, employee_id]);

  async function GetProducts() {
    if (!employee_id || !permissions) return;

    const productsReq = await GetData(
      bossId,
      "products",
      employee_id,
      permissions,
      null,
      true
    );

    if (typeof productsReq === "undefined" || !productsReq) return;

    setProductsData(productsReq);
    setProductsDataBackup(productsReq);
  }

  useEffect(() => {
    GetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossId, employee_id]);

  useEffect(() => {
    if (rerender === true) GetProducts();
    setReRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const clearDirectExecution = () => {
    setCategory("");
    setName("");
    setUnities("");
    setExpirationDate("");
    setPrice("");
    setLowStock(null);
    setProductsData(productsDataBackup);

    dispatch(actions.clearRecipeData());
    dispatch(actionsEditUnities.clearUpdateUnitiesData());

    if (searchResults.length > 0) setSearchResults(searchResultsBackup);
  };

  const clear = (e) => {
    e.preventDefault();
    clearDirectExecution();
  };

  const ClearSearch = (e) => {
    e.preventDefault();
    setSearchParam("");
    setSearchResults([]);
    searchProduct.value = "";

    const options = document.querySelector(".options");
    options.value = "";
  };

  const HandleChange = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    const permissionVerify = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "SUPPLIES"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para editar produtos necessária");
      return;
    }

    setProductsData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

  const HandleChangeSearch = (e, itemId) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = e.target;

    const permissionVerify = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "SUPPLIES"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para editar produtos necessária");
      return;
    }

    setSearchResults((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, [name]: value } : item
      )
    );
  };

  async function SearchProducts(e) {
    e.preventDefault();

    const inArray = [];

    let search = "";
    let formattedDate = "";

    if (searchParam === "date" || searchParam === "expirationDate") {
      const year = searchProduct.value.slice(6, 10);
      const month = searchProduct.value.slice(3, 5);
      const day = searchProduct.value.slice(0, 2);

      formattedDate = `${year}-${month}-${day}`;

      search = await DoSearch("products", searchParam, formattedDate, null);
    } else {
      search = await DoSearch(
        "products",
        searchParam,
        searchProduct.value,
        null
      );
    }

    if (typeof search === "undefined" || !search) return;

    if (Array.isArray(search)) {
      setSearchResults(search);
      setSearchResultsBackup(search);
      return;
    }

    inArray.push(search);
    setSearchResults(inArray);
    setSearchResultsBackup(inArray);
  }

  const ProductRegister = async (e) => {
    e.preventDefault();

    const permissionVerify = permissions.some(
      (p) => p.action === "CREATE" && p.resource === "PRODUCTS"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para cadastrar produtos necessária");
      return;
    }

    const data = {
      category: document.querySelector("#category").value,
      name: document.querySelector("#name").value,
      price: document.querySelector("#price").value,
      unities: document.querySelector("#unities").value,
      expirationDate: document.querySelector("#expirationDate").value,
      lowStock: document.querySelector("#lowStock").value || null,
      productIngredient: getRecipeDataIfExists.productIngredient || null,
      useStockSupplies: getRecipeDataIfExists.useStockSupplies,
    };

    const year = data.expirationDate.slice(6, 10);
    const month = data.expirationDate.slice(3, 5);
    const day = data.expirationDate.slice(0, 2);

    data.expirationDate = `${year}-${month}-${day}`;
    data.price = data.price.replace(",", ".");

    const register = await Register(data, "products");

    setReRender(register);

    dispatch(actions.clearRecipeData());

    clearDirectExecution();
  };

  const ProductUpdate = async (e, objectData) => {
    e.preventDefault();

    const permissionVerify = permissions.some(
      (p) => p.action === "CREATE" && p.resource === "SUPPLIES"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissão para editar produtos necessária");
      return;
    }

    const decimalRegex = /^\d+(?:[.,]\d+)$/;

    const toNumberFields = [
      "quantity",
      "price",
      "weightPerUnit",
      "totalWeight",
      "lowStock",
    ];

    if (objectData.price) {
      const editPricePermissionVerify = permissions.some(
        (p) => p.action === "EDIT_PRICES" && p.resource === "SUPPLIES"
      );

      if (!editPricePermissionVerify) {
        toast.error("Permissão para editar preços de insumos necessária");
        return;
      }
    }

    toNumberFields.forEach((field) => {
      if (decimalRegex.test(objectData[field])) {
        objectData[field] = objectData[field].replace(",", ".");

        objectData[field] = parseFloat(objectData[field]);

        const parsedValue = parseInt(objectData[field], 10);

        objectData[field] = parsedValue;
      }
    });

    const allData = {
      ...objectData,
      ...getEditedUnitiesIfExists,
    };

    const update = await Update(objectData.id, allData, "products");

    setReRender(update);

    clearDirectExecution();
  };

  return (
    <ProductsContainer>
      <Header />
      <SearchSpace>
        <div className="search-space">
          <button
            type="button"
            size={30}
            className="search-btn"
            onClick={(e) => SearchProducts(e)}
          >
            <IoIosSearch size={25} className="search-icon" />
          </button>
          <input
            type="text"
            placeholder="Pesquisar..."
            className="product-search"
          />
        </div>

        <FaArrowLeft
          size={35}
          className="arrow"
          onClick={(e) => ClearSearch(e)}
        />

        <div className="filter-space">
          <p className="filter-select-label">Filtrar por:</p>
          <select
            name="search-options"
            className="options"
            id="filter-select"
            onChange={(e) => setSearchParam(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="category">Categoria</option>
            <option value="name">Nome</option>
            <option value="expirationDate">Data de validade</option>
            <option value="employee">Funcionário</option>
            <option value="price">Preço</option>
          </select>
        </div>
      </SearchSpace>
      <ProductsSpace>
        {searchResults.length < 1
          ? productsData.map((product) => {
              return (
                <div key={product.id} className="main-data-div" id={product.id}>
                  <div className="data-wrap">
                    <div className="label">Categoria: </div>
                    <input
                      type="text"
                      name="category"
                      className="data-div"
                      value={product.category}
                      onChange={(e) => HandleChange(e, product.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Nome: </div>
                    <input
                      type="text"
                      name="name"
                      className="data-div"
                      value={product.name}
                      onChange={(e) => HandleChange(e, product.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Unidades: </div>
                    <input
                      type="text"
                      name="quantity"
                      className="data-div"
                      value={product.unities}
                      onChange={(e) => HandleChange(e, product.id)}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Validade: </div>
                    <input
                      type="text"
                      name="expirationDate"
                      className="data-div"
                      value={`${product.expirationDate.slice(8, 10)}-${product.expirationDate.slice(5, 7)}-${product.expirationDate.slice(0, 4)}`}
                      onChange={(e) => HandleChange(e, product.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Quantidade mínima: </div>
                    <input
                      type="text"
                      name="lowStock"
                      className="data-div"
                      value={product.lowStock || "Não definido"}
                      onChange={(e) => HandleChange(e, product.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Funcionário: </div>
                    <input
                      type="text"
                      className="data-div"
                      value={product.employee.id}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Preço: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div"
                      value={product.price}
                      onChange={(e) => HandleChange(e, product.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Registrado em: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${product.createdAt.slice(8, 10)}-${product.createdAt.slice(5, 7)}-${product.createdAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Última atualização (data): </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${product.updatedAt.slice(8, 10)}-${product.updatedAt.slice(5, 7)}-${product.updatedAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Última atualização (hora): </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${product.createdAt.slice(11, 13)}:${product.createdAt.slice(14, 16)}:${product.createdAt.slice(17, 19)}`}
                      readOnly
                    />
                  </div>
                  {permissions.some(
                    (p) => p.action === "UPDATE" && p.resource === "PRODUCTS"
                  ) && (
                    <div className="footer">
                      <div className="footer-actions">
                        {product.recipe.length > 0 ? (
                          <button type="button" className="edit-recipe">
                            Editar receita
                          </button>
                        ) : (
                          <>
                            <Modal
                              isOpen={openModalId === `recipe-${product.id}`}
                              onClose={() => setOpenModalId(null)}
                              title={`Vincular receita ao produto ${product.name}`}
                            >
                              <ModalRecipeChildren />
                            </Modal>
                            <button
                              type="button"
                              onClick={() =>
                                setOpenModalId(`recipe-${product.id}`)
                              }
                              className="add-recipe"
                            >
                              Adicionar receita
                            </button>
                          </>
                        )}
                        <Modal
                          isOpen={openModalId === `unities-${product.id}`}
                          onClose={() => setOpenModalId(null)}
                          title={`Editar unidades do produto ${product.name}`}
                        >
                          <ModalEditUnitiesChildren
                            currentUnities={product.unities}
                            savedData={getEditedUnitiesIfExists}
                          />
                        </Modal>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenModalId(`unities-${product.id}`)
                          }
                          className="edit-unities"
                        >
                          Editar unidades
                        </button>
                      </div>
                      <div className="footer-confirm">
                        <button
                          type="button"
                          className="confirm-changes"
                          onClick={(e) => ProductUpdate(e, product)}
                        >
                          Salvar
                        </button>
                        <button
                          type="button"
                          className="cancel-changes"
                          onClick={(e) => clear(e)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          : searchResults.map((product) => {
              return (
                <div key={product.id} className="main-data-div" id={product.id}>
                  <div className="data-wrap">
                    <div className="label">Categoria: </div>
                    <input
                      type="text"
                      name="category"
                      className="data-div"
                      value={product.category}
                      onChange={(e) => HandleChangeSearch(e, product.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Nome: </div>
                    <input
                      type="text"
                      name="name"
                      className="data-div"
                      value={product.name}
                      onChange={(e) => HandleChangeSearch(e, product.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Unidades: </div>
                    <input
                      type="text"
                      name="quantity"
                      className="data-div"
                      value={product.unities}
                      onChange={(e) => HandleChangeSearch(e, product.id)}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Validade: </div>
                    <input
                      type="text"
                      name="expirationDate"
                      className="data-div"
                      value={`${product.expirationDate.slice(8, 10)}-${product.expirationDate.slice(5, 7)}-${product.expirationDate.slice(0, 4)}`}
                      onChange={(e) => HandleChangeSearch(e, product.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Quantidade mínima: </div>
                    <input
                      type="text"
                      name="lowStock"
                      className="data-div"
                      value={product.lowStock || "Não definido"}
                      onChange={(e) => HandleChangeSearch(e, product.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Funcionário: </div>
                    <input
                      type="text"
                      className="data-div"
                      value={product.employee.id}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Preço: </div>
                    <input
                      type="text"
                      name="price"
                      className="data-div"
                      value={product.price}
                      onChange={(e) => HandleChangeSearch(e, product.id)}
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Registrado em: </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${product.createdAt.slice(8, 10)}-${product.createdAt.slice(5, 7)}-${product.createdAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Última atualização (data): </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${product.updatedAt.slice(8, 10)}-${product.updatedAt.slice(5, 7)}-${product.updatedAt.slice(0, 4)}`}
                      readOnly
                    />
                  </div>
                  <div className="data-wrap">
                    <div className="label">Última atualização (hora): </div>
                    <input
                      type="text"
                      name="totalprice"
                      className="data-div"
                      value={`${product.createdAt.slice(11, 13)}:${product.createdAt.slice(14, 16)}:${product.createdAt.slice(17, 19)}`}
                      readOnly
                    />
                  </div>
                  {permissions.some(
                    (p) => p.action === "UPDATE" && p.resource === "PRODUCTS"
                  ) && (
                    <div className="footer">
                      {product.recipe.length > 0 ? (
                        <div className="with-recipe">
                          <button type="button" className="edit-recipe">
                            Editar receita
                          </button>
                        </div>
                      ) : (
                        <div className="without-recipe">
                          <Modal
                            isOpen={openModalId === `recipe-${product.id}`}
                            onClose={() => setOpenModalId(null)}
                            title={`Vincular receita ao produto ${product.name}`}
                          >
                            <ModalRecipeChildren />
                          </Modal>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenModalId(`recipe-${product.id}`)
                            }
                            className="add-recipe"
                          >
                            Adicionar receita
                          </button>
                        </div>
                      )}
                      <Modal
                        isOpen={openModalId === `unities-${product.id}`}
                        onClose={() => setOpenModalId(null)}
                        title={`Editar unidades do produto ${product.name}`}
                      >
                        <ModalEditUnitiesChildren
                          currentUnities={product.unities}
                        />
                      </Modal>
                      <button
                        type="button"
                        onClick={() => setOpenModalId(`unities-${product.id}`)}
                        className="add-recipe"
                      >
                        Editar unidades
                      </button>
                      <button
                        type="button"
                        className="confirm-changes"
                        onClick={(e) => ProductUpdate(e, product)}
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        className="cancel-changes"
                        onClick={(e) => clear(e)}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
      </ProductsSpace>
      <NewProduct>
        <input
          type="text"
          id="category"
          placeholder="Categoria ex: massas"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          id="name"
          placeholder="Nome ex: pastel de frango"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          id="unities"
          placeholder="Unidades ex: 25"
          value={unities || ""}
          onChange={(e) => setUnities(e.target.value)}
        />
        <input
          type="text"
          id="expirationDate"
          placeholder="Validade ex: 25-03-2027"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <input
          type="text"
          id="lowStock"
          placeholder="quantidade mínima ex: 5 (opcional)"
          value={lowStock || ""}
          onChange={(e) => setLowStock(e.target.value)}
        />
        <input
          type="text"
          id="price"
          placeholder="Preço unitário ex: 10.90"
          value={price || ""}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="button" className="btn" onClick={clear}>
          Cancelar
        </button>
        <button
          type="button"
          className="btn"
          onClick={(e) => ProductRegister(e)}
        >
          Adicionar
        </button>
        <Modal
          isOpen={openAddRecipe}
          onClose={() => setOpenAddRecipe(false)}
          title={`Vincular receita ao produto ${name}`}
        >
          <ModalRecipeChildren />
        </Modal>
        <button
          type="button"
          className="add-recipe-btn"
          onClick={() => setOpenAddRecipe(true)}
        >
          <IoMdPaper className="recipe-icon" />
          Adicionar receita
        </button>
      </NewProduct>
    </ProductsContainer>
  );
}
