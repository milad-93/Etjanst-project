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
    public class GetAllAnsokanController : ApiController
    {
        private AnsokanEntities ansokanDB = new AnsokanEntities();

        public IEnumerable<Models.Ansokan> Get()
        {
            ansokanDB.Configuration.ProxyCreationEnabled = false;
            return ansokanDB.Ansokan.ToList();
        }
        public IEnumerable<Models.Ansokan> GetStatus(bool status)
        {
            ansokanDB.Configuration.ProxyCreationEnabled = false;

            var ansokans = from item in ansokanDB.Ansokan
                           where item.Fardig == status
                           orderby item.DatumAvVardnadshavare ascending
                           select item;

            return ansokans.ToList();
        }
        public IEnumerable<Models.Ansokan> GetOne(string personnummer)
        {
            ansokanDB.Configuration.ProxyCreationEnabled = false;

            var ansokans = from item in ansokanDB.Ansokan
                           where item.Elevpersonnummer == personnummer.ToLower().Trim()
                           select item;

            return ansokans.ToList();
        }
        public IEnumerable<Models.Ansokan> GetAll(string vardnadshavarepersonnummer)
        {
            ansokanDB.Configuration.ProxyCreationEnabled = false;

            var ansokans = from item in ansokanDB.Ansokan
                           where item.Vardnadshavarepersonnummer == vardnadshavarepersonnummer.ToLower().Trim()
                           select item;

            return ansokans.ToList();
        }

    }
}
