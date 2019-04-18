"use strict";
const path = require('path');
const express = require('express');
const { MongoClient }  = require('mongodb');
const bodyParser = require('body-parser');

const root_path = __dirname;//must be /project
const log = require(`${root_path}/lib/logger`); 
const { init_database_if_is_empty } = require(`${root_path}/db/utils`);

const public_dir =`${root_path}/public`;
const DB_NAME = process.env.DB_NAME;  //"node_template"
const DB_URI = process.env.DB_URI; //`mongodb://localhost/${DB_NAME}`

const APP_PORT = 8080;

let db;


/* ---------------------------------------------------------------------------------------*
	API REST - General options
   ---------------------------------------------------------------------------------------*/
let app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static(public_dir));



/* ---------------------------------------------------------------------------------------*
	DB connection + start server
   ---------------------------------------------------------------------------------------*/
if(!DB_NAME || !DB_URI) {
	log("FATAL","BOOTSTRAP",`Please, specify environment variables DB_NAME and DB_URI.\nProvided values: DB_NAME: ${DB_NAME} DB_URI: ${DB_URI}`);
	process.exit(1);
}

MongoClient.connect(DB_URI,{ useNewUrlParser: true })
.then( client => {
	db = client.db(DB_NAME); 
	log("INFO","BOOTSTRAP",`MongoClient connected at ${DB_URI}`);
	init_database_if_is_empty(db);
	return db;
})
.then( _=> {
	//start server
	app.listen(APP_PORT, function () {
		log("INFO","BOOTSTRAP",`Graph app listening on port ${APP_PORT}!`);
	});
})
.catch(err => {
	log("FATAL","BOOTSTRAP",`Cannot connect to ${DB_URI}`);
	console.log(err);
	process.exit(1);
});



/* ---------------------------------------------------------------------------------------*
	API Endpoints
   ---------------------------------------------------------------------------------------*/
app.get("/api/v1/echo/:param/",async (req,res) => {
	const {param} = req.params;
	res.json({
		result:"OK",
		message:`${param}`
	});
});


app.get("/api/v1/memos",async (req,res) => {
	res.json(await db.collection("memos").find({}).toArray());
});