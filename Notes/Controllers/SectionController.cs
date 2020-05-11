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
    public class SectionController : ControllerBase
    {
        Repository repository;

        public SectionController(Repository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public Section Get(int workspaceId, int sectionId)
        {
            return repository.getSection(workspaceId, sectionId);
        }
    }
}