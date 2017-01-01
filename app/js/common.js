/*
	Common functions
	----------------

	Functions which are imported in HTML file(s)

*/
const cmd = require('node-cmd');
const {ipcRenderer} = require('electron');
const platform = require('os').platform();


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

function runInternetCommands(enable) {
	if (platform === 'darwin') {
		if (enable) {
			commands = ['networksetup -setairportpower en0 on']
		} else {
			commands = ['networksetup -setairportpower en0 off']
		}
	} else if (platform === 'win32') {
		// TODO: Add command for Windows and test on PC.
		return;
	} else {
		// TODO: Research how to run command for Linux
		return;
	}
	commands.forEach(function (command, index, array) {
	  cmd.run(command);
	});
}

function enableInternet() {
	runInternetCommands(true);
}

function disableInternet() {
	runInternetCommands(false);
}
