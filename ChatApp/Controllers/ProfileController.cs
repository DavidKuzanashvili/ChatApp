using ChatApp.Database;
using ChatApp.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace ChatApp.Controllers
{
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly AppDbContext context;

        public ProfileController(AppDbContext context)
        {
            this.context = context;
        }

        public IActionResult Index()
        {
            string userId = User.GetUserId();

            var user = context.Users
                .Where(x => x.Id == userId)
                .FirstOrDefault();

            return View(user);
        }
    }
}