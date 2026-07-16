using business_logic;
using BusinessLogic;
using Entities;
using GemBox.Spreadsheet;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using System.Web.Configuration;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Xml;
using System.Xml.Linq;
using vape;

namespace web.api
{
    [WebService(Namespace = "")]
    [WebServiceBinding(ConformsTo = WsiProfiles.None)]
    [System.ComponentModel.ToolboxItem(false)]
    public class products : System.Web.Services.WebService
    {
        productsBL _productsBL = new productsBL();
        usersBL _usersBL = new usersBL();

        public bool IsAuthorized(string token)
        {
            if (token == string.Empty)
            {
                token = (Session["AuthServiceToken"] != null) ? Session["AuthServiceToken"].ToString().Trim() : token;
            }

            if (token == string.Empty)
                return false;
            else
                return _usersBL.IsAuthorizedToken(token);
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_products_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); 
                
                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _brands = HttpContext.Current.Request["brands"].ToString();
                string _min = "-1";
                string _max = "-1";
                string _categories = HttpContext.Current.Request["categories"].ToString();
                string _start = HttpContext.Current.Request["start"].ToString();
                string _end = HttpContext.Current.Request["end"].ToString();
                string _sort = HttpContext.Current.Request["sort"].ToString();
                string _currency = HttpContext.Current.Request["currency"].ToString();
                string _txt = "-1";
                string _subcategories = "-1";
                string _usertoken = HttpContext.Current.Request["usertoken"].ToString();
                string _newarrival = HttpContext.Current.Request["newarrival"].ToString();
                string _onsale = "-1";

                string country = "-1";
                // Currency should not filter out donate items by a hardcoded country.
                // However, passing "-1" causes the SP to filter for 'countries IS NULL', hiding them.
                // Passing "jordan" ensures the current donate items are returned regardless of currency.
                if (_newarrival == "1")
                {
                    country = "jordan";
                }

                DataTable data = _productsBL.GetProductsList(_brands, _min, _max, _categories, _start, _end, _sort, _currency, _txt, _subcategories, _usertoken, _newarrival, _onsale, country);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_admin_batch_products_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _brands = HttpContext.Current.Request["brands"].ToString();
                string _categories = HttpContext.Current.Request["categories"].ToString();
                string _start = HttpContext.Current.Request["start"].ToString();
                string _end = HttpContext.Current.Request["end"].ToString();
                string _subcategories = HttpContext.Current.Request["subcategories"].ToString();
                string _usertoken = HttpContext.Current.Request["usertoken"].ToString();
                int _charityId = int.Parse(HttpContext.Current.Request["charityid"].ToString());
                int _delivery = int.Parse(HttpContext.Current.Request["delivery"].ToString());

                DataTable data = _productsBL.GetAvailableBatchProductsList(_brands, _categories, _start, _end, _subcategories, _usertoken, _charityId, _delivery);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void save_product_countries()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString();

                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string countries = HttpContext.Current.Request["countries"].ToString().ToLower();

                _productsBL.save_product_countries(token, user_token, countries);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void generate_new_batch()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _brands = HttpContext.Current.Request["brands"].ToString();
                string _categories = HttpContext.Current.Request["categories"].ToString();
                string _subcategories = HttpContext.Current.Request["subcategories"].ToString();
                string _usertoken = HttpContext.Current.Request["usertoken"].ToString();
                int _charityId = int.Parse(HttpContext.Current.Request["charityid"].ToString());
                int _slaughterhouseId = int.Parse(HttpContext.Current.Request["slaughterhouseId"].ToString());
                int _quantity = int.Parse(HttpContext.Current.Request["quantity"].ToString());
                int _delivery = int.Parse(HttpContext.Current.Request["delivery"].ToString());

                string status = _productsBL.GenerateBatch(_brands, _categories, _subcategories, _usertoken, _charityId, _slaughterhouseId, _quantity, _delivery);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(status));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_admin_products_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _brands = HttpContext.Current.Request["brands"].ToString();
                string _min = HttpContext.Current.Request["min"].ToString();
                string _max = HttpContext.Current.Request["max"].ToString();
                string _categories = HttpContext.Current.Request["categories"].ToString();
                string _start = HttpContext.Current.Request["start"].ToString();
                string _end = HttpContext.Current.Request["end"].ToString();
                string _sort = HttpContext.Current.Request["sort"].ToString();
                string _currency = HttpContext.Current.Request["currency"].ToString();
                string _txt = HttpContext.Current.Request["txt"].ToString();
                string _subcategories = HttpContext.Current.Request["subcategories"].ToString();
                string _usertoken = HttpContext.Current.Request["usertoken"].ToString();
                string _newarrival = HttpContext.Current.Request["newarrival"].ToString();
                string _onsale = HttpContext.Current.Request["onsale"].ToString();

                DataTable data = _productsBL.GetAdminProductsList(_brands, _min, _max, _categories, _start, _end, _sort, _currency, _txt, _subcategories, _usertoken, _newarrival, _onsale);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_admin_batch_items()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int BatchId = int.Parse(HttpContext.Current.Request["searchBatchId"].ToString());
                int _start = int.Parse(HttpContext.Current.Request["start"].ToString());
                int _end = int.Parse(HttpContext.Current.Request["end"].ToString());

