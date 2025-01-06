using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseApiController : ControllerBase
    {
        protected IMediator Mediator { get; }

        protected BaseApiController(IMediator mediator)
        {
            Mediator = mediator;
        }
    }
}
