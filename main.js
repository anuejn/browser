/**
 * Created by jaro on 27.10.16.
 */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let window;

function createWindow () {
    window = new BrowserWindow({width: 800, height: 600, frame: false, titleBarStyle: 'hidden-inset', show: false});
    window.loadURL(`file://${__dirname}/app/index.html`);
    window.once('ready-to-show', () => {
        //hack for not showing white first
        window.show();
        window.webContents.openDevTools();
    });

    window.on('closed', function () {
        window = null
    })
}

app.on('ready', createWindow);

// macOS foo.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (window === null) {
        createWindow()
    }
});