import React, { useEffect, useState } from "react";
import style from "./Filter.module.css"
import { getAllTeams } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";


const FilterComponent = ({ selectedTeam, onFilterByTeam }) => {
    const dispatch = useDispatch();
    const allTeams = useSelector((state) => state.teams);
    const [source, setSource] = useState("")

    const handleTeamChange = (event) => {
    const selectedValue = event.target.value;
    onFilterByTeam(selectedValue);
  };

    const handleSourceChange = (event) => {
    const selectedSource = event.target.value;
    setSource(selectedSource);
    };

useEffect(() => {
  dispatch(getAllTeams());
}, [dispatch]);

  return (
    <div className={style.container}>
        <label>Filtrar por escuderías:</label>
        <select value={selectedTeam} onChange={handleTeamChange}>
            <option value="">Todos</option>
            {allTeams.map((option, index) => (<option key={index} value={option}>
            {option}
            </option>
        ))}
        </select>
        <div>
        <label>Fuente de datos:</label>
        <select value={source} onChange={handleSourceChange}>
          <option value="">Todos</option>
          <option value="local">Corredores Locales</option>
          <option value="api">Corredores API</option>
        </select>
      </div>
    </div>
  )
}

export default FilterComponent
