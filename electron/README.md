# Table of Contents

- [Table of Contents](#table-of-contents)
- [What is Electron?](#what-is-electron)
- [Processes in Electron](#processes-in-electron)
  - [Process Model](#process-model)
  - [Using Preload Scripts](#using-preload-scripts)
  - [Inter-Process Communication (IPC)](#inter-process-communication-ipc)
    - [IPC: Overview](#ipc-overview)
  - [IPC: Workflow](#ipc-workflow)
- [Main Process Modules](#main-process-modules)
  - [`app`](#app)
    - [Events](#events)
      - [`will-finish-launching`](#will-finish-launching)
      - [`ready`](#ready)
      - [`window-all-closed`](#window-all-closed)
      - [`before-quit`](#before-quit)
      - [`will-quit`](#will-quit)
      - [`quit`](#quit)
      - [`open-file`](#open-file)
      - [`open-url`](#open-url)
      - [`activate`](#activate)
      - [`session-created`](#session-created)
    - [Methods](#methods)
      - [`app.quit()`](#appquit)
      - [`app.exit()`](#appexit)
      - [`app.isReady()`](#appisready)
      - [`app.whenReady()`](#appwhenready)
  - [`BrowserWindow`](#browserwindow)
    - [Instance Events](#instance-events)
      - [`page-title-updated`](#page-title-updated)
      - [`close`](#close)
    - [Instance Properties](#instance-properties)
      - [`webContents`](#webcontents)
    - [Instance Methods](#instance-methods)
      - [`loadURL(url[, options])`](#loadurlurl-options)
      - [`loadFile(filePath[, options])`](#loadfilefilepath-options)
  - [`webContents`](#webcontents-1)
    - [Instance Methods](#instance-methods-1)
      - [`contents.openDevTools([options])`](#contentsopendevtoolsoptions)
      - [`contents.closeDevTools()`](#contentsclosedevtools)
      - [`contents.toggleDevTools()`](#contentstoggledevtools)
      - [`contents.send(channel, ...args)`](#contentssendchannel-args)
      - [`contents.getPrintersAsync()`](#contentsgetprintersasync)
      - [`contents.print([options], [callback])`](#contentsprintoptions-callback)
  - [`Menu`](#menu)
    - [Static Methods](#static-methods)
      - [`Menu.setApplicationMenu(menu)`](#menusetapplicationmenumenu)
      - [`Menu.buildFromTemplate(template)`](#menubuildfromtemplatetemplate)
- [Renderer Process Modules](#renderer-process-modules)
- [References](#references)

---

# What is Electron?

Electron is a framework for building desktop applications using JavaScript, HTML, and CSS. By embedding Chromium and Node.js into its binary, Electron allows you to maintain one JavaScript codebase and create cross-platform apps that work on Windows, macOS, and Linux — no native development experience required.

---

# Processes in Electron

## Process Model

Electron inherits its multi-process architecture from Chromium, which makes the framework architecturally very similar to a modern web browser.

Web browsers are incredibly complicated applications. Aside from their primary ability to display web content, they have many secondary responsibilities, such as managing multiple windows (or tabs) and loading third-party extensions.

In the earlier days, browsers usually used a single process for all of this functionality. Although this pattern meant less overhead for each tab you had open, it also meant that one website crashing or hanging would affect the entire browser.

To solve this problem, the Chrome team decided that each tab would render in its own process, limiting the harm that buggy or malicious code on a web page could cause to the app as a whole. A single browser process then controls these processes, as well as the application lifecycle as a whole. This diagram below from the Chrome Comic visualizes this model:

![Chrome Process Model](https://www.electronjs.org/assets/images/chrome-processes-0506d3984ec81aa39985a95e7a29fbb8.png)

Electron applications are structured very similarly. As an app developer, you control two types of processes: **main** and **renderer**. These are analogous to Chrome's own browser and renderer processes outlined above.

**[Window Customization](https://www.electronjs.org/docs/latest/tutorial/window-customization)**

---

## [Using Preload Scripts](https://www.electronjs.org/docs/latest/tutorial/tutorial-preload)

Electron's main process is a Node.js environment that has full operating system access. On top of Electron modules, you can also access Node.js built-ins, as well as any packages installed via npm. On the other hand, renderer processes run web pages and do not run Node.js by default for security reasons.

To bridge Electron's different process types together, we will need to use a special script called a **preload**.

---

## [Inter-Process Communication (IPC)](https://www.electronjs.org/docs/latest/tutorial/ipc)

### IPC: Overview

Electron's main and renderer process have distinct responsibilities and are not interchangeable. This means it is not possible to access the Node.js or Native APIs directly from the renderer process, nor the HTML Document Object Model (DOM) from the main process.

The solution for this problem is to use Electron's **`ipcMain`** and **`ipcRenderer`** modules for inter-process communication (IPC). To send a message from your web page to the main process, you can set up a main process handler with `ipcMain.handle` and then expose a function that calls `ipcRenderer.invoke` to trigger the handler in your preload script.

---

## IPC: Workflow

- When you have to pass data from the renderer to main you have to pass the Inter Process Communication (IPC) Renderer via Preload Scripts so that the renderer process can listen to and send messages to the main process using `ipcRenderer`.

- Using preload scripts, the renderer process then sends an asynchronous payload to the main process via channel, along with arguments using the method -`ipcRenderer.send(channel, ...args)`.

- The main process has to listen to that channel using the method - `ipcMain.on(channel, listener)` and process the payload.

- While processing the payload, the main process may send an asynchronous message (e.g. indication of success) to the renderer process via channel, along with arguments using the `webContents` instance method - `webContents.send(channel, ...args)` of the current window.

- This channel must be listened to by the renderer process using `ipcRenderer.on(channel, listener)` and processed at the renderer and displayed on the current window.

---

# Main Process Modules

## [`app`](https://www.electronjs.org/docs/latest/api/app)

The `app` object control your application's event lifecycle.

The following is a brief summary of the events emitted by the app object. For all events and nuances on different behaviour in MacOS vs Windows, read the official documentation:

### Events

#### `will-finish-launching`

Emitted when the application has finished basic startup. On Windows and Linux, the `will-finish-launching` event is the same as the `ready` event; on macOS, this event represents the `applicationWillFinishLaunching` notification of `NSApplication`.

In most cases, you should do everything in the `ready` event handler.

---

#### `ready`

Emitted once, when Electron has finished initializing.

```js
app.on('ready', (event, launchInfo) => {
  console.log(event); // The event object
  console.log(launchInfo); // On macOS returns a NotificationResponse Object
  createMainWindow(); // Launch main window
});
```

You can also call the `app` methods, `app.isReady()` to check if this event has already fired and `app.whenReady()` to get a Promise that is fulfilled when Electron is initialized.

---

#### `window-all-closed`

Emitted when all windows have been closed.

```js
// quitting the app when no windows are open for all OS platforms
app.on('window-all-closed', () => {
  app.quit();
});
```

**Quit the app when all windows are closed (Windows & Linux)**

On Windows and Linux, closing all windows will generally quit an application entirely. To implement this pattern in your Electron app, listen for the app module's **`window-all-closed`** event, and call **[`app.quit()`](#appquit)** to exit your app if the user is not on macOS.

```js
// quitting the app when no windows are open on non-macOS platforms
app.on('window-all-closed', () => {
  /**
   * `process.platform` returns the following:
   * -----------------------------------------
   * Windows: `win32`
   * macOS: `darwin`
   * Linux: `linux`
   */
  if (process.platform !== 'darwin') app.quit();
});
```

---

#### `before-quit`

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

```js
app.on('before-quit', event => {
  console.log(event); // The event object
  event.preventDefault(); // Prevent Termination of application
  console.log(`Default Prevented: ${event.defaultPrevented}`); // Whether default is prevented
  app.exit(); // app method that closes all windows and DOES NOT emit `before-quit` or `will-quit` events
});
```

---

#### `will-quit`

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

```js
app.on('will-quit', event => {
  console.log(event); // The event object
  event.preventDefault(); // Prevent Termination of application
  console.log(`Default Prevented: ${event.defaultPrevented}`); // Whether default is prevented
  app.exit(); // app method that closes all windows and DOES NOT emit `before-quit` or `will-quit` events
});
```

---

#### `quit`

Emitted when the application is quitting.

> **Note**: On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

```js
app.on('quit', (event, exitCode) => {
  console.log(event); // The event object
  console.log(exitCode); // The exitCode - Integer
});
```

---

#### `open-file`

Emitted when the user wants to open a file with the application.

---

#### `open-url`

Emitted when the user wants to open a URL with the application.

---

#### `activate`

Emitted when the application is activated. Various actions can trigger this event, such as launching the application for the first time, attempting to re-launch the application when it's already running, or clicking on the application's dock or taskbar icon.

**Open a window if none are open (macOS)**

In contrast to Windows and Linux, macOS apps generally continue running even without any windows open. Activating the app when no windows are available should open a new one.

To implement this feature, listen for the app module's `activate` event, and call your existing `createWindow()` method if no `BrowserWindows` are open.

Because windows cannot be created before the `ready` event, you should only listen for activate events after your `app` is initialized. Do this by only listening for `activate` events inside your existing `whenReady()` callback.

**Method 1**: Using the `whenReady()` method

```js
app.whenReady().then(() => {
  createMainWindow();
  /**
   * macOS apps continue running even without any windows open.
   * Activating the app when no windows are available should open a new one.
   */
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});
```

**Method 2**: Listening to the `ready` event

```js
app.on('ready', () => {
  createMainWindow();
  /**
   * macOS apps continue running even without any windows open.
   * Activating the app when no windows are available should open a new one.
   */
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});
```

---

#### `session-created`

Emitted when Electron has created a new session.

---

### Methods

The app object has the following methods:

**Note**: Some methods are only available on specific operating systems and are labeled as such.

#### `app.quit()`

Try to close all windows. The `before-quit` event will be emitted first. If all windows are successfully closed, the `will-quit` event will be emitted and by default the application will terminate.

This method guarantees that all `beforeunload` and `unload` event handlers are correctly executed. It is possible that a window cancels the quitting by returning false in the `beforeunload` event handler.

---

#### `app.exit()`

Exits immediately with `exitCode`. `exitCode` defaults to `0`.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

---

#### `app.isReady()`

Returns boolean - true if Electron has finished initializing, false otherwise. See also `app.whenReady()`.

---

#### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the ready event if the app is not ready yet.

```js
app.whenReady().then(() => createMainWindow()); // Launches main window when app is initialized
```

---

## `BrowserWindow`

The `BrowserWindow` constructor lets you Create and control browser windows.

This module cannot be used until the `ready` event of the app module is emitted.

```js
const { app, BrowserWindow } = require('electron');
const path = require('path');

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: 800, // Window width in pixels. Default is 800.
    height: 600, // Window height in pixels. Default is 600.
    minWidth: 1920, // Window's minimum width. Default is 0.
    maxWidth: 1080, // Window's maximum width. Default is 0.
    alwaysOnTop: true, // Whether the window should always stay on top of other windows. Default is false.
    backgroundColor: '#2e2c29', // background colour for the window
    // frame: false, // Load without chrome (title bar, control buttons): i.e. only content area
  });

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
};
```

---

### Instance Events

#### `page-title-updated`

Emitted when the document changed its title, calling `event.preventDefault()` will prevent the native window's title from changing. `explicitSet` is false when title is synthesized from file URL.

```js
const mainWindow = new BrowserWindow();

mainWindow.on('page-title-updated', (event, title, explicitSet) => {
  console.log(event); // Returns the event object
  console.log(title); // Returns the page title
  event.preventDefault(); // Prevents the native page title from changing
  console.log(explicitSet); // Returns false when title is synthesized from file URL.
});
```

---

#### `close`

Emitted when the window is going to be closed. It's emitted before the `beforeunload` and `unload` event of the DOM. Calling `event.preventDefault()` will cancel the close.

```js
const mainWindow = new BrowserWindow();

mainWindow.on('close', event => console.log(event));
```

---

### Instance Properties

#### `webContents`

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the webContents documentation for its methods and events.

---

### Instance Methods

#### `loadURL(url[, options])`

---

#### `loadFile(filePath[, options])`

---

## `webContents`

### Instance Methods

#### `contents.openDevTools([options])`

Opens the DevTools.

```js
// Automatically open DevTools if in Development mode
if (process.env.NODE_ENV === 'development') {
  mainWindow.webContents.openDevTools({
    mode: 'undocked', // mode: 'left' | 'right' | 'bottom' | 'undocked' | 'detach'
    activate: true, // Whether to bring the opened devtools window to the foreground. Default: true
  });
}
```

---

#### `contents.closeDevTools()`

Closes the DevTools.

---

#### `contents.toggleDevTools()`

Toggles the DevTools.

---

#### `contents.send(channel, ...args)`

Send an asynchronous message to the renderer process via channel, along with arguments.

```js
mainWindow.webContents.send('image:success');
```

The channel `image:success` must be listened to on the renderer using `ipcRenderer` loaded via prebuild scripts.

---

#### `contents.getPrintersAsync()`

Get the system printer list. Returns a Promise.

Resolves with:

- `name` string - the name of the printer as understood by the OS.
- `displayName` string - the name of the printer as shown in Print Preview.
- `description` string - a longer description of the printer's type.
- `status` number - the current status of the printer.
- `isDefault` boolean - whether or not a given printer is set as the default printer on the OS.
- `options` Object - an object containing a variable number of platform-specific printer information.

**Example**:

```js
const mainWindow = new BrowserWindow();

mainWindow.webContents.getPrintersAsync().then(info => console.log(info));
```

**Response**:

```js
[
  {
    name: 'EPSON_L455_Series',
    displayName: 'EPSON_L455_Series',
    description: '',
    status: 3,
    isDefault: false,
    options: {
      copies: '1',
      'cups-browsed': 'true',
      'device-uri': 'implicitclass://EPSON_L455_Series/',
      finishings: '3',
      'job-cancel-after': '10800',
      'job-hold-until': 'no-hold',
      'job-priority': '50',
      'job-sheets': 'none,none',
      'marker-change-time': '0',
      'number-up': '1',
      'printer-commands': 'none',
      'printer-info': '',
      'printer-is-accepting-jobs': 'true',
      'printer-is-shared': 'false',
      'printer-is-temporary': 'false',
      'printer-location': '',
      'printer-make-and-model':
        'EPSON L455 Series, driverless, cups-filters 1.27.4',
      'printer-state': '3',
      'printer-state-change-time': '1674094104',
      'printer-state-reasons': 'none',
      'printer-type': '2134092',
      'printer-uri-supported': 'ipp://localhost/printers/EPSON_L455_Series',
      system_driverinfo: 'EPSON L455 Series, driverless, cups-filters 1.27.4',
    },
  },
  {
    name: 'L455',
    displayName: 'L455',
    description: 'EPSON L455 Series',
    status: 3,
    isDefault: false,
    options: {
      copies: '1',
      'device-uri': 'lpd://192.168.29.231:515/PASSTHRU',
      finishings: '3',
      'job-cancel-after': '10800',
      'job-hold-until': 'no-hold',
      'job-priority': '50',
      'job-sheets': 'none,none',
      'marker-change-time': '0',
      'number-up': '1',
      'printer-commands': 'AutoConfigure,Clean,PrintSelfTestPage',
      'printer-info': 'EPSON L455 Series',
      'printer-is-accepting-jobs': 'true',
      'printer-is-shared': 'true',
      'printer-is-temporary': 'false',
      'printer-location': '',
      'printer-make-and-model':
        'Generic ESC/P Dot Matrix Printer Foomatic/epson (recommended)',
      'printer-state': '3',
      'printer-state-change-time': '1649018755',
      'printer-state-reasons': 'none',
      'printer-type': '8433676',
      'printer-uri-supported': 'ipp://localhost/printers/L455',
      system_driverinfo:
        'Generic ESC/P Dot Matrix Printer Foomatic/epson (recommended)',
    },
  },
];
```

---

#### `contents.print([options], [callback])`

- `options` Object (optional)

  - `silent` boolean (optional) - Don't ask user for print settings. Default is `false`.
  - `printBackground` boolean (optional) - Prints the background color and image of the web page. Default is `false`.
  - `deviceName` string (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  - `color` boolean (optional) - Set whether the printed web page will be in color or grayscale. Default is `true`.
  - `margins` Object (optional)

    - `marginType` string (optional) - Can be default, `none`, `printableArea`, or `custom`. If custom is chosen, you will also need to specify `top`, `bottom`, `left`, and `right`.
    - `top` number (optional) - The top margin of the printed web page, in pixels.
    - `bottom` number (optional) - The bottom margin of the printed web page, in pixels.
    - `left` number (optional) - The left margin of the printed web page, in pixels.
    - `right` number (optional) - The right margin of the printed web page, in pixels.

  - `landscape` boolean (optional) - Whether the web page should be printed in landscape mode. Default is `false`.

  - `scaleFactor` number (optional) - The scale factor of the web page.
  - `pagesPerSheet` number (optional) - The number of pages to print per page sheet.
  - `collate` boolean (optional) - Whether the web page should be collated.
  - `copies` number (optional) - The number of copies of the web page to print.
  - `pageRanges` Object[] (optional) - The page range to print. On macOS, only one range is honored.

    - `from` number - Index of the first page to print (0-based).
    - `to` number - Index of the last page to print (inclusive) (0-based).

  - `duplexMode` string (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.

  - `dpi` Record<string, number> (optional)

    - `horizontal` number (optional) - The horizontal dpi.
    - `vertical` number (optional) - The vertical dpi.

  - `header` string (optional) - string to be printed as page header.
  - `footer` string (optional) - string to be printed as page footer.
  - `pageSize` string | Size (optional) - Specify page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width`.

- `callback` Function (optional)
  - `success` boolean - Indicates success of the print call.
  - `failureReason` string - Error description called back if the print fails.

```js
const printOptions = {
  silent: true,
  deviceName: 'EPSON_L455_Series',
  color: false,
  pageRanges: [
    {
      from: 0,
      to: 1,
    },
  ],
};

mainWindow.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType);
});
```

---

## [`Menu`](https://www.electronjs.org/docs/latest/api/menu)

Create native application menus and context menus.

### Static Methods

#### `Menu.setApplicationMenu(menu)`

- `menu Menu | null`

Sets menu as the application menu on macOS. On Windows and Linux, the menu will be set as each window's top menu.

Also on Windows and Linux, you can use a `&` in the top-level item name to indicate which letter should get a generated accelerator. For example, using `&File` for the file menu would result in a generated `Alt + F` accelerator that opens the associated menu. The indicated character in the button label then gets an underline, and the & character is not displayed on the button label.

**Method 1**: Creating a Custom Menu

```js
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
];
```

**Method 2**: Using pre-defined Roles

```js
const menu = [
  {
    role: fileMenu,
  },
];
```

Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.

> **Note**: The default menu will be created automatically if the app does not set one. It contains standard items such as File, Edit, View, Window and Help.

---

#### `Menu.buildFromTemplate(template)`

- `template (MenuItemConstructorOptions | MenuItem)[]`

Returns Menu

Generally, the template is an array of options for constructing a MenuItem. The usage can be referenced above.

You can also attach other fields to the element of the template and they will become properties of the constructed menu items.

```js
/** Implement Menu */
const mainMenu = Menu.buildFromTemplate(menu);
Menu.setApplicationMenu(mainMenu);
```

---

# Renderer Process Modules

---

# References

- [Printing in Electron](https://www.geeksforgeeks.org/printing-in-electronjs/)
- [Electron POS Printer](https://www.npmjs.com/package/electron-pos-printer)
- [Desktop App with Electron and JavaScript - Traversy Media](https://www.youtube.com/watch?v=ML743nrkMHw)
