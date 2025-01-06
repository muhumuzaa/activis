// File: API/Controllers/ActivitiesController.cs

using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        // Constructor: Mediator is injected via BaseApiController
        public ActivitiesController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        /// Retrieves all activities.
        /// GET: /api/activities
        /// </summary>
        /// <returns>List of activities</returns>
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            var activities = await Mediator.Send(new List.Query());
            return Ok(activities);
        }

        /// <summary>
        /// Retrieves a specific activity by ID.
        /// GET: /api/activities/{id}
        /// </summary>
        /// <param name="id">Activity ID (GUID)</param>
        /// <returns>Activity details</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            var activity = await Mediator.Send(new Details.Query { Id = id });

            if (activity == null)
            {
                return NotFound(new { Message = $"Activity with ID {id} not found." });
            }

            return Ok(activity);
        }

        /// <summary>
        /// Creates a new activity.
        /// POST: /api/activities
        /// </summary>
        /// <param name="activity">Activity object with Title, Category, Description, City, Venue</param>
        /// <returns>Created activity with ID and Date</returns>
        [HttpPost]
        public async Task<ActionResult<Activity>> CreateActivity([FromBody] Activity activity)
        {
            if (activity == null)
            {
                return BadRequest(new { Message = "Activity data is required." });
            }

            // Ensure ID and Date are provided by the frontend
            if (activity.Id == Guid.Empty)
            {
                return BadRequest(new { Message = "Activity must have a valid ID." });
            }

            if (activity.Date == default(DateTime))
            {
                return BadRequest(new { Message = "Activity must have a valid Date." });
            }


            var createdActivity = await Mediator.Send(new Create.Command { Activity = activity });

            // Returns 201 Created with Location header pointing to the new resource
            return CreatedAtAction(nameof(GetActivity), new { id = createdActivity.Id }, createdActivity);
        }

        /// <summary>
        /// Updates an existing activity.
        /// PUT: /api/activities/{id}
        /// </summary>
        /// <param name="id">Activity ID (GUID)</param>
        /// <param name="activity">Updated activity object</param>
        /// <returns>Updated activity</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<Activity>> EditActivity(Guid id, [FromBody] Activity activity)
        {
            if (activity == null)
            {
                return BadRequest(new { Message = "Activity data is required." });
            }

            if (id != activity.Id)
            {
                return BadRequest(new { Message = "Activity ID mismatch." });
            }

            var updatedActivity = await Mediator.Send(new Edit.Command { Activity = activity });

            if (updatedActivity == null)
            {
                return NotFound(new { Message = $"Activity with ID {id} not found." });
            }

            return Ok(updatedActivity);
        }

        /// <summary>
        /// Deletes an activity by ID.
        /// DELETE: /api/activities/{id}
        /// </summary>
        /// <param name="id">Activity ID (GUID)</param>
        /// <returns>No content</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });

            if (!result)
            {
                return NotFound(new { Message = $"Activity with ID {id} not found." });
            }

            // Returns 204 No Content on successful deletion
            return NoContent();
        }
    }
}
