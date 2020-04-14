using ChatApp.Database;
using ChatApp.Hubs;
using ChatApp.Infrastructure;
using ChatApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
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

        [HttpPost("[action]/{connectionId}/{roomId}")]
        public async Task<IActionResult> JoinRoom(string connectionId, string roomId, int chatId)
        {
            await chat.Groups.AddToGroupAsync(connectionId, roomId);
            return Ok();
        }

        [HttpPost("[action]/{connectionId}/{roomId}")]
        public async Task<IActionResult> LeaveRoom(string connectionId, string roomId, int chatId)
        {
            await chat.Groups.RemoveFromGroupAsync(connectionId, roomId);
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SendMessage(
            string message, 
            int roomId,
            [FromServices] AppDbContext context)
        {
            try
            {
                var msg = new Message
                {
                    ChatId = roomId,
                    Name = User.Identity.Name,
                    Text = message,
                    Timestamp = DateTime.Now
                };

                context.Messages.Add(msg);
                await context.SaveChangesAsync();

                await chat.Clients.Group(roomId.ToString()).SendAsync("RecieveMessage", msg);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> SendNotification(int roomId, [FromServices] AppDbContext context)
        {
            string userName = context.Users
                .Where(x => x.Id == User.GetUserId())
                .Select(x => x.UserName)
                .FirstOrDefault();

            await chat.Clients
                .Group(roomId.ToString())
                .SendAsync("RecieveNotification", $"{userName} wants to chat with u!");

            return Ok();
        }
    }
}
