using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace OptimalAccessibility.Domain.Filters
{
    public class DbUpdateExceptionFilter : ExceptionFilterAttribute
    {

        public override void OnException(ExceptionContext context)
        {
            if(!(context.Exception is DbUpdateException))
            {
                return;
            }

            var sqlException = context.Exception?.InnerException?.InnerException as SqliteException;

            if (sqlException?.SqliteErrorCode == 19)
            {
                context.Result = new StatusCodeResult(StatusCodes.Status409Conflict);
            }

            context.Result = new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

    }
}

