import PropTypes from "prop-types";
import { useContext } from "react";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import "./Header.css";
import "./Filters.css";
import FiltersContext from "../FiltersContext";

function Header({
  userSearch,
  onSubmit,
  onChange,
  placeholder,
  setIsSearchActive,
  setCurrentCocktail,
  isLoading,
  filters,
}) {
  const {
    setCategoryFilter,
    setAlcoholicFilter,
    setIngredientsFilters,
    setValidatedFilters,
  } = useContext(FiltersContext);
  return (
    <header className="header">
      <div className="logosearchbar">
        <button
          className="logo"
          type="button"
          onClick={() => {
            setCurrentCocktail();
            setIsSearchActive(false);
            setCategoryFilter("");
            setAlcoholicFilter("");
            setIngredientsFilters([]);
            setValidatedFilters({
              category: "",
              alcoholic: "",
              ingredients: [],
            });
          }}
        >
          <img
            src="https://cdn.discordapp.com/attachments/1046174259246026752/1046174326354870362/unknown.png"
            alt="logo"
            className="logo-header"
          />
        </button>
        <SearchBar
          userSearch={userSearch}
          onSubmit={onSubmit}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      {!isLoading && (
        <Filters filters={filters} setIsSearchActive={setIsSearchActive} />
      )}
    </header>
  );
}
Header.propTypes = {
  userSearch: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  setIsSearchActive: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setCurrentCocktail: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
      })
    ),
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
      })
    ),
    alcoholic: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};
export default Header;
