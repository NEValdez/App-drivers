import { useHistory } from 'react-router-dom';
import style from './Landing.module.css'

const Landing = () => {
    const history = useHistory();
    return (
        <div className={style.container}>
            <p>Landing</p>
        </div>
    )
}