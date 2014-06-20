using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json.Linq;

namespace Client.Api
{
    public class SurveysController : ApiController
    {
        private readonly HttpClient _httpClient = new HttpClient();

        private string AuthValue
        {
            get
            {
                return Request.Headers.Authorization.Parameter ?? string.Empty;
            }
        }

        public async Task<IHttpActionResult> GetAsync([FromUri] string apiUrl)
        {
            _httpClient.DefaultRequestHeaders.Authorization = 
                        new AuthenticationHeaderValue("Basic",AuthValue);
            var a = string.Format("{0}/{1}", apiUrl, "Surveys");
            var response = await _httpClient.GetAsync(a);

            return ReturnResponse(response);
        }

        public async Task<IHttpActionResult> GetByIdAsync([FromUri] string apiUrl, [FromUri] string id)
        {

            _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Basic", AuthValue);
            var response = await _httpClient.GetAsync(string.Format("{0}/{1}/{2}", apiUrl, "Surveys",id));

            return ReturnResponse(response);

        }

        private IHttpActionResult ReturnResponse(HttpResponseMessage response)
        {
            if (response.StatusCode != HttpStatusCode.OK)
                return BadRequest(response.Content.ToString());

            var json = JToken.Parse(response.Content.ReadAsStringAsync().Result);

            return Ok(json);
        }

    }
}