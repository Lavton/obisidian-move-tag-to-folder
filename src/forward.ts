import { App, TFile } from "obsidian";

// https://github.com/pjeby/tag-wrangler/blob/master/src/renaming.js
// https://forum.obsidian.md/t/getting-backlinks-tags-and-frontmatter-entries-for-a-note/34082
// https://forum.obsidian.md/t/updating-frontmater-programatically/53594/2

export function getForwardFiles(app: App, tag: string, distDirectory: string): string[] {
    var fileCollection: string[] = app.metadataCache.getCachedFiles()
    return fileCollection.filter(f => {
        var tags = app.metadataCache.getCache(f)?.tags?.map(t => t.tag)
        return tags?.contains(tag)        
    }).filter(f => !f.startsWith(distDirectory))
}

export async function moveFileAndAddMeta(app: App, filename: string, distDirectory: string, reverseTag: string) {
    var file = app.vault.getAbstractFileByPath(filename)
    if (!(file instanceof TFile)) {
        return
    }
    app.fileManager.processFrontMatter(file, (frontmatter) => {
        frontmatter[reverseTag] = file?.path
    })
    await app.vault.rename(file, distDirectory + file?.name)
}

export async function createFolderIfNotExist(app: App, distDirectory: string) {
    var isExists = await app.vault.exists(distDirectory) 
    if (!(isExists)) {
        await app.vault.createFolder(distDirectory)
    }
}