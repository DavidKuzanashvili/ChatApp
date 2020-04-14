const con = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

con.on("RecieveNotification", function (data) {
    console.log("Notify: ", data);
});