                var data = _productsBL.GetAdminBatchItems(BatchId, _start, _end);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_product_sub_categories()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string main_token = HttpContext.Current.Request["main_token"].ToString();

                DataTable data = _productsBL.get_product_sub_categories(main_token);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void export_admin_batch_items()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int BatchId = int.Parse(HttpContext.Current.Request["searchBatchId"].ToString());
                int _start = int.Parse(HttpContext.Current.Request["start"].ToString());
                int _end = int.Parse(HttpContext.Current.Request["end"].ToString());

                DataTable data = _productsBL.ExportAdminBatchItems(BatchId, _start, _end);

                SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");
                var workbook = new ExcelFile();
                var worksheet = workbook.Worksheets.Add("Batch Items");
                worksheet.Cells[0, 0].Value = "Batch Items List:";
                worksheet.InsertDataTable(data,
                    new InsertDataTableOptions()
                    {
                        ColumnHeaders = true
                    });
                string filename = "Batch_No_" + BatchId.ToString() + "_" + DateTime.Now.ToString("yyyy-dd-M--HH-mm-ss") + ".xlsx";
                string path = HttpContext.Current.Server.MapPath("~/assets/excel/") + filename;
                workbook.Save(path);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject("/assets/excel/" + filename));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_admin_orders_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string statuses = HttpContext.Current.Request["statuses"].ToString();
                int OrderId = int.Parse(HttpContext.Current.Request["searchOrderId"].ToString());
                DateTime searchDate = DateTime.ParseExact("01/01/1950", "dd/MM/yyyy", null);
                int hasDate = -1;

                if (HttpContext.Current.Request["searchDate"].ToString() != "-1")
                {
                    searchDate = DateTime.ParseExact(HttpContext.Current.Request["searchDate"].ToString(), "dd/MM/yyyy", null);
                    hasDate = 1;
                }

                int _start = int.Parse(HttpContext.Current.Request["start"].ToString());
                int _end = int.Parse(HttpContext.Current.Request["end"].ToString());

                string _promoCode = HttpContext.Current.Request["searchPromoText"] != null ? HttpContext.Current.Request["searchPromoText"].ToString().Trim() : "-1";

                DataTable data = _productsBL.GetAdminOrdersList(statuses, OrderId, hasDate, searchDate, _start, _end, _promoCode);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void export_admin_orders_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string statuses = HttpContext.Current.Request["statuses"].ToString();
                int OrderId = int.Parse(HttpContext.Current.Request["searchOrderId"].ToString());
                DateTime searchDate = DateTime.ParseExact("01/01/1950", "dd/MM/yyyy", null);
                int hasDate = -1;

                if (HttpContext.Current.Request["searchDate"].ToString() != "-1")
                {
                    searchDate = DateTime.ParseExact(HttpContext.Current.Request["searchDate"].ToString(), "dd/MM/yyyy", null);
                    hasDate = 1;
                }

                int _start = int.Parse(HttpContext.Current.Request["start"].ToString());
                int _end = int.Parse(HttpContext.Current.Request["end"].ToString());

                string _promoCode = HttpContext.Current.Request["searchPromoText"] != null ? HttpContext.Current.Request["searchPromoText"].ToString().Trim() : "-1";

                DataTable data = _productsBL.GetAdminOrdersList(statuses, OrderId, hasDate, searchDate, _start, _end, _promoCode);

                SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");
                var workbook = new ExcelFile();
                var worksheet = workbook.Worksheets.Add("Orders");
                worksheet.Cells[0, 0].Value = "Orders List:";
                worksheet.InsertDataTable(data,
                    new InsertDataTableOptions()
                    {
                        ColumnHeaders = true
                    });
                string filename = DateTime.Now.ToString("yyyy-dd-M--HH-mm-ss") + ".xlsx";
                string path = HttpContext.Current.Server.MapPath("~/assets/excel/") + filename;
                workbook.Save(path);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject("/assets/excel/" + filename));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_admin_batches_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string statuses = HttpContext.Current.Request["statuses"].ToString();

                int BatchId = int.Parse(HttpContext.Current.Request["searchBatchId"].ToString());

                int OrderId = int.Parse(HttpContext.Current.Request["searchOrderId"].ToString());

                int SlaughterhouseId = int.Parse(HttpContext.Current.Request["searchSlaughterhouseId"].ToString());

                int CharityId = int.Parse(HttpContext.Current.Request["searchCharityId"].ToString());

                DateTime searchDate = DateTime.ParseExact("01/01/1950", "dd/MM/yyyy", null);
                int hasDate = -1;

                if (HttpContext.Current.Request["searchDate"].ToString() != "-1")
                {
                    searchDate = DateTime.ParseExact(HttpContext.Current.Request["searchDate"].ToString(), "dd/MM/yyyy", null);
                    hasDate = 1;
                }

                int _start = int.Parse(HttpContext.Current.Request["start"].ToString());
                int _end = int.Parse(HttpContext.Current.Request["end"].ToString());

                var data = _productsBL.GetAdminBatchesList(statuses, BatchId, OrderId, hasDate, searchDate, SlaughterhouseId, CharityId, _start, _end);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void export_admin_batches_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string statuses = HttpContext.Current.Request["statuses"].ToString();

                int BatchId = int.Parse(HttpContext.Current.Request["searchBatchId"].ToString());

                int OrderId = int.Parse(HttpContext.Current.Request["searchOrderId"].ToString());

                int SlaughterhouseId = int.Parse(HttpContext.Current.Request["searchSlaughterhouseId"].ToString());

                int CharityId = int.Parse(HttpContext.Current.Request["searchCharityId"].ToString());

                DateTime searchDate = DateTime.ParseExact("01/01/1950", "dd/MM/yyyy", null);
                int hasDate = -1;

                if (HttpContext.Current.Request["searchDate"].ToString() != "-1")
                {
                    searchDate = DateTime.ParseExact(HttpContext.Current.Request["searchDate"].ToString(), "dd/MM/yyyy", null);
                    hasDate = 1;
                }

                int _start = int.Parse(HttpContext.Current.Request["start"].ToString());
                int _end = int.Parse(HttpContext.Current.Request["end"].ToString());

                DataTable data = _productsBL.ExportAdminBatchesList(statuses, BatchId, OrderId, hasDate, searchDate, SlaughterhouseId, CharityId, _start, _end);

                SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");
                var workbook = new ExcelFile();
                var worksheet = workbook.Worksheets.Add("Batches");
                worksheet.Cells[0, 0].Value = "Batches List:";
                worksheet.InsertDataTable(data,
                    new InsertDataTableOptions()
                    {
                        ColumnHeaders = true
                    });
                string filename = "batches_list_" + DateTime.Now.ToString("yyyy-dd-M--HH-mm-ss") + ".xlsx";
                string path = HttpContext.Current.Server.MapPath("~/assets/excel/") + filename;
                workbook.Save(path);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject("/assets/excel/" + filename));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        //Generic function to convert Linq query to DataTable.
        public DataTable LinqToDataTable<T>(IEnumerable<T> items)
        {
            DataTable dt = new DataTable(typeof(T).Name);
            PropertyInfo[] propInfos = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo propInfo in propInfos)
            {
                dt.Columns.Add(new DataColumn(propInfo.Name, propInfo.PropertyType));
            }
            foreach (T item in items)
            {
                DataRow dr = dt.Rows.Add();

                foreach (PropertyInfo propInfo in propInfos)
                {
                    //Add value Column to the DataRow.
                    dr[propInfo.Name] = propInfo.GetValue(item, null);
                }
            }
            return dt;
        }

        [WebMethod(EnableSession = true)]
        public void add_to_wishlist()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string product_token = HttpContext.Current.Request["product_token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();

                if (product_token.Trim() != "-1" && user_token.Trim() != "-1")
                {
                    _productsBL.AddProductToWishlist(product_token.Trim(), user_token.Trim());

                    JavaScriptSerializer js = new JavaScriptSerializer();
                    Context.Response.Clear();
                    Context.Response.ContentType = "application/json";
                    Context.Response.Write(JsonConvert.SerializeObject("true"));
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_wishlist()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();

                DataTable data = _productsBL.GetWishList(user_token);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_homepagelists()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                var data = _productsBL.get_homepagelists(user_token);
                var json = JsonConvert.SerializeObject(data,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(json);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_homepagelists_mobile()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = "-1";
                var data = _productsBL.get_homepagelists(user_token);
                var json = JsonConvert.SerializeObject(data,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(json);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_product_details()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string token = HttpContext.Current.Request["token"].ToString();
                var data = _productsBL.GetProductDetailsById(token, user_token);
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_admin_product_details()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string token = HttpContext.Current.Request["token"].ToString();
                var data = _productsBL.GetAdminProductDetailsByToken(token);
                var json = JsonConvert.SerializeObject(data,
                     new JsonSerializerSettings()
                     {
                         ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                         PreserveReferencesHandling = PreserveReferencesHandling.Objects
                     });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(json));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_product_images()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string token = HttpContext.Current.Request["token"].ToString();
                var data = _productsBL.GetProductImages(token);
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void submit_rating()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string score = HttpContext.Current.Request["score"].ToString();
                string review = HttpContext.Current.Request["review"].ToString();
                string name = HttpContext.Current.Request["name"].ToString();
                string email = HttpContext.Current.Request["email"].ToString();
                string token = HttpContext.Current.Request["token"].ToString();
                _productsBL.submit_rating(int.Parse(score.Trim()), review.Trim(), name.Trim(), email.Trim(), token.Trim());
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject("true"));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void cookie_cart_items()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString();
                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string cookie_cart_items = HttpContext.Current.Request["cookie_cart_items"].ToString();
                var data = _productsBL.GetCartItems(cookie_cart_items);
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void submit_order()
        {
            usersBL _usersBL = new usersBL();
            ordersBL _ordersBl = new ordersBL();
            Order _Order = new Order();
            string status = string.Empty;
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                _Order._usertoken = HttpContext.Current.Request["usertoken"].ToString();
                _Order._items = HttpContext.Current.Request["items"].ToString();
                _Order._first_name = HttpContext.Current.Request["firstname"].ToString();
                _Order._last_name = HttpContext.Current.Request["lastname"].ToString();
                _Order._email = HttpContext.Current.Request["email"].ToString();
                _Order._number = HttpContext.Current.Request["number"].ToString();
                _Order._cityid = int.Parse(HttpContext.Current.Request["cityid"].ToString());
                _Order._town = HttpContext.Current.Request["town"].ToString();
                _Order._block = HttpContext.Current.Request["block"].ToString();
                _Order._street = HttpContext.Current.Request["street"].ToString();
                _Order._house = int.Parse(HttpContext.Current.Request["house"].ToString());
                _Order._apartment = int.Parse(HttpContext.Current.Request["apartment"].ToString());
                _Order._ordernotes = HttpContext.Current.Request["ordernotes"].ToString();
                _Order.shareholders = HttpContext.Current.Request["shareholders"].ToString();
                _Order.shippingshareholders = HttpContext.Current.Request["shippingshareholders"].ToString();
                _Order.promo_code = (HttpContext.Current.Request["promo_code"] != null) ? HttpContext.Current.Request["promo_code"].ToString().Trim() : string.Empty;
                _Order.code_value = (HttpContext.Current.Request["code_value"] != null) ? float.Parse(HttpContext.Current.Request["code_value"].ToString().Trim()) : 0;

                _Order._statusId = 1;

                if (_Order._usertoken == "-1")
                {
                    var allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                    var random = new Random();
                    var resultToken = new string(
                       Enumerable.Repeat(allChar, 8)
                       .Select(token => token[random.Next(token.Length)]).ToArray());
                    string _password = resultToken.ToString();
                    status = _usersBL.sign_up_by_email(_Order._email, _password);

                    if (status.Trim() == string.Empty)
                    {
                        var data = _usersBL.get_user_by_email(_Order._email);
                        var nameOfProperty = "Token";
                        var propertyInfo = data.GetType().GetProperty(nameOfProperty);
                        var value = propertyInfo.GetValue(data, null);
                        _Order._usertoken = value.ToString();
                    }
                    else
                    {
                        status = "Registered Email";
                    }
                }


                if (status.Trim() == string.Empty)
                {
                    status = _ordersBl.SubmitOrder(_Order);

                    HttpContext.Current.Response.Cookies["OrderId"].Expires = DateTime.Now.AddDays(2);
                    HttpContext.Current.Response.Cookies["OrderId"].Value = status;

                    JavaScriptSerializer js = new JavaScriptSerializer();
                    Shareholder_Class[] shareholders = js.Deserialize<Shareholder_Class[]>(_Order.shareholders);

                    foreach (Shareholder_Class item in shareholders)
                    {
                        item.usertoken = _Order._usertoken;
                        _ordersBl.SubmitOrderShareholder(item, status);
                    }

                    Shipping_Shareholder_Class[] shippings_hareholders = js.Deserialize<Shipping_Shareholder_Class[]>(_Order.shippingshareholders);

                    foreach (Shipping_Shareholder_Class item in shippings_hareholders)
                    {
                        item.usertoken = _Order._usertoken;
                        _ordersBl.SubmitOrderShippingShareholder(item, status);
                    }
                }

                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(status));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void submit_bank_transfer_order()
        {
            usersBL _usersBL = new usersBL();
            ordersBL _ordersBl = new ordersBL();
            Order _Order = new Order();
            string status = string.Empty;
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                _Order._usertoken = HttpContext.Current.Request["usertoken"].ToString();
                _Order._items = HttpContext.Current.Request["items"].ToString();
                _Order._first_name = HttpContext.Current.Request["firstname"].ToString();
                _Order._last_name = HttpContext.Current.Request["lastname"].ToString();
                _Order._email = HttpContext.Current.Request["email"].ToString();
                _Order._number = HttpContext.Current.Request["number"].ToString();
                _Order._cityid = int.Parse(HttpContext.Current.Request["cityid"].ToString());
                _Order._town = HttpContext.Current.Request["town"].ToString();
                _Order._block = HttpContext.Current.Request["block"].ToString();
                _Order._street = HttpContext.Current.Request["street"].ToString();
                _Order._house = int.Parse(HttpContext.Current.Request["house"].ToString());
                _Order._apartment = int.Parse(HttpContext.Current.Request["apartment"].ToString());
                _Order._ordernotes = HttpContext.Current.Request["ordernotes"].ToString();
                _Order.shareholders = HttpContext.Current.Request["shareholders"].ToString();
                _Order.shippingshareholders = HttpContext.Current.Request["shippingshareholders"].ToString();
                _Order.promo_code = (HttpContext.Current.Request["promo_code"] != null) ? HttpContext.Current.Request["promo_code"].ToString().Trim() : string.Empty;
                _Order.code_value = (HttpContext.Current.Request["code_value"] != null) ? float.Parse(HttpContext.Current.Request["code_value"].ToString().Trim()) : 0;

                _Order._statusId = 1010;

                if (status.Trim() == string.Empty)
                {
                    status = _ordersBl.SubmitOrder(_Order);

                    HttpContext.Current.Response.Cookies["OrderId"].Expires = DateTime.Now.AddDays(2);
                    HttpContext.Current.Response.Cookies["OrderId"].Value = status;

                    JavaScriptSerializer js = new JavaScriptSerializer();
                    Shareholder_Class[] shareholders = js.Deserialize<Shareholder_Class[]>(_Order.shareholders);

                    foreach (Shareholder_Class item in shareholders)
                    {
                        item.usertoken = _Order._usertoken;
                        _ordersBl.SubmitOrderShareholder(item, status);
                    }

                    Shipping_Shareholder_Class[] shippings_hareholders = js.Deserialize<Shipping_Shareholder_Class[]>(_Order.shippingshareholders);

                    foreach (Shipping_Shareholder_Class item in shippings_hareholders)
                    {
                        item.usertoken = _Order._usertoken;
                        _ordersBl.SubmitOrderShippingShareholder(item, status);
                    }
                }

                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(status));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void change_order_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int orderid = int.Parse(HttpContext.Current.Request["orderid"].ToString().Trim());
                int status = int.Parse(HttpContext.Current.Request["action"].ToString().Trim());
                string user_token = HttpContext.Current.Request["user_token"].ToString();

                _productsBL.change_order_status(orderid, status, user_token);

                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void admin_change_order_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString();

                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int orderid = int.Parse(HttpContext.Current.Request["orderid"].ToString().Trim());
                int status = int.Parse(HttpContext.Current.Request["action"].ToString().Trim());
                string user_token = HttpContext.Current.Request["user_token"].ToString();

                if (status == 1008 || status == 1009)
                {
                    string url = string.Empty;

                    HttpFileCollection Files = HttpContext.Current.Request.Files;
                    if (Files.Count > 0)
                    {
                        Random rnd = new Random();
                        string image_name = rnd.Next().ToString();

                        if (image_name != string.Empty)
                        {
                            string path = string.Empty;

                            for (int i = 0; i < Files.Count; i++)
                            {
                                HttpPostedFile File = Files[i];
                                string extension = Path.GetExtension(File.FileName);
                                path = HttpContext.Current.Server.MapPath("~/assets/images/orders/");
                                File.SaveAs(Path.Combine(path, String.Concat(image_name, extension)));
                                url = "/assets/images/orders/" + image_name + extension;
                            }
                        }
                    }

                    _productsBL.admin_change_order_status(orderid, status, user_token, url);
                }
                else
                {
                    _productsBL.change_order_status(orderid, status, user_token);
                }

                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_batch_transaction_details()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int batchid = int.Parse(HttpContext.Current.Request["batchid"].ToString().Trim());

                var data = _productsBL.GetbatchTransactionDetailsById(batchid);
                var json = JsonConvert.SerializeObject(data,
                     new JsonSerializerSettings()
                     {
                         ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                         PreserveReferencesHandling = PreserveReferencesHandling.Objects
                     });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(json));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_order_details()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int orderid = int.Parse(HttpContext.Current.Request["orderid"].ToString().Trim());
                string user_token = HttpContext.Current.Request["user_token"].ToString();

                var data = _productsBL.GetOrderDetails(orderid, user_token);
                var json = JsonConvert.SerializeObject(data,
                     new JsonSerializerSettings()
                     {
                         ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                         PreserveReferencesHandling = PreserveReferencesHandling.Objects
                     });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(json));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_order_details_mobile()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int orderid = int.Parse(HttpContext.Current.Request["orderid"].ToString().Trim());
                string user_token = HttpContext.Current.Request["user_token"].ToString();

                var data = _productsBL.GetOrderDetails(orderid, user_token);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_orders_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string Token = HttpContext.Current.Request["user_token"].ToString().Trim();

                var data = _productsBL.GetOrdersList(Token);
                var json = JsonConvert.SerializeObject(data,
                     new JsonSerializerSettings()
                     {
                         ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                     });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(json));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_orders_list_mobile()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string Token = HttpContext.Current.Request["user_token"].ToString().Trim();

                var data = _productsBL.GetOrdersList(Token);
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_product_orders_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string Token = HttpContext.Current.Request["token"].ToString().Trim();

                var data = _productsBL.GetProductOrdersList(Token);
                var json = JsonConvert.SerializeObject(data,
                     new JsonSerializerSettings()
                     {
                         ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                     });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(json));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void chnage_product_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _productsBL.chnage_product_activation_status(token, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void save_product_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();
                int category = int.Parse(HttpContext.Current.Request["category"].ToString());
                int sub_category = int.Parse(HttpContext.Current.Request["sub_category"].ToString());
                int brand = int.Parse(HttpContext.Current.Request["brand"].ToString());
                int new_arrival = int.Parse(HttpContext.Current.Request["new_arrival"].ToString());

                var data = _productsBL.save_product_info(user_token, name_en, name_ar, category, sub_category, brand, new_arrival);

                commonBL _commonBL = new commonBL();
                ManageProductURLToSiteMap(name_en, _commonBL.GetObjectValue(data, "Token"));

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void save_sub_category_products()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string main_token = HttpContext.Current.Request["main_token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                int stock = int.Parse(HttpContext.Current.Request["amount"]);
                int sub_category = int.Parse(HttpContext.Current.Request["sub_category"].ToString());
                string sub_category_txt = HttpContext.Current.Request["sub_category_txt"].ToString();
                float usd = float.Parse(HttpContext.Current.Request["usd"]);
                int discount = int.Parse(HttpContext.Current.Request["discount"]);

                string content_en = HttpContext.Current.Request["content_en"].ToString();
                string content_ar = HttpContext.Current.Request["content_ar"].ToString();

                string name_en = _productsBL.save_sub_category_products(main_token, user_token, stock, sub_category, sub_category_txt, usd, discount, content_en, content_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void edit_sub_category_products()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                int stock = int.Parse(HttpContext.Current.Request["amount"]);
                int sub_category = int.Parse(HttpContext.Current.Request["sub_category"].ToString());
                string sub_category_txt = HttpContext.Current.Request["sub_category_txt"].ToString();
                float usd = float.Parse(HttpContext.Current.Request["usd"]);
                int discount = int.Parse(HttpContext.Current.Request["discount"]);

                string content_en = HttpContext.Current.Request["content_en"].ToString();
                string content_ar = HttpContext.Current.Request["content_ar"].ToString();

                string name_en = _productsBL.edit_sub_category_products(token, user_token, stock, sub_category, sub_category_txt, usd, discount, content_en, content_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void edit_product_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();
                int category = int.Parse(HttpContext.Current.Request["category"].ToString());
                int sub_category = int.Parse(HttpContext.Current.Request["sub_category"].ToString());
                int brand = int.Parse(HttpContext.Current.Request["brand"].ToString());
                int new_arrival = int.Parse(HttpContext.Current.Request["new_arrival"].ToString());

                _productsBL.edit_product_info(token, user_token, name_en, name_ar, category, sub_category, brand, new_arrival);

                ManageProductURLToSiteMap(name_en, token);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void save_product_details()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string brief_en = HttpContext.Current.Request["brief_en"].ToString();
                string brief_ar = HttpContext.Current.Request["brief_ar"].ToString();
                string sku = HttpContext.Current.Request["sku"].ToString();
                string description_en = HttpContext.Current.Request["description_en"].ToString();
                string description_ar = HttpContext.Current.Request["description_ar"].ToString();
                string specification_en = HttpContext.Current.Request["specification_en"].ToString();
                string specification_ar = HttpContext.Current.Request["specification_ar"].ToString();

                _productsBL.save_product_details(token, user_token, brief_en, brief_ar, sku, description_en, description_ar, specification_en, specification_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void save_product_colors_sizes()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string colors = HttpContext.Current.Request["colors"].ToString();
                string sizes = HttpContext.Current.Request["sizes"].ToString();

                _productsBL.save_product_colors_sizes(token, user_token, colors, sizes);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void upload_product_img()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();

                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                HttpFileCollection Files = HttpContext.Current.Request.Files;
                string image_name = HttpContext.Current.Request["image_name"].ToString();
                string url = string.Empty;

                if (image_name != string.Empty)
                {
                    string path = string.Empty;

                    for (int i = 0; i < Files.Count; i++)
                    {
                        HttpPostedFile File = Files[i];
                        string extension = Path.GetExtension(File.FileName);
                        path = HttpContext.Current.Server.MapPath("~/assets/images/products/");
                        File.SaveAs(Path.Combine(path, String.Concat(image_name, extension)));
                        url = "assets/images/products/" + image_name + extension;
                    }
                }

                var data = _productsBL.upload_product_img(token, user_token, url, image_name);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void delete_product_img()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();

                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());

                _productsBL.delete_product_img(token, user_token, id);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void make_main_product_img()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();

                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());

                _productsBL.make_main_product_img(token, user_token, id);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void save_product_prices_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();

                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                float usd = float.Parse(HttpContext.Current.Request["usd"]);
                float kwd = float.Parse(HttpContext.Current.Request["kwd"].ToString());
                int discount = int.Parse(HttpContext.Current.Request["discount"]);


                _productsBL.save_product_prices_info(token, user_token, usd, kwd, discount);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void save_product_stock_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();

                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                int amount = int.Parse(HttpContext.Current.Request["amount"]);


                _productsBL.save_product_stock_info(token, user_token, amount);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void rating_order()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int orderId = int.Parse(HttpContext.Current.Request["orderid"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                int rating = int.Parse(HttpContext.Current.Request["value"]);


                _productsBL.save_order_rating_value(orderId, user_token, rating);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void submit_order_transaction()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int orderid = int.Parse(HttpContext.Current.Request["orderid"].ToString());
                string tran_ref = HttpContext.Current.Request["meps_tran_ref"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();

                string _ServerKey = ConfigurationManager.AppSettings["payment_ServerKey"].ToString();
                string _payment_payTabsQuary = ConfigurationManager.AppSettings["payment_payTabsQuary"].ToString();

                QueryTransaction payPage = new QueryTransaction();
                payPage.tran_ref = tran_ref;
                payPage.profile_id = ConfigurationManager.AppSettings["payment_profile_id"].ToString();

                var client = new HttpClient();
                var jsonInString = JsonConvert.SerializeObject(payPage);

                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Post,
                    RequestUri = new Uri(_payment_payTabsQuary),
                    Headers =
                {
                    { "Authorization", _ServerKey },
                },
                    Content = new StringContent(jsonInString, Encoding.UTF8, "application/json")
                    {
                        Headers =
                            {
                                ContentType = new MediaTypeHeaderValue("application/json")
                            }
                    }
                };

                using (var response = client.SendAsync(request))
                {
                    response.Wait();
                    string body = response.Result.Content.ReadAsStringAsync().Result;
                    var successRes = JsonConvert.DeserializeObject<QueryTransactionResponse>(body);

                    _productsBL.save_order_payment_transaction(orderid, successRes.payment_result.response_message, successRes.payment_result.transaction_time.ToString(), successRes.tran_ref, successRes.tran_ref, successRes.tran_ref, successRes.tran_ref, successRes.cart_amount, user_token, successRes.cart_currency);
                }

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        private void ManageProductURLToSiteMap(string name_en, string token)
        {
            string filename = "~/sitemap.xml";

            XmlDocument doc = new XmlDocument();
            doc.Load(Server.MapPath(filename));
            XmlNode urlset = doc.ChildNodes[1];
            XmlNode node = doc.CreateNode(XmlNodeType.Element, "url", "value");
            XmlNode loc = doc.CreateNode(XmlNodeType.Element, "loc", "value");
            XmlNode priority = doc.CreateNode(XmlNodeType.Element, "priority", "value");
            XmlNode lastmod = doc.CreateNode(XmlNodeType.Element, "lastmod", "value");
            XmlNode changefreq = doc.CreateNode(XmlNodeType.Element, "changefreq", "value");
            string _URL = "/shop/product/" + fixProductName(name_en.Trim().ToLower()) + "/" + token;
            loc.InnerText = _URL;
            lastmod.InnerText = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ssZ");
            priority.InnerText = "1.0";
            changefreq.InnerText = "hourly";
            node.AppendChild(loc);
            node.AppendChild(lastmod);
            node.AppendChild(priority);
            node.AppendChild(changefreq);
            urlset.AppendChild(node);
            doc.AppendChild(urlset);
            doc.Save(Server.MapPath(filename));
            string text = File.ReadAllText(Server.MapPath(filename));
            text = text.Replace("xhtmllink", "xhtml:link");
            text = text.Replace(" xmlns=\"value\">", ">");
            File.WriteAllText(Server.MapPath(filename), text);

            doc = new XmlDocument();
            doc.Load(Server.MapPath(filename));
            urlset = doc.ChildNodes[1];
            node = doc.CreateNode(XmlNodeType.Element, "url", "value");
            loc = doc.CreateNode(XmlNodeType.Element, "loc", "value");
            priority = doc.CreateNode(XmlNodeType.Element, "priority", "value");
            lastmod = doc.CreateNode(XmlNodeType.Element, "lastmod", "value");
            changefreq = doc.CreateNode(XmlNodeType.Element, "changefreq", "value");
            _URL = "/ar/shop/product/" + fixProductName(name_en.Trim().ToLower()) + "/" + token;
            loc.InnerText = _URL;
            lastmod.InnerText = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ssZ");
            priority.InnerText = "1.0";
            changefreq.InnerText = "hourly";
            node.AppendChild(loc);
            node.AppendChild(lastmod);
            node.AppendChild(priority);
            node.AppendChild(changefreq);
            urlset.AppendChild(node);
            doc.AppendChild(urlset);
            doc.Save(Server.MapPath(filename));
            text = File.ReadAllText(Server.MapPath(filename));
            text = text.Replace("xhtmllink", "xhtml:link");
            text = text.Replace(" xmlns=\"value\">", ">");
            File.WriteAllText(Server.MapPath(filename), text);
        }

        private string fixProductName(string name)
        {
            name = Regex.Replace(name, "[*'\",_&#^@.]", "-");
            name = name.Replace(" ", "-");
            name = name.Replace("---", "-");
            name = name.Replace("--", "-");
            return name;
        }

        [WebMethod(EnableSession = true)]
        public void submit_batch_slaughtered()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int batchid = int.Parse(HttpContext.Current.Request["batchid"].ToString());
                int slaughterhouseId = int.Parse(HttpContext.Current.Request["SlaughterhouseId"].ToString());

                string _result = _productsBL.submit_batch_slaughtered(batchid, slaughterhouseId);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(_result));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void submit_batch_shipped()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int batchid = int.Parse(HttpContext.Current.Request["batchid"].ToString());
                int slaughterhouseId = int.Parse(HttpContext.Current.Request["SlaughterhouseId"].ToString());
                string url = HttpContext.Current.Request["url"].ToString();

                string _result = _productsBL.submit_batch_shipped(batchid, slaughterhouseId, url);

                if (_result == string.Empty)
                {
                    _productsBL.ChangeOrdersStatusToShipped(batchid);
                }

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(_result));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void assigned_to_charity()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int batchid = int.Parse(HttpContext.Current.Request["batchid"].ToString());
                int charityid = int.Parse(HttpContext.Current.Request["CharityId"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();

                string _result = _productsBL.assigned_to_charity(batchid, charityid, user_token);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(_result));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void submit_batch_distributed()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int batchid = int.Parse(HttpContext.Current.Request["batchid"].ToString());
                int charityid = int.Parse(HttpContext.Current.Request["charityid"].ToString());

                string _result = _productsBL.submit_batch_distributed(batchid, charityid);

                if (_result == string.Empty)
                {
                    _productsBL.ChangeOrdersStatusToDistributed(batchid);
                }

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(_result));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void submit_batch_received()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int batchid = int.Parse(HttpContext.Current.Request["batchid"].ToString());
                int charityid = int.Parse(HttpContext.Current.Request["charityid"].ToString());
                HttpFileCollection Files = HttpContext.Current.Request.Files;

                Random rnd = new Random();
                string video_file = rnd.Next(10000, 70000).ToString();
                string url = string.Empty;
                if (video_file != string.Empty)
                {
                    string path = string.Empty;

                    for (int i = 0; i < Files.Count; i++)
                    {
                        HttpPostedFile File = Files[i];
                        string extension = Path.GetExtension(File.FileName);
                        path = HttpContext.Current.Server.MapPath("~/assets/videos/");
                        File.SaveAs(Path.Combine(path, String.Concat(video_file, extension)));
                        url = "/assets/videos/" + video_file + extension;
                    }
                }

                string _result = _productsBL.submit_batch_received(batchid, charityid, url);

                if (_result == string.Empty)
                {
                    _productsBL.ChangeOrdersStatusToReceived(batchid, url);
                }

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(_result));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void batch_completed()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int batchid = int.Parse(HttpContext.Current.Request["batchid"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();

                string _result = _productsBL.batch_completed(batchid, user_token);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(_result));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void batch_delivered()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int batchid = int.Parse(HttpContext.Current.Request["batchid"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();

                string _result = _productsBL.batch_delivered(batchid, user_token);

                if (_result == string.Empty)
                {
                    _productsBL.ChangeOrdersStatusToDelivered(batchid, user_token);
                }

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(_result));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_slaughterhouse_batches_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }


                int SlaughterhouseId = int.Parse(HttpContext.Current.Request["slaughterhouseId"].ToString());
                int _start = int.Parse(HttpContext.Current.Request["start"].ToString());
                int _end = int.Parse(HttpContext.Current.Request["end"].ToString());

                var data = _productsBL.GetAdminBatchesList("-1", -1, -1, -1, DateTime.ParseExact("01/01/1950", "dd/MM/yyyy", null), SlaughterhouseId, -1, _start, _end);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_charity_batches_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }


                int charityid = int.Parse(HttpContext.Current.Request["charityid"].ToString());
                int _start = int.Parse(HttpContext.Current.Request["start"].ToString());
                int _end = int.Parse(HttpContext.Current.Request["end"].ToString());

                var data = _productsBL.GetAdminBatchesList("-1", -1, -1, -1, DateTime.ParseExact("01/01/1950", "dd/MM/yyyy", null), -1, charityid, _start, _end);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void batch_main_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int BatchId = int.Parse(HttpContext.Current.Request["BatchId"].ToString());

                DateTime searchDate = DateTime.ParseExact("01/01/1950", "dd/MM/yyyy", null);

                var data = _productsBL.GetAdminBatchesList("-1", BatchId, -1, -1, searchDate, -1, -1, 1, 1);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void batch_items()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int BatchId = int.Parse(HttpContext.Current.Request["BatchId"].ToString());
                int _start = int.Parse(HttpContext.Current.Request["start"].ToString());
                int _end = int.Parse(HttpContext.Current.Request["end"].ToString());

                var data = _productsBL.GetAdminBatchItems(BatchId, _start, _end);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void batch_transaction()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int batchid = int.Parse(HttpContext.Current.Request["batchid"].ToString().Trim());

                var data = _productsBL.GetMobileBatchTransactionDetailsById(batchid);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void slaughterhouse_dashboard()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int slaughterhouseid = int.Parse(HttpContext.Current.Request["slaughterhouseid"].ToString().Trim());

                var data = _productsBL.slaughterhouse_dashboard(slaughterhouseid);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void charity_dashboard()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int charityid = int.Parse(HttpContext.Current.Request["charityid"].ToString().Trim());

                var data = _productsBL.charity_dashboard(charityid);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void batch_item_slaughtered()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int batchid = int.Parse(HttpContext.Current.Request["batchid"].ToString());
                int batch_item_id = int.Parse(HttpContext.Current.Request["batch_item_id"].ToString());
                int orderid = int.Parse(HttpContext.Current.Request["orderid"].ToString());
                HttpFileCollection Files = HttpContext.Current.Request.Files;

                Random rnd = new Random();
                string video_file = rnd.Next(10000, 70000).ToString();
                string url = string.Empty;
                if (video_file != string.Empty)
                {
                    string path = string.Empty;

                    for (int i = 0; i < Files.Count; i++)
                    {
                        HttpPostedFile File = Files[i];
                        string extension = Path.GetExtension(File.FileName);
                        path = HttpContext.Current.Server.MapPath("~/assets/videos/");
                        File.SaveAs(Path.Combine(path, String.Concat(video_file, extension)));
                        url = "/assets/videos/" + video_file + extension;
                    }
                }

                string _result = _productsBL.batch_item_slaughtered(batchid, batch_item_id, orderid, url);

                if (_result == string.Empty)
                {
                    _productsBL.ChangeOrdersStatusToItemSlaughtered(orderid, url);
                }

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(_result));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void change_notification_to_seen()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int id = int.Parse(HttpContext.Current.Request["id"].ToString());

                _productsBL.change_notification_to_seen(id);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void notifications_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int slaughterhouseid = int.Parse(HttpContext.Current.Request["slaughterhouseid"].ToString().Trim());
                int charityid = int.Parse(HttpContext.Current.Request["charityid"].ToString().Trim());

                var data = _productsBL.notifications_list(slaughterhouseid, charityid);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
