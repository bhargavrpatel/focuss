const {app, Menu} = require('electron')


function buildMenu(win, start=false, end=false) {
  var template = [
    {
      label: 'Focuss',
      submenu: [
        {
          label: 'Start a Session',
          accelerator: 'CmdOrCtrl+S',
          enabled: start,
          click () {
            win.webContents.send('menu-event', 'start');
          }
        },
        {
          label: 'End a Sesson',
          accelerator: 'CmdOrCtrl+E',
          enabled: end,
          click () {
            win.webContents.send('menu-event', 'end');
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Minimize Focuss',
          role: 'minimize'
        },
        {
          label: 'Quit Application',
          role: 'quit'
        }
      ]
    }
  ]

  var menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}


module.exports = { buildMenu }
