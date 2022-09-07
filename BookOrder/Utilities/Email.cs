using System.ComponentModel;
using System.Net.Mail;

namespace BookOrder.Utilities
{
    public class Email
    {
        private readonly IConfiguration _config;
        public Email(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmail(string email, string subject, string body)
        {
            string smtpServer = _config.GetSection("SmtpServer").GetValue<string>("Main");
            string smtpSecret = _config.GetSection("Secrets").GetValue<string>("SmtpSecret");
            string smtpUser = _config.GetSection("SmtpUsers").GetValue<string>("Main");

            MailAddress to = new MailAddress(email);
            MailAddress from = new MailAddress(smtpUser, "Code Challenge");
            MailMessage mm = new MailMessage(from, to);
            mm.Subject = subject;
            mm.Body = body; //html page
                            //mm.IsBodyHtml

            using (var smtpClient = new SmtpClient(smtpServer))
            {

                smtpClient.Credentials = new System.Net.NetworkCredential(smtpUser, smtpSecret);
                smtpClient.EnableSsl = false;
                await smtpClient.SendMailAsync(mm);
            }
        }

    }
}


