using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Notes.Data.Models;

namespace Notes.Data
{
    public class IdCounter
    {
        private int counter;

        public IdCounter(int start = 0)
        {
            counter = start;
        }

        public int getNextThenIncrement()
        {
            return counter++;
        }
    }
}
