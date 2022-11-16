import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Section from "./components/Section";
import FilterPage from "./components/FilterPage";
import "./App.css";
import useFetch from "./data/allCocktails";

function App() {
  const [userSearch, setUserSearch] = useState("");
  const [isShow, setIsShow] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { cocktails, isLoading } = useFetch();

  function handleChange(e) {
    setUserSearch(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSearchValue(e.target.children[0].value);
  }

  useEffect(() => {
    const urls = [
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list",
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list",
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list",
    ];

    Promise.all(urls.map((url) => axios.get(url))).then((allResponses) => {
      const filters = {};

      allResponses.forEach((response, index) => {
        if (index === 0) {
          filters.categories = response.data.drinks;
        }
        if (index === 1) {
          filters.ingredients = response.data.drinks;
        }
        if (index === 2) {
          filters.alcoholic = response.data.drinks;
        }
      });
    });
  }, []);

  return (
    <div className="App">
      <Header
        userSearch={userSearch}
        onSubmit={(e) => handleSubmit(e)}
        onChange={(e) => handleChange(e)}
        setIsShow={setIsShow}
        isShow={isShow}
      />
      {!isLoading && cocktails && isShow === "" ? (
        <Section searchValue={searchValue} cocktailsList={cocktails} />
      ) : (
        <p className="search-not-found">
          {isLoading ? "Loading cocktails..." : "No matching result"}
        </p>
      )}
      {isShow === "name" && (
        <FilterPage setIsShow={setIsShow} isShow={isShow} />
      )}
      {isShow === "Ingredients" && (
        <FilterPage setIsShow={setIsShow} isShow={isShow} />
      )}
      {isShow === "Glasses" && (
        <FilterPage setIsShow={setIsShow} isShow={isShow} />
      )}
      {isShow === "home" && (
        <Section searchValue={searchValue} cocktailsList={cocktails} />
      )}
    </div>
  );
}

export default App;
