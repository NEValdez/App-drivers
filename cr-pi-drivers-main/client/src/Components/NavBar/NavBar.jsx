import style from "./NavBar.module.css"
import { useNavigate } from "react-router-dom"
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { getDriverByName } from "../../Redux/actions"

const NavBar = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const handleSearch = async (search) => {
      try {
        const driver = await dispatch(getDriverByName(search))
        console.log(driver);
        if (driver) {
            navigate(`/detail/${driver.name.split(" ")[0]}`);
          } else {
            console.error("No se encontró un corredor con ese nombre", error);
          };
        } catch (error) {
          console.error("Error al buscar el corredor", error)
        }
      };

      return(
        <div className={style.mainContainer}>
            <img className={style.img2} src="https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-0.png" alt=""/>
            <SearchBar onSearch={handleSearch}/> 
            <button className={style.buttonForm} onClick={()=> navigate('/form')}>Crea tu corredor!</button>
            <button className={style.buttonHome} onClick={()=> navigate('/home')}>HOME</button>
        </div>
    )
}

export default NavBar;