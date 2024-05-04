import XoppPlugin from "main";
import { addXournalppOptionsToFileMenu } from "./fileMenu";
import { Menu, TFile } from "obsidian";
import { addOpenInXournalppToPdfToolbar } from "./pdfToolbar";
import { addCreateXournalppNavIcon } from "./fileExplorerNav";

export function setupListeners(plugin: XoppPlugin) {
    // on startup
    plugin.registerEvent(plugin.app.workspace.on("layout-change", () => {
        addCreateXournalppNavIcon(plugin);
    }));

    plugin.registerEvent(plugin.app.workspace.on("file-open", (file: TFile) => {
        addOpenInXournalppToPdfToolbar(file, plugin);
    }));
    plugin.registerEvent(plugin.app.workspace.on("file-menu", (menu: Menu, file: TFile) => {
        addXournalppOptionsToFileMenu(menu, file, plugin);
    }));
    plugin.registerEvent(plugin.app.workspace.on("active-leaf-change", (leaf) => {
        if (leaf?.getDisplayText() === "Files") addCreateXournalppNavIcon(plugin);
    }));
}