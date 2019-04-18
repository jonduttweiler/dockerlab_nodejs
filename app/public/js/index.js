$(document).ready(() => {
	console.log("index!");

	fetch("/api/v1/echo/hola")	
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(json_parsed) {
	    console.log(json_parsed);
	  });


});