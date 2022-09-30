window.onload = () => {
	const hexInput = document.getElementById('hex-input');
	const rgbInput = document.getElementById('rgb-input');
	
	const rInput = document.getElementById('r-input');
	const gInput = document.getElementById('g-input');
	const bInput = document.getElementById('b-input');
	
	const boxes = document.getElementsByName('target');
	
	hexInput.addEventListener('input', updateHex);
	rgbInput.addEventListener('input', updateRGB);
	
	rInput.addEventListener('input', updateSliders);
	gInput.addEventListener('input', updateSliders);
	bInput.addEventListener('input', updateSliders);
	
	boxes.forEach((box) => {box.addEventListener('input', updateSliders)});
}

function updateHex(e) {
	const hexInput = document.getElementById('hex-input');
	
	const hex = hexInput.value;
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
	const rgbInput = document.getElementById('rgb-input');
	const rgb = rgbInput.value;
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
	const rInput = document.getElementById('r-input');
	const gInput = document.getElementById('g-input');
	const bInput = document.getElementById('b-input');
	
	
	
	const nums = {
		'r': rInput.value,
		'g': gInput.value,
		'b': bInput.value,
	};
	
	setFields(nums);
}

function setFields(nums) {
	const title = document.getElementById('title');
	const boxes = document.getElementsByName('target');
	const hex = numsToHex(nums);
	
	setHex(hex);
	setRGB(numsToRGB(nums));
	setSliders(nums);
	
	title.style.color = hex;
	
	boxes.forEach((box) => {
		
		document.getElementById(box.value).style.backgroundColor = box.checked ? hex : '#f8f8f2';
	});
}

function setHex(hex) {
	const hexInput = document.getElementById('hex-input');
	const hexButton = document.getElementById('hex-button');
	
	hexInput.value = hex;
	hexButton.style.backgroundColor = hex;
};

function setRGB(rgb) {
	const rgbInput = document.getElementById('rgb-input');
	const rgbButton = document.getElementById('rgb-button');
	
	rgbInput.value = rgb;
	rgbButton.style.backgroundColor = rgb;
};

function setSliders(nums) {
	const rInput = document.getElementById('r-input');
	const gInput = document.getElementById('g-input');
	const bInput = document.getElementById('b-input');
	
	rInput.value = nums['r'];
	gInput.value = nums['g'];
	bInput.value = nums['b'];
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