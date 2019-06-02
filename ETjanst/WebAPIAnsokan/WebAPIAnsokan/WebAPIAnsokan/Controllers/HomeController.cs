using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//using WebAPIAnsokan.Models;

namespace WebAPIAnsokan.Controllers
{
    public class HomeController : Controller
    {
        //private AnsokanEntities ansokanDB = new AnsokanEntities();
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            //ansokanDB.Configuration.ProxyCreationEnabled = false;
            //ansokanDB.SaveChanges();
            return View();
        }
    }
}
