import { Plugin } from 'obsidian';
import { XoppSettingsTab } from 'src/XoppSettingsTab';
import { checkXoppSetup } from 'src/checks';
import { createCommands } from 'src/commands';
import { setupListeners } from 'src/listeners';
import { createRibbonIcons } from 'src/ribbonIcons';

interface XoppPluginSettings {
    autoExport: boolean;
}

const DEFAULT_SETTINGS: Partial<XoppPluginSettings> = {
    autoExport: false,
};  

export default class XoppPlugin extends Plugin {
    settings: XoppPluginSettings;

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new XoppSettingsTab(this.app, this));
        setupListeners(this);
        createCommands(this);
        createRibbonIcons(this);
        checkXoppSetup();
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }
    
    async saveSettings() {
        await this.saveData(this.settings);
    }    

    onunload() {}
}
