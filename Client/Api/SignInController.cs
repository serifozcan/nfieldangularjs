using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Client.Api.Models;
using Client.Api.Helpers;
using System.Net.Http.Formatting;


namespace Client.Api
{
    public class SignInController : ApiController
    {
        public async Task<HttpResponseMessage> PostAsync([FromBody] SignInCredentials credentials)
        {
            // check if model state is valid
            if (!ModelState.IsValid)
            {
                throw this.CreateHttpResponseException("Model is not valid",HttpStatusCode.BadRequest);
            }

            var authToken = string.Empty;
            var httpClient = new HttpClient();

            // connecting to Nfield Public API
            var response =
                await
                    httpClient.PostAsJsonAsync(string.Format("{0}/{1}", credentials.ApiUrl, "SignIn"),
                        new { credentials.Domain, credentials.Username, credentials.Password });

            // if response is not ok then return
            if (response.StatusCode != HttpStatusCode.OK)
                throw this.CreateHttpResponseException(response.ReasonPhrase, response.StatusCode);

            IEnumerable<string> headerValues;
            if (response.Headers.TryGetValues("X-AuthenticationToken", out headerValues))
                authToken = headerValues.First();

            var returnObject = new {AuthenticationToken = authToken};

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ObjectContent(returnObject.GetType(), returnObject, new JsonMediaTypeFormatter())
            };

            return result;

        }
    }
}
