import React from "react";
import "./App.css";
import "./style/index.css";
import { CarsTable } from "./components/CarsTable";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="App__sidebar-table-wrapper">
        <Sidebar />
        <CarsTable />
      </div>
      <Footer />
    </div>
  );
}

export default App;
