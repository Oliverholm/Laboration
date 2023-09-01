import React from "react";
import "../styles/Sidebar.css";
import { TrendingUp, ArrowRight, GitHub } from "react-feather";

export function Sidebar() {
  const SBCIcon = <ArrowRight size="1em" className="icon" />;

  const categoriesList = [
    "History",
    "Crime",
    "French",
    "Fiction",
    "English",
    "Magical",
    "Mystery",
    "Love",
    "Classic",
  ];

  return (
    <div className="sb-container">
      <section className="sb-top">
        <ul>
          <li className="sb-options">
            <TrendingUp size={"1.1em"} className="icon" />
            &nbsp; Popular
          </li>
        </ul>
        <hr className="bottom-border" />
      </section>
      <section className="sb-categories">
        <h2 id="titles">Categories</h2>
        <ul>
          {categoriesList.map((category) => (
            <li key={category} className="sb-options">
              {SBCIcon}&nbsp;&nbsp;
              {category}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function sortCategory() {}
