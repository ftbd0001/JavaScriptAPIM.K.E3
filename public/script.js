document.addEventListener('DOMContentLoaded', async function() {
    const apiKey = 'N0Ase0RjWOBy4QdbosyYk3_GSjEytSx9Svs_dUBhJvc'; // Замените на ваш действительный ключ API Unsplash
    const photoElem = document.getElementById('photo');
    const photographerElem = document.getElementById('photographerName');
    const likeButton = document.getElementById('likeButton');
    const likeCount = document.getElementById('likeCount');
    const historyDiv = document.getElementById('history');

    // Функция для получения случайного фото
    async function fetchRandomPhoto() {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}`);
            const data = await response.json();
            photoElem.src = data.urls.regular;
            photoElem.alt = data.description || 'Unsplash Photo';
            photographerElem.textContent = `Фотограф: ${data.user.name}`;
            updateHistory(data.urls.regular);
        } catch (error) {
            console.error('Ошибка при загрузке фотографии:', error);
            photographerElem.textContent = 'Ошибка загрузки фото.';
        }
    }

    // Обновление истории
    function updateHistory(photoUrl) {
        let history = JSON.parse(localStorage.getItem('history')) || [];
        if (history.unshift(photoUrl) > 10) { // Сохраняем последние 10 фотографий
            history.pop();
        }
        localStorage.setItem('history', JSON.stringify(history));
        displayHistory();
    }

    // Отображение истории
    function displayHistory() {
        let history = JSON.parse(localStorage.getItem('history')) || [];
        historyDiv.innerHTML = history.map(url => `<img src="${url}" style="width: 100px;">`).join('');
    }

    // Обработка нажатий на кнопку "лайк"
    likeButton.addEventListener('click', () => {
        let currentLikes = parseInt(localStorage.getItem('likes') || 0, 10);
        localStorage.setItem('likes', currentLikes + 1);
        likeCount.textContent = currentLikes + 1;
    });

    // Инициализация счетчика лайков
    function initializeLikes() {
        let savedLikes = parseInt(localStorage.getItem('likes') || 0, 10);
        likeCount.textContent = savedLikes;
    }

    fetchRandomPhoto();
    initializeLikes();
    displayHistory();
});
