import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";

export default function MainLayout() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <div className="home-container">
        <Outlet context={{ search }} />
      </div>
    </>
  );
}
