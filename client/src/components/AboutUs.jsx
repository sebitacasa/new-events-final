import React from "react";
import AboutUsCard from "./AboutUsCard";
import data from "./DevelopersData/data.json"
import BackButton from "./Button/BackButton";
import styles from "./AboutUs.module.css"
import Footer from "./Footer/Footer";

export default function AboutUs(){
    return(
        <div className={styles.body}>
            <BackButton />
            <div className={styles.title}>
                <h1 >Equipo de programadores</h1>
            </div>
            <div className={styles.containerCards}>
                {data.map((e) => {
                        return (
                            <div className={styles.cards}>
                            <AboutUsCard
                            name={e.name}
                            image={e.image}
                            birthDay={e.birthDay}
                            description={e.description}
                            github={e.github}
                            linkedIn={e.linkedIn}
                            />
                        </div>
                        );
                })}
            </div>
            <Footer />
        </div>
    )
}