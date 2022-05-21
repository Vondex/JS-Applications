async function lockedProfile() {
    
    const mainSection = document.getElementById('main');

    const data = await fetchData();
    createElements();
    Array.from(document.querySelectorAll('button')).forEach(b => b.addEventListener('click', loadInfo));

    function loadInfo() {

        const source = this.parentElement;
        const lock = source.querySelector('input');

        if (lock.checked) {
            return; 
        }

        const hiddenDiv = source.querySelector('div');
        const button = source.querySelector('button');

        if (button.textContent == 'Show more') {
            hiddenDiv.style.display = 'block';
            button.textContent = 'Hide it';
        } else {
            hiddenDiv.style.display = 'none';
            button.textContent = 'Show more';
        }
    }

    function createElements() {
        for (let i = 1; i < data.length; i++) {
            const newNode = document.getElementsByClassName('profile')[0].cloneNode(true);
            mainSection.appendChild(newNode);
        }

        const profiles = Array.from(document.getElementsByClassName('profile'));

        for (let i = 0; i < profiles.length; i++) {
            const currentData = data[i];
            const currentProfile = profiles[i].querySelectorAll('input');
            const hiddenFields = profiles[i].querySelector('div');

            const lock1 = currentProfile[0];
            const lock2 = currentProfile[1];
            const username = currentProfile[2];
            const email = currentProfile[3];
            const age = currentProfile[4];

            hiddenFields.id = `user${i+1}HiddenFields`;
            hiddenFields.style.display = 'none'
            lock1.name = `user${i+1}Locked`;
            lock1.checked = true;
            lock2.name = `user${i+1}Locked`;
            username.value = currentData.username;
            username.name = `user${i+1}Username`;
            email.value = currentData.email; 
            email.name = `user${i+1}Email`;
            age.value = currentData.age;
            age.name = `user${i+1}Age`;
        }
    }

    async function fetchData() {
        const url = 'http://localhost:3030/jsonstore/advanced/profiles';

        const resp = await fetch(url);
        const data = await resp.json();

        return Object.values(data);
    }
}







