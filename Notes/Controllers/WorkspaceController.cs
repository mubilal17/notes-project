using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Notes.Data;
using Notes.Data.Models;

namespace Notes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkspaceController : ControllerBase
    {
        Repository repository;
        public WorkspaceController(Repository repository)
        {
            this.repository = repository;
        }
        [HttpGet]
        [Produces("application/json")]
        public Workspace Get(int workspaceId)
        {
            Workspace workspace = repository.getWorkspace(workspaceId);
            return workspace;
        }
    }
}