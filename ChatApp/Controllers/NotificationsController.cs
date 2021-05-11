using ChatApp.Hubs;
using ChatApp.Models.Notifications;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ChatApp.Controllers
{
    //[Authorize]
    [Route("[controller]/[action]")]
    public class NotificationsController : Controller
    {
        private readonly IHubContext<NotificationHub> _notificationHub;

        public NotificationsController(IHubContext<NotificationHub> notificationHub)
        {
            _notificationHub = notificationHub;
        }

        [HttpPost]
        public async Task<IActionResult> NotifyAllAsync()
        {
            var notification = new Notification()
            {
                Text = "Yellou",
                Type = NotificationType.SUCCESS
            };

            await _notificationHub.Clients.All.SendAsync("NotifyAll", notification);

            return Ok();
        }
    }
}
