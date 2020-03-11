document.documentElement.className = "no-fouc";
$(document).ready(function() {
	startUp();
	$(".no-fouc").removeClass("no-fouc");
});
function startUp () {
    // Declaring variables.
    var theme = "";
    theme = localStorage.getItem("theme");
    if (theme === "DeepDark" || theme === "IceBlue" || theme === "MalachtiteGreen" || theme === "PhloxPurple" || theme === "ScarletRed" || theme === "StandardSilver") {
      document.getElementById("themechange").value = theme;
		  changeTheme(theme);
	  }
}
function changeTheme(selected) {
	// Declaring variables.
	var gradients = {};

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
	document.body.style.background = gradients[selected];
		if (selected === "DeepDark"){
			document.body.style.color = "white";
			document.getElementById("pc").style.color = "#35fcf2";
		}
		else {
			document.body.style.color = "black";
			document.getElementById("pc").style.color = "#0000EE";
		}
	
		// saving theme for retrieval
		localStorage.setItem("theme", selected);
}
