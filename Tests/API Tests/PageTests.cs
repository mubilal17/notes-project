using Notes.Controllers;
using Notes.Data;
using Notes.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
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

            Page page = controller.Get(workspaceId, sectionId, pageId);

            Assert.NotNull(page);
        }

        [Fact]
        public void nullOnNonexistingPage()
        {
            PageController controller = new PageController(repository);
            int workspaceId = 1, sectionId = 1, pageId = 55;

            Page page = controller.Get(workspaceId, sectionId, pageId);

            Assert.Null(page);
        }
    }
}
