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
    public class EleveToAnsokanController : ApiController
    {
        private AnsokanEntities ansokanDB = new AnsokanEntities();
        public IEnumerable<Models.Ansokan> Get(string personnummer)
        {
            var ansokan = from item in ansokanDB.Ansokan
                          where item.Elevpersonnummer == personnummer.ToLower().Trim()
                          select item;
            return ansokan.ToList();
        }
    }
}
