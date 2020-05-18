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
    public class PageController : ControllerBase
    {
        Repository repository;

        public PageController(Repository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public PageResult Get(int workspaceId, int sectionId, int pageId)
        {
            PageResult pageResult = repository.GetPage(workspaceId, sectionId, pageId);
            return pageResult;
        }

        [HttpPost]
        public PageResult CreateNewPage(int workspaceId, int sectionId)
        {
            PageResult pageResult = repository.appendNewPageToSection(workspaceId, sectionId);
            return pageResult;
        }
    }
}