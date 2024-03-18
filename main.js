const { app, BrowserWindow, nativeTheme } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js'),
            // Check for common bugs such as null pointer references, unhandled exceptions, and more
            sandbox: true
        },
        icon: path.join(__dirname, 'youtube-music-icon.icon')
    });

    win.loadURL('https://music.youtube.com/');
    win.removeMenu();
}

app.whenReady().then(() => {
    // Set the theme source to 'dark' to ensure the application always starts in dark mode
    nativeTheme.themeSource = 'dark';

    // Create the window
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS, it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
