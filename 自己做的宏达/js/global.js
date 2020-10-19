
initScreen();
window.onresize = function() {
	initScreen();
}

function defaultfont() {
	var sw = document.documentElement.clientWidth;
	var pw = 375;
	  sw = sw > 375 ? 375 : sw < 320 ? 320 : sw;
	var f = 100 * sw / pw;
	document.documentElement.style.fontSize = f + 'px';
}

function initScreen() {
	defaultfont();
	setTimeout(function() {
		defaultfont();
	}, 100);
}