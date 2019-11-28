using ChatApp.Database;
using ChatApp.Hubs;
using ChatApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace ChatApp.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class ChatController : Controller
    {
        private readonly IHubContext<ChatHub> chat;

        public ChatController(IHubContext<ChatHub> chat)
        {
            this.chat = chat;
        }

        [HttpPost("[action]/{connectionId}/{roomName}")]
        public async Task<IActionResult> JoinRoom(string connectionId, string roomName, int chatId)
        {
            await chat.Groups.AddToGroupAsync(connectionId, roomName);
            return Ok();
        }

        [HttpPost("[action]/{connectionId}/{roomName}")]
        public async Task<IActionResult> LeaveRoom(string connectionId, string roomName, int chatId)
        {
            await chat.Groups.RemoveFromGroupAsync(connectionId, roomName);
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SendMessage(
            string message, 
            int chatId,
            string roomName,
            [FromServices] AppDbContext context)
        {
            try
            {
                var msg = new Message
                {
                    ChatId = chatId,
                    Name = User.Identity.Name,
                    Text = message,
                    Timestamp = DateTime.Now
                };

                context.Messages.Add(msg);
                await context.SaveChangesAsync();

                await chat.Clients.Group(roomName).SendAsync("RecieveMessage", msg);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return Ok();
        }
    }
}
