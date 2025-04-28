(function(){
    'use strict';

    async function getData(){
        const songs = await fetch('data/data.json');
        const data = await songs.json();
        const values = Object.values(data);
        console.log(values);

		// output in track lists section
        document.querySelector('#track-list').innerHTML = outputTrackList(values);

		// add click listener for each track
        // select all track containers
		const tracks = document.querySelectorAll('.track-container');

        tracks.forEach (function(container){
            container.addEventListener('click', function(event){
                // Get the track container that was clicked
                const trackContainer = event.target.closest('.track-container');
                if (!trackContainer) return;
                
                const clickedTrackID = trackContainer.id;
                // Find the track data
                const trackData = values.find(track => track.trackID === clickedTrackID);
                if (trackData) {
                    document.querySelector("#api-output").innerHTML = outputAddInfo(trackData);
                }
            });
        });
    }
    
	getData();

	function outputTrackList(data){
        let songs = '';
        data.forEach( function(eachTrack, index){

			songs += `
			<div class="track-container" id="${eachTrack.trackID}">
				<div class="song-info">
					<p class="grey-text">${index + 1}</p>
					<img class="track-image" src="${eachTrack.image}" alt="${eachTrack.title} album cover">

					<div class="track-text">
						<p class="title">${eachTrack.title}</p>
						<p class="artist">${eachTrack.artist}</p>
					</div>
				</div>
				<p class="duration grey-text">${eachTrack.duration}</p>
			</div>`;
        } );
        return songs;
    }


	// ----- ADDITIONAL INFO ------
    
    function outputAddInfo(trackData) {
        let addInfo = '';

        addInfo += `
            <div id="output-info" class="track-container">
                <img id="outputAlbum" src="${trackData.image}" alt="${trackData.title} album cover">

                <div class="track-text">
                    <p class="title">${trackData.title}</p>
                    <p class="artist">${trackData.artist}</p>
                </div>
            </div>

            <section id="additional-info">
                <h1>Additional Info</h1>

                <div id="bento-container">
                    <div class="info-box">
                        <p class="info-title grey-text">Release Year</p>
                        <p class="info-desc">${trackData.release}</p>
                    </div>    

                    <div class="info-box">
                        <p class="info-title grey-text">Popularity</p>
                        <p class="info-desc">${trackData.popularity}</p>
                    </div>    

                    <div class="info-box">
                        <p class="info-title grey-text">Album</p>
                        <p class="info-desc" id="outputAlbum">${trackData.album}</p>
                    </div>    
                </div>
            </section>`;

        return addInfo;  
    }
})(); // end IIFE

