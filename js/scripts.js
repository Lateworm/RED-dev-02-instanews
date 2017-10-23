//jQuery document ready function
$(function() {

	$('.loading').hide();
	$('.error').hide();

	var sections = [
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
	var numSections = sections.length;
	var n = 5;
	for (n=0; n<numSections; n++) {
		var option = sections[n];
		$('select').append('<option value="' + option + '">' + option + '</option>');
	}

	$('#selection').on('change', function() {
		// $('article').empty();
		$('.loading').show();
		$('.error').hide();
		var selection = $('#selection').val(); // Get the user's section selection
		selection = selection.replace(/\s+/g, ''); // Remove spaces so it'll work in the URL
		var apiKey= '3d0a4529188c480899c9ae22d7122aae'; // API Key for Top Stories:
		var apiUrl = 'https://api.nytimes.com/svc/topstories/v2/' + selection + '.json?api-key=' + apiKey; // Build a keyed API URL for the selected section

		// Pull the API info

		$.ajax({
			url: apiUrl,
			method: 'GET',

		}).done(function(data) {
			// console.log(data);
			$('article').empty();

			var anchorsAppended = 0;
			$.each(data.results, function(each) {

				var articleMediaLength = data.results[each].multimedia.length;
				var articleMediaIndex = articleMediaLength - 1;
				if (articleMediaLength === 0) {
					return true;
				}
				anchorsAppended++;
				if (anchorsAppended <= 12) {
					var articleTitle = data.results[each].title;
					var articleAbstract = data.results[each].abstract;
					var articleByline = data.results[each].byline;
					var articleUrl = data.results[each].url;
					var articleImage = data.results[each].multimedia[articleMediaIndex].url; // use the best available media
					$('header').addClass('header-loaded');
					var post = '<a href="' + articleUrl + '" style="background-image: url(' + articleImage + ');">';
					post += '<div class="overlay">';
					post += '<h2>' + articleTitle + '</h2>';
					post += '<p>' + articleAbstract + '</p>';
					post += '<p class="byline">' + articleByline + '</p>';
					post += '</div></a>';
					$('article').append(post);
				}

				return (anchorsAppended <= 12);
			})
		}).fail(function() {
			$('.error').show();
		}).always(function() {
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

}); // End of document.ready