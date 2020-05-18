using Notes.Controllers;
using Notes.Data;
using Notes.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Web_Server.Data.ResultModels;
using Xunit;

namespace Tests.API_Tests
{
    public class PageTests
    {
        Repository repository;

        public PageTests()
        {
            repository = new Repository();
        }

        [Fact]
        public void canRetreiveExistingPage()
        {
            PageController controller = new PageController(repository);
            int workspaceId = 1, sectionId = 1, pageId = 1;

            PageResult page = controller.Get(workspaceId, sectionId, pageId);

            Assert.NotNull(page);
        }

        [Fact]
        public void notSuccessfulOnNonexistingPage()
        {
            PageController controller = new PageController(repository);
            int workspaceId = 1, sectionId = 1, pageId = 55;

            PageResult page = controller.Get(workspaceId, sectionId, pageId);

            Assert.False(page.Success);
        }
    }
}
