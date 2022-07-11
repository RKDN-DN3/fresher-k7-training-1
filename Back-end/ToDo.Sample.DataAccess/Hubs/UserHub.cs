using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDo.Sample.DataAccess.Services.ClaimUserServices;

namespace ToDo.Sample.DataAccess.Hubs
{
    [Authorize]
    public class UserHub : Hub
    {
        private readonly IClaimUserServices _claimUserServices;
        public static int TotalUsers { get; set; } = 0;
        public UserHub(IClaimUserServices claimUserServices)
        {
            _claimUserServices = claimUserServices;
        }

        public override async Task OnConnectedAsync()
        {
            var userName = _claimUserServices.GetCurrentUserName();
            await Groups.AddToGroupAsync(Context.ConnectionId, userName);

            TotalUsers++;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            await base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }
    }
}
