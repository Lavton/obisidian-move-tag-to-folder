import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import * as internal from 'stream';
import * as settings from 'src/settings'
import * as forward from 'src/forward'
import * as backward from 'src/backward'

export default class MoveTagToFolderPlugin extends Plugin {
	settings: settings.MoveTagToFolderSettings;

	async onload() {
		await this.loadSettings();


		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new MoveTagToFolderSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			// console.log('click', evt);
		// });

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
		this.addCommand({
			id: 'move-files-with-tag-forward',
			name: 'Forward move files with tags to dir',
			callback: async () => {
				var files = forward.getForwardFiles(this.app, this.settings.workingTag, this.settings.workingFolder)
				await forward.createFolderIfNotExist(this.app, this.settings.workingFolder)
				console.log("forward files", files)
				files.forEach(file => {
					forward.moveFileAndAddMeta(this.app, file, this.settings.workingFolder, this.settings.reverseTag)
				})
			}
		});
		this.addCommand({
			id: 'move-files-with-tag-backward',
			name: 'Backward move files with tags to their original dir',
			callback: async () => {
				var files = backward.getBackwardFiles(this.app, this.settings.workingFolder)
				console.log("backward files", files)
				files.forEach(file => {
					backward.moveFileAndRemoveMeta(this.app, file, this.settings.workingFolder, this.settings.reverseTag)
				})
			}
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, settings.DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class MoveTagToFolderSettingTab extends PluginSettingTab {
	plugin: MoveTagToFolderPlugin;

	constructor(app: App, plugin: MoveTagToFolderPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			// as in https://github.com/zsviczian/excalibrain/blob/master/src/Settings.ts
			.setName('working tag')
			.setDesc('notes with what tag will be moved')
			.addText((text) => {
				text
				.setPlaceholder('ex. #to_focus_on')
				.setValue(this.plugin.settings.workingTag)
				.onChange(async (value) => {
					this.plugin.settings.workingTag = value
					await this.plugin.saveSettings();
				})
			})
		new Setting(containerEl)
		.setName('where to move')
		.setDesc('the folder where the tags will be moved')
			.addText((text) => {
				text
				.setValue(this.plugin.settings.workingFolder)
				.onChange(async (value) => {
					this.plugin.settings.workingFolder = value
					await this.plugin.saveSettings();
				})
			})
		new Setting(containerEl)
		.setName('reverse frontmatter tag')
		.setDesc('the YAML tag of the original place')
			.addText((text) => {
				text
				.setValue(this.plugin.settings.reverseTag)
				.onChange(async (value) => {
					this.plugin.settings.reverseTag = value
					await this.plugin.saveSettings();
				})
			})
	}
}
