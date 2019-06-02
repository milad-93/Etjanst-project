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
    public class AddVardnadshavareController : ApiController
    {
        private AnsokanEntities ansokanDB = new AnsokanEntities();
        public bool Post(Vardnadshavare vardnadshavare)
        {
            //spara vardnadshavare till db.
            try
            {
                ansokanDB.Vardnadshavare.Add(vardnadshavare);
                ansokanDB.SaveChanges();
                return true;
            }
            catch(Exception e)
            {
                Console.WriteLine("error: " + e.ToString());
                return false;
            }
        }
    }
}
