const currentYear = new Date().getFullYear();
const startYear = 2008;
const select = document.getElementById('semesterPicker');
let first = true;

for (let i = currentYear; i >= startYear; i--) {
	var opt = document.createElement('option');
	opt.name = 'semester';
	if (first) {
		opt.innerHTML = i + ' sem I';
		first = false;
		i += 1;
	} else {
		opt.innerHTML = i + ' sem II';
		first = true;
	}
	opt.value = opt.innerHTML;
	select.appendChild(opt);
}


