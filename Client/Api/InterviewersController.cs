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
    public class InterviewersController : ApiController
    {
        private readonly HttpClient _httpClient = new HttpClient();

        private string AuthValue
        {
            get
            {
                return Request.Headers.Authorization.ToString().Replace("Basic ", "");
            }
        }

        public async Task<IHttpActionResult> GetAsync([FromUri] string apiUrl)
        {
            _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Basic", AuthValue);
            var response = await _httpClient.GetAsync(string.Format("{0}/{1}", apiUrl, "Interviewers"));

            if (response.StatusCode != HttpStatusCode.OK)
                return BadRequest(response.Content.ToString());

            var json = JToken.Parse(response.Content.ReadAsStringAsync().Result);

            return Ok(json);
        }
    }
}
