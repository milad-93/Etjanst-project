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
    public class HandlaggareGetController : ApiController
    {
        private AnsokanEntities ansokanDB = new AnsokanEntities();
        public IEnumerable<Models.Handlaggare> Get(int id)
        {
            //Gör så att det går att serilza
            ansokanDB.Configuration.ProxyCreationEnabled = false;
            try
            {
                //hitta rätt handlaggare
                var handlaggare = from item in ansokanDB.Handlaggare
                                  where item.Id == id
                                  select item;
                /*
                Models.Handlaggare hand = handlaggare.FirstOrDefault();
                //ta bort lösen
                hand.Losenord = "";
                //ger svar
                */
                return handlaggare;
            }catch(Exception e)
            {
                //Om något går fel ge null
                Console.WriteLine("ERROR: " + e);
                return null;
            }
        }
    }
}
