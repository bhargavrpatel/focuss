const {app, BrowserWindow, ipcMain}  = require('electron')
const path = require('path')
const url = require('url')


let win

function createWindow () {

  // Create the browser window.
  win = new BrowserWindow({
    width: 210,
    height: 240,
    // frame: false,
    titleBarStyle: 'hidden',
    maximizable: false,
    resizable: false,
    show: false,
    icon: url.format({
      pathname: path.join(__dirname, './img/apple.ico'),
      protocol: 'file:',
      slashes: true
    })
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  });

  win.on('resize', () => {
    console.log(win.getSize());
  });

  win.once('ready-to-show', () => { win.show(); })
}

app.on('ready', createWindow)

ipcMain.on('state-messages', (event, arg) => {
  switch (arg) {
    // case 'close':
    //   console.log('Closing app...');
    //   app.quit();
    //   break;
    // case 'minimize':
    //   console.log('Minimizing app...');
    //   win.minimize();
    //   break;
    case 'sessionStarted':
      console.log('A session started...');
      win.setProgressBar(0);
      break;
    case 'sessionEnded':
      console.log('A session ended...');
      win.setProgressBar(-1);
      // win.show();
      // win.focus();
      break;
    case 'focus':
      console.log('Session completed, focusing...');
      win.show();
      win.focus();
      break;
    default:
      // Use default case to handle progress events
      // TODO: Make this sexier.
      if (arg.indexOf('progress') !== -1) {
        // We got some progress to show...
        var [garbage, progress] = arg.split('-');
        progress = parseFloat(progress);
        win.setProgressBar(progress || -1);
        console.log(`Set progress to ${progress}`);
        break;
      }
      console.log(`Got an odd argument: ${arg}`);
  }
});

// Quit the app when windows are closed, even on OS X
app.on('window-all-closed', () => { app.quit() });

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});