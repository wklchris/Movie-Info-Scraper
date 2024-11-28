// ==UserScript==
// @name         Movie Info Scraper
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  Scrape the movie/TV information from a webpage.
// @author       wklchris
// @match      https://www.themoviedb.org/tv/*
// @supportURL   https://github.com/wklchris/Movie-Info-Scraper
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Check if HTML display language is ZH
  var htmlLanguage = document.getElementsByTagName('html')[0].getAttribute('lang');
  var isHtmlLangZh = (htmlLanguage.indexOf('zh') >= 0);

  var btnText = "Copy TV names to Clipboard";
  var copyMessage = "TV filenames have been copied to clipboard. Example:";
  if (isHtmlLangZh) {
      btnText = "复制 TV 名称";
      copyMessage = "TV 名称已复制到剪贴板。示例：";
  }

  // Copy a string variable to clipboard.
  function copyToClipboard(str, copyMessage) {
      // Create a textarea for copy
      var strArea = document.createElement('textarea');
      strArea.value = str;
      document.body.appendChild(strArea);
      strArea.select();
      // Prepare the pop-up message if it is non-empty
      if (copyMessage) {
          try {
              document.execCommand('copy');
          } catch (err) {
              copyMessage = "Copy failed."
          } finally {
              alert(copyMessage)
          }
      }
      // Delete the element
      document.body.removeChild(strArea);
  }
  
  // Replace invalid characters in filename strings
  function escapeCharsInFilename(fname) {
    var escapes = {
      "!": "！", "?": "？",
      ":": "：", ";": "；",
      "/": "-", "\\": "-", "|": "-",
      "%": "-", "*": "-", "\"": '-',
      "<": "(", ">": ")"
    };
    var s = fname;
    for (const [c, val] of Object.entries(escapes)) {
      s = s.replaceAll(c, val);
    }
    return s;
  }

  // Copy all TV names in current webpage, with a Kodi-compatible format:
  //     [TV Series Name]-S[Season]E[Eposide].[Current Eposide Title]
  function copyTVNames(copyMessage='') {
      var parentDOM = document.getElementsByTagName('h3');
      // Split by last left paren '(' to remove year
      var tvtitle = document.querySelector('div.title').innerText.split('(').slice(0, -1).join('(').trim();
      var fileNameGroup = [];
      for (var i = 0; i < parentDOM.length; i++) {
          var ep = parentDOM[i].querySelector(".no_click.open");
          if (ep != null) {
              var season = ep.getAttribute('season');
              var episode = ep.getAttribute('episode');
              var eptitle = ep.innerHTML;
              // Filenames are in a Kodi-compatible format
              var fname = tvtitle + '-S' + season.padStart(2, '0') + 'E' + episode.padStart(2, '0') + '.' + eptitle;
              fname = escapeCharsInFilename(fname);
              fileNameGroup.push(fname);
          }
      }
      // Add an example from copied filenames
      copyMessage += `\n\n${fileNameGroup[0]}\n... (total ${fileNameGroup.length})`;
      copyToClipboard(fileNameGroup.join('\n'), copyMessage);
  }

  // Add a button for copyTVNames()
  var btnMovieFileName = document.createElement('button');
  btnMovieFileName.innerHTML = btnText;
  btnMovieFileName.onclick = function () { copyTVNames(copyMessage); };
  document.getElementsByClassName("filter")[0].appendChild(btnMovieFileName);
})();