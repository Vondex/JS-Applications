
const url = 'http://localhost:3030/jsonstore/collections/students';

function display(data) {
	const table = document.querySelector('.container tbody');
	table.innerHTML = '';

	Object.values(data).forEach(s => {
		const tr = document.createElement('tr');

		Object.entries(s).forEach(([key, value]) => {
			const td = document.createElement('td');

			if (key !== '_id') {
				td.innerHTML = value;
				tr.appendChild(td);
			}
		});

		table.appendChild(tr);
	})

}

async function getInfo() {
	const res = await fetch(url);
	const data = await await res.json();

	return data;
}

async function postInfo(data) {
	const res = await fetch(url, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(Object.fromEntries(data))
	});

	const result = await res.json();
	return result;
}

document.addEventListener('submit', onSubmit)

async function onSubmit(e) {
	e.preventDefault();


	const formData = new FormData(e.target);
	const data = [...formData.entries()];


	if (dataValidation(data)) {
		await postInfo(data);
		display(await getInfo());
		const arrInputs = document.querySelectorAll('.inputs input')
		arrInputs.forEach(i => i.value = '');
		
	}

	function dataValidation(data) {
		
		return data.every(([_, value]) => value !== '');
	}
	
}






