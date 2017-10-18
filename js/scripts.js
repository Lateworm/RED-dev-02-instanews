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
numSections = sections.length;
for (n=0; n<numSections; n++) {
	option = sections[n];
	$('select').append('<option value="' + option + '">' + option + '</option>');
};

$('#selection').on('change', function() {
	var selection = $('#selection').val(); // Get the user's section selection
	selection = selection.replace(/\s+/g, ''); // Remove spaces so it'll work in the URL
	console.log('Received a section selection: ' + selection);
	var APIKey= '3d0a4529188c480899c9ae22d7122aae'; // API Key for Top Stories:
	var URL = 'https://api.nytimes.com/svc/topstories/v2/' + selection + '.json?api-key=' + APIKey; // Build a keyed API URL for the selected section
	console.log('Generated keyed URL:' + URL);
	console.log('Fetching JSON object...');



	$.ajax({
		url: URL,
		method: 'GET',

	}).done(function(result) {
		console.log(result);

	}).fail(function() {
		$('header').append('<p class="error">Error</p>')
	});

});


