import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import SelectedItem from "./components/SelectedItem";
import { ItemDropdown, ItemDropdownWrapper } from "./components/ItemDropdown";

import useKeyPress from "./hooks/useKeyPress";

function App() {
  const [language, setLanguage] = useState([]);
  const [country, setCountry] = useState([]);

  const countryDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);

  const [whichDropdownActive, setWhichDropdownActive] = useState("");

  const [dropdownCountry, setDropdownCountry] = useState(false);
  const [dropdownLanguage, setDropdownLanguage] = useState(false);

  const [langFilterInputVal, setLangFilterInputVal] = useState("");
  const [countryFilterInputVal, setCountryFilterInputVal] = useState("");

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const [countryCursor, setCountryCursor] = useState(0);
  const [languageCursor, setLanguageCursor] = useState(0);

  const [hoverItem, setHoverItem] = useState(null);
  const arrowUpPressed = useKeyPress("ArrowUp").keyPressed;
  const arrowDownPressed = useKeyPress("ArrowDown").keyPressed;
  const enterPressed = useKeyPress("Enter").enterKeyPress;

  const openDropdownCountry = () => {
    setDropdownCountry(!dropdownCountry);
    setWhichDropdownActive("countryDropdown");
  };

  const openDropdownLanguage = () => {
    setDropdownLanguage(!dropdownLanguage);
    setWhichDropdownActive("languageDropdown");
  };

  const filterCountry = (e) => {
    setCountryFilterInputVal(e.target.value);
  };
  const filterLanguage = (e) => {
    setLangFilterInputVal(e.target.value);
  };

  const selectCountryItem = (countryProps) => {
    setSelectedCountry(countryProps);
    setDropdownCountry(false);
  };

  const selectLangItem = (languageProps) => {
    setSelectedLanguage(languageProps);
    setDropdownLanguage(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: countryData } = await axios.get("db/country.json");
        const { data: languageData } = await axios.get("db/language.json");

        const updatedCountryData = countryData.map((county, index) => ({
          ...county,
          id: index,
        }));
        const updatedLanguageData = languageData.map((lang, index) => ({
          name: lang,
          id: index,
        }));

        setCountry(updatedCountryData);
        setLanguage(updatedLanguageData);
      } catch (error) {
        console.log("Fetching data error occured: ", error);
      }
    }

    fetchData();
  }, []);

  /* Arrow action after effect */
  useEffect(() => {
    if (
      country.length &&
      arrowUpPressed &&
      whichDropdownActive === "countryDropdown"
    ) {
      console.log("Country Arrow up pressed");

      setCountryCursor((prevState) =>
        prevState > 0 ? prevState - 1 : prevState
      );
    }
    if (
      country.length &&
      arrowDownPressed &&
      whichDropdownActive === "countryDropdown"
    ) {
      console.log("Country Arrow down pressed");
      setCountryCursor((prevState) =>
        prevState < country.length - 1 ? prevState + 1 : prevState
      );
    }

    /* This is for language dropdown */
    if (
      language.length &&
      arrowUpPressed &&
      whichDropdownActive === "languageDropdown"
    ) {
      console.log("Language Arrow up pressed");

      setLanguageCursor((prevState) =>
        prevState > 0 ? prevState - 1 : prevState
      );
    }

    if (
      language.length &&
      arrowDownPressed &&
      whichDropdownActive === "languageDropdown"
    ) {
      console.log("Language Arrow down pressed");
      setLanguageCursor((prevState) =>
        prevState < language.length - 1 ? prevState + 1 : prevState
      );
    }

    if (countryDropdownRef.current || languageDropdownRef.current) {
      const itemWrapper =
        whichDropdownActive === "countryDropdown"
          ? countryDropdownRef.current
          : languageDropdownRef.current;

      const dropdownItemHover = itemWrapper.querySelector(
        ".dropdown-item-ul-item.hover"
      );

      if (dropdownItemHover) {
        if (dropdownItemHover.offsetTop > 120) {
          console.log("Test");
          itemWrapper.scrollTop = dropdownItemHover.offsetTop;
        } else {
          itemWrapper.scrollTop = 0;
        }
      }
    }
  }, [arrowUpPressed, arrowDownPressed]);

  /* Cursor & Enter action */
  useEffect(() => {
    if (
      country.length &&
      whichDropdownActive === "countryDropdown" &&
      enterPressed
    ) {
      setSelectedCountry(country[countryCursor]);
      setDropdownCountry(false);
    }

    if (
      language.length &&
      whichDropdownActive === "languageDropdown" &&
      enterPressed
    ) {
      setSelectedLanguage(language[languageCursor]);
      setDropdownLanguage(false);
    }
  }, [countryCursor, languageCursor, enterPressed]);

  /* Hovering Item  */
  useEffect(() => {
    if (country.length && hoverItem) {
      setCountryCursor(country.indexOf(hoverItem));
    }
    if (language.length && hoverItem) {
      setLanguageCursor(language.indexOf(hoverItem));
    }
  }, [hoverItem]);

  return (
    <div className="App">
      <div className="content-wrapper">
        <h1>Applicant Name: Arjay Marquez</h1>
        <SelectedItem label="Country" value={selectedCountry} />
        <SelectedItem label="Language" value={selectedLanguage} />

        <ItemDropdownWrapper>
          <ItemDropdown
            dropdownRef={countryDropdownRef}
            dropdownLabel="Country"
            dropdownData={country}
            dropdownOpen={dropdownCountry}
            filterInputValue={countryFilterInputVal}
            selectedItem={selectedCountry}
            selectedHoverItem={countryCursor}
            clickDropdown={openDropdownCountry}
            filterDropdown={filterCountry}
            selectItem={selectCountryItem}
          />
          <ItemDropdown
            dropdownRef={languageDropdownRef}
            dropdownLabel="Language"
            dropdownData={language}
            dropdownOpen={dropdownLanguage}
            filterInputValue={langFilterInputVal}
            selectedItem={selectedLanguage}
            selectedHoverItem={languageCursor}
            clickDropdown={openDropdownLanguage}
            filterDropdown={filterLanguage}
            selectItem={selectLangItem}
          />
        </ItemDropdownWrapper>
      </div>
    </div>
  );
}

export default App;
