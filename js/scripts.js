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
		console.log(data);
		$('article').empty();

		// try filtering the data before we begin looping
		// var data = rawData.results; // this can be used to refine the dataset
		// hints: .fiter() and .slice()

		// $.each(data, function(index, value) {
		// 	var example = 'each loop';
		// });

		var p = 0;
		var q = 0;

		for (n=0; n<12; n++) {
			var articleMediaLength = data.results[p+1].multimedia.length;
			if (articleMediaLength === 0) {
				console.log('no media available in .results['+ (p+1) +']');
				q++;
			}
			p = n + q;
			console.log('n('+n+') + q('+q+') = p('+p+')')

			var articleTitle = data.results[p].title;
			var articleAbstract = data.results[p].abstract;
			var articleByline = data.results[p].byline;
			var articleUrl = data.results[p].url;
			var articleImage = data.results[p].multimedia[4].url;
			$('header').removeClass('header-initial').addClass('header-loaded');
			console.log('appening info from .results[p'+p+']')
			$('article').append('<a href="' + articleUrl + '" style="background-image: url(' + articleImage + ');"><div class="overlay"><h2>' + articleTitle + '</h2><p>' + articleAbstract + '</p><p class="byline">' + articleByline + '</p></div></a>');
		}

	}).fail(function() {
		$('label').text('Error').addClass('error');
		setTimeout(function () {
			$('label').removeClass('error').text('Choose a section'); }, 3000);
	});

});
