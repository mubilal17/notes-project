using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_Server.Data.ResultModels;

namespace Notes.Data.Models
{
    public class Workspace
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public List<Section> Sections { get; protected set; }

        private IdCounter sectionIdCounter;
        public Workspace(int id = 0, string title = "Untitled Workspace", List<Section> sections = null)
        {
            Id = id;
            Title = title;
            Sections = sections ?? new List<Section>();

            int maxSectionId = 0;
            Sections.ForEach(element =>
            {
                if (element.Id > maxSectionId)
                    maxSectionId = element.Id;
            });
            sectionIdCounter = new IdCounter(maxSectionId + 1);
        }

        public void addSection(Section section)
        {
            int id = sectionIdCounter.getNextThenIncrement();
            section.Id = id;
            Sections.Add(section);
        }

        public Section getSection(int sectionId)
        {
            return Sections.Find(section => section.Id == sectionId);
        }


    }
}
