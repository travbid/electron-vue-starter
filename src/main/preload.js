// https://github.com/electron/electron/issues/9920#issuecomment-575839738

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {contextBridge, ipcRenderer} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
	"api", {
		// send: (channel, data) => {
		// 	// whitelist channels
		// 	const validChannels = ["adder"];
		// 	if (validChannels.includes(channel)) {
		// 		ipcRenderer.send(channel, data);
		// 	}
		// },
		invoke: (channel, ...data) => {
			// whitelist channels
			const validChannels = ["adder"];
			if (validChannels.includes(channel)) {
				return ipcRenderer.invoke(channel, ...data);
			}
		},
		// receive: (channel, func) => {
		// 	const validChannels = ["fromMain"];
		// 	if (validChannels.includes(channel)) {
		// 		// Deliberately strip event as it includes `sender` 
		// 		ipcRenderer.on(channel, (event, ...args) => func(...args));
		// 	}
		// }
	}
);