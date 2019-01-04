/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
   constructor (phrase) {
     this.phrase = phrase.toLowerCase();
   }

/**
* creates <li> nodes with symbols of current phrase, and appends them to <ul>
*/
   addPhraseToDisplay() {
     const phraseULContainer = document.querySelector('#phrase ul');
     const phrase = this.phrase;
     const phraseObject = this;

     for (let i = 0; i<phrase.length; i++) {
       const charLI = document.createElement('li');

       if (phrase[i] === ' ') {
         charLI.classList.add(`space`);
       } else {
         charLI.classList.add('hide', 'letter', phrase[i]);

         if ( i === 0 ) {
           charLI.classList.add(`first`);
         }
         if ( i === phrase.length-1 ) {
           charLI.classList.add(`last`);
         }
         if ( phrase[i-1] === ' ' ) {
           charLI.classList.add(`first`);
         }
         if ( phrase[i+1] === ' ' ) {
           charLI.classList.add(`last`);
         }
       }
       charLI.textContent = phrase[i];

       setTimeout(function() {// to animate appearance of a letter with timeOut
         charLI.style.opacity = 0;
         phraseULContainer.appendChild(charLI);
         phraseObject.unfade(charLI);
       }, i*50);
     }
   }

/**
* @return true if guessed, false if not
*/
   checkLetter(key) {
     for (let char of this.phrase) {
       if (key.textContent === char) {
         return true;
       }
     }
     return false;
   }

/**
* shows guessed letters in the phrase
*/
   showMatchedLetter(key) {
     const phraseCharList = document.querySelectorAll('#phrase ul li');

     phraseCharList.forEach(phraseCharLI => {
       if (key.textContent === phraseCharLI.textContent) {
         phraseCharLI.classList.remove('hide');
         phraseCharLI.classList.add('show');
       }
     });
   }

   /**
   * checks for phrase to end load animation
   */
   isLoaded() {
     const charNodes = document.querySelectorAll('#phrase ul li');
     return charNodes.length === this.phrase.length;
   }

   unfade(element) {
    let opacity = 0.1;
    let timer = setInterval(function () {
        if (opacity >= 1){
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        opacity += 0.1;
    }, 50);
  }
}
