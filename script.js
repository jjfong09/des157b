(function() {
    'use strict';

    const toggleButton = document.querySelector('#toggle-svg');
    const toggleDiv = document.querySelector('#toggle-div');
    const body = document.querySelector('body');
    let mode = 'light';

    function toggleMode() {
        if (mode === 'light') {
            body.classList.add('switch');
            mode = 'dark';
            toggleDiv.innerHTML = 
            `<p>Classic</p>
            <svg id="toggle-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256"><path d="M176,56H80a72,72,0,0,0,0,144h96a72,72,0,0,0,0-144Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,176,168Z"></path></svg>`;
        } else {
            body.classList.remove('switch');
            mode = 'light';
            toggleDiv.innerHTML = 
            `<p>Dark</p>
            <svg id="toggle-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#7a7a7a" viewBox="0 0 256 256"><path d="M176,56H80a72,72,0,0,0,0,144h96a72,72,0,0,0,0-144ZM80,168a40,40,0,1,1,40-40A40,40,0,0,1,80,168Z"></path></svg>`;
        }
        // reattach event listener to the new toggle button
        document.querySelector('#toggle-svg').addEventListener('click', toggleMode);
    }

	// call function
    toggleButton.addEventListener('click', toggleMode);
})();