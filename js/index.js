$(document).ready(function() {
	'use strict'

	var resultWasGiven = false;

	var resolveExpression = expression => {
		expression = isOperator(expression[expression.length - 1]) ? expression.substr(0, expression.length - 1) : expression;
		expression = expression.replace(/÷/g, '/').replace(/x/g, '*');
		console.log(expression);
		$('#expression').text(eval(expression));
		resultWasGiven = true;
	};

	var isOperator = character =>  /[+\-x÷]/.test(character);

	$('.char').on('click', function (e) {
		var expressionText = $('#expression').text();
		var buttonText = $(this).text();


		if(expressionText.length <= 16) {
			if(resultWasGiven && !(isOperator(buttonText))) {
				$('#expression').text('');
				resultWasGiven = false;
			}

			if( expressionText === '0' && !(isOperator(buttonText))) {
				$('#expression').text('');
			}

			if(isOperator(expressionText[expressionText.length - 1]) && (isOperator(buttonText))) {
				return;
			}

			$('#expression').append(buttonText);
		}

		resultWasGiven = false;

	});

	// Clear the output screen when press clear
	$('#clear').on('click', e => $('#expression').text('0'));

	// Eval the operation when user presses =
	$('#result').on('click', e => resolveExpression($('#expression').text()));

	// Remove last character of the expression,
	//if there's only one character it replaces it for 0
	$('#backspace').on('click', e => {
		var expressionText = $('#expression').text();
		$('#expression').text(expressionText.length > 1 ? expressionText.substr(0, expressionText.length - 1) : '0');
	});

	// Uses split to get a array of all numbers,
	// check if the last number has a '.' if it doesn't
	// the function appends a '.'
	$('#dot').on('click', function(e) {
		var expressionText = $('#expression').text();
		var numbers = expressionText.split(/[+\-x÷]/);

		if(resultWasGiven) {
			$('#expression').text('0')
			resultWasGiven = false;
		};

		if(isOperator(expressionText[expressionText.length - 1])) $('#expression').append('0');
		if(numbers[numbers.length - 1].indexOf('.') === -1)
			$('#expression').append('.');
	});

	// TODO: implementar função de percentagem
});
