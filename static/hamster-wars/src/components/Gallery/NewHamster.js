import e from "cors";
import { useState, useEffect } from "react";
import "./NewHamster.css";

const NewHamster = () => {
    const [name, setName] = useState("");
    const [validName, setValidName] = useState(true);
    const [age, setAge] = useState("");
    const [validAge, setValidAge] = useState(true);
    const [favFood, setFavFood] = useState("");
    const [validFavFood, setValidFavFood] = useState(true);
    const [loves, setLoves] = useState("");
    const [validLoves, setValidLoves] = useState(true);
    const [imgName, setImgName] = useState("");
    const [validImgName, setValidImgName] = useState(true);

    const validateName = () => {
        if (name === "") {
            setValidName(false);
        }
    };

    const validateAge = () => {
        if (isNaN(age)) {
            setValidAge(false);
        } else if (!age || age < 1 || age > 10) {
            setValidAge(false);
        } else {
            setValidAge(true);
        }
    };

    const validateFavFood = () => {
        if (favFood === "") {
            setValidFavFood(false);
        }
    };

    const validateLoves = () => {
        if (loves === "") {
            setValidLoves(false);
        }
    };

    const validateImgName = () => {
        if (imgName === "") {
            setValidImgName(false);
        }
    };

    const sendForm = async (e) => {
        e.preventDefault();
        const stringfy = JSON.stringify({
            name: name,
            age: Number(age),
            favFood: favFood,
            loves: loves,
            imgName: imgName,
            wins: 0,
            defeats: 0,
            games: 0,
        });
        console.log(stringfy);
        if (name && loves && favFood && imgName && !isNaN(age)) {
            await fetch("https://hamsterwars-sinan.herokuapp.com/hamsters/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: stringfy,
            });
        } else return;
    };

    return (
        <>
            <div className="container">
                <h2>Add new Hamster</h2>
                <form>
                    <div className="box">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onBlur={validateName}
                            onChange={(e) => setName(e.target.value)}
                            required={name}
                        />
                        {!validName && <small>Name your hamster</small>}
                    </div>
                    <div className="box">
                        <label>Age</label>
                        <input
                            type="text"
                            onBlur={validateAge}
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required=""
                        />
                        {!validAge && <small>How old are your hamster?</small>}
                    </div>
                    <div className="box">
                        <label>Favorite food</label>
                        <input
                            type="text"
                            value={favFood}
                            onBlur={validateFavFood}
                            onChange={(e) => setFavFood(e.target.value)}
                            required=""
                        />
                        {!validFavFood && (
                            <small>What's your hamsters favourite food?</small>
                        )}
                    </div>
                    <div className="box">
                        <label>What does your hamster love?</label>
                        <input
                            type="text"
                            value={loves}
                            onBlur={validateLoves}
                            onChange={(e) => setLoves(e.target.value)}
                            required=""
                        />
                        {!validLoves && (
                            <small>What do your hamster love?</small>
                        )}
                    </div>
                    <div className="box">
                        <label>Hamster image</label>
                        <input
                            type="file"
                            value={imgName}
                            onBlur={validateImgName}
                            onChange={(e) => setImgName(e.target.value)}
                            required=""
                        />
                        {!validImgName && <small>Put a hamster Image</small>}
                    </div>
                    <a
                        type="submit"
                        onClick={sendForm}
                        href="#"
                        className="submit-btn"
                    >
                        Add Hamster
                    </a>
                </form>
            </div>
        </>
    );
};

export default NewHamster;
