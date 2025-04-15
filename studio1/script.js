
(function(){
	'use strict';
	
	// full screen
	const fs = document.querySelector('.ph.ph-arrows-out-simple');

	// text controls
	const titleSections = document.querySelectorAll('#title-container section');
	const myVideo = document.querySelector('#myVideo');
	const loading = document.querySelector('.loading-animation');
	const intervalID = setInterval(checkTime, 1000);


	// CLICK FULL SCREEN
	fs.addEventListener('click', function() {
		// The fullscreenElement attribute returns null if the element is in windowed mode
		if (!document.fullscreenElement) {
			// document.documentElement returns the Element that is a direct child of the document, the <html> element
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	});


	// TEXT TIME CONTROLS

	const poem = {
		start: [0, 3, 8, 13],
		stop: [2, 7, 12, 17],
		title: titleSections
	};

	// console.log(poem);

	function checkTime() {
		for (let i = 0; i < poem.start.length; i++) {
			if (poem.start[i] < myVideo.currentTime && myVideo.currentTime < poem.stop[i]) {
				poem.title[i].classList.remove("hidden");
				poem.title[i].classList.add("visible");
			} else {
				poem.title[i].classList.remove("visible");
				poem.title[i].classList.add("hidden");
			}
		}
	}
	
	// loading icon script
	myVideo.addEventListener('playing', function() {
		loading.style.display = 'none';
	})

})();