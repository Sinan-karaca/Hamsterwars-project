import React, { useState, useEffect } from "react";
import "./Gallery.css";

const Gallery = () => {
    const [hamsterGrids, setHamsterGrids] = useState(null);

    useEffect(() => {
        const deleteHamster = async (id) => {
            const requestOptions = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            };
            await fetch(
                `https://hamsterwars-sinan.herokuapp.com/hamsters/${id}`,
                requestOptions
            );
            fetchHamsters();
        };

        const fetchHamsters = async () => {
            const resp = await fetch(
                "https://hamsterwars-sinan.herokuapp.com/hamsters/"
            );
            const data = await resp.json();
            const hamsters = data;

            const hamsterGrids = hamsters.map((hamster) => {
                return (
                    <figure
                        onClick={() => deleteHamster(hamster.id)}
                        key={hamster.id}
                    >
                        <img
                            src={require(`../../../img/${hamster.imgName}`)}
                            alt="hamster-pictures"
                        />
                        <figcaption>{hamster.name}</figcaption>
                    </figure>
                );
            });
            setHamsterGrids(hamsterGrids);
        };

        fetchHamsters();
    }, []);

    return (
        <>
            <div className="gallery">{hamsterGrids}</div>
        </>
    );
};

export default Gallery;
