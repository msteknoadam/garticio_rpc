/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable no-console */

"use strict";

const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");

if (require("electron-squirrel-startup")) {
	// eslint-disable-line global-require
	app.quit();
}

let mainWindow;
let tray = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		resizable: true,
		titleBarStyle: "visible"
	});
	const assetsPath = path.join(
		app.getAppPath(),
		"..",
		"..",
		"..",
		"..",
		"..",
		"assets"
	);

	mainWindow.loadURL("https://gartic.io");
	mainWindow.setIcon(path.join(assetsPath, "/icon.png"));
	mainWindow.setTitle("Gartic.IO");
	const browserJS = fs
		.readFileSync(path.join(assetsPath, "/browser.webpack.js"))
		.toString();
	mainWindow.webContents.executeJavaScript(browserJS);

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	app.quit();
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});
