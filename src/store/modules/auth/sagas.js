/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { get, isArray } from "lodash";
import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
// eslint-disable-next-line import/no-cycle
import axios from "../../../services/axios";
import history from "../../../services/history";
import { callWithCsrfRetry } from "../../../utils/CallWithCsrfRetry";
import * as csrfActions from "../csrfToken/actions";
import * as types from "../types";
import * as actions from "./actions";

// O call chama uma função (pode ser normal ou geradora) que retorna uma promise (aqui são os dados do usuário e o token)
// O put dispara uma ação
// eslint-disable-next-line require-yield

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, "/auth", payload);

    yield put(actions.loginSuccess({ ...response.data }));

    yield put(csrfActions.fetchCsrfToken());

    toast.success("Logado");

    const { permissions } = response.data;

    // eslint-disable-next-line array-callback-return
    permissions.map((p) => {
      // eslint-disable-next-line default-case
      switch (true) {
        case p.resource === "EMPLOYEES":
          return history.push("/home");

        case p.resource === "supplies":
          return history.push("/inputs");

        case p.resource === "outflows":
          return history.push("/outputs");

        case p.resource === "sales":
          return history.push("/sales");
      }
    });
  } catch (e) {
    yield put(actions.loginFailure());
  }
}

// Esta função atualiza dos dados do usuário
// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const {
    name,
    email,
    password,
    adminpassword,
    permission,
    address_allowed,
    boss,
  } = payload;

  try {
    yield call(callWithCsrfRetry, axios.post, "/employees", {
      name,
      email,
      password,
      adminpassword,
      permission,
      address_allowed,
      boss,
    });
    toast.success("Funcionário registrado com sucesso");

    yield put(
      actions.registerCreatedSuccess({
        name,
        email,
        password,
        adminpassword,
        permission,
        address_allowed,
        boss,
      })
    );
  } catch (err) {
    const errors = get(err, "response.data.error", []);

    if (err) {
      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      }

      if (err && errors.length < 1) {
        toast.error("Erro desconhecido ao tentar cadastrar novo funcionário");
      }
    }

    yield put(actions.registerFailure());
  }
}

function* updateRequest({ payload }) {
  try {
    const { name, email, password } = payload;

    const truthyFields = Object.fromEntries(
      // eslint-disable-next-line array-callback-return
      Object.entries(payload).filter(
        // eslint-disable-next-line no-unused-vars
        ([key, value]) => payload[key] !== ""
      )
    );

    yield call(callWithCsrfRetry, axios.patch, "/employees/update/self", {
      ...truthyFields,
    });

    if (email.length > 0) {
      toast.success("Dados atualizados com sucesso. Faça login novamente");
      yield put(actions.loginFailure());
      return;
    }

    toast.success("Dados atualizados com sucesso");

    yield put(actions.updatedSuccess({ name, password }));
  } catch (err) {
    const errors = get(err, "response.data.message", []);

    if (err) {
      // eslint-disable-next-line default-case
      switch (true) {
        case err instanceof TypeError:
          toast.error("Erro de tratamento de dados");
          break;

        case errors.length > 0:
          if (!isArray(errors)) {
            toast.error(errors);
            return;
          }

          errors.map((error) => toast.error(error));
          break;

        case err && errors.length < 1:
          toast.error("Erro desconhecido ao tentar atualizar dados");
          break;
      }
    }
  }
}

// function* adminUpdateRequest({ payload }) {
//   try {
//     const { id, permissionEdit, bossEdit, alEdit } = payload;
//     const boss = bossEdit;
//     const permission = permissionEdit;
//     const address_allowed = alEdit;

//     if (!id) {
//       toast.error("Erro ao tentar atualizar os dados, id necessário");
//       return;
//     }

//     switch (true) {
//       case permission.length > 0 &&
//         boss.length < 1 &&
//         address_allowed.length < 1:
//         yield call(axios.put, `/employees/${id}`, {
//           permission,
//         });
//         break;

//       case boss.length > 0 &&
//         permission.length < 1 &&
//         address_allowed.length < 1:
//         yield call(axios.put, `/employees/${id}`, {
//           boss,
//         });
//         break;

//       case address_allowed.length > 0 &&
//         boss.length < 1 &&
//         permission.length < 1:
//         yield call(axios.put, `/employees/${id}`, {
//           address_allowed,
//         });
//         break;

//       case boss.length > 0 &&
//         address_allowed.length > 0 &&
//         permission.length < 1:
//         yield call(axios.put, `/employees/${id}`, {
//           boss,
//           address_allowed,
//         });
//         break;

//       case boss.length > 0 &&
//         permission.length > 0 &&
//         address_allowed.length < 1:
//         yield call(axios.put, `/employees/${id}`, {
//           boss,
//           permission,
//         });
//         break;

//       case permission.length > 0 &&
//         address_allowed.length > 0 &&
//         boss.length < 1:
//         yield call(axios.put, `/employees/${id}`, {
//           permission,
//           address_allowed,
//         });
//         break;

//       default:
//         yield call(axios.put, `/employees/${id}`, {
//           boss,
//           permission,
//           address_allowed,
//         });
//         break;
//     }

//     toast.success("Dados do funcionário atualizados com sucesso");

//     yield put(
//       actions.adminUpdatedSuccess({ boss, permission, address_allowed })
//     );
//   } catch (err) {
//     const errors = get(err, "response.data.error", []);

//     if (err) {
//       if (errors.length > 0) {
//         errors.map((error) => toast.error(error));
//       }

//       if (err && errors.length < 1) {
//         toast.error(
//           "Erro desconhecido ao tentar atualizar dados do funcionário"
//         );
//       }
//     }
//   }
// }

// O takeLatest recebe no primeiro parâmetro a ação que vai ser ouvida e no segundo a função que vai ser executada
// Quando se usa o takeLatest qualquer action anterior é cancelada para que a função do segundo parâmetro seja executada no lugar
// O all faz com que o middleware execute vários efeitos em paralelo e espera todos para finalizar o processo
export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.UPDATE_REQUEST, updateRequest),
]);
