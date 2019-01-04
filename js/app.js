/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js
 * no IE support */

/**
* Insures that DOM structure is loaded
*/
document.addEventListener('DOMContentLoaded', function() {
  let game = null;
  let disabledKeyboardButtons = [];//analogue to html buttons disable attribute

  /**
  * Statrs the game when 'Start button' clicked
  */
  document.getElementById('btn__reset').addEventListener('click', function() {
    const keys = document.getElementById('qwerty');
    const authorCredit = document.getElementsByClassName('img-author')[0];

    game = new Game();
    game.resetOverlay();
    game.startGame();
    disabledKeyboardButtons = [];
  });

  /**
  * Handles symbol key click using event delegation and Game class function
  */


  document.getElementById('qwerty').addEventListener('click', function(event) {
    if (game.activePhrase.isLoaded()) {//checks for phrase load animation to end
      const key = event.target;

      if (key.tagName === 'BUTTON') {
        game.handleInteraction(key);
        disabledKeyboardButtons.push(key.textContent);
      }
    }
  });

  /**
  * Handles keyboard keydown event
  * Creates RegExp from an array of disabled keyboard button symbols if there are any
  * uses RegExp to decide if we want to perform an action
  */
  document.addEventListener('keydown', function(event) {
    if (game.activePhrase.isLoaded()) {//checks for phrase load animation to end
      const keyboardButton = event.key;
      let disabledKButtons = '';
      if (disabledKeyboardButtons.length) {
        disabledKButtons = disabledKeyboardButtons.reduce((acc, kButton) => acc += kButton);
      }
      const regex = new RegExp(`^(?![${disabledKButtons}])[a-z]$`);

      if (regex.test(keyboardButton)) {
        game.handleInteraction(game.keyboardButtonTransform(keyboardButton));
      }
      disabledKeyboardButtons.push(keyboardButton);
    }
  });
});
