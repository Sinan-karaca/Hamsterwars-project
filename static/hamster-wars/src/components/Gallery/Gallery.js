import React, { useState, useEffect } from "react";
import "./Gallery.css";
import NewHamster from "./NewHamster";

const Gallery = () => {
    const [hamsterArray, setHamsterArray] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [hamsters, setHamsters] = useState([]);
    const [displayInfoArray, setDisplayInfoArray] = useState([]);
    const [trigger, setTrigger] = useState(0);

    const changeInfo = () => {
        setShowInfo((prevShowInfo) => !prevShowInfo);
    };

    useEffect(() => {
        const fetchHamsters = async () => {
            const resp = await fetch(
                "https://hamsterwars-sinan.herokuapp.com/hamsters/"
            );
            const data = await resp.json();
            setHamsters(data);
        };

        fetchHamsters();
    }, [trigger]);

    const deleteHamster = async (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };
        await fetch(
            `https://hamsterwars-sinan.herokuapp.com/hamsters/${id}`,
            requestOptions
        );
        setTrigger(trigger + 1);
    };
    const InfoOnClick = [];
    for (let i = 0; i < hamsters.length; i++) {
        InfoOnClick.push(
            <div onClick={changeInfo} key={hamsters[i].id}>
                <figure>
                    <span>Favorite food: {hamsters[i].favFood}</span>
                    <span>Loves :{hamsters[i].loves}</span>
                    <span>Games: {hamsters[i].games}</span>
                    <span>Wins: {hamsters[i].wins}</span>
                    <span>Defeats: {hamsters[i].defeats}</span>
                    <figcaption>{hamsters[i].name}</figcaption>
                    <a
                        className="delete"
                        onClick={() => deleteHamster(hamsters[i].id)}
                    >
                        Delete
                    </a>
                </figure>
            </div>
        );
    }
    const hamsterGrid = [];
    for (let i = 0; i < hamsters.length; i++) {
        hamsterGrid.push(
            <figure key={hamsters[i].id + " 1"}>
                <img
                    src={require(`../../../img/${hamsters[i].imgName}`)}
                    alt="hamster-pictures"
                    onClick={changeInfo}
                />
                <figcaption>{hamsters[i].name}</figcaption>
                <a
                    className="delete"
                    onClick={() => deleteHamster(hamsters[i].id)}
                >
                    Delete
                </a>
            </figure>
        );
    }

    return (
        <>
            <h1>You can get information about the hamster by clicking on it</h1>
            <div className="gallery">
                {showInfo ? InfoOnClick : hamsterGrid}
            </div>
        </>
    );
};

export default Gallery;
