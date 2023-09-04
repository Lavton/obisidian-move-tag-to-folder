# Move Tag To Folder
obsidian plugin

This is a simple plugin for Obsidian (https://obsidian.md). It move all notes with specific tag to a specific folder and reverse. 

set goal tag and folder in settings.

## goal
the goal of the plugin is no focus on some set of notes by collecting them in a specific folder

### package trio
This package is invented as a part of the package trio:
- https://github.com/Lavton/obsidian-connections-to-tag -- a package that can add to notes subtree and its connections a common hashtag
- https://github.com/Lavton/obisidian-move-tag-to-folder -- a package that can move all notes with a common hashtag to a specific folder
- https://github.com/Lavton/obsidian-ignore-filter-shortcut -- a package that can add a Ignore Filter variant to focus on the specific folder.

So, the supposed workflow of the packages is the following: 
1. deside that you want to focus not on the whole vault, but on the specific subject
2. find the subtree of the subject and add a hashtag to the subtree
3. move all notes with the hashtag (so, all notes connected to the subject) to a specific folder
4. change the ignore filters so, that only the specific folder is not ignored
5. focus on the subject, do whatever you want to do
6. do reverse stuff: change ignore filters to a general one, move all notes from the specific folder to their original desitnation, remove the hashtag from the notes 


## commands
- `Forward move files with tags to dir` move files with a tag to folder
- `Backward move files with tags to their original dir` move files backward to their original positions


## known issues:
- on backward moving sometimes some notes are note moving... Reopen the obsidian to fix it (some problem with cache)