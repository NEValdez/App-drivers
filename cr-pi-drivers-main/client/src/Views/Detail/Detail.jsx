import style from './Detail.module.css'
import { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import NavBar from "../../Components/NavBar/NavBar";
import { useDispatch } from 'react-redux';
import { getDriverByName } from '../../Redux/actions';

export default function Detail(){
    const {name} = useParams();
    const dispatch = useDispatch()
    const [driver, setDriver] = useState({});

    useEffect(() => {
        async function fetchDriver(){
            const response = await dispatch(getDriverByName(name))
            setDriver(response)
        }
        fetchDriver()
    }, [name, dispatch]);
    
    console.log(driver);
    return(
        <div className={style.container}>
            <NavBar/>
            <div className={style.tarjeta}>
                <div className={style.info}>
                    {driver.name && (<h1>{driver.id}. {driver.name}</h1>)}
                    {driver.nationality && (<p><b>Nacionalidad: </b>{driver.nationality}</p>)}
                    {driver.birthdate && (<p><b>Fecha de nacimiento: </b>{driver.birthdate}</p>)}
                    {driver.teams && (<p><b>Escuderías: </b>{driver.teams + " "}</p>)}
            
                </div>
                <div>
                    <img className={style.imageDetail} src={driver.image} alt={driver.name}/>
                <div className={style.description}>
                    {driver.description && (<p>{driver.description}</p>)}
                </div>
                </div>
                
            </div>
        </div>
        
    )
}