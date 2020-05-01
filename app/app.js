
import "@babel/polyfill"; // This polyfill covers everything. Set useBuiltIns in babel config to pare down the number of polyfills that need to be included. No import is needed when useBuiltIns is set to 'usage'
import "./klondike/scoring.js";
import "./klondike/klondike.js";
import "./klondike/board.js";
import "./klondike/game.js";
// You can disable or add loaders inline, though it's not a best practice
// Add one or more loaders inline, and even pass in options:
//  import "<some-loader>!<./folder/file.typ>" as in 'tee-loader!./klondike/board.js'
//  import "tee-loader?label=after!babel-loader!./folder/file.typ"
// Disable all matching loaders inline
//  import "!!./folder/file.typ"

angular.module("solitaire", ["klondike", "ngDraggable"]);
