/*
	Common functions
	----------------

	Functions which are imported in HTML file(s)

*/
var cmd=require('node-cmd');
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

function sessionEndNotification() {
	var notif = new window.Notification('Session Completed', {
	  body: `Your ${sessionDuration} minutes session completed. Congrats!`
	});

	notif.onclick = function () {
	  ipcRenderer.send('state-messages', 'focus')
	}
}
