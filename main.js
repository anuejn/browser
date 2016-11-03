/**
 * Created by jaro on 27.10.16.
 */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const Url = require('url');
const Path = require('path');

let window;

function createWindow() {
    window = new BrowserWindow({width: 800, height: 600, frame: false, titleBarStyle: 'hidden-inset', show: false});
    if(process.argv.length > 2){ //path/toTelectron . debug
        window.webContents.openDevTools();
    }
    window.loadURL(`file://${__dirname}/app/index.html`);
    window.once('ready-to-show', () => {
        //hack for not showing white first
        window.show();
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

app.on('ready', function () {
    // register protocol browser://
    electron.protocol.registerFileProtocol('browser', (request, cb) => {
        if ( !request.url ) {
            cb (-3); // ABORTED
            return;
        }

        let url = decodeURIComponent(request.url);
        let uri = Url.parse(url);

        let relativePath = uri.hostname;
        if ( uri.pathname ) {
            relativePath = Path.join( relativePath, uri.pathname );
        }
        if(!relativePath.search(".")) {
            relativePath += ".html";
        }

        let file = Path.join( __dirname + "/app/pages", relativePath);
        cb ( { path: file } );
    }, err => {
        if (err) {
            console.log('Failed to register protocol browser, %s', err.message);
            return;
        }
        console.log('protocol browser registered');
    });
});