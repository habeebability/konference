import React from "react";
import Link from "next/link";

export const Menu = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/">
              <span className="nav-link">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/speakers">
              <span className="nav-link">Speakers</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
