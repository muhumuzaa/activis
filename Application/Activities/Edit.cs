using Domain;
using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Activity>
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Activity>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if (activity == null)
                    throw new Exception("Activity not found");

                // Update fields
                activity.Title = request.Activity.Title;
                activity.Description = request.Activity.Description;
                activity.Category = request.Activity.Category;
                activity.Date = request.Activity.Date; // Assuming date is updated by frontend
                activity.City = request.Activity.City;
                activity.Venue = request.Activity.Venue;

                await _context.SaveChangesAsync();

                return activity; // Return the updated Activity
            }
        }
    }
}
