import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "./Context";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const SearchForm = () => {
  const { setSearchValue, searchValue } = useGlobalContext();
  const inputElement = useRef();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchValue) return;
    navigate(`search/${searchValue}`);
  };

  useEffect(() => {
    inputElement.current.focus();
  }, []);
  return (
    <section className="section form-container">
      <h1 className="section-main-title">MOVLIX</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input-form"
          type="text"
          value={searchValue}
          placeholder="Search"
          ref={inputElement}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <Link
          to={searchValue ? `search/${searchValue}` : null}
          className="form-btn"
        >
          <AiOutlineSearch className="icon-search" />
        </Link>
      </form>
    </section>
  );
};

export default SearchForm;
