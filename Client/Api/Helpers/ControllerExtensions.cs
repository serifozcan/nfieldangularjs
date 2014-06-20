using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Client.Api.Helpers
{
    public static class ControllerExtensions
    {
        public static HttpResponseException CreateHttpResponseException(this ApiController controller,
        string message, HttpStatusCode statusCode)
        {
            EnsureNotNull(controller,"controller");

            var responseMessage = new HttpResponseMessage(statusCode)
            {
                Content = new StringContent(message),
                ReasonPhrase = message
            };
            return new HttpResponseException(responseMessage);
        }

        private static void EnsureNotNull(object value, string name)
        {
            if (ReferenceEquals(value, null))
                throw new ArgumentNullException(name);
        }

        public static HttpResponseException CreateHttpResponseException(this ApiController controller,
JObject value, HttpStatusCode statusCode)
        {
            EnsureNotNull(controller, "controller");
            var responseMessage = new HttpResponseMessage(statusCode)
            {
                Content = new ObjectContent(value.GetType(), value, new JsonMediaTypeFormatter()),
                ReasonPhrase = value.ToString(Formatting.None)
            };
            return new HttpResponseException(responseMessage);
        }

        
    }
}