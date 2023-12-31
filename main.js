// This is standard boilerplate to set up a new Electron window.
// Please refer to the Electron tutorials for more information.

const {app, BrowserWindow} = require('electron')

function createWindow() {
    const mainWindow = new BrowserWindow({ width: 800, height: 600 })
    mainWindow.loadFile('index.html')
    const version = app.getVersion()
    mainWindow.webContents.executeJavaScript(`
        const elem = document.querySelector('#app-version');
        elem.textContent = '${version}';
    `);
}

app.whenReady().then(() => {
    // This code is invoked once Electron is ready.
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
