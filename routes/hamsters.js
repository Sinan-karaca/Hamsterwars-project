const getDatabase = require("../database.js");
const firebase = getDatabase();

const hamsterValidation = require('../hamsterValidation.js')
const mapper = require('../hamsterMapper')


const express = require("express");
const router = express.Router();

// *** REST API ***

// GET HAMSTERS

// router.get('/', (req,res) => {
// 	console.log('/hamsters Rest Api');
// 	res.send('Welcome to the Hamsterwar project')

// })

router.get("/", async (req, res) => {
  console.log("/hamsters Rest Api");

  const hamstersRef = firebase.collection("hamsters");
  const snapshot = await hamstersRef.get();

  if (snapshot.empty) {
    res.send([]);
    return;
  }

  let items = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id; // id behövs för POST+PUT+DELETE
    items.push(data);
  });
  res.send(items);
});

router.get("/random", async (req, res) => {
  console.log("/hamsters Rest Api");
  const hamstersRef = firebase.collection("hamsters");
  const snapshot = await hamstersRef.get();

  if (snapshot.empty) {
    res.status(404).send("No hamster found.");
    return;
  }

  var i = 0;
  var rand = Math.floor(Math.random() * snapshot.size);
  snapshot.forEach((doc) => {
    if (i == rand) {
      const data = doc.data();
      data.id = doc.id; // id behövs för POST+PUT+DELETE
      res.send(data);
      return;
    }
    i++;
  });
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const hamstersRef = await firebase.collection("hamsters").doc(id).get();

	if (!hamstersRef.exists) {
		res.status(404).send("Hamster does not exist");
		return;
	}

	const data = hamstersRef.data();
	res.send(data);
});

router.post("/", async (req, res) => {
	// OBS! Måste installera express.json för att detta ska fungera
	const object = req.body;
	let valid = hamsterValidation.postValidHamsterObj(object)
	if (valid !== "") {
		res.status(400).send(valid);
		return;
	}
	let hamsterObj =  mapper.mapper(object)
	const docRef = await firebase.collection("hamsters").add(hamsterObj);
	res.send(docRef.id);
});

router.put("/:id", async (req, res) => {
	const object = req.body;
	const id = req.params.id;
	if (id  === undefined) {
		res.sendStatus(400)
		return
	}

	let valid = hamsterValidation.putValidHamsterObj(object)
	if (valid !== "") {
		res.status(400).send(valid);
		return;
	}

	try {
        const document = firebase.collection('hamsters').doc(id);
        await document.set(object, { merge: false })
        return res.status(200).send();

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

  
	const docRef = await database.collection("hamsters").doc(id).get();

})

module.exports = router;
