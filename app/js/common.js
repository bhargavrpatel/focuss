/*
	Common functions
	----------------

	Functions which are imported in HTML file(s)

*/

const {ipcRenderer} = require('electron');

function closeApp() {
	ipcRenderer.send('state-messages', 'close');
}

function minimizeApp() {
	ipcRenderer.send('state-messages', 'minimize');
}

function secToMiliseconds(seconds) {
	return seconds * 1000;
}

function minToMiliseconds(minutes) {
	return secToMiliseconds(minutes * 60);
}