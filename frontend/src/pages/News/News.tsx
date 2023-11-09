import { NewsMain } from "@/components/NewsMain";
import { Route, Routes } from "react-router-dom";
import { NewsById } from "../NewsById";

export function News() {
  

  return (
    <Routes>
      <Route path={'/'} element={<NewsMain />} />
      <Route path={'/:newsId'} element={<NewsById />} />
    </Routes>
  );
}
