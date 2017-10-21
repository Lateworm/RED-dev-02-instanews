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
	var apiKey= '3d0a4529188c480899c9ae22d7122aae'; // API Key for Top Stories:
	var apiUrl = 'https://api.nytimes.com/svc/topstories/v2/' + selection + '.json?api-key=' + apiKey; // Build a keyed API URL for the selected section
	// console.log('Generated keyed URL:' + apiUrl);
	// console.log('Fetching JSON object...');


	$.ajax({
		url: apiUrl,
		method: 'GET',

	}).done(function(data) {
		// console.log(data);
		$('article').empty();

		var anchorsAppended = 0;
		$.each(data.results, function(each) {

			var articleMediaLength = data.results[each].multimedia.length;
			if (articleMediaLength === 0) {
				// console.log('No image available in results['+(each)+']')
				return true;
			}

			anchorsAppended++;

			if (anchorsAppended <= 12) {
				// console.log('Appending anchor '+anchorsAppended+' from .results['+each+']...');
				var articleTitle = data.results[each].title;
				var articleAbstract = data.results[each].abstract;
				var articleByline = data.results[each].byline;
				var articleUrl = data.results[each].url;
				var articleImage = data.results[each].multimedia[4].url; // [4] = hi-rez, [3] = lo-rez
				$('header').removeClass('header-initial').addClass('header-loaded');
				$('article').append('<a href="' + articleUrl + '" style="background-image: url(' + articleImage + ');"><div class="overlay"><h2>' + articleTitle + '</h2><p>' + articleAbstract + '</p><p class="byline">' + articleByline + '</p></div></a>');
			}
			
			return (anchorsAppended !== 12);
		})

	}).fail(function() {
		$('label').text('Error').addClass('error');
		setTimeout(function () {
			$('label').removeClass('error').text('Choose a section'); }, 3000);
	});

});
