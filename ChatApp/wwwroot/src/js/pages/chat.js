import $ from "jquery";
import axios from 'axios';
import * as signalR from "@microsoft/signalr";

var _roomId = $('input[name="roomId"]').val();
var _connectionId = '';
var _body = document.querySelector(".chat__body");

var messageBuilder = function () {
    var message = null;
    var header = null;
    var p = null;
    var footer = null;

    return {
        createMessage: function (classList) {
            message = document.createElement("div");

            if (classList === undefined)
                classList = [];

            for (var i = 0; i < classList.legth; i++) {
                message.classList.add(classList[i]);
            }

            message.classList.add("chat__body__message");

            return this;
        },
        withHeader: function (text) {
            var strong = document.createElement("strong");
            strong.appendChild(document.createTextNode(text + ':'));

            header = document.createElement("header");
            header.appendChild(strong);

            return this;
        },
        withParagraph: function (text) {
            p = document.createElement("p");
            p.appendChild(document.createTextNode(text));

            return this;
        },
        withFooter: function (text) {
            footer = document.createElement("footer");
            var date = new Date(text).toDateString();
            footer.appendChild(document.createTextNode(date));

            return this;
        },
        build: function () {
            message.appendChild(header);
            message.appendChild(p);
            message.appendChild(footer);
            return message;
        }
    };
}

var connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

_body.scrollBy(0, _body.scrollHeight);

connection.on("RecieveMessage", function (data) {
    try {
        var message = messageBuilder()
            .createMessage()
            .withHeader(data.name)
            .withParagraph(data.text)
            .withFooter(data.timestamp)
            .build();

        _body.append(message);

        _body.scrollBy(0, _body.scrollHeight);
    } catch (err) {
        console.error(err);
    }
});

var joinRoom = function () {
    var url = `/Chat/JoinRoom/${_connectionId}/${_roomId}`;
    axios.post(url, null)
        .then(function (res) {
            console.log("Joined Room: ", res);
        })
        .catch(function (res) {
            console.error("Failed to join room! ", res);
        });
}

connection.start()
    .then(function () {
        connection.invoke('getConnectionId')
            .then(function (connectionId) {
                _connectionId = connectionId;

                joinRoom();
            });
    })
    .catch(function (err) {
        console.log(err);
    });

var sendMessage = function (event) {
    event.preventDefault();

    var data = new FormData(event.target);
    document.getElementById("chat__input").value = "";
    axios.post('/Chat/SendMessage', data)
        .then(function (res) {
            console.log("Message was sent! ", res);
        })
        .catch(function (err) {
            console.error("Error: ", err);
        });
}