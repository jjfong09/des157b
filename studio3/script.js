(function(){
    'use strict';

	const overlay = document.querySelector('#overlay');
	const dimmer = document.querySelector('#dimmer');
	const overlayButton = document.querySelector('#overlay button');
	const folders = document.querySelectorAll('.folders');
	const innerContent = document.querySelector('#inner-content');

	folders.forEach(function(folder) {
		folder.addEventListener('dblclick', function(event) {
		  const id = folder.id; // safer than event.target.id
	  
		  if (id === 'folder1') {
			innerContent.innerHTML = `
				<h1>Assignments</h1>
				<ul>
					<li><input type="checkbox">Complete DES157B Homework</li>
					<li><input type="checkbox">Turn in email revision assignment</li>
					<li><input type="checkbox">Complete design brief</li>

				</ul>`
			overlay.className = 'shown';
			dimmer.className = 'visible';
		  }

		  if (id === 'folder2') {
			innerContent.innerHTML = `
			<h1>To-Do List</h1>
			<ul>
				<li><input type="checkbox"> Do laundry</li>
				<li><input type="checkbox"> Bake banana bread</li>
				<li><input type="checkbox"> Return clothes</li>
			</ul>`
			overlay.className = 'shown';
			dimmer.className = 'visible';
		  }

		  if (id === 'folder3') {
			innerContent.innerHTML = `
			<h1>Grocery List</h1>
			<ul>
				<li><input type="checkbox"> Spinach</li>
				<li><input type="checkbox"> Ground chicken</li>
				<li><input type="checkbox"> Avocados</li>
				<li><input type="checkbox"> Blackberries</li>
			</ul>`
			overlay.className = 'shown';
			dimmer.className = 'visible';
		  }
		});
	  });


	overlayButton.addEventListener('click', function() {
		overlay.className = 'hidden';
        dimmer.className = 'hidden';
	})

	var granimInstance = new Granim({
		element: '#canvas-basic',
		direction: 'left-right',
		isPausedWhenNotInView: true,
		states : {
			"default-state": {
				gradients: [
					['#ff9966', '#ff5e62'],
					['#00F260', '#0575E6'],
					['#e1eec3', '#f05053']
				]
			}
		}
	});

	var granimInstance2 = new Granim({
		element: '#canvas-basic2',
		direction: 'left-right',
		isPausedWhenNotInView: true,
		states : {
			"default-state": {
				gradients: [
					['#ff9966', '#ff5e62'],
					['#00F260', '#0575E6'],
					['#e1eec3', '#f05053']
				]
			}
		}
	});
	

})(); // end IIFE



