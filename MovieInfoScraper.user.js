// ==UserScript==
// @name         Movie Info Scraper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Scrape the movie/TV information from a webpage.
// @author       wklchris
// @include      https://www.themoviedb.org/tv/*
// @supportURL   https://github.com/wklchris/Movie-Info-Scraper
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Copy a string variable to clipboard.
    function copyToClipboard(str) {
        // Create a textarea for copy
        var strArea = document.createElement('textarea');
        strArea.value = str;
        document.body.appendChild(strArea);
        strArea.select();
        // Prepare the pop-up message
        var copyMessage = "TV filenames have been copied to clipboard."
        try {
            document.execCommand('copy');
        } catch (err) {
            copyMessage = "Copy failed."
        } finally {
            alert(copyMessage)
        }
        // Delete the element
        document.body.removeChild(strArea);
    }

    // Copy all TV names in current webpage, with a Kodi-compatible format:
    //     [TV Series Name]-S[Season]E[Eposide].[Current Eposide Title]
    function copyTVNames() {
        var parentDOM = document.getElementsByTagName('h3');
        // Split by word 'Season' and remove the tailing colon
        var tvtitle = $(document).find("title").text().split('Season')[0].trim().slice(0, -1);
        var fileNameGroup = [];
        for (var i = 0; i < parentDOM.length; i++) {
            var ep = parentDOM[i].querySelector(".no_click.open");
            if (ep != null) {
                var season = ep.getAttribute('season');
                var episode = ep.getAttribute('episode');
                var eptitle = ep.innerHTML;
                // Filenames are in a Kodi-compatible format
                var fname = tvtitle + '-S' + season.padStart(2, '0') + 'E' + episode.padStart(2, '0') + '.' + eptitle;
                fileNameGroup.push(fname);
            }
        }
        copyToClipboard(fileNameGroup.join('\n'));
    }

    // Add a button for copyTVNames()
    var btnMovieFileName = document.createElement('button');
    btnMovieFileName.innerHTML = "Copy TV names to Clipboard";
    btnMovieFileName.onclick = function () { copyTVNames(); };
    document.getElementsByClassName("filter")[0].appendChild(btnMovieFileName);
})();