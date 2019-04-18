module.exports = function(level,module,msg){
	let now = new Date().toISOString();
	console.log(`[${now}][${level}][${module}] ${msg}`);
}


