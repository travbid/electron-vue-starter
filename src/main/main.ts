console.log("main main.ts");

import path from "path";

import { app, BrowserWindow, ipcMain } from "electron";
// import { autoUpdater } from "electron-updater";

import sourceMapSupport from "source-map-support";
import electronDebug from "electron-debug";
import electronDevtoolsInstaller, {VUEJS_DEVTOOLS} from "electron-devtools-installer";

// eslint-disable-next-line
const adder = require("./native/build/Release/adder.node");

app.allowRendererProcessReuse = true;

console.log("NODE_ENV:");
console.log(process.env.NODE_ENV);
const isProd: boolean = process.env.NODE_ENV === "production";

// export default class AppUpdater {
// 	constructor() {
// 		log.transports.file.level = "info";
// 		autoUpdater.logger = log;
// 		autoUpdater.checkForUpdatesAndNotify();
// 	}
// }

let mainWindow: BrowserWindow | null = null

console.log("sourceMapSupport.install()");
sourceMapSupport.install();

if (!isProd || process.env.DEBUG_PROD === "true") {
	console.log("electronDebug()");
	electronDebug({ showDevTools: true });
}

async function installExtensions(): Promise<void | void[]> {
	console.log("installExtensions()");
	const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
	const extensions = [VUEJS_DEVTOOLS];

	return Promise.all(
		extensions.map(ext => {
			console.log("electronDevtoolsInstaller:", ext);
			electronDevtoolsInstaller(ext, forceDownload)
		}),
	).catch(console.log);
}

async function createWindow(): Promise<void> {
	console.log("createWindow");
	if (!isProd || process.env.DEBUG_PROD === "true") {
		await installExtensions();
	}

	mainWindow = new BrowserWindow({
		// show: false,
		width: 1280,
		height: 720,
		webPreferences: !isProd || process.env.E2E_BUILD === "true"
			? {
				contextIsolation: true,
				enableRemoteModule: false,
				nodeIntegration: true,
				preload: path.join(__dirname, "preload.js")
			} : {
				contextIsolation: true,
				devTools: true,
				enableRemoteModule: false,
				nodeIntegration: false,
				preload: path.join(__dirname, "preload.js")
			}
	});

	if (!isProd) {
		mainWindow.webContents.openDevTools();
	}
	
	const htmlUrl = isProd ? `file://${__dirname}/../index.html` : `http://localhost:8080`
	mainWindow?.loadURL(htmlUrl);

	mainWindow.webContents.on("did-finish-load", () => {
		console.log("did-finish-load", mainWindow?.webContents.getURL());
	});
	
	mainWindow.on("ready-to-show", () => {
		console.log("ready-to-show");
	});

	mainWindow.on("closed", () => {
		mainWindow = null;
	});

	// Remove this if your app does not use auto updates
	// new AppUpdater();
}

// Add event listeners...

app.on("window-all-closed", () => {
	// Respect the OSX convention of having the application in memory even
	// after all windows have been closed
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("ready", createWindow);

app.on("activate", () => {
	console.log("activate");
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) createWindow();
});

ipcMain.handle("adder", (event, arg1, arg2) => {
	console.log("ipcMain.handle adder:", arg1, arg2);
	const bgn = process.hrtime();
	const added = adder.add(arg1, arg2);
	const end = process.hrtime();
	const runTime = (end[0] * 1000000000 + end[1] - (bgn[0] * 1000000000 + bgn[1])) / 1000;
	console.log("adder.add() took " + runTime.toString() + "μs");
	return added;
})
