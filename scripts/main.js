import constants from "../Constants.js";
import { registerSettings } from "./settings.js";

const socketName = `module.${constants.modName}`;

const closeImagePopout = () => {
   const imagePopout = document.querySelector(".image-popout a.close");
   if (imagePopout) {
      imagePopout.click();
      return;
   }

   const journalPopout = document.querySelector(".journal-sheet a.close");
   if (journalPopout) {
      journalPopout.click();
      return;
   }
};

Hooks.on("init", () => {
   registerSettings();
});

Hooks.on("ready", () => {
   if (game.user.isGM === true) {
      document.addEventListener("keypress", (e) => {
         if (
            e.key == game.settings.get(constants.modName, "hotkey") &&
            e.target.tagName.toUpperCase() != "INPUT" &&
            e.target.tagName.toUpperCase() != "TEXTAREA"
         ) {
            closeImagePopout();
            game.socket.emit(socketName);
         }
      });
   }

   game.socket.on(socketName, closeImagePopout);
});
