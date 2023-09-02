import { App, TFile, Notice } from "obsidian";


export function getBackwardFiles(app: App, distDirectory: string): string[] {
    var fileCollection: string[] = app.metadataCache.getCachedFiles()
    return fileCollection.filter(f => f.startsWith(distDirectory))
}

export async function moveFileAndRemoveMeta(app: App, filename: string, distDirectory: string, reverseTag: string) {
    var file = app.vault.getAbstractFileByPath(filename)
    if (!(file instanceof TFile)) {
        return
    }
    var frontmatter = app.metadataCache.getFileCache(file)?.frontmatter
    if (frontmatter == null) {
        new Notice(`in file ${filename} no frontmatter exisist`)
        return
    }
    var originalDist: string = frontmatter[reverseTag]
    if (originalDist == null) {
        new Notice(`in file ${filename} ${reverseTag} is not in frontmatter`)
        console.log(filename, frontmatter, reverseTag)
        return
    }
    try {
        await app.vault.rename(file, originalDist)
        app.fileManager.processFrontMatter(file, (frontmatter) => {
            delete frontmatter[reverseTag]
        })
    } catch(error: any) {
        console.log(error)
        new Notice(`cant move ${filename}\nback to ${originalDist}. \nMaybe original folder was deleted?`)
    }
}