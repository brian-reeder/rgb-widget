window.onload = () => {	
	$('#hex-input').on('input', updateHex);
	$('#rgb-input').on('input', updateRGB);
	
	$('#r-input').on('input', updateSliders);
	$('#g-input').on('input', updateSliders);
	$('#b-input').on('input', updateSliders);
	
	$('.target').each((e) => {
		$(this).on('input', updateSliders);
	});
	
}

function updateHex(e) {	
	const hex = $('#hex-input').val();
	const reHexColor = /^#?[0-9A-Fa-f]{6}$/;
	if(hex.match(reHexColor)) {
		const shortHex = hex.startsWith('#') ? hex.slice(1) : hex;
		const nums = {
			'r': parseInt(shortHex.slice(0,2), 16),
			'b': parseInt(shortHex.slice(2,4), 16),
			'g': parseInt(shortHex.slice(4,6), 16),
		};
		
		setFields(nums);
	}
};

function updateRGB(e) {
	const rgb = $("#rgb-input").val();
	const reRGBColor = /^rgb\(([1-9]?[\d]|[1][\d][\d]|[2][0-4][\d]|[2][5][0-5]),([1-9]?[\d]|[1][\d][\d]|[2][0-4][\d]|[2][5][0-5]),([1-9]?[\d]|[1][\d][\d]|[2][0-4][\d]|[2][5][0-5])\)/;
	if(rgb.match(reRGBColor)) {
		const splitNums = rgb.slice(4, rgb.length-1).split(',');
		
		const nums = {
			'r': splitNums[0],
			'g': splitNums[1],
			'b': splitNums[2],
		};
		
		setFields(nums);
	}
}

function updateSliders(e) {
	const nums = {
		'r': $('#r-input').val(),
		'g': $('#g-input').val(),
		'b': $('#b-input').val(),
	};
	
	setFields(nums);
}

function setFields(nums) {
	const hex = numsToHex(nums);
	
	setHex(hex);
	setRGB(numsToRGB(nums));
	setSliders(nums);
	
	$('#title').css('color', hex);

	$('.target').each(function(e) {
		const target = `#${$(this).val()}`;
		$(target).css('background-color', $(this).is(':checked') ? hex : '#F8F8F2');
	});
}

function setHex(hex) {
	$('hex-input').val(hex);
	$('#hex-button').css('background-color', hex);
};

function setRGB(rgb) {
	$('#rgb-input').val(rgb);
	$('#rgb-button').css('background-color', rgb);
};

function setSliders(nums) {
	$('#r-input').val(nums['r']);
	$('#g-input').val(nums['g']);
	$('#b-input').val(nums['b']);
};

function numsToHex(nums) {
	const r = intToHex(nums['r']);
	const g = intToHex(nums['g']);
	const b = intToHex(nums['b']);
	
	return `#${r}${g}${b}`;
};

function numsToRGB(nums) {
	return `rgb(${nums['r']},${nums['g']},${nums['b']})`;
};

function intToHex(num) {
	let sHex = ``;
	for(let n = num; n > 0; n = Math.floor(n / 16)) {
		const rem = n % 16;
		const cRem = rem > 9 ? String.fromCharCode(('A'.charCodeAt(0) + rem - 10)) : `${rem}`;
		
		sHex = `${cRem}${sHex}`;
	}
	for(;sHex.length < 2; sHex = `0${sHex}`);
	
	return sHex;
};