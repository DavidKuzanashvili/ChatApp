using ChatApp.Database;
using ChatApp.Infrastructure;
using ChatApp.Models;
using ChatApp.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApp.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly AppDbContext context;

        public HomeController(AppDbContext context)
        {
            this.context = context;
        }

        public IActionResult Index()
        {
            var chats = context.Chats
                .Include(x => x.Users)
                .Where(x => !x.Users.Any(y => y.UserId == User.GetUserId()))
                .ToList();

            return View(chats);
        }

        [HttpGet]
        public IActionResult Find()
        {
            var users = context.Users
                .Where(x => x.Id != User.GetUserId())
                .ToList();

            return View(users);
        }

        public async Task<IActionResult> CreatePrivateRoom(string userId)
        {
            var chat = new Chat
            {
                Type = ChatType.Private
            };

            chat.Users.Add(new ChatUser
            {
                UserId = userId
            });

            chat.Users.Add(new ChatUser
            {
                UserId = User.GetUserId()
            });

            context.Chats.Add(chat);
            await context.SaveChangesAsync();

            return RedirectToAction("Chat", new { id = chat.Id });
        }

        public IActionResult Private()
        {
            var chats = context.Chats
                .Include(x => x.Users)
                .ThenInclude(x => x.User)
                .Where(x => x.Type == ChatType.Private && x.Users.Any(u => u.UserId == User.GetUserId()))
                .ToList();

            return View(chats);
        }

        [HttpGet("{id}")]
        public IActionResult Chat(int id)
        {
            var chat = context.Chats
                .Include(x => x.Messages)
                .FirstOrDefault(x => x.Id == id);

            return View(chat ?? new Chat());
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int roomId, string message)
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
            return RedirectToAction("Chat", new { id = roomId });
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom(string name)
        {
            var chat = new Chat
            {
                Name = name,
                Type = ChatType.Room
            };

            chat.Users.Add(new ChatUser
            {
                UserId = User.GetUserId(),
                Role = UserRole.Admin
            });

            context.Chats.Add(chat);
            await context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> JoinRoom(int id)
        {
            var chatUser = new ChatUser
            {
                ChatId = id,
                UserId = User.GetUserId(),
                Role = UserRole.Member
            };

            context.ChatUsers.Add(chatUser);

            await context.SaveChangesAsync();
            return RedirectToAction("Chat", "Home", new { id });
        }
    }
}