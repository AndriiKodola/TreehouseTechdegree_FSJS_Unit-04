/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
   constructor () {
     this.missed = 0;
     this.phrases = [
       'Never ask a starfish for directions',
       'Every dogma has its day',
       'A joke is a very serious thing',
       'Too much agreement kills a chat',
       'A balanced diet means a cupcake in each hand'];
     this.activePhrase = null;
   }

   /**
   * prepares the game: hides overlay, creates Phrase object and shows phrase pattern on the underlay
   */
   startGame() {
     document.getElementById('overlay').style.display = 'none';
     this.activePhrase = new Phrase(this.getRandomPhrase());
     this.gameNodesAppear();
   }

   /**
   * @return random phrase from phrases {property}
   */
   getRandomPhrase() {
     const phraseIndex = Math.floor(Math.random() * this.phrases.length);
     return this.phrases[phraseIndex];
   }

   /**
   * fading in game mode
   */
   gameNodesAppear() {
     const phrase = this.activePhrase.phrase;
     const phraseObject = this.activePhrase;
     const keys = document.getElementById('qwerty');
     const authorCredit = document.getElementsByClassName('img-author')[0];
     const hearts = document.getElementById('scoreboard');

     keys.style.opacity = 0;
     authorCredit.style.opacity = 0;
     hearts.style.opacity = 0;

     this.activePhrase.addPhraseToDisplay();

     setTimeout(function() {
       phraseObject.unfade(keys);
       phraseObject.unfade(authorCredit);
       phraseObject.unfade(hearts);
    }, phrase.length*50);
   }

   /**
   * Majority of game logic
   * Checks if guessed
   * if guessed changes symbol key to 'guessed state', shows symbols inside the phase, checks for win
   * if not changes symbol key to 'wrong state', removes life
   */
   handleInteraction(key) {
     key.disabled = true;
     if (!this.activePhrase.checkLetter(key)) {
       key.classList.add('wrong');
       this.removeLife();
     } else {
       key.classList.add('chosen');
       this.activePhrase.showMatchedLetter(key);
       if (this.checkForWin()) {
         this.gameOver();
       }
     }
   }

   /**
   * manages life removal and misses counter, checks if lost
   */
   removeLife() {
     const hearts = document.querySelectorAll('.tries > img');

     hearts[4-this.missed].src = 'images\\lostHeart.png';
     this.missed++;

     if (this.missed === 5) {
       this.gameOver();
     }
   }

   /**
   * manages check for 'all symbols in the phrase guessed'
   */
   checkForWin() {
     const phraseCharList = document.querySelectorAll('#phrase ul li');
     let isWon = true;

     phraseCharList.forEach(li => {
       if (li.classList.contains('hide')) {
         isWon = false;
       }
     });

     return isWon;
   }

   /**
   * manages overlay win or lost appearance depending to the game result
   */
   gameOver() {
     const overlay = document.getElementById('overlay');
     let gameOverMSG = document.getElementById('game-over-message');

     overlay.style.display = 'flex';
     if (this.checkForWin()) {
       gameOverMSG.textContent = 'The lightbulb moment? Still don\'t have enough?';
       overlay.classList.replace('start', 'win');
     } else {
       gameOverMSG.textContent = 'No time to be upset! Wisdom awaits, hit the button!';
       overlay.classList.replace('start', 'lose');
     }

     this.resetUnderlay();
   }

   /**
   * resets overlay to initial state
   */
   resetOverlay() {
     const overlay = document.getElementById('overlay');

     overlay.classList.replace('win', 'start');
     overlay.classList.replace('lose', 'start');
   }

   /**
   * resets underlay to initial state
   */
   resetUnderlay() {
     const oldPhraseContainer = document.querySelector('#phrase ul');
     const keys = document.getElementsByClassName('key');
     const hearts = document.querySelectorAll('.tries > img');

     oldPhraseContainer.innerHTML = '';
     for (let i = 0; i<keys.length; i++) {
       keys[i].classList.remove('wrong', 'chosen');
       keys[i].disabled = false;
     }
     for (let i = 0; i<hearts.length; i++) {
       hearts[i].src = 'images\\liveHeart.png';
     }
   }

   /** Exceed expectations textContent
   * @param keyboardButton - keydown event.key value
   * @return key <li> node with same character
   */
   keyboardButtonTransform(keyboardButton) {
     const keys = document.querySelectorAll('.key');

     for (let i = 0; i<keys.length; i++) {
       if (keys[i].textContent === keyboardButton.toLowerCase()) {
         return keys[i];
       }
     }
   }
 }
