import { useState, useEffect } from "react"
import axios from "axios"
import style from "./Form.module.css"
import NavBar from "../../Components/NavBar/NavBar"
import { getAllTeams } from "../../Redux/actions"
import { useDispatch } from "react-redux"


const Form = () => {

    const [form, setForm] = useState({
        name:"",
        image:"",
        nationality:"",
        birthdate:"",
        description: "",
        teams: ""
    })

    const [teamsList, setTeamsList] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchTeams() {
            const response = await dispatch(getAllTeams())
            setTeamsList(response)
        }
        fetchTeams();
    }, [dispatch]);

    const [errors, setErrors] = useState({
        name:"",
        image:"",
        nationality:"",
        birthdate:"",
    })

    const changeHandler = (event) => {
        const property = event.target.name;
        let value;
            if (event.target.type === "checkbox") {
                value = handleCheckboxChange(event)
                setForm({...form, teams:value})
            } else {
                value = event.target.value;        
                validate({...form, [property]:value});
                setForm({...form, [property]:value})
                }
    }

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        const updatedTeams = [...form.teams];
        if (checked) {
            updatedTeams.push(name);
            setForm({ ...form, teams: updatedTeams });
            
        } else {
            const index = updatedTeams.indexOf(name);
            if (index !== -1) {
                updatedTeams.splice(index, 1);
            }
            setForm({ ...form, teams: updatedTeams });
        }
        return updatedTeams;
      };
    
    const validate = (form) => {
        let newErrors = {}
        const letraRegex = /^[A-Z]+$/i;
        const numberRegex = /^\d+$/;
        const regexURL = /^(ftp|http|https):\/\/[^ "]+$/;
        const arrNombre = form.name.split(" ")
        const dob = form.birthdate.split("-")
        if((letraRegex.test(arrNombre[0]) && letraRegex.test(arrNombre[1])) || form.Nombre===""){
            setErrors({...errors, name:""})
        } else {
            newErrors["name"] = "Sólo debe contener letras y espacios"
        }

        if(regexURL.test(form.image) || form.image===""){
            setErrors({...errors, image:""})
        } else {
            newErrors["image"] = "Debe ser un URL"
        }

        if(letraRegex.test(form.nationality) || form.nationality===""){
            setErrors({...errors, nationality:""})
        } else {
            newErrors["nationality"] = "Sólo debe contener letras"
        }

        if((numberRegex.test(dob[0]) && numberRegex.test(dob[1])) || form.birthdate===""){
            setErrors({...errors, birthdate:""})
        } else {
            newErrors["birthdate"] = "Debe tener el siguiente formato: AAAA-MM-DD"
        }

        setErrors(newErrors)
 
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        if (Object.values(errors).every((error)=> error === "")) {
            try{                
                console.log(form);
                await axios.post("http://localhost:3001/drivers", form)
                alert("Corredor creado exitosamente")
                setForm({
                    name:"",
                    image:"",
                    nationality:"",
                    birthdate:"",
                    description: "",
                    teams: ""
                })
                setErrors({
                    name:"",
                    image:"",
                    nationality:"",
                    birthdate:"",
                })
            } catch(error){
            window.alert("Error al crear el corredor", error)
            }
        }
    }
return(
    <div className={style.container}>
    <form onSubmit={submitHandler}>
        <NavBar/>   
        <div className={style.form}>
        <div className={style.inputs}>
            <label>Nombre y Apellido: </label>
            <input type="text" value={form.name} onChange={changeHandler} name="name"/>
            {errors.name && <span>{errors.name}</span>}
        </div>

        <div>
            <label>Imagen: </label>
            <input type="text" value={form.image} onChange={changeHandler} name="image"/>
            {errors.image && <span>{errors.image}</span>}
        </div>

        <div>
            <label>Nacionalidad: </label>
            <input type="text" value={form.nationality} onChange={changeHandler} name="nationality"/>
            {errors.nationality && <span>{errors.nationality}</span>}
        </div>

        <div>
            <label>Fecha de Nacimiento: </label>
            <input type="text" value={form.birthdate} onChange={changeHandler} name="birthdate"/>
            {errors.birthdate && <span>{errors.birthdate}</span>}
        </div>

        <div>
            <label>Descripción: </label>
            <input type="text" value={form.description} onChange={changeHandler} name="description"/>
        </div>

        <div className={style.checkboxes}>
                <label>Escuderías: </label>
                    {teamsList.map((teams) => (
                    <label key={teams}>
                        <input type="checkbox" name={teams} checked={form.teams.includes(teams)} onChange={changeHandler}/>
                        <label>{teams.toUpperCase()}</label>
                    </label>
                    ))}
        </div>

        <button className={style.crearCorredor} type="submit">Crear corredor</button>
        </div>
    </form>
    </div>
)
}

export default Form;