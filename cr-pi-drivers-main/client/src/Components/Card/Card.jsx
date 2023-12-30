import { Link } from "react-router-dom";
import style from "./Card.module.css"

const Card = (props) => {
    const imagenFea = "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_960_720.png"
    let imagen = ""
    if (!props.name) {
        return props.name;
    }
    const nombre = props.name.split(" ")[0]

    if (!props.image || props.image===imagenFea) {
        imagen = "https://cgcesantafe.org.ar/wp-content/uploads/2016/01/silueta_sin-persona-1.jpg"
    } else {
        imagen = props.image
    }
    
    return(
        <div className={style.container}>
            <Link to={`/detail/${nombre}`}><h2 className={style.nombre}>{props.name && (props.name)}</h2> </Link>
            <img src={imagen} alt={props.name} />
        </div>
    );

}

export default Card;