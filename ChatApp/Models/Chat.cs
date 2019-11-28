using ChatApp.Models.Enums;
using System.Collections.Generic;

namespace ChatApp.Models
{
    public class Chat
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Message> Messages { get; set; } = new List<Message>();
        public ICollection<ChatUser> Users { get; set; } = new List<ChatUser>();
        public ChatType Type { get; set; }
    }
}
