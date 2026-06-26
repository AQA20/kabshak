using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic
{
    public class FirebaseService
    {
        public async Task<object> Push_Notification(string title, string description, string firebase_token, string user_token, int orderId, string UserType)
        {
            try
            {
                if (FirebaseApp.DefaultInstance == null)
                {
                    FirebaseApp.Create(new AppOptions()
                    {
                        Credential = GoogleCredential.FromFile(System.Configuration.ConfigurationManager.AppSettings["FirebaseFile"].ToString().Trim())
                    });
                }

                var notification = new FirebaseAdmin.Messaging.Notification
                {
                    Title = title,
                    Body = description,
                };

                var message = new FirebaseAdmin.Messaging.Message()
                {
                    Data = new Dictionary<string, string>()
                        {
                            { "User_Id", user_token.ToString() },
                            { "Order_ID", orderId.ToString() },
                            { "UserType", UserType.ToString() },
                            { "Date", DateTime.Now.ToString("dddd, dd MMMM yyyy") },
                        },
                    Notification = notification,
                    Token = firebase_token,
                    Apns = new FirebaseAdmin.Messaging.ApnsConfig
                    {
                        Aps = new FirebaseAdmin.Messaging.Aps { Sound = "true" }
                    }
                };

                var messaging = FirebaseAdmin.Messaging.FirebaseMessaging.DefaultInstance;

                var result = await messaging.SendAsync(message);

                return result;

            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.InnerException.Message);
            }
        }
    }
}
