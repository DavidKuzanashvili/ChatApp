var createRoomBtn = document.getElementById('side-menu__create-room');
var createRoomModal = document.getElementById('create-room-modal');
var closeModalBtn = document.getElementById('modal__body__close');

if (createRoomBtn) {
    createRoomBtn.addEventListener('click', function () {
        createRoomModal.classList.add('modal--active');
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function () {
        createRoomModal.classList.remove('modal--active');
    });
}