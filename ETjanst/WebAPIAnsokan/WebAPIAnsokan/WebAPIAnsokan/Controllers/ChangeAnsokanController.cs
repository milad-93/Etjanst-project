using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPIAnsokan.Models;
using System.Web.Http.Cors;

namespace WebAPIAnsokan.Controllers
{
    [EnableCors(
        origins: "*",
        headers: "*",
        methods: "*",
        exposedHeaders: "*"
        )]
    public class ChangeAnsokanController : ApiController
    {
        private AnsokanEntities ansokanDB = new AnsokanEntities();
        [HttpPost]
        public bool Post(int handlaggareId, string elevPersonnummer, string bedomningAvHandlaggare, bool StatusAvHandlaggare)
        {
            try
            {
                var ansokan = from item in ansokanDB.Ansokan
                              where item.Elevpersonnummer == elevPersonnummer.ToLower().Trim()
                              select item;

                ansokan.FirstOrDefault().BedomningAvHandlaggare = bedomningAvHandlaggare;
                ansokan.FirstOrDefault().IdHandlaggare = handlaggareId;
                ansokan.FirstOrDefault().StatusAvHandlaggare = StatusAvHandlaggare;

                ansokan.FirstOrDefault().Fardig = true;
                ansokan.FirstOrDefault().DatumAvHandlaggare = DateTime.Now;

                ansokanDB.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("error: " + e.ToString());
                return false;
            }
        }
    }
}
