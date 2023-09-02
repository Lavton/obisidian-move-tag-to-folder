export interface MoveTagToFolderSettings {
    workingTag: string
    workingFolder: string
    reverseTag: string
}

export const DEFAULT_SETTINGS: MoveTagToFolderSettings = {
    workingTag: "#to_focus_on",
    workingFolder: "focusNodes/",
    reverseTag: "moved_from"
}
