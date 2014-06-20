using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Client.Api.Models
{
    public class SignInCredentials
    {
        [Required]
        public string ApiUrl { get; set; }
        [Required]
        public string Domain { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}