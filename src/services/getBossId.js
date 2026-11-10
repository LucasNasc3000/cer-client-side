import { toast } from "react-toastify";
import axios from "./axios";

export default async function GetBossId() {
  try {
    const bossData = await axios.get("/employees/search/self");

    if (bossData.data.boss === null) return bossData.data.id;

    return bossData.data.boss.id;
  } catch (e) {
    toast.error("Erro desconhecido ao tentar obter dados do admin");
    return "error";
  }
}
