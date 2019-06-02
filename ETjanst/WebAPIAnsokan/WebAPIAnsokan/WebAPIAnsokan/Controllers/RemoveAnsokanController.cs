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
    public class RemoveAnsokanController : ApiController
    {
        private AnsokanEntities ansokanDB = new AnsokanEntities();
        public bool Remove(string personnummer)
        {
            try
            {
                //Tar bort ansökan med det elev personnummer.
                ansokanDB.Ansokan.Remove(
                    ansokanDB.Ansokan.Single(a => a.Elevpersonnummer == personnummer.ToLower().Trim()));

                ansokanDB.SaveChanges();
                return true;
            }catch(Exception e)
            {
                Console.WriteLine("error: " + e.ToString());
                return false;
            }
        }
    }
}
