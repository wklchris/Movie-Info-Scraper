# Movie-Info-Scraper

This script scrapes the TV names of current webpage and copy them to clipboard.

## Features

Items without check mark are future plans.

- [x] Now it only supports The Movie Data Base (TMDB).
- [x] Auto-detect webpage language: Chines (ZH) or not. 
- [ ] Customized copy format.
- [ ] Being able to save customized format.

## Installation

> This script needs [TamperMonkey](https://www.tampermonkey.net/) extension being installed on your browser. 
 
For online installation (recommended), you can visit [this script's GreasyFork webpage](https://greasyfork.org/en/scripts/408000-movie-info-scraper) and click the button to install it.

Another way is to install it offline (then you can't receive update when a new version is released on GreasyFork):
1. Click on the TamperMonkey extension icon and open the Dashboard.
2. Click on the "+" button to create a new script.
3. Copy the content of `MovieInfoScraper.user.js` and paste inside the new script.
4. Click on the File menu and Save.

## Using

The format for copy is:  
```
[TV Series Name]-S[Season]E[Eposide].[Current Eposide Title]
```
which is also compatible for [Kodi](https://kodi.tv/)'s auto recognition.

For example, for the TMDB webpage of season 1 of Neon Genesis Evangelion  ([visit](https://www.themoviedb.org/tv/890-neon-genesis-evangelion/season/1?language=en-US)), click the button "Copy TV Names to Clipboard" will get:
    
    ```
    Neon Genesis Evangelion-S01E01.Angel Attack
    Neon Genesis Evangelion-S01E02.The Beast
    Neon Genesis Evangelion-S01E03.A Transfer
    ...
    Neon Genesis Evangelion-S01E26.Take Care of Yourself.
    ```

## Why make this script?

This script is made for generating filenames for local Kodi-compatible file renaming. These copied text can be input into renaming tools (such as Renamer) to better organize your local movie/TV files.