// ==UserScript==
// @name         Movie Info Scraper
// @namespace    http://tampermonkey.net/
// @version      0.1.1
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
  var copyMessage = "TV filenames have been copied to clipboard.";
  if (isHtmlLangZh) {
      btnText = "复制 TV 名称";
      copyMessage = "TV 名称已复制到剪贴板。";
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

  // Copy all TV names in current webpage, with a Kodi-compatible format:
  //     [TV Series Name]-S[Season]E[Eposide].[Current Eposide Title]
  function copyTVNames(copyMessage='') {
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
      copyToClipboard(fileNameGroup.join('\n'), copyMessage);
  }

  // Add a button for copyTVNames()
  var btnMovieFileName = document.createElement('button');
  btnMovieFileName.innerHTML = btnText;
  btnMovieFileName.onclick = function () { copyTVNames(copyMessage); };
  document.getElementsByClassName("filter")[0].appendChild(btnMovieFileName);
})();