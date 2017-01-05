/*
  Common functions
  ----------------

  Functions which are imported in HTML file(s)

*/
const cmd = require('node-cmd');
const { ipcRenderer } = require('electron');
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
  const notif = new window.Notification('Session Completed', {
    body: `Your ${sessionDuration} minutes session completed. Congrats!`,
  });

  notif.onclick = () => {
    ipcRenderer.send('state-messages', 'focus');
  };
}

function runInternetCommands(enable) {
  let commands;

  if (platform === 'darwin') {
    if (enable) {
      commands = ['sudo ifconfig en0 up',
                  'networksetup -setairportpower en0 on'];
    } else {
      commands = ['sudo ifconfig en0 down',
                  'networksetup -setairportpower en0 off'];
    }
  } else if (platform === 'win32') {
    if (enable) {
      commands = ['ipconfig/renew'];
    } else {
      commands = ['ipconfig/release'];
    }
  } else {
    if (enable) {
      commands = ['nmcli nm enable true'];
    } else {
      commands = ['nmcli nm enable false'];
    }
  }

  commands.forEach((command) => {
    cmd.run(command);
  });
}

function enableInternet() {
  runInternetCommands(true);
}

function disableInternet() {
  runInternetCommands(false);
}
