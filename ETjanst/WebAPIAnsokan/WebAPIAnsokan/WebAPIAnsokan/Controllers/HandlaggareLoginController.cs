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
    public class HandlaggareLoginController : ApiController
    {
        private AnsokanEntities ansokanDB = new AnsokanEntities();

        // OPTION http-verb handler
        public string OptionsHandlaggareLogin()
        {
            return null; // HTTP 200 response with empty body
        }
        public int Get(string namn, string pass)
        {
            var handlaggare =   from item in ansokanDB.Handlaggare
                                where item.Anvandarnamn == namn.ToLower().Trim()
                                && item.Losenord == pass.ToLower().Trim()
                                select item;

            if (handlaggare.Count() == 0 || handlaggare.Count() >= 2)
            {
                return -1;
            }
            else
            {
                return handlaggare.FirstOrDefault().Id;
            }
        }
    }
}
