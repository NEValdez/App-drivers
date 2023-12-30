import style from "./CardContainer.module.css"
import Card from "../Card/Card"
import React from "react";

const CardContainer = ( {drivers} ) => {
        return (
            <div className={style.container}>
            {drivers?.map((driver, i) => {
                return (
                    <Card 
                        key={i}
                        image={driver.image}
                        name={driver.name}
                        teams={driver.teams}
                    />
                );
            })}
        </div>
        );
};

export default CardContainer;