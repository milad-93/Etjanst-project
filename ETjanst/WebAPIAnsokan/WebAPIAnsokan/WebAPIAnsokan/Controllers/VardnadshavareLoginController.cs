﻿using System;
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
    public class VardnadshavareLoginController : ApiController
    {
        private AnsokanEntities ansokanDB = new AnsokanEntities();

        public string Get(string namn, string pass)
        {
            var vardnadshavare = from item in ansokanDB.Vardnadshavare
                                 where item.Anvandarnamn == namn.ToLower().Trim()
                                 && item.Losenord == pass.ToLower().Trim()
                                 select item;

            if (vardnadshavare.Count() == 0 || vardnadshavare.Count() >= 2)
            {
                return "-1";
            }
            else
            {
                return vardnadshavare.FirstOrDefault().Vardnadshavarepersonnummer;
            }
        }
    }
}