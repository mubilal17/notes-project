using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Notes.Data;
using Notes.Data.Models;

namespace Notes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageController : ControllerBase
    {
        Repository repository;

        public PageController(Repository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public Page Get(int workspaceId, int sectionId, int pageId)
        {
            return repository.getPage(workspaceId, sectionId, pageId);
        }
    }
}