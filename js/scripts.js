$(() => { //jQuery document ready function

	$('.loading').hide();
	$('.error').hide();

	const sections = [
		// 'home',
		'arts',
		'automobiles',
		'books',
		// 'business',
		'fashion',
		'food',
		// 'health',
		// 'insider',
		// 'magazine',
		'movies',
		// 'national',
		// 'ny region',
		// 'obituaries',
		// 'opinion',
		// 'politics',
		// 'real estate',
		'science',
		// 'sports',
		// 'sunday review',
		// 't magazine',
		'technology',
		'theater',
		'travel',
		// 'upshot',
		'world',
	];

	// Build the list of selectable sections
	const numSections = sections.length;
	// var n = 5;
	for (let n=0; n<numSections; n++) {
		let option = sections[n];
		$('select').append(`<option value="${option}">${option}</option>`);
	}

	$('#selection').on('change', () => {
		// $('article').empty();
		$('.loading').show();
		$('.error').hide();
		let selection = $('#selection').val(); // Get the user's section selection
		selection = selection.replace(/\s+/g, ''); // Remove spaces so it'll work in the URL
		const apiKey= '3d0a4529188c480899c9ae22d7122aae'; // API Key for Top Stories:
		const apiUrl = `https://api.nytimes.com/svc/topstories/v2/${selection}.json?api-key=${apiKey}`; // Build a keyed API URL for the selected section

		// Pull the API info

		$.ajax({
			url: apiUrl,
			method: 'GET',

		}).done(data => {
			// console.log(data);
			$('article').empty();

			let anchorsAppended = 0;
			$.each(data.results, each => {

				const articleMediaLength = data.results[each].multimedia.length;
				const articleMediaIndex = articleMediaLength - 1;
				if (articleMediaLength === 0) {
					return true;
				}
				anchorsAppended++;
				if (anchorsAppended <= 12) {
					const articleTitle = data.results[each].title;
					const articleAbstract = data.results[each].abstract;
					const articleByline = data.results[each].byline;
					const articleUrl = data.results[each].url;
					const articleImage = data.results[each].multimedia[articleMediaIndex].url; // use the best available media
					$('header').addClass('header-loaded');
					let post = `<a href="${articleUrl}" style="background-image: url(${articleImage});">
												<div class="overlay">
													<h2>${articleTitle}</h2>
													<p>${articleAbstract}</p>
													<p class="byline">${articleByline}</p>
												</div>
											</a>`;
					$('article').append(post);
				}

				return (anchorsAppended <= 12);
			})
		}).fail(() => {
			$('.error').show();
		}).always(() => {
			$('.loading').hide();
			addListener();
		});
		
	});

	// Show the overlay on mouseover
	function addListener(){
	$('article').children().on('mouseover', function(e) {
		e.preventDefault();
		$(this).children().children().toggleClass('toggle-height');
	});
	$('article').children().on('mouseout', function(e) {
		e.preventDefault();
		$(this).children().children().toggleClass('toggle-height');
	});

	}

}); // End of jQuery document ready function