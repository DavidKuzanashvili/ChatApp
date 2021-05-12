const createRoomBtn = document.getElementById('side-menu__create-room');
const createRoomModal = document.getElementById('create-room-modal');
const closeModalBtn = document.getElementById('modal__body__close');

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


// Other stuff
import AWN from 'awesome-notifications';
import * as signalR from "@microsoft/signalr";

const con = new signalR.HubConnectionBuilder()
    .withUrl("/notificationHub")
    .build();

con.on("NotifyAll", function (data) {
    const notifier = new AWN({
        position: 'top-right',
    });
    notifier.success(data.text);
});

con.start();