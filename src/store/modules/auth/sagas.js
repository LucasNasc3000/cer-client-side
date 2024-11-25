/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import { get } from "lodash";
import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "../../../services/axios";
import history from "../../../services/history";
import * as types from "../types";
import * as actions from "./actions";

// O call chama uma função (pode ser normal ou geradora) que retorna uma promise (aqui são os dados do usuário e o token)
// O put dispara uma ação
// eslint-disable-next-line require-yield

// Esta função recupera o token que desapareceria do cabeçalho depois que o login fosse feito e o site atualizado
// O terceiro parâmetro de get será um valor padrão
function persistRehydrate({ payload }) {
  const token = get(payload, "auth.token", "");
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  axios.defaults.headers.permission = payload.auth.permission;
  axios.defaults.headers.adminpassword = payload.auth.adminpassword;
  axios.defaults.headers.email = payload.auth.emailHeaders;
}

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, "/tokens", payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success("Logado!");

    // criptografar as informações antes de enviar
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    axios.defaults.headers.email = payload.email;
    axios.defaults.headers.adminpassword = payload.adminpassword;
    axios.defaults.headers.permission = payload.permission;

    history.push("/home");
  } catch (e) {
    toast.error(e.response.data.error[0]);
    yield put(actions.loginFailure());
  }
}

// Esta função atualiza dos dados do usuário
// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { name, email, password, adminpassword, permission, address_allowed } =
    payload;

  try {
    yield call(axios.post, "/employees", {
      name,
      email,
      password,
      adminpassword,
      permission,
      address_allowed,
    });
    toast.success("Conta criada com sucesso");

    yield put(
      actions.registerCreatedSuccess({
        name,
        email,
        password,
        adminpassword,
        permission,
        address_allowed,
      })
    );
    history.push("/");
  } catch (e) {
    console.log(e);
    const errors = get(e, "response.data.error", []);
    const status = get(e, "response.status", 0);

    if (status === 401) {
      toast.error("Você precisa fazer login novamente");
      yield put(actions.loginFailure());
      return history.push("/");
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error("Erro desconhecido");
    }

    yield put(actions.registerFailure());
  }
}

function* updateRequest({ payload }) {
  try {
    const { id, name, email, password, adminpassword } = payload;

    if (!id) {
      toast.error("Erro ao tentar atualizar os dados");
      return;
    }

    switch (true) {
      case name.length > 0 &&
        email.length < 1 &&
        password.length < 1 &&
        adminpassword < 1:
        yield call(axios.put, `/employees/${id}`, {
          name,
        });
        break;

      case email.length > 0 &&
        name.length < 1 &&
        password.length < 1 &&
        adminpassword < 1:
        yield call(axios.put, `/employees/${id}`, {
          email,
        });
        break;

      case password.length > 0 &&
        email.length < 1 &&
        name.length < 1 &&
        adminpassword.length < 1:
        yield call(axios.put, `/employees/${id}`, {
          password,
        });
        break;

      case adminpassword.length > 0 &&
        email.length < 1 &&
        password.length < 1 &&
        name.length < 1:
        yield call(axios.put, `/employees/${id}`, {
          adminpassword,
        });
        axios.defaults.headers.adminpassword = adminpassword;
        break;

      case adminpassword.length > 0 &&
        email.length < 1 &&
        password.length > 0 &&
        name.length < 1:
        yield call(axios.put, `/employees/${id}`, {
          adminpassword,
          password,
        });
        axios.defaults.headers.adminpassword = adminpassword;
        break;

      case adminpassword.length > 0 &&
        email.length < 1 &&
        password.length > 0 &&
        name.length > 0:
        yield call(axios.put, `/employees/${id}`, {
          adminpassword,
          password,
          name,
        });
        axios.defaults.headers.adminpassword = adminpassword;
        break;

      case adminpassword.length > 0 &&
        email.length < 1 &&
        password.length < 1 &&
        name.length > 0:
        yield call(axios.put, `/employees/${id}`, {
          adminpassword,
          name,
        });
        axios.defaults.headers.adminpassword = adminpassword;
        break;

      case adminpassword.length < 1 &&
        email.length < 1 &&
        password.length > 0 &&
        name.length > 0:
        yield call(axios.put, `/employees/${id}`, {
          password,
          name,
        });
        break;

      default:
        yield call(axios.put, `/employees/${id}`, {
          name,
          email,
          password,
          adminpassword,
        });
        break;
    }

    if (email.length > 0) {
      toast.success("Dados atualizados com sucesso. Faça login novamente");
      return;
    }

    toast.success("Dados atualizados com sucesso");

    yield put(actions.updatedSuccess({ name, password, adminpassword }));
  } catch (e) {
    console.log(e);
    const errors = get(e, "response.data.error", []);
    const status = get(e, "response.status", 0);

    if (status === 401) {
      toast.error("Você precisa fazer login novamente");
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error("Erro desconhecido ao atualizar dados");
    }
  }
}

// O takeLatest recebe no primeiro parâmetro a ação que vai ser ouvida e no segundo a função que vai ser executada
// Quando se usa o takeLatest qualquer action anterior é cancelada para que a função do segundo parâmetro seja executada no lugar
// O all faz com que o middleware execute vários efeitos em paralelo e espera todos para finalizar o processo
export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.UPDATE_REQUEST, updateRequest),
]);
