import { useNavigate } from 'react-router-dom';
import style from './Landing.module.css'

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className={style.container}>
            <img className={style.imgLand} src="https://logodownload.org/wp-content/uploads/2016/11/formula-1-logo-0.png" alt=""/>
            <button className={style.buttonLand} onClick={()=> navigate('/home')}>HOME
            </button>            
        </div>
    )
}

export default Landing;