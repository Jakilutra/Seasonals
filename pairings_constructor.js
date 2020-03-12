document.documentElement.className = "no-fouc";
$(document).ready(function() {
	startUp();
	$(".no-fouc").removeClass("no-fouc");
});
var buttonclicked = false;
function startUp () {
	// Declaring variables.
	var theme = "",
	    multiplier = "",
	    size = "",
	    parity = "",
	    method = "",
	    topleft = "",
	    topright = "",
	    botleft = "",
	    botright = "",
	    output = "",
	    reverse = "",
	    atOn = "";
	
	// Assigning stored variables
	theme = localStorage.getItem("theme");
	multiplier = localStorage.getItem("multiplier");
	size = localStorage.getItem("size");
	parity = localStorage.getItem("parity");
	method = localStorage.getItem("method");
	topleft = localStorage.getItem("top-left");
	topright = localStorage.getItem("top-right");
	botleft = localStorage.getItem("bottom-left");
	botright = localStorage.getItem("bottom-right");
	output = localStorage.getItem("output");
	atOn = localStorage.getItem("@on");
	reverse = localStorage.getItem("reverse");
	
	// Setting stored defaults.
	
	if (theme === "DeepDark" || theme === "IceBlue" || theme === "MalachtiteGreen" || theme === "PhloxPurple" || theme === "ScarletRed" || theme === "StandardSilver") {
		document.getElementById("themechange").value = theme;
		changeTheme(theme);
	}
	if (multiplier === "1.5") {
		document.getElementById("scaler").options.selectedIndex = 1;
		scale(multiplier);
	}
	if (size === "8" || size === "16" || size === "32" || size === "64" || size === "128" || size === "256" || size === "512"){
		document.getElementById("size").value = size;
		modifySize(size, true);
	}
	if (parity === "odd") {
		document.getElementById("parity").options.selectedIndex = 1;
		changeParity(parity);
	}
	if (method === "Stack") {
		document.getElementById("method").options.selectedIndex = 0;
	}
	if (topleft !== null) {
		tidy("top-left", topleft);
	}
	if (topright !== null) {
		tidy("top-right", topright);
	}
	if (botleft !== null) {
		tidy("bottom-left", botleft);
	}
	if (botright !== null) {
		tidy("bottom-right", botright);
	}
	if (output !== null) {
		tidy("output", output);
	}
	if (atOn === "false") {
		document.getElementById("@on").checked = false;
		atUpdate();	
	}
	if (reverse === "true") {
		document.getElementById("reverse").checked = true;
		reversal();
	}
}
function changeTheme(selected) {
	// Declaring variables.
	var gradients = {},
	    tarea = {},
	    element = {};

	// Assigning variables.
	gradients = {
		DeepDark: "radial-gradient(circle, rgba(56,56,56,1) 33%, rgba(33,33,33,1) 66%, rgba(0,0,0,0.9971698151917017) 100%)",
		IceBlue: "radial-gradient(circle, rgba(204,247,247,1) 33%, rgba(111,215,219,1) 66%, rgba(107,180,184,0.9971698151917017) 100%)",
		MalachtiteGreen: "radial-gradient(circle, rgba(183,240,166,1) 33%, rgba(128,255,100,1) 66%, rgba(15,194,2,0.9971698151917017) 100%)",
		PhloxPurple: "radial-gradient(circle, rgba(237,168,234,1) 33%, rgba(207,9,244,1) 66%, rgba(231,6,250,0.9971698151917017) 100%)",
		ScarletRed: "radial-gradient(circle, rgba(245,127,127,1) 33%, rgba(255,68,5,1) 66%, rgba(204,37,4,0.9971698151917017) 100%)",
		StandardSilver: "radial-gradient(circle, rgba(217,215,215,1) 33%, rgba(148,147,147,1) 66%, rgba(140,136,140,0.9971698151917017) 100%)",
		SunnyOrange: "radial-gradient(circle, rgba(244,202,46,1) 33%, rgba(240,168,31,1) 66%, rgba(252,131,7,0.9971698151917017) 100%)"
	};
	tarea = document.getElementsByClassName("tarea");
	document.body.style.background = gradients[selected];
		if (selected === "DeepDark"){
			document.body.style.color = "white";
			document.getElementById("home").style.color = "#35fcf2";
			for (element of tarea) {
				element.style.background = "black";
				element.style.color = "white";
				element.style.border = (element.id === "output") ? "3px solid white" : "2px solid white";
			}
		}
		else {
			document.body.style.color = "black";
			document.getElementById("home").style.color = "#0000EE";
			for (element of tarea) {
				element.style.background = "white";
				element.style.color = "black";
				element.style.border = (element.id === "output") ? "3px solid black" : "2px solid black";
			}
		}
	
		// saving theme for retrieval
		localStorage.setItem("theme", selected);
}
function atUpdate () {
	var atOn = document.getElementById("@on").checked;
	
	// saving @ on/off boolean for retrieval
	localStorage.setItem("@on", atOn);
	
	if (buttonclicked) {
		output();
	}
}
function reversal () {
	var isReverse = document.getElementById("reverse").checked;
	
	// saving checkbox boolean for retrieval
	localStorage.setItem("reverse", isReverse);
	
	if (isReverse){
		document.getElementById("button").innerHTML = document.getElementById("button").innerHTML.replace("Construct", "De-Construct");
		document.getElementById("top-left").readOnly = true;
		tidy("top-left","");
		document.getElementById("top-left").placeholder = "De-merged output will be displayed here.";
		document.getElementById("top-right").readOnly = true;
		tidy("top-right","");
		document.getElementById("top-right").placeholder = "De-merged output will be displayed here.";
		document.getElementById("bottom-left").readOnly = true;
		tidy("bottom-left","");
		document.getElementById("bottom-left").placeholder = "De-merged output will be displayed here.";
		document.getElementById("bottom-right").readOnly = true;
		tidy("bottom-right","");
		document.getElementById("bottom-right").placeholder = "De-merged output will be displayed here.";
		document.getElementById("output").readOnly = false;
		document.getElementById("output").placeholder = "Copy and paste previously merged output here.";
		return;
	}
	document.getElementById("button").innerHTML = document.getElementById("button").innerHTML.replace("De-Construct", "Construct");
	document.getElementById("top-left").readOnly = false;
	document.getElementById("top-left").placeholder = "Copy and paste text from the bracketmaker directly. 'vs' needs 2 spaces on each side.";
	document.getElementById("top-right").readOnly = false;
	document.getElementById("top-right").placeholder = "Copy and paste text from the bracketmaker directly. 'vs' needs 2 spaces on each side.";
	document.getElementById("bottom-left").readOnly = false;
	document.getElementById("bottom-left").placeholder = "Copy and paste text from the bracketmaker directly. 'vs' needs 2 spaces on each side.";
	document.getElementById("bottom-right").readOnly = false;
	document.getElementById("bottom-right").placeholder = "Copy and paste text from the bracketmaker directly. 'vs' needs 2 spaces on each side.";
	document.getElementById("output").readOnly = true;
	document.getElementById("output").value = "";
	document.getElementById("output").placeholder = "Merged output will be displayed here.";
}
function scale (multiplier) {
	updateMaximums();
	
	// saving multiplier for retrieval
	localStorage.setItem("multiplier", multiplier);
	
	// load output
	if (buttonclicked) {
		output();
	}
	
	if (multiplier === "1.5") {
		document.getElementById("8").innerHTML = "12";
		document.getElementById("16").innerHTML = "24";
		document.getElementById("32").innerHTML = "48";
		document.getElementById("64").innerHTML = "96";
		document.getElementById("128").innerHTML = "192";
		document.getElementById("256").innerHTML = "384";
		document.getElementById("512").innerHTML = "768";
		return;
	}
	document.getElementById("8").innerHTML = "8";
	document.getElementById("16").innerHTML = "16";
	document.getElementById("32").innerHTML = "32";
	document.getElementById("64").innerHTML = "64";
	document.getElementById("128").innerHTML = "128";
	document.getElementById("256").innerHTML = "256";
	document.getElementById("512").innerHTML = "512";
}
function modifySize (size, atStartUp) {
	var roundString = "",
	    round = 0,
	    currentRoundIndex = 0,
	    maxRoundIndex = 0,
	    parityIndex = 0;
	roundString = localStorage.getItem("round");
	round = roundString !== null ? parseInt(roundString) : 2;
	currentRoundIndex = document.getElementById("round").options.selectedIndex;
	currentRoundIndex = atStartUp ? Math.floor(round/2)-1 : currentRoundIndex;
	maxRoundIndex = (Math.log2(parseInt(size))-3);
	currentRoundIndex = (currentRoundIndex > maxRoundIndex) ? maxRoundIndex: currentRoundIndex;
	round = (currentRoundIndex+1)*2;
	updateRound(round);
	parityIndex = document.getElementById("parity").options.selectedIndex;
	if (parityIndex === 0){
		document.getElementById("round").innerHTML = '<option id="2" value="2">2</option>';
		if (size > parseInt("12")) {
			document.getElementById("round").innerHTML += '<option id="4" value="4">4</option>';
		}
		if (size > parseInt("24")) {
			document.getElementById("round").innerHTML += '<option id="6" value="6">6</option>';
		}
		if (size > parseInt("48")) {
			document.getElementById("round").innerHTML += '<option id="1000" value="8">8</option>';
		}
		if (size > parseInt("96")) {
			document.getElementById("round").innerHTML += '<option id="10" value="10">10</option>';
		}
		if (size > parseInt("192")) {
			document.getElementById("round").innerHTML += '<option id="12" value="12">12</option>';
		}
		if (size > parseInt("384")) {
			document.getElementById("round").innerHTML += '<option id="14" value="14">14</option>';
		}
	}
	if (parityIndex === 1){
		document.getElementById("round").innerHTML = '<option id="2" value="2">3</option>';
		if (size > parseInt("12")) {
			document.getElementById("round").innerHTML += '<option id="4" value="4">5</option>';
		}
		if (size > parseInt("24")) {
			document.getElementById("round").innerHTML += '<option id="6" value="6">7</option>';
		}
		if (size > parseInt("48")) {
			document.getElementById("round").innerHTML += '<option id="1000" value="8">9</option>';
		}
		if (size > parseInt("96")) {
			document.getElementById("round").innerHTML += '<option id="10" value="10">11</option>';
		}
		if (size > parseInt("192")) {
			document.getElementById("round").innerHTML += '<option id="12" value="12">13</option>';
		}
		if (size > parseInt("384")) {
			document.getElementById("round").innerHTML += '<option id="14" value="14">15</option>';
		}
	}
	document.getElementById("round").options.selectedIndex = currentRoundIndex;
	updateMaximums();
	
	// saving size for retrieval
	localStorage.setItem("size", size);
	
	// load output
	if (buttonclicked) {
		output();
	}
}
function changeParity (parity) {
	var lastIndex = 0,
	    roundIndex = 0,
	    round = 0;
	lastIndex = document.getElementById("round").options.length-1;
	roundIndex = document.getElementById("round").options.selectedIndex;
	round = ((roundIndex+1)*2);
	
	// saving parity for retrieval
	localStorage.setItem("parity", parity);
	
	// load output
	if (buttonclicked) {
		output();
	}
	
	if (parity === "odd") {
		updateRound(round);
		updateMaximums();
		document.getElementById("2").innerHTML = "3";
		if (document.getElementById("4") !== null) {
			if (document.getElementById("4").innerHTML === "4") {
				document.getElementById("4").innerHTML = "5";
			}
		}
		if (document.getElementById("6") !== null) {
			if (document.getElementById("6").innerHTML  === "6") {
				document.getElementById("6").innerHTML = "7";
			}
		}
		if (document.getElementById("1000") !== null) {
			if (document.getElementById("1000").innerHTML  === "8") {
				document.getElementById("1000").innerHTML = "9";
			}
		}
		if (document.getElementById("10") !== null) {
			if (document.getElementById("10").innerHTML  === "10") {
				document.getElementById("10").innerHTML = "11";
			}
		}
		if (document.getElementById("12") !== null) {
			if (document.getElementById("12").innerHTML  === "12") {
				document.getElementById("12").innerHTML = "13";
			}
		}
		if (document.getElementById("14") !== null) {
			if (document.getElementById("14").innerHTML  === "14") {
				document.getElementById("14").innerHTML = "15";
			}
		}
		document.getElementById("W1").innerHTML = document.getElementById("W1").innerHTML.replace("<small>Winners</small>","<small>&nbsp;&nbsp;Losers&nbsp;&nbsp;</small>");
		document.getElementById("W2").innerHTML = document.getElementById("W2").innerHTML.replace("<small>Winners</small>","<small>&nbsp;&nbsp;Losers&nbsp;&nbsp;</small>");
		return;
	}
	if (document.getElementById("round").options.selectedIndex !== lastIndex){
		document.getElementById("round").options.selectedIndex++;
		round += 2;
	}
	updateRound(round);
	updateMaximums();
	document.getElementById("2").innerHTML = "2";
	if (document.getElementById("4") !== null) {
		if (document.getElementById("4").innerHTML === "5") {
			document.getElementById("4").innerHTML = "4";
		}
	}
	if (document.getElementById("6") !== null) {
		if (document.getElementById("6").innerHTML  === "7") {
			document.getElementById("6").innerHTML = "6";
		}
	}
	if (document.getElementById("1000") !== null) {
		if (document.getElementById("1000").innerHTML  === "9") {
			document.getElementById("1000").innerHTML = "8";
		}
	}
	if (document.getElementById("10") !== null) {
		if (document.getElementById("10").innerHTML  === "11") {
			document.getElementById("10").innerHTML = "10";
		}
	}
	if (document.getElementById("12") !== null) {
		if (document.getElementById("12").innerHTML  === "13") {
			document.getElementById("12").innerHTML = "12";
		}
	}
	if (document.getElementById("14") !== null) {
		if (document.getElementById("14").innerHTML  === "15") {
			document.getElementById("14").innerHTML = "14";
		}
	}
	document.getElementById("W1").innerHTML = document.getElementById("W1").innerHTML.replace("<small>&nbsp;&nbsp;Losers&nbsp;&nbsp;</small>","<small>Winners</small>");
	document.getElementById("W2").innerHTML = document.getElementById("W2").innerHTML.replace("<small>&nbsp;&nbsp;Losers&nbsp;&nbsp;</small>","<small>Winners</small>");
}
function updateRound (round) {
	var lastRound = 0,
	    last2Round = 0,
	    parityIndex = 0;
	parityIndex = document.getElementById("parity").options.selectedIndex;
	lastRound = parseInt(round)-1;
	lastRound += (parityIndex === 1);
	last2Round = (lastRound === 1) ? 1 : lastRound-1;
	if (parityIndex === 1) {
		document.getElementById("W1").innerHTML = document.getElementById("W1").innerHTML.replace(/R\d\d?/,"R" + lastRound);
		document.getElementById("W2").innerHTML = document.getElementById("W2").innerHTML.replace(/R\d\d?/,"R" + lastRound);
		document.getElementById("L1").innerHTML = document.getElementById("L1").innerHTML.replace(/R\d\d?/,"R" + lastRound);
		document.getElementById("L2").innerHTML = document.getElementById("L2").innerHTML.replace(/R\d\d?/,"R" + lastRound);
	}
	else {
		document.getElementById("W1").innerHTML = document.getElementById("W1").innerHTML.replace(/R\d\d?/,"R" + last2Round);
		document.getElementById("W2").innerHTML = document.getElementById("W2").innerHTML.replace(/R\d\d?/,"R" + last2Round);
		document.getElementById("L1").innerHTML = document.getElementById("L1").innerHTML.replace(/R\d\d?/,"R" + lastRound);
		document.getElementById("L2").innerHTML = document.getElementById("L2").innerHTML.replace(/R\d\d?/,"R" + lastRound);
	}
	
	// saving round number for retrieval
	localStorage.setItem("round", round);
	
	updateMaximums();
	
	// load output
	if (buttonclicked) {
		output();
	}
}
function updateMethod (method) {
	// saving size for retrieval
	localStorage.setItem("method", method);
	
	// load output
	if (buttonclicked) {
		output();
	}
}
function tidy (name, text) {
	var newtext = "",
	    linecount = 0,
	    charcount = 0,
	    quad = {},
	    h1a = [],
	    h2a = [],
	    omp1 = /()/,
	    omp2 = /()/,
	    omp3 = /()/,
	    omp4 = /()/,
	    emp1 = /()/,
	    emp2 = /()/;
	newtext = text.replace(/\n\n/g,"\n").replace(/^\n/,"");
	quad = {"top-left": "W1", "top-right": "W2", "bottom-left": "L1", "bottom-right": "L2", "output": "button"};
	document.getElementById(name).value = newtext;
	charcount = newtext.length;
	linecount = (name === "output") ? newtext.split(/\n|\s‹.{2,5}›\s|\s«.{2,5}»\s/).length : newtext.split(/\n|\s\svs\s\s/).length;
	linecount -= newtext.slice("-1") === "\n";
	linecount -= charcount === 0;
	linecount = linecount/2;
	if (name === "output") {
		h1a = text.match(/▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂/g);
		h2a = text.match(/▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔/g);
		linecount -= (h1a !== null) ? h1a.length/2 : 0;
		linecount -= (h2a !== null) ? h2a.length/2 : 0;
		if (document.getElementById("parity").options.selectedIndex === 0) {
			omp1 = /Left\s\/\sTop\sWinner\sBracket\n/;
			omp2 = /Right\s\/\sBottom\sWinner\sBracket\n/;
			linecount -= omp1.test(text) ? 0.5 : 0;
			linecount -= omp2.test(text) ? 0.5 : 0;
		}
		omp3 = /Left\s\/\sTop\sLoser\sBracket\n/;
		omp4 = /Right\s\/\sBottom\sLoser\sBracket\n/;
		linecount -= omp3.test(text) ? 0.5 : 0;
		linecount -= omp4.test(text) ? 0.5 : 0;
		emp1 = /One or more text areas do not contain the specified number of pairings\./;
		emp2 = /One or more pairings have names not prefixed with @\./;
		linecount -= emp1.test(text) ? 0.5 : 0;
		linecount -= emp2.test(text) ? 0.5 : 0;
	}
	document.getElementById(quad[name]).innerHTML = document.getElementById(quad[name]).innerHTML.replace(/\[[.\d]+\//,"["+linecount+"/");
	if (text === "") {
		localStorage.removeItem(name);
		return;
	}
	// saving size for inputs and outputs
	localStorage.setItem(name, newtext);
}
function updateMaximums () {
	var roundIndex = 0,
	    sizeIndex = 0,
	    parityIndex = 0,
	    scaleIndex = 0,
	    roundSize = 0,
	    pairingSize = 0,
	    isReverse = false;
	roundIndex = document.getElementById("round").options.selectedIndex;
	sizeIndex = document.getElementById("size").options.selectedIndex;
	parityIndex = document.getElementById("parity").options.selectedIndex;
	scaleIndex = document.getElementById("scaler").options.selectedIndex;
	isReverse = document.getElementById("reverse").checked;
	roundSize = Math.pow(2, sizeIndex+3-roundIndex-1);
	pairingSize = roundSize/((parityIndex+1)*4);
	pairingSize = scaleIndex === 1 ? (3/2)*pairingSize : pairingSize;
	if (pairingSize === 0.75) {
		document.getElementById("W1").innerHTML = document.getElementById("W1").innerHTML.replace(/\/[.\d]+\]/, "/1.5]");
		document.getElementById("W2").innerHTML = document.getElementById("W2").innerHTML.replace(/\/[.\d]+\]/, "/0]");
		document.getElementById("L1").innerHTML = document.getElementById("L1").innerHTML.replace(/\/[.\d]+\]/, "/1.5]");
		document.getElementById("L2").innerHTML = document.getElementById("L2").innerHTML.replace(/\/[.\d]+\]/, "/0]");
	}
	else {
		document.getElementById("W1").innerHTML = document.getElementById("W1").innerHTML.replace(/\/[.\d]+\]/, "/"+pairingSize+"]");
		document.getElementById("W2").innerHTML = document.getElementById("W2").innerHTML.replace(/\/[.\d]+\]/, "/"+pairingSize+"]");
		document.getElementById("L1").innerHTML = document.getElementById("L1").innerHTML.replace(/\/[.\d]+\]/, "/"+pairingSize+"]");
		document.getElementById("L2").innerHTML = document.getElementById("L2").innerHTML.replace(/\/[.\d]+\]/, "/"+pairingSize+"]");
	}
	document.getElementById("button").innerHTML = document.getElementById("button").innerHTML.replace(/\/[.\d]+\]/, "/"+pairingSize*4+"]");
}
function output () {
	var outputText = "",
	    w1 = "",
	    w2 = "",
	    l1 = "",
	    l2 = "",
	    w1x = 0,
	    w2x = 0,
	    l1x = 0,
	    l2x = 0,
	    w1n = 0,
	    w2n = 0,
	    l1n = 0,
	    l2n = 0,
	    parityIndex = 0,
	    roundIndex = 0,
	    methodIndex = 0,
	    i = 0,
	    w1a = [],
	    w2a = [],
	    l1a = [],
	    l2a = [],
	    m1a = [],
	    m2a = [],
	    atOn = false,
	    atPattern = /()/,
	    atw1,
	    atw2,
	    atl1,
	    atl2;
	buttonclicked = true;
	parityIndex = document.getElementById("parity").options.selectedIndex;
	roundIndex = document.getElementById("round").options.selectedIndex;
	methodIndex = document.getElementById("method").options.selectedIndex;
	w1 = document.getElementById("top-left").value;
	w2 = document.getElementById("top-right").value;
	l1 = document.getElementById("bottom-left").value;
	l2 = document.getElementById("bottom-right").value;
	w1n = Number(document.getElementById("W1").innerHTML.match(/\[[.\d]+\//)[0].replace("/","").replace("[",""));
	w2n = Number(document.getElementById("W2").innerHTML.match(/\[[.\d]+\//)[0].replace("/","").replace("[",""));
	l1n = Number(document.getElementById("L1").innerHTML.match(/\[[.\d]+\//)[0].replace("/","").replace("[",""));
	l2n = Number(document.getElementById("L2").innerHTML.match(/\[[.\d]+\//)[0].replace("/","").replace("[",""));
	w1x = Number(document.getElementById("W1").innerHTML.match(/\/[.\d]+\]/)[0].replace("/","").replace("]",""));
	w2x = Number(document.getElementById("W2").innerHTML.match(/\/[.\d]+\]/)[0].replace("/","").replace("]",""));
	l1x = Number(document.getElementById("L1").innerHTML.match(/\/[.\d]+\]/)[0].replace("/","").replace("]",""));
	l2x = Number(document.getElementById("L2").innerHTML.match(/\/[.\d]+\]/)[0].replace("/","").replace("]",""));
	if (w1n !== w1x || w2n !== w2x || l1n !== l1x || l2n !== l2x) {
		document.getElementById("output").value = "One or more text areas do not contain the specified number of pairings.";
		localStorage.setItem("output", "One or more text areas do not contain the specified number of pairings.");
		return;
	}
	atOn = document.getElementById("@on").checked;
	atPattern = /@.+\s\svs\s\s@.+/g;
	atw1 = w1.match(atPattern);
	atw1 = atw1 !== null ? atw1.length : 0;
	atw2 = w2.match(atPattern);
	atw2 = atw2 !== null ? atw2.length : 0;
	atl1 = l1.match(atPattern);
	atl1 = atl1 !== null ? atl1.length : 0;
	atl2 = l2.match(atPattern);
	atl2 = atl2 !== null ? atl2.length : 0;
	if (atOn) {
		if (atw1 !== w1x || atw2 !== w2x || atl1 !== l1x || atl2 !== l2x) {
			document.getElementById("output").value = "One or more pairings have names not prefixed with @.";
			localStorage.setItem("output", "One or more pairings have names not prefixed with @.");
			return;
		}
	}
	if (parityIndex === 0) {
		outputText = "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n";
		outputText += "Left / Top Winner Bracket\n";
		outputText += "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
		outputText += w1.replace(/\s\svs\s\s/g," ‹vs› ") + "\n";
		outputText += "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n";
		outputText += "Right / Bottom Winner Bracket\n";
		outputText += "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
		outputText += w2.replace(/\s\svs\s\s/g," ‹vs› ") + "\n";
		outputText += "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n";
		outputText += "Left / Top Loser Bracket\n";
		outputText += "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
		outputText += l1.replace(/\s\svs\s\s/g," ‹vs› ") + "\n";
		outputText += "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n";
		outputText += "Right / Bottom Loser Bracket\n";
		outputText +="▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
		outputText += l2.replace(/\s\svs\s\s/g," ‹vs› ") + "\n";
		outputText = outputText.replace(/\n\n/g,"\n").replace(/\n$/,"");
		document.getElementById("output").value = outputText;
		tidy ("output", outputText);
		updateMaximums();
		return;
	}
	w1a = w1.replace(/\n+$/,"").split(/\n|\s\svs\s\s/);
	w2a = w2.replace(/\n+$/,"").split(/\n|\s\svs\s\s/);
	l1a = l1.replace(/\n+$/,"").split(/\n|\s\svs\s\s/);
	l2a = l2.replace(/\n+$/,"").split(/\n|\s\svs\s\s/);
	if (methodIndex === 0) {
		if (roundIndex === 0 || roundIndex === 2 || roundIndex === 4 || roundIndex === 6) {
			if (w2a.length === l1a.length && l1a.length > 1) {
				i = 0;
				while (m1a.length !== (w2a.length+l1a.length)) {
					m1a.push(w2a[i]);
					m1a.push(l1a[i]);
					i++;
				}
				i = 0;
				while (m1a.length !== w2a.length) {
					m1a[i] = m1a[i] + " ‹vs› " + m1a[i+1];
					i++;
					m1a.splice(i, 1);
				}
			}
			if (w1a.length === l2a.length && l2a.length > 1) {
				i = 0;
				while (m2a.length !== (w1a.length+l2a.length)) {
					m2a.push(w1a[i]);
					m2a.push(l2a[i]);
					i++;
				}
				i = 0;
				while (m2a.length !== w1a.length) {
					m2a[i] = m2a[i] + " ‹vs› " + m2a[i+1];
					i++;
					m2a.splice(i, 1);
				}
			}
			outputText = "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n";
			outputText += "Left / Top Loser Bracket\n";
			outputText += "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
			outputText += m1a.join("\n") + "\n";
			outputText += "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n";
			outputText += "Right / Bottom Loser Bracket\n";
			outputText +="▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
			outputText += m2a.join("\n") + "\n";
			outputText = outputText.replace(/\n\n/g,"\n").replace(/\n$/,"");
			document.getElementById("output").value = outputText;
			tidy ("output", outputText);
			updateMaximums();
			return;
		}
		if (w1a.length === l1a.length && l1a.length > 1) {
			i = 0;
			while (m1a.length !== (w1a.length+l1a.length)) {
				m1a.push(w1a[i]);
				m1a.push(l1a[i]);
				i++;
			}
			i = 0;
			while (m1a.length !== w1a.length) {
				m1a[i] = m1a[i] + " ‹vs› " + m1a[i+1];
				i++;
				m1a.splice(i, 1);
			}
		}
		if (w2a.length === l2a.length && l2a.length > 1) {
			i = 0;
			while (m2a.length !== (w2a.length+l2a.length)) {
				m2a.push(w2a[i]);
				m2a.push(l2a[i]);
				i++;
			}
			i = 0;
			while (m2a.length !== w2a.length) {
				m2a[i] = m2a[i] + " ‹vs› " + m2a[i+1];
				i++;
				m2a.splice(i, 1);
			}
		}
		outputText = "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n";
		outputText += "Left / Top Loser Bracket\n";
		outputText += "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
		outputText += m1a.join("\n") + "\n";
		outputText += "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n";
		outputText += "Right / Bottom Loser Bracket\n";
		outputText +="▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
		outputText += m2a.join("\n") + "\n";
		outputText = outputText.replace(/\n\n/g,"\n").replace(/\n$/,"");
		document.getElementById("output").value = outputText;
		tidy ("output", outputText);
		updateMaximums();
		return;		
	}
	if (roundIndex === 0 || roundIndex === 2 || roundIndex === 4 || roundIndex === 6) {
		if (w2a.length === l1a.length && l1a.length > 1) {
			i = 0;
			while (m1a.length !== w2a.length) {
				m1a.push(w2a[i]);
				i++;
				m1a.push(l1a[i]);
				i++;
			}
			i = 0;
			while (m1a.length !== (w2a.length+l1a.length)) {
				m1a.push(l1a[i]);
				i++;
				m1a.push(w2a[i]);
				i++;
			}
			i = 0;
			while (m1a.length !== w2a.length) {
				m1a[i] = m1a[i] + " ‹vs› " + m1a[i+1];
				i++;
				m1a.splice(i, 1);
			}
		}
		if (w1a.length === l2a.length && l2a.length > 1) {
			i = 0;
			while (m2a.length !== w1a.length) {
				m2a.push(w1a[i]);
				i++;
				m2a.push(l2a[i]);
				i++;
			}
			i = 0;
			while (m2a.length !== (w1a.length+l2a.length)) {
				m2a.push(l2a[i]);
				i++;
				m2a.push(w1a[i]);
				i++;
			}
			i = 0;
			while (m2a.length !== w1a.length) {
				m2a[i] = m2a[i] + " ‹vs› " + m2a[i+1];
				i++;
				m2a.splice(i, 1);
			}
		}
		outputText = "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n";
		outputText += "Left / Top Loser Bracket\n";
		outputText += "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
		outputText += m1a.join("\n") + "\n";
		outputText += "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n";
		outputText += "Right / Bottom Loser Bracket\n";
		outputText +="▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
		outputText += m2a.join("\n") + "\n";
		outputText = outputText.replace(/\n\n/g,"\n").replace(/\n$/,"");
		document.getElementById("output").value = outputText;
		tidy ("output", outputText);
		updateMaximums();
		return;
	}
	if (w1a.length === l1a.length && l1a.length > 1) {
		i = 0;
		while (m1a.length !== w1a.length) {
			m1a.push(w1a[i]);
			i++;
			m1a.push(l1a[i]);
			i++;
		}
		i = 0;
		while (m1a.length !== (w1a.length+l1a.length)) {
			m1a.push(l1a[i]);
			i++;
			m1a.push(w1a[i]);
			i++;
		}
		i = 0;
		while (m1a.length !== w1a.length) {
			m1a[i] = m1a[i] + " ‹vs› " + m1a[i+1];
			i++;
			m1a.splice(i, 1);
		}
	}
	if (w2a.length === l2a.length && l2a.length > 1) {
		i = 0;
		while (m2a.length !== w2a.length) {
			m2a.push(w2a[i]);
			i++;
			m2a.push(l2a[i]);
			i++;
		}
		i = 0;
		while (m2a.length !== (w2a.length+l2a.length)) {
			m2a.push(l2a[i]);
			i++;
			m2a.push(w2a[i]);
			i++;
		}
		i = 0;
		while (m2a.length !== w2a.length) {
			m2a[i] = m2a[i] + " ‹vs› " + m2a[i+1];
			i++;
			m2a.splice(i, 1);
		}
	}
	outputText = "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n";
	outputText += "Left / Top Loser Bracket\n";
	outputText += "▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
	outputText += m1a.join("\n") + "\n";
	outputText += "▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂\n";
	outputText += "Right / Bottom Loser Bracket\n";
	outputText +="▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n";
	outputText += m2a.join("\n") + "\n";
	outputText = outputText.replace(/\n\n/g,"\n").replace(/\n$/,"");
	document.getElementById("output").value = outputText;
	tidy ("output", outputText);
	updateMaximums();
	return;	
}
function empty () {
	tidy("top-left", "");
	tidy("top-right", "");
	tidy("bottom-left", "");
	tidy("bottom-right", "");
	tidy("output", "");
}
