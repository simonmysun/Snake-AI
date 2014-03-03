$(document).ready(function() {

    $('#btn-start').click(function() {
	init();
    });
    $('#btn-clear').click(function() {
	$('#ai').val('');
    });

    codeExample = [
	'function think(game) {\n    return keyboardDirection;\n}\n'
	,''
	,''
    ]

    $('#ai-examples').change(function() {
	$('#ai').val(codeExample[$('#ai-examples').get(0).selectedIndex]);
    })

});
