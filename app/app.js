
import "@babel/polyfill"; // This polyfill covers everything. Set useBuiltIns in babel config to pare down the number of polyfills that need to be included. No import is needed when useBuiltIns is set to 'usage'
import "./klondike/scoring.js";
import "./klondike/klondike.js";
import "./klondike/board.js";
import "./klondike/game.js";

angular.module("solitaire", ["klondike", "ngDraggable"]);
