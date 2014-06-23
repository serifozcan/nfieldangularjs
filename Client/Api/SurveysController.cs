using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using Client.Api.Helpers;
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

        public async Task<HttpResponseMessage> GetAsync([FromUri] string apiUrl)
        {
            _httpClient.DefaultRequestHeaders.Authorization = 
                        new AuthenticationHeaderValue("Basic",AuthValue);
            var a = string.Format("{0}/{1}", apiUrl, "Surveys");
            var response = await _httpClient.GetAsync(a);

            return ReturnResponse(response);
        }
        [HttpGet]
        [ActionName("GetById")]
        public async Task<HttpResponseMessage> GetByIdAsync([FromUri] string apiUrl, [FromUri] string id)
        {

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", AuthValue);
            var response = await _httpClient.GetAsync(string.Format("{0}/{1}/{2}", apiUrl, "Surveys",id));

            return ReturnResponse(response);

        }
        [HttpGet]
        [ActionName("GetFieldworkStatus")]
        public async Task<HttpResponseMessage> GetFieldworkStatusAsync([FromUri] string apiUrl, [FromUri] string id)
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", AuthValue);
            var response =
                await
                    _httpClient.GetAsync(string.Format("{0}/{1}/{2}/{3}/{4}", apiUrl, "Surveys", id, "Fieldwork",
                        "Status"));
            
            return ReturnResponse(response);
        }
        [HttpGet]
        [ActionName("GetSettings")]
        public async Task<HttpResponseMessage> GetSettingsAsync([FromUri] string apiUrl, [FromUri] string id)
        {
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", AuthValue);
            var response =
                await _httpClient.GetAsync(string.Format("{0}/{1}/{2}/{3}", apiUrl, "Surveys", id, "Settings"));

            return ReturnResponse(response);
        }

        private HttpResponseMessage ReturnResponse(HttpResponseMessage response)
        {
            if (response.StatusCode != HttpStatusCode.OK)
                throw this.CreateHttpResponseException(response.ReasonPhrase, response.StatusCode);

            var json = JToken.Parse(response.Content.ReadAsStringAsync().Result);
            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent(json.GetType(), json, new JsonMediaTypeFormatter())
            };
            return result;
        }

    }
}