const path = require("path");
const DiscordRPC = require("discord-rpc");
const clientId = "587703018443767808";
DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({ transport: "ipc" });
const startTimestamp = new Date();
let roomKey = "";

async function setActivity(
	newActivity = {
		details: "Not Connected",
		state: "Not Connected",
		largeImageKey: "gartic-icon",
		largeImageText: "Not Connected",
		startTimestamp,
	},
) {
	if (!rpc) {
		return;
	}

	console.log("Setting activity to:", newActivity);

	rpc.setActivity(newActivity);
}

rpc.on("ready", () => {
	setActivity();
});

rpc.login({ clientId }).catch(console.error);

setInterval(() => {
	// console.log(window.location.href);
	if (window.location.pathname === "/") {
		console.log("On /");
		setActivity({
			state: "In Main Menu",
			largeImageKey:
				document.querySelector(".avatar").classList[1] || "gartic-icon",
			largeImageText:
				document.querySelector(".fieldset.nick").querySelector("input")
					.value || "Not Set",
			startTimestamp,
		});
	}
	//else if () {
	// 	console.log("On /room");
	// 	const isWaiting =
	// 		document.querySelector("#canvas").querySelector("#notification")
	// 			.lastElementChild.innerText === "Waiting for players";
	// 	setActivity({
	// 		state: isWaiting ? "Waiting in a lobby" : "In a Game",
	// 		details: document.querySelector(".user.you.turn")
	// 			? "Drawing"
	// 			: document.querySelector(".user.you.hit")
	// 			? "Hit the answer"
	// 			: isWaiting
	// 			? "Waiting"
	// 			: document.querySelector(".user.you")
	// 			? "Guessing"
	// 			: "Guessing",
	// 		largeImageKey:
	// 			document.querySelector(".user.you").querySelector(".avatar")
	// 				.classList[1] || "gartic-icon",
	// 		largeImageText:
	// 			`${
	// 				document.querySelector(".user.you").querySelector(".nick")
	// 					.innerText
	// 			} | ${
	// 				document.querySelector(".user.you").querySelector(".points")
	// 					.innerText
	// 			}` || "Not Set",
	// 		startTimestamp,
	// 		instance: false,
	// 		joinSecret: roomKey ? roomKey : undefined,
	// 		partySize: document.querySelectorAll(".user:not(.empty)").length,
	// 		partyMax:
	// 			document.querySelector(".scrollElements").childNodes.length - 1,
	// 	});
	// }
	else if (window.location.pathname === "/rooms") {
		console.log("On /rooms");
		setActivity({
			state: "Searching Rooms",
			largeImageKey: "gartic-icon",
			startTimestamp,
		});
	} else if (window.location.pathname === "/create") {
		console.log("On /create");
		setActivity({
			state: "Creating A Lobby",
			largeImageKey: "gartic-icon",
			startTimestamp,
		});
	} else if (
		document.querySelector(".game").querySelector("#share") ||
		window.location.pathname === "/room"
	) {
		console.log(`On ${location.pathname}`);
		const isWaiting =
			document.querySelector("#canvas").querySelector("#notification") &&
			document.querySelector("#canvas").querySelector("#notification")
				.lastElementChild &&
			document.querySelector("#canvas").querySelector("#notification")
				.lastElementChild.innerText === "Waiting for players";
		//TODO: Implement "Players are waiting for you to start" text too
		setActivity({
			state: isWaiting ? "Waiting in a lobby" : "In a Game",
			details: document.querySelector(".user.you.turn")
				? "Drawing"
				: document.querySelector(".user.you.hit")
				? "Hit the answer"
				: isWaiting
				? "Waiting"
				: document.querySelector(".user.you")
				? "Guessing"
				: "Guessing",
			largeImageKey:
				document.querySelector(".user.you").querySelector(".avatar")
					.classList[1] || "gartic-icon",
			largeImageText:
				`${
					document.querySelector(".user.you").querySelector(".nick")
						.innerText
				} | ${
					document.querySelector(".user.you").querySelector(".points")
						.innerText
				}` || "Not Set",
			startTimestamp,
			instance: false,
			joinSecret:
				document.querySelector(".game").querySelector("#share") &&
				window.location.pathname !== "/room"
					? location.pathname.replace("/", "")
					: undefined,
			partySize: document.querySelectorAll(".user:not(.empty)").length,
			partyMax:
				document.querySelector(".scrollElements").childNodes.length - 1,
		});
	}
}, 15 * 1000);
