import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterComponent from "../../Components/Filter/Filter";
import { filterDriversBySource, filterDriversByTeam, getDrivers } from "../../Redux/actions";
import { sortDrivers, SortingOptions} from "../../Components/Sorting/Sorting";
import style from "./Home.module.css"
import NavBar from "../../Components/NavBar/NavBar"
import CardContainer from "../../Components/CardContainer/CardContainer";

const Home = () => {
    const dispatch = useDispatch();
    const filteredDrivers = useSelector((state) => state.filteredDrivers) || [];
    const [ selectedTeam, setSelectedTeam ] = useState("");
    const [ selectedSource, setSelectedSource ] = useState("");
    const [ sortOrder, setSortOrder ] = useState("name");
    const [ sortDirection, setSortDirection ] = useState("asc");
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        dispatch(getDrivers(9, 0))
    }, [dispatch])

    const handleFilterByTeam = (team, source) => {
        setSelectedTeam(team);
        const filtered = dispatch(filterDriversByTeam(team));
        setSelectedSource(source);
        dispatch(filterDriversBySource(source, filtered));
    }

    const handleSortChange = (field, value) => {
        if (field === "order") {
            setSortOrder(value);
        } else if (field === "direction") {
            setSortDirection(value);
        }
    }

    const handleNextClick = () => {
        const newOffset = offset + 9;
        setOffset(newOffset)
    }
    
    const handlePrevClick = () => {
        const newOffset = offset - 9;
        setOffset(newOffset)
    }

    const sortedDrivers = sortDrivers(filteredDrivers, sortOrder, sortDirection)
    const paginateDrivers = sortedDrivers.slice(offset, 9+parseInt(offset))


    return(
        <div className={style.container}>
            <NavBar/>
            <FilterComponent selectedTeam={selectedTeam} selectedSource={selectedSource} onFilterByTeam={handleFilterByTeam} />
            <SortingOptions sortOrder={sortOrder} sortDirection={sortDirection} onSortChange={handleSortChange}/>
            <div className={style.prevNext}>
                { offset>=9 && <button className={style.buttonP} onClick={handlePrevClick}> {"<<<"} </button>}
                { offset<=91 && <button className={style.buttonN} onClick={handleNextClick}> {">>>"} </button>}
            </div>
            <CardContainer drivers={paginateDrivers}/>
        </div>
    )
}

export default Home;