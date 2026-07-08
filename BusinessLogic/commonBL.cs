using DataAccess.Modals;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace business_logic
{
    public class commonBL
    {
        public void SendEmail(string _to, string _subject, string _mailbody, string _copy, string attachedURl)
        {
            if (_to != null && _to.Trim() != string.Empty && IsValidEmail(_to))
            {
                bool EmailService = bool.Parse(ConfigurationManager.AppSettings["email_isactive"].ToString());

                if (EmailService)
                {
                    MailAddress from = new MailAddress(ConfigurationManager.AppSettings["email_from"].ToString(), ConfigurationManager.AppSettings["email_display_name"].ToString());
                    MailAddress to = new MailAddress(_to, string.Empty);
                    MailMessage _mail = new MailMessage(from, to);
                    _mail.Subject = _subject.Trim();
                    _mail.Body = _mailbody.Trim();
                    _mail.BodyEncoding = Encoding.UTF8;
                    _mail.IsBodyHtml = true;

                    if (_copy != string.Empty)
                    {
                        string[] addrress = new string[] { "" };
                        addrress = _copy.Split(';');

                        for (int i = 0; i < addrress.Length; i++)
                        {
                            if (addrress[i].Trim() != string.Empty)
                                _mail.CC.Add(addrress[i]);
                        }
                    }

                    if (attachedURl != string.Empty)
                    {
                        System.Net.Mail.Attachment attachment;
                        attachment = new System.Net.Mail.Attachment(attachedURl.Trim());
                        _mail.Attachments.Add(attachment);
                    }

                    try
                    {
                        SendEmailInBackgroundThread(_mail);
                    }
                    catch (SmtpException ex1)
                    {
                        Console.WriteLine("SmtpException caught! " + ex1.ToString());
                    }
                    catch (ArgumentException ex2)
                    {
                        Console.WriteLine("ArgumentException caught! " + ex2.ToString());
                    }
                    catch (Exception ex3)
                    {
                        Console.WriteLine("Exception caught! " + ex3.ToString());
                    }
                }
            }
        }

        public object GetBrandsList()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.Brands where data.IsActive == true select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object GetAllBrandsList()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.Brands select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object GetAllCategoriesList()
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("NameEn", typeof(string));
            table.Columns.Add("NameAr", typeof(string));
            table.Columns.Add("IsHasSubCategory", typeof(Boolean));
            table.Columns.Add("SubCategoryies", typeof(ICollection<SubCategory>));
            table.Columns.Add("CreatedOnDate", typeof(DateTime));
            table.Columns.Add("IsActive", typeof(Boolean));
            table.Columns.Add("Url", typeof(string));

            try
            {
                GeneralEntities context = new GeneralEntities();

                var query = (from data in context.Categories
                             select new
                             {
                                 Id = data.Id,
                                 NameEn = data.NameEn,
                                 NameAr = data.NameAr,
                                 Url = data.Url,
                                 IsHasSubCategory = (data.SubCategories.Count > 0) ? true : false,
                                 SubCategoryies = data.SubCategories,
                                 CreatedOnDate = data.CreatedOnDate,
                                 IsActive = data.IsActive
                             }); ;

                foreach (var data in query)
                {
                    table.Rows.Add(data.Id, data.NameEn, data.NameAr, data.IsHasSubCategory, data.SubCategoryies, data.CreatedOnDate, data.IsActive, data.Url);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return table;

        }

        public object get_all_charities()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();

                var query = (from P in context.Charities
                             join D in context.Countries on P.CountryId equals D.CountryId
                             select new
                             {
                                 Id = P.Id,
                                 NameEn = P.NameEn,
                                 NameAr = P.NameAr,
                                 DescriptionEn = P.DescriptionEn,
                                 DescriptionAr = P.DescriptionAr,
                                 IsActive = P.IsActive,
                                 Date = P.CreatedOnDate,
                                 CountryName = D.CountryNameEn,
                                 CountryNameAr = D.CountryNameAr,
                                 CountryId = P.CountryId,
                                 Email = (P.Email == null) ? string.Empty : P.Email,
                                 AddressEn = (P.AddressEn == null) ? string.Empty : P.AddressEn,
                                 AddressAr = (P.AddressAr == null) ? string.Empty : P.AddressAr
                             });

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object get_all_Slaughterhouses()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();

                var query = (from P in context.Slaughterhouses
                             join D in context.Countries on P.CountryId equals D.CountryId
                             select new
                             {
                                 Id = P.Id,
                                 NameEn = P.NameEn,
                                 NameAr = P.NameAr,
                                 DescriptionEn = P.DescriptionEn,
                                 DescriptionAr = P.DescriptionAr,
                                 IsActive = P.IsActive,
                                 Date = P.CreatedOnDate,
                                 CountryName = D.CountryNameEn,
                                 CountryNameAr = D.CountryNameAr,
                                 CountryId = P.CountryId,
                                 Email = (P.Email == null) ? string.Empty : P.Email,
                                 AddressEn = (P.AddressEn == null) ? string.Empty : P.AddressEn,
                                 AddressAr = (P.AddressAr == null) ? string.Empty : P.AddressAr
                             });

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }
        public DataTable GetSubCategories(int categoryId)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("NameEn", typeof(string));
            table.Columns.Add("NameAr", typeof(string));
            try
            {
                GeneralEntities context = new GeneralEntities();

                var query = (from data in context.SubCategories
                             where data.CategoryId == categoryId && data.IsActive == true
                             select new
                             {
                                 Id = data.Id,
                                 NameEn = data.NameEn,
                                 NameAr = data.NameAr
                             }); ;

                foreach (var data in query)
                {
                    table.Rows.Add(data.Id, data.NameEn, data.NameAr);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return table;
        }

        public object GetCountriesList()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.Countries
                             where data.IsActive == true
                             select new
                             {
                                 CountryId = data.CountryId,
                                 CountryNameEn = data.CountryNameEn,
                                 CountryNameAr = data.CountryNameAr,
                                 Alpha_2_code = data.Alpha_2_code,
                                 Alpha_3_code = data.Alpha_3_code,
                                 IsActive = data.IsActive
                             });

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public DataTable GetCategories()
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("NameEn", typeof(string));
            table.Columns.Add("NameAr", typeof(string));
            table.Columns.Add("IsHasSubCategory", typeof(Boolean));
            table.Columns.Add("SubCategoryies", typeof(ICollection<SubCategory>));
            table.Columns.Add("Url", typeof(string));
            try
            {
                GeneralEntities context = new GeneralEntities();

                var query = (from data in context.Categories
                             where data.IsActive == true
                             select new
                             {
                                 Id = data.Id,
                                 NameEn = data.NameEn,
                                 NameAr = data.NameAr,
                                 Url = data.Url,
                                 IsHasSubCategory = (data.SubCategories.Count > 0) ? true : false,
                                 SubCategoryies = data.SubCategories
                             }); ;

                foreach (var data in query)
                {
                    table.Rows.Add(data.Id, data.NameEn, data.NameAr, data.IsHasSubCategory, data.SubCategoryies, data.Url);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return table;
        }
        public object GetStatusesList()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.Statuses select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object GetProductPurposesList()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.ProductPurposes select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object GetBatchesStatusesList()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.Status1 select data).ToList();

                _data = query;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object GetSizesList()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.Sizes select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }


        public object GetColorsList()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.Colors select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object GetAdminSizesList()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.Sizes where data.IsActive == true select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }


        public object GetAdminColorsList()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.Colors where data.IsActive == true select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }
        public object all_sub_categories_by_id(int category_id)
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.SubCategories where data.CategoryId == category_id select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object GetCitiesList(int _countryid)
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from Lookups_Cities in context.Cities
                             where
                               Lookups_Cities.IsActive == true &&
                               Lookups_Cities.CountryId == _countryid
                             select new
                             {
                                 CityId = Lookups_Cities.CityId,
                                 CityNameEn = Lookups_Cities.CityNameEn,
                                 CityNameAr = Lookups_Cities.CityNameAr,
                                 CountryId = Lookups_Cities.CountryId,
                                 IsActive = Lookups_Cities.IsActive
                             });

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object all_cities_by_id(int country_id)
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.Cities where data.CountryId == country_id select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }
        public object get_contact_us_address()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.ContactUsChannels where data.IsActive == true select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }
        public object get_faqs()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.FAQs where data.IsActive == true select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }
        public object get_contact_us_people_ask()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.ContactUsPeopleAsks where data.IsActive == true select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }
        public object get_all_contact_us_people_ask()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.ContactUsPeopleAsks select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }
        public object get_about_us()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.AboutUs where data.IsActive == true select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object get_terms_of_use()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.TermAndConditions where data.IsActive == true select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }
        public object get_privacy_policy()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.PrivacyPolicies where data.IsActive == true select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object get_cancellation_policy()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.CancellationPolicies where data.IsActive == true select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object get_our_services()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.OurServices where data.IsActive == true select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object get_all_faqs()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.FAQs select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public void send_contact_us_message(string[] contact_info)
        {
            try
            {
                if (contact_info[0].Trim() != string.Empty &&
                    contact_info[1].Trim() != string.Empty &&
                    contact_info[2].Trim() != string.Empty &&
                    contact_info[3].Trim() != string.Empty)
                {
                    GeneralEntities context = new GeneralEntities();
                    ContactU obj = new ContactU();
                    obj.UserName = contact_info[0].Trim();
                    obj.Email = contact_info[1].Trim();
                    obj.Mobile = contact_info[2].Trim();
                    obj.Message = contact_info[3].Trim();
                    obj.Date = DateTime.Now;
                    context.ContactUs.Add(obj);
                    context.SaveChanges();
                }

                string path = HttpContext.Current.Server.MapPath("~/assets/emails/contact_us.html");

                if (File.Exists(path))
                {
                    string readText = File.ReadAllText(path);
                    readText = readText.Replace("@Name", contact_info[2].Trim());
                    readText = readText.Replace("@Message", contact_info[3].Trim());
                    SendEmail(contact_info[0].Trim(), "Kabshak | Contact us", readText, string.Empty, string.Empty);
                }

                UsersEntities context2 = new UsersEntities();
                var query = (from U in context2.Users
                             where
                               U.IsActive == true
                               && U.IsAdmin == true
                             select new
                             {
                                 Email = U.Email
                             });

                foreach (var data in query)
                {
                    path = HttpContext.Current.Server.MapPath("~/assets/emails/admin/ContactUs.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        readText = readText.Replace("@Email", data.Email);
                        readText = readText.Replace("@Clientemail", contact_info[0].Trim());
                        readText = readText.Replace("@Phone", contact_info[1].Trim());
                        readText = readText.Replace("@Fullname", contact_info[2].Trim());
                        readText = readText.Replace("@Message", contact_info[3].Trim());
                        SendEmail(data.Email, "Kabshak | Contact us Message", readText, string.Empty, string.Empty);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void chnage_sub_category_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.SubCategories.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void chnage_city_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Cities.SingleOrDefault(d => d.CityId == id);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }
        public void chnage_status_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Statuses.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void chnage_status_activation_productpurposes(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.ProductPurposes.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void chnage_size_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Sizes.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void chnage_country_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Countries.SingleOrDefault(d => d.CountryId == id);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void chnage_color_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Colors.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void chnage_FAQs_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.FAQs.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.IsActive = status;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void chnage_ContactUsPeopleAsk_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.ContactUsPeopleAsks.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.IsActive = status;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void chnage_brand_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Brands.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void chnage_category_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Categories.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void add_brand_info(string user_token, string name_en, string name_ar, string description_en, string description_ar, string url)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                Brand obj = new Brand();
                obj.NameEn = name_en.Trim();
                obj.NameAr = name_ar.Trim();
                obj.DescriptionEn = description_en.Trim();
                obj.DescriptionAr = description_ar.Trim();
                obj.Url = url;
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.Brands.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void edit_category_info(int id, string user_token, string name_en, string name_ar, string url)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Categories.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.NameEn = name_en.Trim();
                    record.NameAr = name_ar.Trim();
                    record.Url = url.Trim();
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }
        public void chnage_slaughterhouse_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Slaughterhouses.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModById = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void chnage_Charity_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Charities.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModById = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public object GetBrandById(int _id)
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.Brands where data.Id == _id select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }
        public object generate_login_authentication(int id, string user_token)
        {
            var _data = new object();

            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Charities.SingleOrDefault(d => d.Id == id);

                Random rnd = new Random();
                string username = (record.NameEn.Trim().Replace(" ", "_") + rnd.Next(9999).ToString() + "@kabshak.com").ToLower();
                string password = CreatePassword(10);

                if (record != null)
                {
                    record.Username = username;
                    record.Password = GetHashingId(password.Trim());
                    record.LastModById = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }

                string path = HttpContext.Current.Server.MapPath("~/assets/emails/login_authentication.html");

                if (File.Exists(path))
                {
                    string readText = File.ReadAllText(path);
                    readText = readText.Replace("@username", username.Trim());
                    readText = readText.Replace("@password", password.Trim());
                    SendEmail(record.Email, "Kabshak | Login Authentication", readText, string.Empty, string.Empty);
                }

                String[] authentication = { username, password };

                _data = authentication.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object generate_login_slaughterhouse_authentication(int id, string user_token)
        {
            var _data = new object();

            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Slaughterhouses.SingleOrDefault(d => d.Id == id);

                Random rnd = new Random();
                string username = (record.NameEn.Trim().Replace(" ", "_") + rnd.Next(9999).ToString() + "@kabshak.com").ToLower();
                string password = CreatePassword(10);

                if (record != null)
                {
                    record.Username = username;
                    record.Password = GetHashingId(password.Trim());
                    record.LastModById = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }

                string path = HttpContext.Current.Server.MapPath("~/assets/emails/login_authentication.html");

                if (File.Exists(path))
                {
                    string readText = File.ReadAllText(path);
                    readText = readText.Replace("@username", username.Trim());
                    readText = readText.Replace("@password", password.Trim());
                    SendEmail(record.Email, "Kabshak | Login Authentication", readText, string.Empty, string.Empty);
                }

                String[] authentication = { username, password };

                _data = authentication.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public string CreatePassword(int length)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }

            return res.ToString();
        }

        public void edit_sub_category_info(int id, string user_token, string name_en, string name_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.SubCategories.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.NameEn = name_en.Trim();
                    record.NameAr = name_ar.Trim();
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void edit_city_info(int id, string user_token, string name_en, string name_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Cities.SingleOrDefault(d => d.CityId == id);

                if (record != null)
                {
                    record.CityNameEn = name_en.Trim();
                    record.CityNameAr = name_ar.Trim();
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }
        public void edit_status_info(int id, string user_token, string name_en, string name_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Statuses.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.NameEn = name_en.Trim();
                    record.NameAr = name_ar.Trim();
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }
        public void edit_productpurposes_info(int id, string user_token, string name_en, string name_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.ProductPurposes.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.NameEn = name_en.Trim();
                    record.NameAr = name_ar.Trim();
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }
        public void edit_size_info(int id, string user_token, string name_en, string name_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Sizes.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.NameEn = name_en.Trim();
                    record.NameAr = name_ar.Trim();
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }
        public void edit_country_info(int id, string user_token, string name_en, string name_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Countries.SingleOrDefault(d => d.CountryId == id);

                if (record != null)
                {
                    record.CountryNameEn = name_en.Trim();
                    record.CountryNameAr = name_ar.Trim();
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void edit_color_info(int id, string user_token, string code)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Colors.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.Code = code.Trim();
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void subscribe_email(string email)
        {
            try
            {
                if (email.Trim() != string.Empty)
                {
                    GeneralEntities context = new GeneralEntities();
                    if (!context.SubscribedEmails.Any(o => o.Email == email.Trim()))
                    {
                        SubscribedEmail obj = new SubscribedEmail();
                        obj.Email = email.Trim();
                        obj.IsActive = true;
                        obj.Date = DateTime.Now;
                        context.SubscribedEmails.Add(obj);
                        context.SaveChanges();
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void SendEmailInBackgroundThread(MailMessage mailMessage)
        {
            try
            {
                Thread bgThread = new Thread(new ParameterizedThreadStart(SendEmail));
                bgThread.IsBackground = true;
                bgThread.Start(mailMessage);
            }
            catch (SmtpException ex1)
            {
                Console.WriteLine("SmtpException caught! " + ex1.ToString());
            }
            catch (ArgumentException ex2)
            {
                Console.WriteLine("ArgumentException caught! " + ex2.ToString());
            }
            catch (Exception ex3)
            {
                Console.WriteLine("Exception caught! " + ex3.ToString());
            }
        }

        public void add_category_info(string user_token, string name_en, string name_ar, string url)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                Category obj = new Category();
                obj.NameEn = name_en.Trim();
                obj.NameAr = name_ar.Trim();
                obj.Url = url.Trim();
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.Categories.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void add_sub_category_info(string user_token, int category_id, string name_en, string name_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                SubCategory obj = new SubCategory();
                obj.CategoryId = category_id;
                obj.NameEn = name_en.Trim();
                obj.NameAr = name_ar.Trim();
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.SubCategories.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void add_city_info(string user_token, int country_id, string name_en, string name_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                City obj = new City();
                obj.CountryId = country_id;
                obj.CityNameEn = name_en.Trim();
                obj.CityNameAr = name_ar.Trim();
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.Cities.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }
        public void add_productpurposes_info(string user_token, string name_en, string name_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                ProductPurpos obj = new ProductPurpos();
                obj.NameEn = name_en.Trim();
                obj.NameAr = name_ar.Trim();
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.ProductPurposes.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }
        public void add_status_info(string user_token, string name_en, string name_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                Status obj = new Status();
                obj.NameEn = name_en.Trim();
                obj.NameAr = name_ar.Trim();
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.Statuses.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void add_size_info(string user_token, string name_en, string name_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                Size obj = new Size();
                obj.NameEn = name_en.Trim();
                obj.NameAr = name_ar.Trim();
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.Sizes.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void add_countries_info(string user_token, string name_en, string name_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                Country obj = new Country();
                obj.CountryNameEn = name_en.Trim();
                obj.CountryNameAr = name_ar.Trim();
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.Countries.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void add_faqs_question_info(string user_token, string name_en, string name_ar, string answer_en, string answer_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                FAQ obj = new FAQ();
                obj.TitleEn = name_en.Trim();
                obj.TitleAr = name_ar.Trim();
                obj.DescriptionEn = answer_en.Trim();
                obj.DescriptionAr = answer_ar.Trim();
                obj.IsActive = true;
                obj.CreatedOnDate = DateTime.Now;
                context2.FAQs.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void edit_faqs_question_info(int id, string user_token, string name_en, string name_ar, string answer_en, string answer_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.FAQs.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.TitleEn = name_en.Trim();
                    record.TitleAr = name_ar.Trim();
                    record.DescriptionEn = answer_en.Trim();
                    record.DescriptionAr = answer_ar.Trim();
                    record.IsActive = true;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void add_contact_us_people_ask_info(string user_token, string name_en, string name_ar, string answer_en, string answer_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                ContactUsPeopleAsk obj = new ContactUsPeopleAsk();
                obj.TitleEn = name_en.Trim();
                obj.TitleAr = name_ar.Trim();
                obj.DescriptionEn = answer_en.Trim();
                obj.DescriptionAr = answer_ar.Trim();
                obj.IsActive = true;
                obj.CreatedOnDate = DateTime.Now;
                context2.ContactUsPeopleAsks.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void edit_contact_us_people_ask_info(int id, string user_token, string name_en, string name_ar, string answer_en, string answer_ar)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.ContactUsPeopleAsks.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.TitleEn = name_en.Trim();
                    record.TitleAr = name_ar.Trim();
                    record.DescriptionEn = answer_en.Trim();
                    record.DescriptionAr = answer_ar.Trim();
                    record.IsActive = true;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void edit_brand_info(int id, string user_token, string name_en, string name_ar, string description_en, string description_ar, string url)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Brands.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.NameEn = name_en.Trim();
                    record.NameAr = name_ar.Trim();
                    record.DescriptionEn = description_en.Trim();
                    record.DescriptionAr = description_ar.Trim();
                    record.Url = (url.Trim() == string.Empty) ? record.Url : url.Trim();
                    record.LastModByID = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void add_color_info(string user_token, string code)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                Color obj = new Color();
                obj.Code = code.Trim();
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.Colors.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public object GetCountriesList(string txt, string active, string inactive, string start, string end)
        {
            var result = new object();

            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = context.GetCountriesList(txt, int.Parse(active), int.Parse(inactive), int.Parse(start), int.Parse(end));

                result = query;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return result;
        }

        public void add_charity_info(string user_token, string name_en, string name_ar, string description_en, string description_ar, int countryid, string address_en, string address_ar, string email)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                Charity obj = new Charity();
                obj.NameEn = name_en.Trim();
                obj.NameAr = name_ar.Trim();
                obj.DescriptionEn = description_en.Trim();
                obj.DescriptionAr = description_ar.Trim();
                obj.CountryId = countryid;
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                obj.Email = email.Trim();
                obj.AddressEn = address_en.Trim();
                obj.AddressAr = address_ar.Trim();
                context2.Charities.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void add_slaughterhouse_info(string user_token, string name_en, string name_ar, string description_en, string description_ar, int countryid, string address_en, string address_ar, string email)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                Slaughterhouse obj = new Slaughterhouse();
                obj.NameEn = name_en.Trim();
                obj.NameAr = name_ar.Trim();
                obj.DescriptionEn = description_en.Trim();
                obj.DescriptionAr = description_ar.Trim();
                obj.CountryId = countryid;
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                obj.Email = email.Trim();
                obj.AddressEn = address_en.Trim();
                obj.AddressAr = address_ar.Trim();
                context2.Slaughterhouses.Add(obj);
                context2.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }
        public void SendEmail(Object mailMsg)
        {
            MailMessage mailMessage = (MailMessage)mailMsg;
            try
            {
                SmtpClient _client = new SmtpClient(ConfigurationManager.AppSettings["email_smtp"].ToString(), int.Parse(ConfigurationManager.AppSettings["email_port"].ToString()));
                System.Net.NetworkCredential _basicCredential1 = new
                System.Net.NetworkCredential(ConfigurationManager.AppSettings["email_username"].ToString(), ConfigurationManager.AppSettings["email_password"].ToString());

                bool enableSsl = true;
                if (ConfigurationManager.AppSettings["email_ssl"] != null)
                {
                    bool.TryParse(ConfigurationManager.AppSettings["email_ssl"].ToString(), out enableSsl);
                }
                _client.EnableSsl = enableSsl;
                _client.UseDefaultCredentials = false;
                _client.Credentials = _basicCredential1;

                _client.Send(mailMessage);
            }
            catch (SmtpException ex1)
            {
                Console.WriteLine("SmtpException caught! " + ex1.ToString());
            }
            catch (ArgumentException ex2)
            {
                Console.WriteLine("ArgumentException caught! " + ex2.ToString());
            }
            catch (Exception ex3)
            {
                Console.WriteLine("Exception caught! " + ex3.ToString());
            }
        }

        public void edit_charity_info(int id, string user_token, string name_en, string name_ar, string description_en, string description_ar, string address_en, string address_ar, string email)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Charities.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.NameEn = name_en.Trim();
                    record.NameAr = name_ar.Trim();
                    record.DescriptionEn = description_en.Trim();
                    record.DescriptionAr = description_ar.Trim();
                    record.IsActive = true;
                    record.LastModById = userid;
                    record.LastModOnDate = DateTime.Now;
                    record.Email = email.Trim();
                    record.AddressEn = address_en.Trim();
                    record.AddressAr = address_ar.Trim();
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void edit_slaughterhouse_info(int id, string user_token, string name_en, string name_ar, string description_en, string description_ar, string address_en, string address_ar, string email)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.Slaughterhouses.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.NameEn = name_en.Trim();
                    record.NameAr = name_ar.Trim();
                    record.DescriptionEn = description_en.Trim();
                    record.DescriptionAr = description_ar.Trim();
                    record.IsActive = true;
                    record.LastModById = userid;
                    record.LastModOnDate = DateTime.Now;
                    record.Email = email.Trim();
                    record.AddressEn = address_en.Trim();
                    record.AddressAr = address_ar.Trim();
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public bool IsValidEmail(string email)
        {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false;
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }

        public string GetToken()
        {
            var allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            var resultToken = new string(
               Enumerable.Repeat(allChar, 8)
               .Select(token => token[random.Next(token.Length)]).ToArray());

            string authToken = resultToken.ToString();

            return authToken;
        }

        public string GetHashingId(string Id)
        {
            return BCrypt.Net.BCrypt.HashPassword(Id.Trim() + "^Kabsh~net", BCrypt.Net.BCrypt.GenerateSalt());
        }

        public string GetObjectValue(object data, string property)
        {
            var nameOfProperty = property;
            var propertyInfo = data.GetType().GetProperty(nameOfProperty);
            var value = propertyInfo.GetValue(data, null);
            if (value == null)
                value = string.Empty;
            return value.ToString();
        }
        public bool IsArabic()
        {
            bool val = false;

            if (HttpContext.Current.Request.Cookies["language"] != null)
            {
                var value = HttpContext.Current.Request.Cookies["language"].Value;
                if (value.Trim().ToLower() == "ar")
                {
                    val = true;
                }
            }

            return val;
        }

        protected string EnryptString(string stringvalue)
        {
            stringvalue = "_SK*" + stringvalue;
            System.Text.Encoding encoding = System.Text.Encoding.Unicode;
            Byte[] stringBytes = encoding.GetBytes(stringvalue);
            StringBuilder sbBytes = new StringBuilder(stringBytes.Length * 2);
            foreach (byte b in stringBytes)
            {
                sbBytes.AppendFormat("{0:X2}", b);
            }
            return sbBytes.ToString();
        }

        public string log_in_by_auth(string username, string password)
        {
            string status = string.Empty;

            if (username.Trim() == string.Empty || password.Trim() == string.Empty)
            {
                status = "Invalid inputs value!";
                return status;
            }

            if (!IsValidEmail(username.Trim()))
            {
                status = "Invalid username format!";
                return status;
            }

            try
            {
                GeneralEntities context = new GeneralEntities();

                if (!context.Charities.Any(o => o.Username == username.Trim() && o.IsActive == true) && !context.Slaughterhouses.Any(o => o.Username == username.Trim() && o.IsActive == true))
                {
                    status = "The username is not registered or is deactivated in the system!";
                }
                else
                {
                    if (context.Charities.Any(o => o.Username == username.Trim() && o.IsActive == true))
                    {
                        string _db_password = string.Empty;
                        var query = from e in context.Charities
                                    where e.Username == username.Trim() && e.IsActive == true
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
                                status = "The password is incorrect, try again or reset your password!";
                            }
                        }
                    }
                    else if (context.Slaughterhouses.Any(o => o.Username == username.Trim() && o.IsActive == true))
                    {
                        string _db_password = string.Empty;
                        var query = from e in context.Slaughterhouses
                                    where e.Username == username.Trim() && e.IsActive == true
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
                                status = "The password is incorrect, try again or reset your password!";
                            }
                        }
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

        public object get_auth_by_username(string username)
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();

                if (context.Charities.Any(o => o.Username == username.Trim() && o.IsActive == true))
                {
                    var query = (from P in context.Charities
                                 join D in context.Countries on P.CountryId equals D.CountryId
                                 where
                                    P.Username == username
                                 select new
                                 {
                                     Id = P.Id,
                                     NameEn = P.NameEn,
                                     NameAr = P.NameAr,
                                     DescriptionEn = P.DescriptionEn,
                                     DescriptionAr = P.DescriptionAr,
                                     IsActive = P.IsActive,
                                     Date = P.CreatedOnDate,
                                     CountryName = D.CountryNameEn,
                                     CountryNameAr = D.CountryNameAr,
                                     CountryId = P.CountryId,
                                     Email = (P.Email == null) ? string.Empty : P.Email,
                                     AddressEn = (P.AddressEn == null) ? string.Empty : P.AddressEn,
                                     AddressAr = (P.AddressAr == null) ? string.Empty : P.AddressAr,
                                     Profile_Type = "Charity"
                                 });

                    foreach (var data in query)
                    {
                        _data = data;
                    }
                }
                else if (context.Slaughterhouses.Any(o => o.Username == username.Trim() && o.IsActive == true))
                {
                    var query = (from P in context.Slaughterhouses
                                 join D in context.Countries on P.CountryId equals D.CountryId
                                 where
                                   P.Username == username
                                 select new
                                 {
                                     Id = P.Id,
                                     NameEn = P.NameEn,
                                     NameAr = P.NameAr,
                                     DescriptionEn = P.DescriptionEn,
                                     DescriptionAr = P.DescriptionAr,
                                     IsActive = P.IsActive,
                                     Date = P.CreatedOnDate,
                                     CountryName = D.CountryNameEn,
                                     CountryNameAr = D.CountryNameAr,
                                     CountryId = P.CountryId,
                                     Email = (P.Email == null) ? string.Empty : P.Email,
                                     AddressEn = (P.AddressEn == null) ? string.Empty : P.AddressEn,
                                     AddressAr = (P.AddressAr == null) ? string.Empty : P.AddressAr,
                                     Profile_Type = "Slaughterhouse"
                                 });

                    foreach (var data in query)
                    {
                        _data = data;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public string App_Verion_Is_Required_Update(string type, string version)
        {
            string _data = "false";
            try
            {
                GeneralEntities context = new GeneralEntities();

                if (context.AppVersions.Any(o => o.Type == type.Trim() && o.Version == version && o.IsRequiredUpdate == true))
                {
                    _data = "true";
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public object GetPromoCodesList()
        {
            var _data = new object();
            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.PromoCodes select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public void chnage_code_activation_status(int id, string user_token, bool status)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities context2 = new GeneralEntities();

                var record = context2.PromoCodes.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.IsActive = status;
                    record.LastModByid = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }


        public void add_code_info(string user_token, DateTime startDate, DateTime endDate, string code, int discount, int fixPrice, int minInvoice)
        {
            try
            {
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                GeneralEntities product_context = new GeneralEntities();

                PromoCode obj = new PromoCode();
                obj.Code = code;
                obj.StartDate = startDate;
                obj.EndDate = endDate;
                obj.Discount = discount;
                obj.FixValue = fixPrice;
                obj.MinInvoice = minInvoice;
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                product_context.PromoCodes.Add(obj);
                product_context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }


        public void edit_code_info(int id, string user_token, DateTime startDate, DateTime endDate, string code, int discount, int fixPrice, int minInvoice)
        {
            try
            {
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));
                GeneralEntities product_context = new GeneralEntities();
                var record = product_context.PromoCodes.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    record.Code = code;
                    record.StartDate = startDate;
                    record.EndDate = endDate;
                    record.Discount = discount;
                    record.FixValue = fixPrice;
                    record.MinInvoice = minInvoice;

                    record.LastModByid = userid;
                    record.LastModOnDate = DateTime.Now;
                    product_context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public object get_promo_code_id(string code)
        {
            var _data = new object();

            try
            {
                GeneralEntities context = new GeneralEntities();
                var query = (from data in context.PromoCodes where data.Code == code select data);

                _data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _data;
        }

        public void update_charity_firebase_token(int charityid, string firebase_token)
        {
            try
            {
                GeneralEntities context = new GeneralEntities();
                var Charity = context.Charities.SingleOrDefault(d => d.Id == charityid);

                Charity.FirebaseToken = firebase_token;
                Charity.LastModOnDate = DateTime.Now;

                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            };
        }

        public void update_slaughterhouse_firebase_token(int slaughterhouseid, string firebase_token)
        {
            try
            {
                GeneralEntities context = new GeneralEntities();
                var Slaughterhouse = context.Slaughterhouses.SingleOrDefault(d => d.Id == slaughterhouseid);

                Slaughterhouse.FirebaseToken = firebase_token;
                Slaughterhouse.LastModOnDate = DateTime.Now;

                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            };
        }
    }
}
