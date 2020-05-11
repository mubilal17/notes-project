using Notes.Data;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Tests.Data_Tests
{
    public class RepositoryTests
    {
        protected Repository repository;
        public RepositoryTests()
        {
            repository = new Repository();
        }

        [Fact]
        public void RepositoryReturnsWorkspace()
        {
            Assert.NotNull(repository.getWorkspace());
        }
    }
}
