import { toast } from "react-toastify";
import axios from "./axios";

export default async function GetBossId(headerid, email) {
  try {
    if (!headerid || headerid === "") {
      const bossData = await axios.get(`/employees/search/email/${email}`);

      const { id } = bossData.data;
      return id;
    }
    const employeeData = await axios.get(`/employees/search/email/${email}`);

    const { boss } = employeeData.data;
    return boss;
  } catch (e) {
    toast.error("Erro desconhecido ao tentar obter dados do chefe");
  }
}
