'use strict';
var commentRegex = require('comment-regex');
var htmlCommentRegex = require('html-comment-regex');

module.exports = function(data, type) {
  data = String(data);
  var comments = [];

  if (type === 'js' || type === 'css') {
    data = data.replace(commentRegex(), function(match, lineContent, blockContent) {
      comments.push(match);
      if (lineContent) {
        return lineContent.trim();
      }
      return blockContent.trim();
    });
  } else if (type === 'html') {
    data = data.replace(htmlCommentRegex, function(match, content) {
      comments.push(match);
      return content.trim();
    });
  }

  return {
    data: data,
    comments: comments
  };
};
