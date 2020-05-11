using Notes.Controllers;
using Notes.Data;
using Notes.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Tests.API_Tests
{
    public class WorkspaceTests
    {
        Repository repository;
        public WorkspaceTests()
        {
            repository = new Repository();
        }
        [Fact]
        public void CanGetExistingWorkspace()
        {
            WorkspaceController controller = new WorkspaceController(repository);
            int workspaceId = 1;

            Workspace response = controller.Get(workspaceId);
            Assert.Equal(1, response.Id);
        }

        [Fact]
        public void ErrorOnRetrievingNonExistingWorkspace()
        {
            WorkspaceController controller = new WorkspaceController(repository);
            int workspaceId = 2;

            Workspace response = controller.Get(workspaceId);
            Assert.Null(response);
        }
    }
}
