/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { get, isArray } from "lodash";
import { IoIosSave } from "react-icons/io";

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../services/axios";
import Register from "../../services/register";
import Update from "../../services/update";
import { ModalPlatformsContainer } from "./platformsStyled";

export function ModalPlatformsChildren({ employeeId }) {
  const permissions = useSelector((state) => state.auth.permissions);

  const [platforms, setPlatforms] = useState([]);
  const [platformsBackup, setPlatformsBackup] = useState([]);
  const [platformName, setPlatformName] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [originalPlatforms, setOriginalPlatforms] = useState({});
  const [rerender, setReRender] = useState(false);

  const hasFetched = useRef(false);
  const deletedIngredients = useRef([]);

  function CheckPermissions(actionRequired) {
    const permissionVerify = permissions.some(
      (p) => p.action === actionRequired && p.resource === "PLATFORMS"
    );

    const permissionVerifyAdmin = permissions.some(
      (p) => p.action === "UPDATE" && p.resource === "EMPLOYEES"
    );

    if (!permissionVerify && !permissionVerifyAdmin) {
      toast.error("Permissões para plataformas necessárias");
    }
  }

  async function SearchPlatforms() {
    CheckPermissions("READ");

    try {
      const searchPlatforms = await axios.get(
        `/platforms/search/employee?limit=20&offset=0&value=${employeeId}&forDisplay=true`
      );

      const results = searchPlatforms.data[1];

      if (typeof results === "undefined" || !results) return;

      setPlatforms(results);
      setPlatformsBackup(results);
    } catch (err) {
      const errors = get(err, "response.data.message", []);

      switch (true) {
        case err instanceof TypeError:
          toast.error("Erro de tratamento de dados");
          break;

        case errors.length > 0:
          if (!isArray(errors)) {
            toast.error(errors);
          } else {
            errors.map((error) => toast.error(error));
          }
          break;

        default:
          toast.error("Erro desconhecido ao buscar plataformas cadastradas");
          break;
      }
    }
  }

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    SearchPlatforms();

    hasFetched.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (rerender === true) {
      hasFetched.current = true;

      SearchPlatforms();

      hasFetched.current = false;
    }

    setReRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  const PlatformDelete = async (e, ingredient) => {
    e.preventDefault();

    CheckPermissions("DELETE");

    try {
      await axios.delete(`/platforms/${ingredient.id}`);
      setReRender(true);
    } catch (err) {
      const errors = get(err, "response.data.message", []);

      switch (true) {
        case err instanceof TypeError:
          toast.error("Erro de tratamento de dados");
          break;

        case errors.length > 0:
          if (!isArray(errors)) {
            toast.error(errors);
          } else {
            errors.map((error) => toast.error(error));
          }
          break;

        default:
          toast.error("Erro desconhecido ao tentar excluir plataforma");
          break;
      }
    }
  };

  const ClearDirectExecution = () => {
    setPlatforms(platformsBackup);
  };

  const PlatformRegister = async (e) => {
    e.preventDefault();

    CheckPermissions("CREATE");

    const data = {
      name: platformName,
      taxPercentage,
    };

    const register = await Register(data, "platforms");

    toast.success(`${platformName} adicionado`);

    setReRender(true);
  };

  const PlatformUpdate = async (e, platformData) => {
    e.preventDefault();

    console.log(platformData);
    console.log(Object.keys(platformData).length);

    if (Object.keys(platformData).length === 0) {
      toast.info("Nenhuma alteração detectada");
    }

    const update = await Update(platformData.id, platformData, "platforms");

    if (update) setReRender(true);
  };

  const Clear = (e) => {
    e.preventDefault();
    ClearDirectExecution();
  };

  const HandleChange = (e, ingredientId) => {
    const { name, value } = e.target;

    CheckPermissions("UPDATE");

    setPlatforms((prevData) =>
      prevData.map((item) =>
        item.id === ingredientId ? { ...item, [name]: value } : item
      )
    );
  };

  const Cancel = (e, ingredientId) => {
    e.preventDefault();

    const findElementBackup = platformsBackup.find(
      (i) => i.id === ingredientId
    );

    if (!findElementBackup) return;

    setPlatforms((prevData) =>
      prevData.map((data) =>
        data.id === ingredientId ? { ...findElementBackup } : data
      )
    );
  };

  return (
    <ModalPlatformsContainer>
      <div className="platform-name-wrapper">
        <p className="current-platform-name-label">Nome: </p>
        <input
          type="text"
          className="platform-name"
          onChange={(e) => setPlatformName(e.target.value)}
          value={platformName}
        />
      </div>

      <div className="tax-percentage-wrapper">
        <p className="current-tax-percentage-label">Nome: </p>
        <input
          type="text"
          className="tax-percentage"
          onChange={(e) => setTaxPercentage(e.target.value)}
          value={taxPercentage}
        />
      </div>

      <div className="platform-list-wrapper">
        {platforms.map((platform) => {
          return (
            <div key={platform.id} className="data-wrap">
              <div className="name">{platform.name}</div>
              <input
                type="text"
                className="tax-percentage"
                name="taxPercentage"
                value={platform.taxPercentage}
                onChange={(e) => HandleChange(e, platform.id)}
              />
              <button
                type="button"
                className="save"
                onClick={(e) => PlatformUpdate(e, platform)}
              >
                <IoIosSave className="save-icon" />
              </button>
              <button
                type="button"
                className="delete"
                onClick={(e) => PlatformDelete(e, platform)}
              >
                <MdOutlineDelete className="delete-icon" />
              </button>
              <button
                type="button"
                className="cancel"
                onClick={(e) => Cancel(e, platform.id)}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      <div className="button-wrapper">
        <button
          type="button"
          className="add"
          onClick={(e) => PlatformRegister(e)}
        >
          Salvar
        </button>
        <button type="button" className="cancel" onClick={(e) => Clear(e)}>
          Cancelar
        </button>
      </div>
    </ModalPlatformsContainer>
  );
}

ModalPlatformsChildren.propTypes = {
  employeeId: PropTypes.string.isRequired,
};
