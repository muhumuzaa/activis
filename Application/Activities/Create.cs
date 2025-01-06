using Domain;
using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Create
    {
        // Command expects an Activity as response
        public class Command : IRequest<Activity>
        {
            public Activity Activity { get; set; }
        }

        // Handler processes the Command and returns the created Activity
        public class Handler : IRequestHandler<Command, Activity>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Command request, CancellationToken cancellationToken)
            {
                // Validate that id and date are present
                if (request.Activity.Id == Guid.Empty)
                {
                    throw new Exception("Activity must have a valid ID.");
                }

                // if (string.IsNullOrEmpty(request.Activity.Date))
                // {
                //     throw new Exception("Activity must have a valid Date.");
                // }

                // Optional: Additional validations can be added here

                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();

                return request.Activity; // Return the created Activity
            }
        }
    }
}
