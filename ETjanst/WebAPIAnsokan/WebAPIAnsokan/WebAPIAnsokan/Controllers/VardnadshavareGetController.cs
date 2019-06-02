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
    public class VardnadshavareGetController : ApiController
    {
        private AnsokanEntities ansokanDB = new AnsokanEntities();
        public IEnumerable<Models.Vardnadshavare> Get(string personnummer)
        {
            //Gör så att det går att serilza
            ansokanDB.Configuration.ProxyCreationEnabled = false;
            try
            {
                //hitta rätt handlaggare
                var vardnadshavare = from item in ansokanDB.Vardnadshavare
                                     where item.Vardnadshavarepersonnummer == personnummer
                                     select item;

                return vardnadshavare;
            }
            catch (Exception e)
            {
                //Om något går fel ge null
                Console.WriteLine("ERROR: " + e);
                return null;
            }
        }

        public bool IsUsernameInUse(string username)
        {
            ansokanDB.Configuration.ProxyCreationEnabled = false;
            var vardnadshavare = from item in ansokanDB.Vardnadshavare
                                 where item.Anvandarnamn == username
                                 select item;

            if (!(vardnadshavare.FirstOrDefault() == null))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public bool IsPersonnummerInUse(string personnummer)
        {
            ansokanDB.Configuration.ProxyCreationEnabled = false;
            var vardnadshavare = from item in ansokanDB.Vardnadshavare
                                 where item.Vardnadshavarepersonnummer == personnummer
                                 select item;

            if (!(vardnadshavare.FirstOrDefault() == null))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
