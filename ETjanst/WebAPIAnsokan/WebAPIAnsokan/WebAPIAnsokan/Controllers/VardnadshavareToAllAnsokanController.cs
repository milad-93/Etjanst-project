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
    public class VardnadshavareToAllAnsokanController : ApiController
    {
        private AnsokanEntities ansokanDB = new AnsokanEntities();

        //Hitta alla ansökan till Vårdnadshavare.
        public IEnumerable<Models.Ansokan> Get(string personnummer)
        {
            var ansokan =   from item in ansokanDB.Ansokan
                            where item.Vardnadshavarepersonnummer == personnummer.ToLower().Trim()
                            orderby item.DatumAvVardnadshavare ascending
                            select item;
            return ansokan.ToList();
        }
    }
}
