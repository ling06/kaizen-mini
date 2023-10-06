import { NewsMain } from "@/components/NewsMain";
import { Route, Routes } from "react-router-dom";
import { OneNews } from "../OneNews";

export function News() {
  return (
    <Routes>
      <Route path={'/'} element={<NewsMain />} />
      <Route path={'/:newsId'} element={<OneNews />} />
    </Routes>
  );
}
