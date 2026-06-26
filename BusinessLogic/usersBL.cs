using business_logic;
using DataAccess.Modals;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BusinessLogic
{
    public class usersBL : commonBL
    {
        private static Random random = new Random();

        public string sign_up_by_email(string email, string password)
        {
            string status = string.Empty;

            if (email.Trim() == string.Empty || password.Trim() == string.Empty)
            {

                status = IsArabic() ? "قيمة المدخلات غير صالحة!" : "Invalid inputs value!";
                return status;
            }

            if (!IsValidEmail(email.Trim()))
            {
                status = IsArabic() ? "تنسيق البريد الإلكتروني غير صحيح!" : "Invalid email format!";
                return status;
            }

            if (password.Trim().Length < 8)
            {
                status = IsArabic() ? "يجب ألا تقل كلمة المرور عن 8 أحرف!" : "Password length should not be less than 8 characters!";
                return status;
            }

            try
            {
                UsersEntities context = new UsersEntities();
                if (!context.Users.Any(o => o.Email == email.Trim()))
                {
                    User obj = new User();
                    obj.Email = email.Trim();
                    obj.Password = GetHashingId(password.Trim());
                    obj.Token = GetHashingId(GetToken());
                    obj.IsActive = true;
                    obj.CreatedOnDate = DateTime.Now;
                    context.Users.Add(obj);
                    context.SaveChanges();

                    string path = HttpContext.Current.Server.MapPath("~/assets/emails/welcome.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        SendEmail(email.Trim(), "Kabshak | Welcome to join us", readText, string.Empty, string.Empty);
                    }

                    var query = (from U in context.Users
                                 where
                                   U.IsActive == true
                                   && U.IsAdmin == true
                                 select new
                                 {
                                     Email = U.Email
                                 });

                    foreach (var data in query)
                    {
                        path = HttpContext.Current.Server.MapPath("~/assets/emails/admin/RegisteredUser.html");

                        if (File.Exists(path))
                        {
                            string readText = File.ReadAllText(path);
                            readText = readText.Replace("@Email", data.Email);
                            readText = readText.Replace("@Username", email.Trim());
                            SendEmail(data.Email, "Kabshak | A new user has been registered", readText, string.Empty, string.Empty);
                        }
                    }
                }
                else
                {
                    status = IsArabic() ? "عنوان البريد الإلكتروني مسجل بالفعل في النظام!" : "The email address is already registered in the system!";
                };
            }
            catch (Exception ex)
            {
                status = "Exception caught! " + ex.ToString();
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return status;
        }

        public bool IsAuthorizedToken(string token)
        {
            bool IsValid = false;
            try
            {
                UsersEntities context = new UsersEntities();

                if (context.AuthTokens.Any(o => (o.Token).ToString() == token.Trim()))
                {
                    IsValid = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return IsValid;
        }

        public object get_user_by_email(string email)
        {
            var _data = new object();
            try
            {
                UsersEntities context = new UsersEntities();
                var query = from e in context.Users
                            join d in context.UsersDetails on e.Id equals d.Id into dept
                            from details in dept.DefaultIfEmpty()
                            where e.Email == email.Trim() && e.IsActive == true
                            select new
                            {
                                UserId = e.Id,
                                Email = e.Email,
                                Token = e.Token,
                                FirebaseToken = e.FirebaseToken,
                                FacebookId = e.FacebookId,
                                FirstName = details.FirstName,
                                LastName = details.LastName,
                                Address = details.Address,
                                Mobile = details.Mobile,
                                Code = details.Code,
                                AnotherEmail = details.Email,
                                IsAdmin = e.IsAdmin
                            };

                foreach (var data in query)
                {
                    _data = data;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object get_user_by_token(string token)
        {
            var _data = new object();
            try
            {
                UsersEntities context = new UsersEntities();
                var query = from e in context.Users
                            join d in context.UsersDetails on e.Id equals d.Id into dept
                            from details in dept.DefaultIfEmpty()
                            where e.Token == token.Trim()
                            && e.IsActive == true
                            select new
                            {
                                UserId = e.Id,
                                Email = e.Email,
                                Token = e.Token,
                                FirebaseToken = e.FirebaseToken,
                                FacebookId = e.FacebookId,
                                FirstName = details.FirstName,
                                LastName = details.LastName,
                                Address = details.Address,
                                Mobile = details.Mobile,
                                Code = details.Code,
                                AnotherEmail = details.Email,
                                BillingAddresses = e.BillingAddresses,
                                ShippingAddresses = e.ShippingAddresses,
                                IsAdmin = e.IsAdmin
                            };

                foreach (var data in query)
                {
                    _data = data;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public string reset_your_password_mobile(string email)
        {
            string status = string.Empty;

            if (email.Trim() == string.Empty)
            {
                status = IsArabic() ? "إدخال البريد الإلكتروني غير صحيح!" : "Invalid email input!";
                return status;
            }

            if (!IsValidEmail(email.Trim()))
            {
                status = IsArabic() ? "تنسيق بريد إلكتروني غير صالح!" : "Invalid email format!";
                return status;
            }

            try
            {
                UsersEntities context = new UsersEntities();

                if (context.Users.Any(o => o.Email == email.Trim()))
                {
                    if (context.ResetPasswordVerifyCodes.Any(o => o.Email == email.Trim()))
                    {
                        var records = (from data in context.ResetPasswordVerifyCodes where data.Email == email.Trim() select data);
                        foreach (var item in records)
                        {
                            context.ResetPasswordVerifyCodes.Remove(item);
                        }
                        context.SaveChanges();
                    }

                    Random rnd = new Random();
                    int value = rnd.Next(100000, 999999);
                    ResetPasswordVerifyCode obj = new ResetPasswordVerifyCode();
                    obj.Email = email.Trim();
                    obj.Code = value;
                    obj.CreatedOnDate = DateTime.Now;
                    context.ResetPasswordVerifyCodes.Add(obj);
                    context.SaveChanges();

                    string path = HttpContext.Current.Server.MapPath("~/assets/emails/reset_passowrd_mobile.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        readText = readText.Replace("@resetlink", value.ToString());
                        SendEmail(email.Trim(), "Kabshak | Forgot Your Password?", readText, string.Empty, string.Empty);
                    }
                }
                else
                {
                    status = IsArabic() ? "عنوان البريد الإلكتروني غير مسجل في النظام!" : "The email address is not registered in the system!";
                }
            }
            catch (Exception ex)
            {
                status = "Exception caught! " + ex.ToString();
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return status;
        }

        public string[] change_password_mobile(int _code, string password)
        {
            string[] status = new string[2];

            if (_code <= 0)
            {
                status[0] = IsArabic() ? "مدخلات غير صالحة!" : "Invalid inputs values!";
                return status;
            }

            if (password.Trim().Length < 8)
            {
                status[0] = IsArabic() ? "يجب ألا تقل كلمة المرور عن 8 أحرف!" : "Password length should not be less than 8 characters!";
                return status;
            }

            try
            {
                UsersEntities context = new UsersEntities();
                if (!context.ResetPasswordVerifyCodes.Any(o => o.Code == _code))
                {
                    status[0] = IsArabic() ? "تم استخدام رمز إعادة تعيين كلمة المرور أو انتهت صلاحيته ، لذا يرجى نسيان كلمة المرور مرة أخرى من نموذج تسجيل الدخول!" : "The reset password code was used or expired, so please forget your password again from the login form!";
                }
                else
                {
                    string _email = string.Empty;
                    var result = context.ResetPasswordVerifyCodes.FirstOrDefault(b => b.Code == _code);

                    if (result != null)
                    {
                        _email = result.Email;
                        status[1] = result.Email;
                    }

                    string _db_password = GetHashingId(password.Trim());

                    var record = context.Users.FirstOrDefault(d => d.Email == _email);

                    if (record != null)
                    {
                        record.Password = _db_password;
                        context.ResetPasswordVerifyCodes.Remove(result);
                        context.SaveChanges();

                        string path = HttpContext.Current.Server.MapPath("~/assets/emails/changed_passowrd.html");

                        if (File.Exists(path))
                        {
                            string readText = File.ReadAllText(path);
                            SendEmail(_email.Trim(), "Kabshak | Your password has been changed", readText, string.Empty, string.Empty);
                        }
                    }
                };
            }
            catch (Exception ex)
            {
                status[0] = "Exception caught! " + ex.ToString();
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return status;
        }

        public string reset_your_password(string email)
        {
            string status = string.Empty;

            if (email.Trim() == string.Empty)
            {
                status = IsArabic() ? "إدخال البريد الإلكتروني غير صحيح!" : "Invalid email input!";
                return status;
            }

            if (!IsValidEmail(email.Trim()))
            {
                status = IsArabic() ? "تنسيق بريد إلكتروني غير صالح!" : "Invalid email format!";
                return status;
            }

            try
            {
                UsersEntities context = new UsersEntities();
                if (context.Users.Any(o => o.Email == email.Trim()))
                {
                    if (context.ResetPasswordTokens.Any(o => o.Email == email.Trim()))
                    {
                        var records = (from data in context.ResetPasswordTokens where data.Email == email.Trim() select data);
                        foreach (var item in records)
                        {
                            context.ResetPasswordTokens.Remove(item);
                        }
                        context.SaveChanges();
                    }
                    string _token = GetHashingId(GetToken());
                    ResetPasswordToken obj = new ResetPasswordToken();
                    obj.Email = email.Trim();
                    obj.Token = _token;
                    obj.CreatedOnDate = DateTime.Now;
                    context.ResetPasswordTokens.Add(obj);
                    context.SaveChanges();

                    string path = HttpContext.Current.Server.MapPath("~/assets/emails/reset_passowrd.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        readText = readText.Replace("@resetlink", "https://localhost:44346/reset-password?token=" + _token);
                        SendEmail(email.Trim(), "Kabshak | Forgot Your Password?", readText, string.Empty, string.Empty);
                    }
                }
                else
                {
                    status = IsArabic() ? "عنوان البريد الإلكتروني غير مسجل في النظام!" : "The email address is not registered in the system!";
                }
            }
            catch (Exception ex)
            {
                status = "Exception caught! " + ex.ToString();
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return status;
        }

        public object get_user_by_token_mobile(string token)
        {
            var _data = new object();
            try
            {
                UsersEntities context = new UsersEntities();
                var query = from e in context.Users
                            join d in context.UsersDetails on e.Id equals d.Id into dept
                            from details in dept.DefaultIfEmpty()
                            join a in context.BillingAddresses on e.Id equals a.UserId into address
                            from billing in address.DefaultIfEmpty()
                            where e.Token == token.Trim()
                            && e.IsActive == true
                            select new
                            {
                                UserId = e.Id,
                                Email = e.Email,
                                Token = e.Token,
                                FirebaseToken = e.FirebaseToken,
                                FacebookId = e.FacebookId,
                                FirstName = details.FirstName,
                                LastName = details.LastName,
                                Mobile = details.Mobile,
                                Code = details.Code,
                                AnotherEmail = details.Email,
                                Billing_Address_CityId = billing.CityId,
                                Billing_Address_CityNameEn = billing.City.CityNameEn,
                                Billing_Address_CityNameAr = billing.City.CityNameAr,
                                Billing_Address_CountryId = billing.City.CountryId,
                                Billing_Address_CountryNameEn = billing.City.Country.CountryNameEn,
                                Billing_Address_CountryNameAr = billing.City.Country.CountryNameAr,
                                Billing_Address_ApartmentNo = billing.ApartmentNo,
                                Billing_Address_Block = billing.Block,
                                Billing_Address_HouseNo = billing.HouseNo,
                                Billing_Address_Street = billing.Street,
                                Billing_Address_Town = billing.Town
                            };

                foreach (var data in query)
                {
                    _data = data;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public string[] change_password(string token, string password)
        {
            string[] status = new string[2];

            if (token.Trim() == string.Empty || password.Trim() == string.Empty)
            {
                status[0] = IsArabic() ? "مدخلات غير صالحة!" : "Invalid inputs values!";
                return status;
            }

            if (password.Trim().Length < 8)
            {
                status[0] = IsArabic() ? "يجب ألا تقل كلمة المرور عن 8 أحرف!" : "Password length should not be less than 8 characters!";
                return status;
            }

            try
            {
                UsersEntities context = new UsersEntities();
                if (!context.ResetPasswordTokens.Any(o => o.Token == token.Trim()))
                {
                    status[0] = IsArabic() ? "تم استخدام رمز إعادة تعيين كلمة المرور أو انتهت صلاحيته ، لذا يرجى نسيان كلمة المرور مرة أخرى من نموذج تسجيل الدخول!" : "The reset password token was used or expired, so please forget your password again from the login form!";
                }
                else
                {
                    string _email = string.Empty;
                    var result = context.ResetPasswordTokens.FirstOrDefault(b => b.Token == token);

                    if (result != null)
                    {
                        _email = result.Email;
                        status[1] = result.Email;
                    }

                    string _db_password = GetHashingId(password.Trim());

                    var record = context.Users.FirstOrDefault(d => d.Email == _email);

                    if (record != null)
                    {
                        record.Password = _db_password;
                        context.ResetPasswordTokens.Remove(result);
                        context.SaveChanges();

                        string path = HttpContext.Current.Server.MapPath("~/assets/emails/changed_passowrd.html");

                        if (File.Exists(path))
                        {
                            string readText = File.ReadAllText(path);
                            SendEmail(_email.Trim(), "Kabshak | Your password has been changed", readText, string.Empty, string.Empty);
                        }
                    }
                };
            }
            catch (Exception ex)
            {
                status[0] = "Exception caught! " + ex.ToString();
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return status;
        }

        public void log_in_by_gmail(string email, string id)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                if (!context.Users.Any(o => o.Email == email.Trim()))
                {
                    User obj = new User();
                    obj.Email = email.Trim();
                    obj.Password = GetHashingId(id.Trim());
                    obj.Token = GetHashingId(GetToken());
                    obj.IsActive = true;
                    obj.CreatedOnDate = DateTime.Now;
                    context.Users.Add(obj);
                    context.SaveChanges();

                    string path = HttpContext.Current.Server.MapPath("~/assets/emails/welcome.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        SendEmail(email.Trim(), "Kabshak | Welcome to join us", readText, string.Empty, string.Empty);
                    }

                    var query = (from U in context.Users
                                 where
                                   U.IsActive == true
                                   && U.IsAdmin == true
                                 select new
                                 {
                                     Email = U.Email
                                 });

                    foreach (var data in query)
                    {
                        path = HttpContext.Current.Server.MapPath("~/assets/emails/admin/RegisteredUser.html");

                        if (File.Exists(path))
                        {
                            string readText = File.ReadAllText(path);
                            readText = readText.Replace("@Email", data.Email);
                            readText = readText.Replace("@Username", email.Trim());
                            SendEmail(data.Email, "Kabshak | A new user has been registered", readText, string.Empty, string.Empty);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void log_in_by_apple(string email, string id)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                if (!context.Users.Any(o => o.Email == email.Trim()))
                {
                    User obj = new User();
                    obj.Email = email.Trim();
                    obj.Password = GetHashingId(id.Trim());
                    obj.Token = GetHashingId(GetToken());
                    obj.IsActive = true;
                    obj.CreatedOnDate = DateTime.Now;
                    context.Users.Add(obj);
                    context.SaveChanges();

                    string path = HttpContext.Current.Server.MapPath("~/assets/emails/welcome.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        SendEmail(email.Trim(), "Kabshak | Welcome to join us", readText, string.Empty, string.Empty);
                    }

                    var query = (from U in context.Users
                                 where
                                   U.IsActive == true
                                   && U.IsAdmin == true
                                 select new
                                 {
                                     Email = U.Email
                                 });

                    foreach (var data in query)
                    {
                        path = HttpContext.Current.Server.MapPath("~/assets/emails/admin/RegisteredUser.html");

                        if (File.Exists(path))
                        {
                            string readText = File.ReadAllText(path);
                            readText = readText.Replace("@Email", data.Email);
                            readText = readText.Replace("@Username", email.Trim());
                            SendEmail(data.Email, "Kabshak | A new user has been registered", readText, string.Empty, string.Empty);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public object get_user_info_by_facebookId(string id)
        {
            var _data = new object();
            try
            {
                UsersEntities context = new UsersEntities();
                var query = from e in context.Users
                            join d in context.UsersDetails on e.Id equals d.Id into dept
                            from details in dept.DefaultIfEmpty()
                            where e.FacebookId == id.Trim()
                            && e.IsActive == true
                            select new
                            {
                                UserId = e.Id,
                                Email = e.Email,
                                Token = e.Token,
                                FacebookId = e.FacebookId,
                                FirebaseToken = e.FirebaseToken,
                                FirstName = details.FirstName,
                                LastName = details.LastName,
                                Address = details.Address,
                                Mobile = details.Mobile,
                                Code = details.Code,
                                AnotherEmail = details.Email,
                                IsAdmin = e.IsAdmin
                            };

                foreach (var data in query)
                {
                    _data = data;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public void ChangeUserInfo(string email, string firstname, string lastname, string number, string code, int userid)
        {
            try
            {
                UsersEntities context = new UsersEntities();

                if (!context.UsersDetails.Any(o => o.User.Id == userid))
                {
                    UsersDetail iUsers_UsersDetails = new UsersDetail
                    {
                        Id = userid,
                        FirstName = firstname,
                        LastName = lastname,
                        Mobile = number,
                        Code = code,
                        Address = string.Empty,
                        Email = email,
                        CreatedById = userid,
                        CreatedOnDate = DateTime.Now
                    };
                    context.UsersDetails.Add(iUsers_UsersDetails);
                    context.SaveChanges();

                }
                else
                {
                    var queryUsers_UsersDetails =
                                            from Users_UsersDetails in context.UsersDetails
                                            where
                                              Users_UsersDetails.Id == userid
                                            select Users_UsersDetails;
                    foreach (var Users_UsersDetails in queryUsers_UsersDetails)
                    {
                        Users_UsersDetails.FirstName = firstname;
                        Users_UsersDetails.LastName = lastname;
                        Users_UsersDetails.Mobile = number;
                        Users_UsersDetails.Code = code;
                        Users_UsersDetails.Email = email;
                        Users_UsersDetails.LastModById = userid;
                        Users_UsersDetails.LastModOnDate = DateTime.Now;
                    }
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void billingaddress(string town, string block, string street, int house, int apartment, int paci, int cityid, int userid)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                if (!context.BillingAddresses.Any(o => o.UserId == userid))
                {
                    BillingAddress obj = new BillingAddress();
                    obj.UserId = userid;
                    obj.CityId = cityid;
                    obj.Town = town;
                    obj.Block = block;
                    obj.Street = street;
                    obj.HouseNo = house;
                    obj.ApartmentNo = apartment;
                    obj.PaciNo = paci;
                    obj.CreatedById = userid;
                    obj.CreatedOndate = DateTime.Now;
                    context.BillingAddresses.Add(obj);
                    context.SaveChanges();
                }
                else
                {
                    var queryUsers_BillingAddress =
                     from Users_BillingAddress in context.BillingAddresses
                     where
                       Users_BillingAddress.UserId == userid
                     select Users_BillingAddress;

                    foreach (var Users_BillingAddress in queryUsers_BillingAddress)
                    {
                        Users_BillingAddress.CityId = cityid;
                        Users_BillingAddress.Town = town;
                        Users_BillingAddress.Block = block;
                        Users_BillingAddress.Street = street;
                        Users_BillingAddress.HouseNo = house;
                        Users_BillingAddress.ApartmentNo = apartment;
                        Users_BillingAddress.PaciNo = paci;
                        Users_BillingAddress.LastModById = userid;
                        Users_BillingAddress.LastModOnDate = DateTime.Now;
                    }

                    context.SaveChanges();
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void mobile_billingaddress(string town, string block, string street, int house, int apartment, int cityid, string token)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.FirstOrDefault(d => d.Token == token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                if (!context.BillingAddresses.Any(o => o.UserId == userid))
                {
                    BillingAddress obj = new BillingAddress();
                    obj.UserId = userid;
                    obj.CityId = cityid;
                    obj.Town = town;
                    obj.Block = block;
                    obj.Street = street;
                    obj.HouseNo = house;
                    obj.ApartmentNo = apartment;
                    obj.PaciNo = 0;
                    obj.CreatedById = userid;
                    obj.CreatedOndate = DateTime.Now;
                    context.BillingAddresses.Add(obj);
                    context.SaveChanges();
                }
                else
                {
                    var queryUsers_BillingAddress =
                     from Users_BillingAddress in context.BillingAddresses
                     where
                       Users_BillingAddress.UserId == userid
                     select Users_BillingAddress;

                    foreach (var Users_BillingAddress in queryUsers_BillingAddress)
                    {
                        Users_BillingAddress.CityId = cityid;
                        Users_BillingAddress.Town = town;
                        Users_BillingAddress.Block = block;
                        Users_BillingAddress.Street = street;
                        Users_BillingAddress.HouseNo = house;
                        Users_BillingAddress.ApartmentNo = apartment;
                        Users_BillingAddress.PaciNo = 0;
                        Users_BillingAddress.LastModById = userid;
                        Users_BillingAddress.LastModOnDate = DateTime.Now;
                    }

                    context.SaveChanges();
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }
        public object GetUserList(string txt, string _active, string _inactive, string _admin, string _start, string _end)
        {
            var result = new object();

            try
            {
                UsersEntities context = new UsersEntities();
                var query = context.GetUsersList(txt, int.Parse(_active), int.Parse(_inactive), int.Parse(_admin), int.Parse(_start), int.Parse(_end));

                result = query;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return result;
        }

        public void chnage_activation_status(string token, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.FirstOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                var record = context.Users.FirstOrDefault(d => d.Token == token);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModById = userid;
                    record.LastModOnDate = DateTime.Now;
                    context.SaveChanges();
                }


                string path = HttpContext.Current.Server.MapPath("~/assets/emails/" + (status ? "activate_user" : "deactivate_user") + ".html");

                if (File.Exists(path))
                {
                    string readText = File.ReadAllText(path);
                    SendEmail(record.Email.Trim(), "Kabshak | Account Activation", readText, string.Empty, string.Empty);
                }

                var query = (from U in context.Users
                             where
                               U.IsActive == true
                               && U.IsAdmin == true
                             select new
                             {
                                 Email = U.Email
                             });

                foreach (var data in query)
                {
                    path = HttpContext.Current.Server.MapPath("~/assets/emails/admin/AccountActivation.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        readText = readText.Replace("@Email", data.Email);
                        readText = readText.Replace("@Id", record.Id.ToString());
                        readText = readText.Replace("@Useremail", record.Email);
                        readText = readText.Replace("@Activated", (status) ? "Activated" : "Deactivated");
                        SendEmail(data.Email, "Kabshak | Account Activation", readText, string.Empty, string.Empty);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void save_auth_token(Guid token)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                AuthToken _authToken = new AuthToken
                {
                    Token = token,
                    CreatedOnDate = DateTime.Now
                };
                context.AuthTokens.Add(_authToken);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void MobileChangeUserInfo(string email, string firstname, string lastname, string number, string code, string token)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.FirstOrDefault(d => d.Token == token);
                if (!context.UsersDetails.Any(o => o.User.Id == User.Id))
                {
                    UsersDetail iUsers_UsersDetails = new UsersDetail
                    {
                        Id = User.Id,
                        FirstName = firstname,
                        LastName = lastname,
                        Mobile = number,
                        Code = code,
                        Address = string.Empty,
                        Email = email,
                        CreatedById = User.Id,
                        CreatedOnDate = DateTime.Now
                    };
                    context.UsersDetails.Add(iUsers_UsersDetails);
                    context.SaveChanges();

                }
                else
                {
                    var queryUsers_UsersDetails =
                                            from Users_UsersDetails in context.UsersDetails
                                            where
                                              Users_UsersDetails.Id == User.Id
                                            select Users_UsersDetails;
                    foreach (var Users_UsersDetails in queryUsers_UsersDetails)
                    {
                        Users_UsersDetails.FirstName = firstname;
                        Users_UsersDetails.LastName = lastname;
                        Users_UsersDetails.Mobile = number;
                        Users_UsersDetails.Code = code;
                        Users_UsersDetails.Email = email;
                        Users_UsersDetails.LastModById = User.Id;
                        Users_UsersDetails.LastModOnDate = DateTime.Now;
                    }
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void delete_user_account(string user_token)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.FirstOrDefault(d => d.Token == user_token);
                User.IsActive = false;
                User.Email = RandomString(10) + "@kabshak.com";
                User.FacebookId = "000";
                User.LastModById = User.Id;
                User.LastModOnDate = DateTime.Now;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public void update_user_firebase_token(string user_token, string firebase_token)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.FirstOrDefault(d => d.Token == user_token);
                User.FirebaseToken = firebase_token;
                User.LastModById = User.Id;
                User.LastModOnDate = DateTime.Now;
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public string changepassword(string oldP, string newP, int userid)
        {
            string status = string.Empty;

            if (newP.Trim() == string.Empty || oldP.Trim() == string.Empty)
            {
                status = "Invalid inputs value!";
                return status;
            }

            if (newP.Trim().Length < 8 || newP.Trim().Length > 15)
            {
                status = IsArabic() ? "يجب ألا تقل كلمة المرور عن 8 أحرف!" : "Password length should be between 8 - 15 characters!";
                return status;
            }

            try
            {
                UsersEntities context = new UsersEntities();
                string _db_password = string.Empty;
                var query = from e in context.Users
                            where e.Id == userid && e.IsActive == true
                            select new
                            {
                                Password = e.Password
                            };
                foreach (var data in query)
                {
                    _db_password = data.Password;
                }

                if (!BCrypt.Net.BCrypt.Verify(oldP + "^Kabsh~net", _db_password))
                {
                    status = IsArabic() ? "كلمة المرور غير صحيحة ، حاول مرة أخرى أو أعد تعيين كلمة المرور الخاصة بك!" : "The password is incorrect, try again or reset your password!";
                }
                else
                {
                    string new_password = GetHashingId(newP.Trim());

                    var record = context.Users.FirstOrDefault(d => d.Id == userid);

                    if (record != null)
                    {
                        record.Password = new_password;
                        context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                status = "Exception caught! " + ex.ToString();
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return status;
        }

        public void chnage_admin_status(string token, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.FirstOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                var record = context.Users.FirstOrDefault(d => d.Token == token);

                if (record != null)
                {
                    record.IsAdmin = status;
                    record.LastModById = userid;
                    record.LastModOnDate = DateTime.Now;
                    context.SaveChanges();
                }

                string path = HttpContext.Current.Server.MapPath("~/assets/emails/" + (status ? "add_system_administrator" : "remove_system_administrator") + ".html");

                if (File.Exists(path))
                {
                    string readText = File.ReadAllText(path);
                    SendEmail(record.Email.Trim(), "Kabshak | System Administrator", readText, string.Empty, string.Empty);
                }

                var query = (from U in context.Users
                             where
                               U.IsActive == true
                               && U.IsAdmin == true
                             select new
                             {
                                 Email = U.Email
                             });

                foreach (var data in query)
                {
                    path = HttpContext.Current.Server.MapPath("~/assets/emails/admin/admin.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        readText = readText.Replace("@Email", data.Email);
                        readText = readText.Replace("@Id", record.Id.ToString());
                        readText = readText.Replace("@Useremail", record.Email);
                        readText = readText.Replace("@added", (status) ? "added" : "removed");
                        readText = readText.Replace("to the below", (status) ? "to the below" : "from the below");
                        SendEmail(data.Email, "Kabshak | System Administrator", readText, string.Empty, string.Empty);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void shippingaddress(string town, string block, string street, int house, int apartment, int paci, int cityid, int userid)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                if (!context.ShippingAddresses.Any(o => o.UserId == userid))
                {
                    ShippingAddress obj = new ShippingAddress();
                    obj.UserId = userid;
                    obj.CityId = cityid;
                    obj.Town = town;
                    obj.Block = block;
                    obj.Street = street;
                    obj.HouseNo = house;
                    obj.ApartmentNo = apartment;
                    obj.PaciNo = paci;
                    obj.CreatedById = userid;
                    obj.CreatedOndate = DateTime.Now;
                    context.ShippingAddresses.Add(obj);
                    context.SaveChanges();
                }
                else
                {
                    var queryUsers_ShippingAddress =
                  from Users_ShippingAddress in context.ShippingAddresses
                  where
                    Users_ShippingAddress.UserId == userid
                  select Users_ShippingAddress;
                    foreach (var Users_ShippingAddress in queryUsers_ShippingAddress)
                    {
                        Users_ShippingAddress.CityId = cityid;
                        Users_ShippingAddress.Town = town;
                        Users_ShippingAddress.Block = block;
                        Users_ShippingAddress.Street = street;
                        Users_ShippingAddress.HouseNo = house;
                        Users_ShippingAddress.ApartmentNo = apartment;
                        Users_ShippingAddress.PaciNo = paci;
                        Users_ShippingAddress.LastModById = userid;
                        Users_ShippingAddress.LastModOnDate = DateTime.Now;
                    }
                    context.SaveChanges();
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void log_in_by_fb(string email, string first_name, string last_name, string id)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                if (!context.Users.Any(o => o.FacebookId == id.Trim()))
                {
                    User obj = new User();
                    obj.Email = first_name.Trim() + " " + last_name.Trim();
                    obj.Password = GetHashingId(id.Trim());
                    obj.Token = GetHashingId(GetToken());
                    obj.IsActive = true;
                    obj.FacebookId = id.Trim();
                    obj.CreatedOnDate = DateTime.Now;
                    context.Users.Add(obj);
                    context.SaveChanges();

                    var query = (from U in context.Users
                                 where
                                   U.IsActive == true
                                   && U.IsAdmin == true
                                 select new
                                 {
                                     Email = U.Email
                                 });

                    foreach (var data in query)
                    {
                        string path = HttpContext.Current.Server.MapPath("~/assets/emails/admin/RegisteredUser.html");

                        if (File.Exists(path))
                        {
                            string readText = File.ReadAllText(path);
                            readText = readText.Replace("@Email", data.Email);
                            readText = readText.Replace("@Username", first_name.Trim() + " " + last_name.Trim() + " / Facebook");
                            SendEmail(data.Email, "Kabshak | A new user has been registered", readText, string.Empty, string.Empty);
                        }
                    }
                }

                var userid = context.Users.FirstOrDefault(d => d.FacebookId == id);

                if (!context.UsersDetails.Any(d => d.Id == userid.Id))
                {
                    UsersDetail obj2 = new UsersDetail();
                    obj2.Id = userid.Id;
                    obj2.Email = email.Trim();
                    obj2.FirstName = first_name.Trim();
                    obj2.LastName = last_name.Trim();
                    obj2.CreatedById = userid.Id;
                    obj2.CreatedOnDate = DateTime.Now;
                    context.UsersDetails.Add(obj2);
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public string log_in_by_email(string email, string password)
        {
            string status = string.Empty;

            if (email.Trim() == string.Empty || password.Trim() == string.Empty)
            {
                status = IsArabic() ? "" : "Invalid inputs value!";
                return status;
            }

            if (!IsValidEmail(email.Trim()))
            {
                status = IsArabic() ? "قيمة المدخلات غير صحيحة!" : "Invalid email format!";
                return status;
            }

            try
            {
                UsersEntities context = new UsersEntities();
                if (!context.Users.Any(o => o.Email == email.Trim()))
                {
                    status = IsArabic() ? "عنوان البريد الإلكتروني غير مسجل في النظام!" : "The email address is not registered in the system!";
                }
                else
                {
                    string _db_password = string.Empty;
                    var query = from e in context.Users
                                where e.Email == email.Trim() && e.IsActive == true
                                select new
                                {
                                    Password = e.Password
                                };

                    foreach (var data in query)
                    {
                        _db_password = data.Password;
                    }

                    if (_db_password != string.Empty)
                    {
                        if (!BCrypt.Net.BCrypt.Verify(password + "^Kabsh~net", _db_password))
                        {
                            status = IsArabic() ? "كلمة المرور غير صحيحة ، حاول مرة أخرى أو أعد تعيين كلمة المرور الخاصة بك!" : "The password is incorrect, try again or reset your password!";
                        }
                    }
                    else
                    {
                        status = IsArabic() ? "الحساب معطل ، يرجى الاتصال بفريق الدعم باستخدام صفحة اتصل بنا." : "The account is deactivated, please contact our support team using the Contact Us page.";
                    }
                };
            }
            catch (Exception ex)
            {
                status = "Exception caught! " + ex.ToString();
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return status;
        }

        public string mobile_changepassword(string oldP, string newP, string token)
        {

            string status = string.Empty;

            if (newP.Trim() == string.Empty || oldP.Trim() == string.Empty)
            {
                status = "Invalid inputs value!";
                return status;
            }

            if (newP.Trim().Length < 8 || newP.Trim().Length > 15)
            {
                status = IsArabic() ? "يجب ألا تقل كلمة المرور عن 8 أحرف!" : "Password length should be between 8 - 15 characters!";
                return status;
            }

            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.FirstOrDefault(d => d.Token == token);
                int userid = int.Parse(GetObjectValue(User, "Id"));
                string _db_password = string.Empty;
                var query = from e in context.Users
                            where e.Id == userid && e.IsActive == true
                            select new
                            {
                                Password = e.Password
                            };
                foreach (var data in query)
                {
                    _db_password = data.Password;
                }

                if (!BCrypt.Net.BCrypt.Verify(oldP + "^Kabsh~net", _db_password))
                {
                    status = IsArabic() ? "كلمة المرور غير صحيحة ، حاول مرة أخرى أو أعد تعيين كلمة المرور الخاصة بك!" : "The password is incorrect, try again or reset your password!";
                }
                else
                {
                    string new_password = GetHashingId(newP.Trim());

                    var record = context.Users.FirstOrDefault(d => d.Id == userid);

                    if (record != null)
                    {
                        record.Password = new_password;
                        context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                status = "Exception caught! " + ex.ToString();
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return status;
        }
    }
}
