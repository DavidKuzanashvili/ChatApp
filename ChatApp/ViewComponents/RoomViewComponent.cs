using ChatApp.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;

namespace ChatApp.ViewComponents
{
    public class RoomViewComponent : ViewComponent
    {
        private readonly AppDbContext context;

        public RoomViewComponent(AppDbContext context)
        {
            this.context = context;
        }

        public IViewComponentResult Invoke()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var chats = context.ChatUsers
                .Include(x => x.Chat)
                .Where(x => x.UserId == userId)
                .Select(x => x.Chat)
                .ToList();

            return View(chats);
        }
    }
}
