//jQuery document ready function
// $(function() { stuff and junk });

var sections = [
'home',
'arts',
'automobiles',
'books',
'business',
'fashion',
'food',
'health',
'insider',
'magazine',
'movies',
'national',
'ny region',
'obituaries',
'opinion',
'politics',
'real estate',
'science',
'sports',
'sunday review',
't magazine',
'technology',
'theater',
'travel',
'upshot',
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
	var selection = $('#selection').val(); // Get the user's section selection
	selection = selection.replace(/\s+/g, ''); // Remove spaces so it'll work in the URL
	// console.log('Received a section selection: ' + selection);
	var apiKey= '3d0a4529188c480899c9ae22d7122aae'; // API Key for Top Stories:
	var apiUrl = 'https://api.nytimes.com/svc/topstories/v2/' + selection + '.json?api-key=' + apiKey; // Build a keyed API URL for the selected section
	// console.log('Generated keyed URL:' + apiUrl);
	// console.log('Fetching JSON object...');


	$.ajax({
		url: apiUrl,
		method: 'GET',

	}).done(function(data) {
		// console.log(rawData);
		$('article').empty();

		// try filtering the data before we begin looping
		// hints: .fiter() and .slice()
		// var articleMediaLength = rawData.results[n].multimedia.length;
		// console.log(articleMediaLength);
		// var data = rawData.results;

		// $.each(data, function(index, value) {
		// 	var articleTitle = data.title;
		// 	console.log(articleTitle);
		// });

		


		for (n=0; n<12; n++) {

			var o = n+1;
			var p = n;

			var articleMediaLength = data.results[p].multimedia.length;
	
						

			if (articleMediaLength === 0) {
				console.log('no media available for '+ n + 'th story');
				p++;
			} 

			var articleTitle = data.results[p].title;
			var articleAbstract = data.results[p].abstract;
			var articleByline = data.results[p].byline;
			var articleUrl = data.results[p].url;
			var articleImage = data.results[p].multimedia[4].url;

			$('header').removeClass('header-initial').addClass('header-loaded');
			$('article').append('<a href="' + articleUrl + '" style="background-image: url(' + articleImage + ');"><div class="overlay"><h2>' + o + ': ' + articleTitle + '</h2><p>' + articleAbstract + '</p><p class="byline">' + articleByline + '</p></div></a>');

		}






	}).fail(function() {
		$('header').append('<p class="error">Error</p>')
		$('.error').fadeOut(900);
	});

});


