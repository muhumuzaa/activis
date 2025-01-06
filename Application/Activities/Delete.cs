using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<bool>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, bool>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken);

                if (activity == null)
                    return false;

                _context.Activities.Remove(activity);
                await _context.SaveChangesAsync(cancellationToken);
                return true;
            }
        }
    }
}
