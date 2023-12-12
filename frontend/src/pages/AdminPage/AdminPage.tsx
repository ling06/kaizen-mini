import { Route, Routes } from "react-router-dom";
import { AdminUsers } from "@/pages/AdminUsers";

export function AdminPage() {
  return (
    <>
      <Routes>
        <Route path="/admin-users" element={<AdminUsers />} />
      </Routes>
    </>
  );
}
