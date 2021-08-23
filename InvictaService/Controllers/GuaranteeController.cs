using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using NAVAccess;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.PixelFormats;
using InvictaService.Models;
using Newtonsoft.Json;

namespace InvictaService.Controllers
{
    public class GuaranteeController : Controller
    {
        private IJSONWebService _JSONWebService;
        private IConfiguration _configuration;

        public GuaranteeController(IJSONWebService JSONWebService, IConfiguration Configuration)
        {
            _JSONWebService = JSONWebService;
            _configuration = Configuration;
        }


        //+++++++++++++++++++++++++++++++++++++

        [HttpPost]
        [Route("[controller]/SetTrackingByGID")]
        public IActionResult setTrackingByGID([FromBody] JsonCancelRequest TrackingByIDInfoJSON)
        {
            string ErrorMessage;
            string ReturnData;

            string json = JsonConvert.SerializeObject(TrackingByIDInfoJSON);
            var GetJsonResult = _JSONWebService.GetJSON("setTrackingByGuaranteeID", json, out ErrorMessage, out ReturnData);
            // JsonCancelResponse response;
            if (GetJsonResult == false || ErrorMessage != "")
            {
                return BadRequest(ErrorMessage);
            }
            else
            {
                return Ok(ReturnData);
            }
        }
        //++++++++++++++++++++++++++++++++++++++++
    }
}
