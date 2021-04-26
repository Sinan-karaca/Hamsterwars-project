const getDatabase = require('../database.js')
const dataB = getDatabase()

const express = require('express')
const router = express.Router()


// *** REST API ***

// GET HAMSTERS

router.get('/', async (req,res) => {
    console.log('/hamsters Rest Api');
    res.send('/hamsters Rest Api')
    
    const toolsRef = db.collection('tools')
	const snapshot = await toolsRef.get()

	if( snapshot.empty ) {
		res.send([])
		return
	}

	let items = []
	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id  // id behövs för POST+PUT+DELETE
		items.push( data )
	})
	res.send(items)
})

