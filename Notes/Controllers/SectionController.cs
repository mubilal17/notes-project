using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Notes.Data;
using Notes.Data.Models;
using Web_Server.Data.ResultModels;

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
        public SectionResult Get(int workspaceId, int sectionId)
        {
            return repository.GetSection(workspaceId, sectionId);
        }


    }
}