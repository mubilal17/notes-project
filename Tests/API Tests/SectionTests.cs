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
    public class SectionTests
    {
        Repository repository;
        public SectionTests()
        {
            repository = new Repository();
        }

        [Fact]
        public void CanGetExistingSection()
        {
            SectionController sectionController = new SectionController(repository);
            int workspaceId = 1, sectionId = 1;

            SectionResult section = sectionController.Get(workspaceId, sectionId);

            Assert.NotNull(section);
        }

        [Fact]
        public void notSuccessfulOnNonExistingSection()
        {
            SectionController sectionController = new SectionController(repository);
            int workspaceId = 1, sectionId = 55;

            SectionResult section = sectionController.Get(workspaceId, sectionId);

            Assert.False(section.Success);
        }
    }
}
