const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const resizeImg = require('resize-img');

let mainWindow;

/** Create the main Window */
const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: 500,
    height: 500,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      // devTools: process.env.NODE_ENV === 'development' ? true : false, // enable for development
    },
  });

  /** Auto-open DevTools if started in DevMode */
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({
      mode: 'undocked',
    });
  }

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
};

/** Create About Window */
const createAboutWindow = () => {
  const aboutWindow = new BrowserWindow({
    title: 'About Image Resizer',
    width: 300,
    height: 300,
  });

  aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
};

/***********************************************************************************/

/** Menu Template */
const menu = [
  {
    label: '&File',
    submenu: [
      {
        label: 'Quit',
        click: () => app.quit(),
        accelerator: 'CmdOrCtrl + Q',
      },
    ],
  },
  {
    label: '&Window',
    submenu: [
      {
        label: 'Minimize',
        click: () => mainWindow.minimize(),
        accelerator: 'CmdOrCtrl + M',
      },
      {
        label: 'Close',
        click: () => app.quit(),
        accelerator: 'CmdOrCtrl + W',
      },
    ],
  },
  {
    label: '&Help',
    submenu: [
      {
        label: 'About',
        click: createAboutWindow,
      },
    ],
  },
];

/** Load Window when app is Ready */
app.whenReady().then(() => {
  createMainWindow();

  /** Implement Menu */
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  /** Remove mainWindow from memory to prevent memory leaks on close (since not function scoped) */
  mainWindow.on('closed', () => (mainWindow = null));

  /**
   * macOS apps continue running even without any windows open.
   * Activating the app when no windows are available should open a new one.
   */
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

/** Quit the app when all windows are closed (Windows & Linux) */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

/** Resize Image */
const resizeImage = async ({ width, height, imgPath, destination }) => {
  try {
    // Create Image Buffer with Resized dimensions
    const imageBuffer = await resizeImg(fs.readFileSync(imgPath), {
      width: parseInt(width),
      height: parseInt(height),
    });

    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }

    // Write Image Buffer to File in Destination Folder
    fs.writeFileSync(
      path.join(destination, path.basename(imgPath)),
      imageBuffer
    );

    // Send success to Render
    mainWindow.webContents.send('image:success');

    // Open destination Folder (Note: fs.openDirSync doesn't work, use Electron shell)
    shell.showItemInFolder(path.join(destination, path.basename(imgPath)));
  } catch (err) {
    console.log(err.message);
  }
};

/***************************************************************************************
 * Event Listeners
 * ----------------
 ***************************************************************************************/

/** Respond to ipcRenderer resize */
ipcMain.on('image:resize', async (e, args) => {
  args.destination = path.join(os.homedir(), 'image-resizer');

  // Resize Image
  await resizeImage(args);

  return;
});
