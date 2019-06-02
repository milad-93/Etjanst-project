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
    public class AddAnsokanController : ApiController
    {
        private AnsokanEntities ansokanDB = new AnsokanEntities();
        [HttpPost]
        public bool Post(Ansokan ansokan)
        {

            try
            {
                ansokan.DatumAvVardnadshavare = DateTime.Now;
                
                ansokanDB.Ansokan.Add(ansokan);
                ansokanDB.SaveChanges();
                return true;
            } catch(Exception e)
            {
                Console.WriteLine("error: " + e.ToString());
                return false;
            }
        }
        public bool Change(int handlaggareId, string elevPersonnummer)
        {
            var ansokan = from item in ansokanDB.Ansokan
                                 where item.Elevpersonnummer == elevPersonnummer.ToLower().Trim()
                                 select item;
            try
            {
                //Vilken handlaggare
                ansokan.FirstOrDefault().IdHandlaggare = handlaggareId;
                //Är godkänd?
                ansokan.FirstOrDefault().StatusAvHandlaggare = true;
                //när
                ansokan.FirstOrDefault().DatumAvHandlaggare = DateTime.Now;
                //är färdig
                ansokan.FirstOrDefault().Fardig = true;
                //spara
                ansokanDB.SaveChanges();

                return true;
            } catch(Exception e)
            {
                Console.WriteLine("error: " + e.ToString());
                return false;
            }

        }
        public bool Change(int handlaggareId, string elevPersonnummer, string svar)
        {
            var ansokan = from item in ansokanDB.Ansokan
                          where item.Elevpersonnummer == elevPersonnummer.ToLower().Trim()
                          select item;
            try
            {
                //Vilken handlaggare
                ansokan.FirstOrDefault().IdHandlaggare = handlaggareId;
                //Är godkänd?
                ansokan.FirstOrDefault().StatusAvHandlaggare = false;
                //när
                ansokan.FirstOrDefault().DatumAvHandlaggare = DateTime.Now;
                //Varför
                ansokan.FirstOrDefault().BedomningAvHandlaggare = svar;
                //är färdig
                ansokan.FirstOrDefault().Fardig = true;
                //spara
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
