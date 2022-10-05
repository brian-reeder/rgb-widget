window.onload = () => {	
	$('#hex-input').on('input', updateHex);
	$('#rgb-input').on('input', updateRGB);
	
	$('#r-input').on('input', updateSliders);
	$('#g-input').on('input', updateSliders);
	$('#b-input').on('input', updateSliders);
	
	$('.target').each( (i,e) => $(e).on('input', updateSliders) );
	
}

function updateHex() {	
	const octet = '([0-9A-Fa-f]{2})'
	const reHexColor = new RegExp(`^#?${octet}${octet}${octet}$`);
	
	const matches = $('#hex-input').val().match(reHexColor);
	if(matches) {
		const nums = {
			'r': parseInt(matches[1], 16),
			'g': parseInt(matches[2], 16),
			'b': parseInt(matches[3], 16),
		};
		
		setFields({
			'hex': '',
			'rgb': numsToRGB(nums),
			'sliders': nums,
		});
	}
};

function updateRGB() {	
	const octet = '([\\d]|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])';
	const reRGB = new RegExp(`^rgb\\(${octet},${octet},${octet}\\)$`);
	
	const matches = $("#rgb-input").val().match(reRGB);
	if(matches) {	
		const nums = {
			'r': matches[1],
			'g': matches[2],
			'b': matches[3],
		}
	
		setFields({
			'hex': numsToHex(nums),
			'rgb': '',
			'sliders': nums, 
		});
	}

	return;
}

function updateSliders(e) {
	const nums = {
		'r': $('#r-input').val(),
		'g': $('#g-input').val(),
		'b': $('#b-input').val(),
	};
	
	setFields({
		'hex': numsToHex(nums),
		'rgb': numsToRGB(nums),
		'sliders': nums,
	});
}

function setFields(params) {

	if(params['hex']) {
		setHex(params['hex']);
	}

	if(params['rgb']) {
		setRGB(params['rgb']);
	}

	if(params['sliders']) {
		const hex = numsToHex(params['sliders']);
		$('#title').css('color', hex);

		$('.target').each(function(e) {
			const target = `#${$(this).val()}`;
			$(target).css('background-color', $(this).is(':checked') ? hex : '#F8F8F2');
		});

		setSliders(params['sliders']);
	}
}

function setHex(hex) {
	$('#hex-input').val(hex);
};

function setRGB(rgb) {
	$('#rgb-input').val(rgb);
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