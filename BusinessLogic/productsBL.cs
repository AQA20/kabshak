using business_logic;
using DataAccess.Modals;
using Entities;
using QRCoder;
using SelectPdf;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Windows.Controls;
using System.Xml.Linq;

namespace BusinessLogic
{
    public class productsBL : commonBL
    {
        public DataTable GetProductsList(string _brands, string _min, string _max, string _categories, string _start, string _end, string _sort, string _currency, string _txt, string _subcategories, string UserToken, string _newarrival, string _onsale, string country)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("Token", typeof(string));
            table.Columns.Add("NameEn", typeof(string));
            table.Columns.Add("NameAr", typeof(string));
            table.Columns.Add("Usd", typeof(float));
            table.Columns.Add("Kwd", typeof(float));
            table.Columns.Add("Amount", typeof(int));
            table.Columns.Add("ImageUrl", typeof(string));
            table.Columns.Add("CategoryNameEn", typeof(string));
            table.Columns.Add("CategoryNameAr", typeof(string));
            table.Columns.Add("SubCategoryNameEn", typeof(string));
            table.Columns.Add("SubCategoryNameAr", typeof(string));
            table.Columns.Add("BrandNameEn", typeof(string));
            table.Columns.Add("BrandNameAr", typeof(string));
            table.Columns.Add("IsWishList", typeof(bool));
            table.Columns.Add("Records", typeof(int));
            table.Columns.Add("Discount", typeof(int));
            table.Columns.Add("CreatedOnDate", typeof(DateTime));
            table.Columns.Add("IsActive", typeof(bool));
            table.Columns.Add("BriefEn", typeof(string));
            table.Columns.Add("BriefAr", typeof(string));

            try
            {
                productsEntities context = new productsEntities();
                var query = context.GetProductsList(_brands, double.Parse(_min), double.Parse(_max), _categories, _sort, int.Parse(_start), int.Parse(_end), _currency, _txt, _subcategories, UserToken, _newarrival, _onsale, country);

                foreach (var data in query)
                {
                    table.Rows.Add(0, data.Token, data.NameEn, data.NameAr, data.Usd, data.Kwd, data.Amount, data.Url, data.CategoryNameEn, data.CategoryNameAr, data.SubCategoryNameEn, data.SubCategoryNameAr, data.BrandNameEn, data.BrandNameAr, data.IsWishList, data.Records, data.Discount, data.CreatedOnDate, data.IsActive, data.BriefEn, data.BriefAr);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return table;
        }

        public DataTable GetAdminProductsList(string _brands, string _min, string _max, string _categories, string _start, string _end, string _sort, string _currency, string _txt, string _subcategories, string UserToken, string _newarrival, string _onsale)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("Token", typeof(string));
            table.Columns.Add("NameEn", typeof(string));
            table.Columns.Add("NameAr", typeof(string));
            table.Columns.Add("Usd", typeof(float));
            table.Columns.Add("Kwd", typeof(float));
            table.Columns.Add("Amount", typeof(int));
            table.Columns.Add("ImageUrl", typeof(string));
            table.Columns.Add("CategoryNameEn", typeof(string));
            table.Columns.Add("CategoryNameAr", typeof(string));
            table.Columns.Add("SubCategoryNameEn", typeof(string));
            table.Columns.Add("SubCategoryNameAr", typeof(string));
            table.Columns.Add("BrandNameEn", typeof(string));
            table.Columns.Add("BrandNameAr", typeof(string));
            table.Columns.Add("IsWishList", typeof(bool));
            table.Columns.Add("Records", typeof(int));
            table.Columns.Add("Discount", typeof(int));
            table.Columns.Add("CreatedOnDate", typeof(DateTime));
            table.Columns.Add("IsActive", typeof(bool));

            try
            {
                productsEntities context = new productsEntities();
                var query = context.GetAdminProducts(_brands, double.Parse(_min), double.Parse(_max), _categories, _sort, int.Parse(_start), int.Parse(_end), _currency, _txt, _subcategories, UserToken, _newarrival, _onsale);

                foreach (var data in query)
                {
                    table.Rows.Add(0, data.Token, data.NameEn, data.NameAr, data.Usd, data.Kwd, data.Amount, data.Url, data.CategoryNameEn, data.CategoryNameAr, data.SubCategoryNameEn, data.SubCategoryNameAr, data.BrandNameEn, data.BrandNameAr, data.IsWishList, data.Records, data.Discount, data.CreatedOnDate, data.IsActive);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return table;
        }

        public DataTable GetAvailableBatchProductsList(string brands, string categories, string start, string end, string subcategories, string usertoken, int charityId, int _delivery)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("OrderId", typeof(string));
            table.Columns.Add("ProductName", typeof(string));
            table.Columns.Add("ShareholderName", typeof(string));
            table.Columns.Add("Quantity", typeof(string));
            table.Columns.Add("AddressDetails", typeof(string));
            table.Columns.Add("PurposeName", typeof(string));
            table.Columns.Add("Records", typeof(int));
            table.Columns.Add("Quantities", typeof(int));
            table.Columns.Add("IsNewArrival", typeof(bool));

            try
            {
                productsEntities context = new productsEntities();

                var query = context.GetAvailableBatchProductsList(brands, categories, int.Parse(start), int.Parse(end), subcategories, usertoken, charityId, _delivery);

                foreach (var data in query)
                {
                    table.Rows.Add(data.Id, data.OrderId, data.ProductName, data.Shareholder, data.Quantity, data.AddressDetails, data.PurposeName, data.Records, data.Quantities, data.IsNewArrival);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return table;
        }

        public void save_product_countries(string token, string user_token, string countries)
        {
            try
            {
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities product_context = new productsEntities();
                var product = product_context.Products.SingleOrDefault(d => d.Token == token);
                int productId = int.Parse(GetObjectValue(product, "Id"));

                if (product.Details.Count <= 0)
                {
                    Detail obj = new Detail();
                    obj.ProductId = productId;
                    obj.BriefEn = string.Empty;
                    obj.BriefAr = string.Empty;
                    obj.countries = countries.Trim();
                    obj.CreatedById = userid;
                    obj.CreatedOnDate = DateTime.Now;
                    product_context.Details.Add(obj);
                    product_context.SaveChanges();
                }
                else
                {
                    var record = product_context.Details.SingleOrDefault(d => d.ProductId == productId);

                    if (record != null)
                    {
                        record.countries = countries.Trim();
                        record.LastModById = userid;
                        record.LastModOnDate = DateTime.Now;
                        product_context.SaveChanges();
                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public string GenerateBatch(string brands, string categories, string subcategories, string usertoken, int charityId, int slaughterhouseId, int quantity, int delivery)
        {
            string status = string.Empty;
            try
            {
                productsEntities context = new productsEntities();

                var query = context.GenerateBatch(brands, categories, subcategories, usertoken, charityId, quantity, slaughterhouseId, delivery).ToList();

                foreach (var data in query)
                {
                    if (quantity != data.QuantityResult)
                    {
                        status = data.QuantityResult.ToString();
                    }

                    break;
                }

                if (status == string.Empty)
                {
                    UsersEntities user_context = new UsersEntities();
                    var User = user_context.Users.SingleOrDefault(d => d.Token == usertoken);
                    int userid = int.Parse(GetObjectValue(User, "Id"));

                    Batch obj = new Batch();
                    obj.StatusId = 3;
                    obj.Brands = brands == "-1" ? null : brands;
                    obj.Categories = categories == "-1" ? null : categories; ;
                    obj.Subcategories = subcategories == "-1" ? null : subcategories;
                    obj.CharityId = null;
                    obj.SlaughterhouseId = slaughterhouseId;
                    obj.Quantity = quantity;
                    obj.CreatedById = userid;
                    obj.CreatedOnDate = DateTime.Now;
                    context.Batches.Add(obj);
                    context.SaveChanges();

                    int batch_id = obj.Id;

                    SaveBatchNotification(batch_id, "Batch #" + batch_id.ToString() + " has been earmarked for your slaughterhouse, please arrange your procedure.", slaughterhouseId, -1, User.Id);

                    GeneralEntities context2 = new GeneralEntities();
                    var Slaughterhouse = context2.Slaughterhouses.SingleOrDefault(d => d.Id == slaughterhouseId);
                    string _FirebaseToken = GetObjectValue(Slaughterhouse, "FirebaseToken");

                    if (_FirebaseToken != string.Empty)
                    {
                        FirebaseService _obj = new FirebaseService();
                        Task<object> result;
                        result = _obj.Push_Notification("Batch #" + batch_id.ToString(), "Batch #" + batch_id.ToString() + " has been earmarked for your slaughterhouse, please arrange your procedure.", _FirebaseToken, batch_id.ToString(), batch_id, "Slaughterhouse");
                    }

                    GenerateQR_Code(batch_id.ToString());

                    var record = context.Batches.SingleOrDefault(d => d.Id == batch_id);

                    if (record != null)
                    {
                        record.QR = "https://localhost:44346/assets/images/QRs/batch_" + batch_id.ToString() + ".png";
                        record.BatchType = delivery;
                        context.SaveChanges();
                    }

                    Track1 trakobj = new Track1();
                    trakobj.BatchId = batch_id;
                    trakobj.StatusId = 1;
                    trakobj.CreatedById = userid;
                    trakobj.CreatedOnDate = DateTime.Now;
                    context.Track1.Add(trakobj);
                    Track1 trakobj2 = new Track1();
                    trakobj2.BatchId = batch_id;
                    trakobj2.StatusId = 3;
                    trakobj2.CreatedById = userid;
                    trakobj2.CreatedOnDate = DateTime.Now;
                    context.Track1.Add(trakobj2);
                    context.SaveChanges();

                    string url = HttpContext.Current.Server.MapPath("~/assets/images/QRs/" + batch_id.ToString());

                    if (!System.IO.Directory.Exists(url))
                    {
                        System.IO.Directory.CreateDirectory(url);
                    }

                    foreach (var data in query)
                    {
                        if (data.Quantity > 1)
                        {
                            for (int i = 1; i <= data.Quantity; i++)
                            {
                                Item _item = new Item();
                                _item.BatchId = batch_id;
                                _item.Order_person_id = data.Id;
                                _item.OrderId = data.OrderId;
                                _item.ProductName = data.ProductName;
                                _item.Shareholder = data.Shareholder;
                                _item.AddressDetails = data.AddressDetails;
                                _item.PurposeName = data.PurposeName;
                                _item.Shareholder = data.Shareholder;
                                _item.IsSlaughtered = false;
                                _item.IsRecorded = false;
                                _item.IsDistributed = false;
                                _item.CreatedById = userid;
                                _item.CreatedOnDate = DateTime.Now;
                                context.Items.Add(_item);
                                context.SaveChanges();

                                int batch_item_id = _item.Id;
                                GenerateBatchItemQR_Code(batch_item_id.ToString(), batch_id.ToString());
                            }
                        }
                        else if (data.Quantity == 1)
                        {
                            Item _item = new Item();
                            _item.BatchId = batch_id;
                            _item.Order_person_id = data.Id;
                            _item.OrderId = data.OrderId;
                            _item.ProductName = data.ProductName;
                            _item.Shareholder = data.Shareholder;
                            _item.AddressDetails = data.AddressDetails;
                            _item.PurposeName = data.PurposeName;
                            _item.IsSlaughtered = false;
                            _item.IsRecorded = false;
                            _item.IsDistributed = false;
                            _item.CreatedById = userid;
                            _item.CreatedOnDate = DateTime.Now;
                            context.Items.Add(_item);
                            context.SaveChanges();

                            int batch_item_id = _item.Id;
                            GenerateBatchItemQR_Code(batch_item_id.ToString(), batch_id.ToString());
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return status;
        }

        public DataTable get_product_sub_categories(string main_token)
        {

            DataTable table = new DataTable();

            table.Columns.Add("Token", typeof(string));
            table.Columns.Add("IsActive", typeof(bool));
            table.Columns.Add("NameEn", typeof(string));
            table.Columns.Add("NameAr", typeof(string));
            table.Columns.Add("SubCategoryId", typeof(int));
            table.Columns.Add("Discount", typeof(int));
            table.Columns.Add("Stock", typeof(int));
            table.Columns.Add("Price", typeof(float));
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("DescriptionEn", typeof(string));
            table.Columns.Add("DescriptionAr", typeof(string));

            try
            {
                productsEntities context = new productsEntities();

                var query = (from P in context.Products
                             join S in context.Stocks on P.Id equals S.ProductId
                             join PP in context.Prices on P.Id equals PP.ProductId
                             join D in context.Details on P.Id equals D.ProductId
                             where
                                 P.MainToken == main_token
                             select new
                             {
                                 Id = P.Id,
                                 Token = P.Token,
                                 IsActive = P.IsActive,
                                 NameEn = P.NameEn,
                                 NameAr = P.NameAr,
                                 SubCategoryId = P.SubCategoryId,
                                 Discount = P.Discount == null ? 0 : P.Discount,
                                 Stock = S.Amount,
                                 Price = PP.Usd,
                                 DescriptionEn = D.DescriptionEn,
                                 DescriptionAr = D.DescriptionAr,

                             }).ToList();

                GeneralEntities context2 = new GeneralEntities();

                foreach (var data in query)
                {
                    var SubCategories = context2.SubCategories.SingleOrDefault(o => o.Id == data.SubCategoryId);

                    table.Rows.Add(data.Token, data.IsActive, SubCategories.NameEn, SubCategories.NameAr, data.SubCategoryId, data.Discount, data.Stock, data.Price, data.Id, data.DescriptionEn, data.DescriptionAr);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
            return table;
        }

        public DataTable ExportAdminBatchItems(int batchId, int start, int end)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("OrderId", typeof(int));
            table.Columns.Add("ProductName", typeof(string));
            table.Columns.Add("Shareholder", typeof(string));
            table.Columns.Add("Purpose", typeof(string));
            table.Columns.Add("AddressDetails", typeof(string));
            table.Columns.Add("CuttingNote", typeof(string));
            table.Columns.Add("Slaughtered", typeof(string));
            table.Columns.Add("Distributed", typeof(string));
            table.Columns.Add("Recorded", typeof(string));

            try
            {
                productsEntities context = new productsEntities();
                var query = context.GetBatchItems(batchId, start, end);

                foreach (var data in query)
                {
                    string _AddressDetails = data.AddressDetails;
                    string _CuttingNote = string.Empty;
                    if(data.AddressDetails != null && _AddressDetails.Trim() != string.Empty)
                    {
                        string[] subs = _AddressDetails.Split(new string[] { "&&&&" }, StringSplitOptions.None);
                        _AddressDetails = subs[0];
                        _CuttingNote = subs[1];
                    }

                    table.Rows.Add(data.Id, data.OrderId, data.ProductName, data.Shareholder, data.PurposeName, _AddressDetails, _CuttingNote, data.IsSlaughtered.ToString(), data.IsDistributed.ToString(), data.IsRecorded.ToString());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
            return table;
        }

        public void GenerateBatchItemQR_Code(string generatebarcodeId, string batchId)
        {
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(generatebarcodeId, QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(qrCodeData);
            Bitmap qrCodeImage = qrCode.GetGraphic(50);
            string filePath = HttpContext.Current.Server.MapPath("~/assets/images/QRs/" + batchId + "/batch_item_" + generatebarcodeId + ".png");
            qrCodeImage.Save(filePath, ImageFormat.Png);
        }

        public void GenerateQR_Code(string generatebarcodeId)
        {
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(generatebarcodeId, QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(qrCodeData);
            Bitmap qrCodeImage = qrCode.GetGraphic(50);
            string filePath = HttpContext.Current.Server.MapPath("~/assets/images/QRs/" + "batch_" + generatebarcodeId + ".png");
            qrCodeImage.Save(filePath, ImageFormat.Png);
        }
        public object GetAdminBatchItems(int batchId, int start, int end)
        {
            object data = new object();
            try
            {
                productsEntities context = new productsEntities();
                var query = context.GetBatchItems(batchId, start, end);
                data = query;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
            return data;
        }

        public void AddProductToWishlist(string product_token, string user_token)
        {
            try
            {
                UsersEntities context2 = new UsersEntities();
                var user = context2.Users.SingleOrDefault(o => o.Token == user_token.Trim() && o.IsActive == true);
                productsEntities context = new productsEntities();
                var product = context.Products.SingleOrDefault(o => o.Token == product_token.Trim() && o.IsActive == true);

                if (!context.Wishlists.Any(o => o.UserId == user.Id && o.ProductId == product.Id))
                {
                    Wishlist obj = new Wishlist();
                    obj.ProductId = product.Id;
                    obj.UserId = user.Id;
                    obj.CreatedOnDate = DateTime.Now;
                    context.Wishlists.Add(obj);
                    context.SaveChanges();
                }
                else
                {
                    var id = context.Wishlists.SingleOrDefault(o => o.UserId == user.Id && o.ProductId == product.Id);

                    if (id != null)
                    {
                        context.Wishlists.Remove(id);
                        context.SaveChanges();
                    }
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public DataTable GetAdminOrdersList(string statuses, int orderId, int hasDate, DateTime _date, int start, int end, string promoCode)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("Usd", typeof(float));
            table.Columns.Add("StatusNameEn", typeof(string));
            table.Columns.Add("PromoCode", typeof(string));
            table.Columns.Add("CreatedOnDate", typeof(DateTime));
            table.Columns.Add("Records", typeof(int));

            try
            {
                productsEntities context = new productsEntities();
                var query = context.GetAdminOrders(statuses, orderId, hasDate, _date, start, end, promoCode);

                foreach (var data in query)
                {
                    table.Rows.Add(data.Id, data.Usd, data.StatusNameEn, data.PromoCode, data.CreatedOnDate, data.Records);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return table;
        }

        public DataTable ExportAdminBatchesList(string statuses, int batchId, int orderId, int hasDate, DateTime searchDate, int slaughterhouseId, int charityId, int start, int end)
        {
            DataTable table = new DataTable();
            table.Columns.Add("BatchId", typeof(string));
            table.Columns.Add("BatchType", typeof(string));
            table.Columns.Add("Status", typeof(string));
            table.Columns.Add("Slaughterhouse", typeof(string));
            table.Columns.Add("Charity", typeof(string));
            table.Columns.Add("Quantity", typeof(string));
            table.Columns.Add("CreatedDate", typeof(string));

            try
            {
                productsEntities context = new productsEntities();
                var query = context.GetAdminBatches1(statuses, batchId, orderId, slaughterhouseId, charityId, hasDate, searchDate, start, end);

                foreach (var data in query)
                {
                    table.Rows.Add(
                        data.Id.ToString(),
                        data.BatchType == 2 ? "Donation" : "Shipping",
                        data.StatusNameEn.ToString(),
                        data.SlaughterhouseName.ToString(),
                        data.CharityName != null ? data.CharityName : string.Empty,
                        data.Quantity.ToString(),
                        data.CreatedOnDate.ToString());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return table;
        }

        public object GetAdminBatchesList(string statuses, int BatchId, int orderId, int hasDate, DateTime _date, int SlaughterhouseId, int CharityId, int start, int end)
        {
            var data = new object();

            try
            {
                productsEntities context = new productsEntities();
                var query = context.GetAdminBatches1(statuses, BatchId, orderId, SlaughterhouseId, CharityId, hasDate, _date, start, end).ToList();
                if (start == 1 && end == 1)
                {
                    foreach (var item in query)
                    {
                        var record = context.Batches.SingleOrDefault(d => d.Id == item.Id);
                        item.StatusId = record.StatusId;
                        item.QR = (record.QR == null) ? "" : record.QR;
                        break;
                    }

                    data = query;
                }
                else
                {
                    data = query;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return data;
        }

        public DataTable GetWishList(string user_token)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("Token", typeof(string));
            table.Columns.Add("NameEn", typeof(string));
            table.Columns.Add("NameAr", typeof(string));
            table.Columns.Add("Usd", typeof(float));
            table.Columns.Add("Kwd", typeof(float));
            table.Columns.Add("Amount", typeof(int));
            table.Columns.Add("ImageUrl", typeof(string));
            table.Columns.Add("CategoryNameEn", typeof(string));
            table.Columns.Add("CategoryNameAr", typeof(string));
            table.Columns.Add("SubCategoryNameEn", typeof(string));
            table.Columns.Add("SubCategoryNameAr", typeof(string));
            table.Columns.Add("BrandNameEn", typeof(string));
            table.Columns.Add("BrandNameAr", typeof(string));

            try
            {
                productsEntities context = new productsEntities();
                var query = context.GetWishlist(user_token);

                foreach (var data in query)
                {
                    table.Rows.Add(0, data.Token, data.NameEn, data.NameAr, data.Usd, data.Kwd, data.Amount, data.Url, data.CategoryNameEn, data.CategoryNameAr, data.SubCategoryNameEn, data.SubCategoryNameAr, data.BrandNameEn, data.BrandNameAr);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return table;
        }

        public object GetProductDetailsById(string token, string usertoken)
        {
            var result = new object();

            try
            {
                productsEntities context = new productsEntities();

                var query = context.GetProductDetails(token, usertoken);

                foreach (var data in query)
                {
                    result = data;
                    break;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return result;
        }

        public object GetProductDetailsByIdForSEO(string token)
        {
            var result = new object();

            try
            {
                productsEntities context = new productsEntities();

                var query = (from P in context.Products
                             join D in context.Details on P.Id equals D.ProductId
                             join I in context.Images on P.Id equals I.ProductId into dept
                             from images in dept.DefaultIfEmpty()
                             where
                                 P.Token == token
                                 && P.IsActive == true
                                 && images.IsMain == true
                             select new
                             {
                                 NameEn = P.NameEn,
                                 NameAr = P.NameAr,
                                 BriefEn = D.BriefEn,
                                 BriefAr = D.BriefAr,
                                 URL = images.Url
                             });

                foreach (var data in query)
                {
                    result = data;
                    break;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return result;
        }

        public object GetAdminProductDetailsByToken(string token)
        {
            var data = new object();

            try
            {
                productsEntities context = new productsEntities();
                var query = context.Products.SingleOrDefault(o => o.Token == token);

                data = query;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return data;
        }

        public object get_homepagelists(string user_token)
        {
            var data = new object();

            try
            {
                productsEntities context = new productsEntities();
                var query = context.GetHomePageLists(user_token);
                data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return data;
        }

        public object GetProductImages(string token)
        {
            var data = new object();

            try
            {
                productsEntities context = new productsEntities();
                var query = (from I in context.Images
                             where
                                 I.Product.Token == token
                             orderby
                                I.IsMain descending
                             select new
                             {
                                 Url = I.Url
                             });

                data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return data;
        }

        public void submit_rating(int score, string review, string name, string email, string token)
        {
            try
            {
                productsEntities context = new productsEntities();

                Review obj = new Review();

                obj.ProductToken = token;
                obj.Score = score;
                obj.Review1 = review;
                obj.Name = name;
                obj.Email = email;
                obj.CreatedOnDate = DateTime.Now;

                context.Reviews.Add(obj);
                context.SaveChanges();

                if (email != null && email.Trim() != string.Empty)
                {
                    string path = HttpContext.Current.Server.MapPath("~/assets/emails/review.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        readText = readText.Replace("@Email", email);
                        readText = readText.Replace("@Score", score.ToString());
                        SendEmail(email, "Kabshak | Product Review", readText, string.Empty, string.Empty);
                    }
                }

                var queryProducts = context.GetProductDetails(token, "-1");
                var product = new object();

                foreach (var data in queryProducts)
                {
                    product = data;
                    break;
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
                    string path = HttpContext.Current.Server.MapPath("~/assets/emails/admin/review.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        readText = readText.Replace("@Email", data.Email);
                        readText = readText.Replace("@Clientemail", (email.Trim() != string.Empty) ? email.Trim() : "-");
                        readText = readText.Replace("@Score", score.ToString());
                        readText = readText.Replace("@Fullname", (name.Trim() != string.Empty) ? name.Trim() : "-");
                        readText = readText.Replace("@Message", (review.Trim() != string.Empty) ? review.Trim() : "-");

                        readText = readText.Replace("@Name", GetObjectValue(product, "NameEn"));
                        readText = readText.Replace("@Brand", GetObjectValue(product, "BrandNameEn"));
                        readText = readText.Replace("@Category", GetObjectValue(product, "CategoryNameEn"));
                        readText = readText.Replace("@Subcategory", (GetObjectValue(product, "SubCategoryNameEn") != string.Empty) ? GetObjectValue(product, "SubCategoryNameEn") : "-");

                        SendEmail(data.Email, "Kabshak | Product Review", readText, string.Empty, string.Empty);
                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public object GetCartItems(string cookie_cart_items)
        {
            var data = new object();

            try
            {
                productsEntities context = new productsEntities();
                var query = context.GetCartItems(cookie_cart_items);
                data = query.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
                return new List<string> { "Error: " + ex.Message + " | Inner: " + (ex.InnerException != null ? ex.InnerException.Message : "None") + " | Stack: " + ex.StackTrace };
            }

            return data;
        }

        public OrderDetails GetOrderDetails(int orderid, string user_token)
        {
            OrderDetails _details = new OrderDetails();

            try
            {
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = User != null ? int.Parse(GetObjectValue(User, "Id")) : -1;
                bool IsAdmin = User != null ? bool.Parse(GetObjectValue(User, "IsAdmin")) : true;

                productsEntities context = new productsEntities();

                if (IsAdmin)
                {
                    var query = (from O in context.Orders
                                 join D in context.Detail1 on O.Id equals D.OrderId
                                 join P in context.Price1 on O.Id equals P.OrderId
                                 join S in context.Statuses on O.StatusId equals S.Id
                                 where
                                   O.Id == orderid
                                 select new
                                 {
                                     Id = O.Id,
                                     CharityId = O.CharityId == null ? -1 : O.CharityId,
                                     StatusNameEn = S.NameEn,
                                     StatusNameAr = S.NameAr,
                                     CreatedOnDate = O.CreatedOnDate,
                                     CreatedById = O.CreatedById,
                                     TotalPriceKwd = P.TotalPriceKwd,
                                     TotalPriceUsd = P.TotalPriceUsd,
                                     PromoCode = P.PromoCode,
                                     CodeValue = P.CodeValue,
                                     ShippingPriceKwd = P.ShippingPriceKwd,
                                     ShiipingPriceUsd = P.ShiipingPriceUsd,
                                     FirstName = D.FirstName,
                                     LastName = D.LastName,
                                     Mobile = D.Mobile,
                                     Email = D.Email,
                                     BillingCityId = D.BillingCityId,
                                     ShippingCityId = D.ShippingCityId,
                                     Notes = D.Notes,
                                     BillingTown = D.BillingTown,
                                     BillingBlock = D.BillingBlock,
                                     BillingStreet = D.BillingStreet,
                                     BillingHouseNo = D.BillingHouseNo,
                                     BillingApartmentNo = D.BillingApartmentNo,
                                     BillingPaciNo = D.BillingPaciNo,
                                     ShippingTown = D.ShippingTown,
                                     ShippingBlock = D.ShippingBlock,
                                     ShippingStreet = D.ShippingStreet,
                                     ShippingHouseNo = D.ShippingHouseNo,
                                     ShippingApartmentNo = D.ShippingApartmentNo,
                                     ShippingNumber = D.ShippingNumber,
                                     ShippingPaciNo = D.ShippingPaciNo
                                 });

                    foreach (var data in query)
                    {
                        _details.Data = data;
                    }
                }
                else
                {
                    var query = (from O in context.Orders
                                 join D in context.Detail1 on O.Id equals D.OrderId
                                 join P in context.Price1 on O.Id equals P.OrderId
                                 join S in context.Statuses on O.StatusId equals S.Id
                                 where
                                   O.Id == orderid
                                   && O.CreatedById == userid
                                 select new
                                 {
                                     Id = O.Id,
                                     CharityId = O.CharityId == null ? -1 : O.CharityId,
                                     StatusNameEn = S.NameEn,
                                     StatusNameAr = S.NameAr,
                                     CreatedOnDate = O.CreatedOnDate,
                                     CreatedById = O.CreatedById,
                                     TotalPriceKwd = P.TotalPriceKwd,
                                     TotalPriceUsd = P.TotalPriceUsd,
                                     PromoCode = P.PromoCode,
                                     CodeValue = P.CodeValue,
                                     ShippingPriceKwd = P.ShippingPriceKwd,
                                     ShiipingPriceUsd = P.ShiipingPriceUsd,
                                     FirstName = D.FirstName,
                                     LastName = D.LastName,
                                     Mobile = D.Mobile,
                                     Email = D.Email,
                                     BillingCityId = D.BillingCityId,
                                     ShippingCityId = D.ShippingCityId,
                                     Notes = D.Notes,
                                     BillingTown = D.BillingTown,
                                     BillingBlock = D.BillingBlock,
                                     BillingStreet = D.BillingStreet,
                                     BillingHouseNo = D.BillingHouseNo,
                                     BillingApartmentNo = D.BillingApartmentNo,
                                     BillingPaciNo = D.BillingPaciNo,
                                     ShippingTown = D.ShippingTown,
                                     ShippingBlock = D.ShippingBlock,
                                     ShippingStreet = D.ShippingStreet,
                                     ShippingHouseNo = D.ShippingHouseNo,
                                     ShippingApartmentNo = D.ShippingApartmentNo,
                                     ShippingNumber = D.ShippingNumber,
                                     ShippingPaciNo = D.ShippingPaciNo
                                 });

                    foreach (var data in query)
                    {
                        _details.Data = data;
                    }
                }

                _details.Products = new List<object>();

                var query2 = (from P in context.Product1
                              join Prod in context.Products on P.ProductId equals Prod.Id
                              where
                                    P.OrderId == orderid
                              select new
                              {
                                  Kwd = P.Kwd,
                                  Usd = P.Usd,
                                  Quantity = P.Quantity,
                                  NameEn = Prod.NameEn,
                                  NameAr = Prod.NameAr,
                                  product_token = Prod.Token
                              });

                foreach (var data in query2)
                {
                    _details.Products.Add(data);
                }

                GeneralEntities context2 = new GeneralEntities();

                _details.Persons = new List<Shareholder>();

                var query7 = (from P in context.Persons
                              join Prod in context.Products on P.ProductId equals Prod.Id
                              join Pur in context.ProductPurposes on P.ProductPurposeId equals Pur.Id
                              join Ch in context.Charities on P.CharityId equals Ch.Id into dept
                              from charities in dept.DefaultIfEmpty()
                              join Sh in context.PersonShippingAddresses on P.Id equals Sh.PersonId into shippingAddress
                              from shipping in shippingAddress.DefaultIfEmpty()
                              join Ci in context.Cities on shipping.CityId equals Ci.CityId into shippingCity
                              from city in shippingCity.DefaultIfEmpty()
                              where
                                    P.OrderId == orderid
                              select new
                              {
                                  FullName = P.FullName,
                                  NameEn = Prod.NameEn,
                                  NameAr = Prod.NameAr,
                                  product_token = Prod.Token,
                                  Quantity = P.Quantity,
                                  CharityId = P.CharityId,
                                  PurposeId = P.ProductPurposeId == null ? -1 : P.ProductPurposeId,
                                  PurposeName = Pur.NameEn == null ? string.Empty : Pur.NameEn,
                                  PurposeNameAr = Pur.NameAr == null ? string.Empty : Pur.NameAr,
                                  AddressDetails = P.AddressDetails,
                                  CharityNameEn = charities.NameEn == null ? "Not selected" : charities.NameEn,
                                  CharityNameAr = charities.NameAr == null ? "لم يتم اختياره" : charities.NameAr,
                                  CountryId = charities.CountryId == null ? 0 : charities.CountryId,
                                  ShippingAddressEn = city.CityId == null ? string.Empty : city.CityNameEn + ", " + shipping.Town + ", " + shipping.Block + ", House # " + shipping.HouseNo.ToString() + ", Apartment # " + shipping.ApartmentNo.ToString(),
                                  ShippingAddressAr = city.CityId == null ? string.Empty : city.CityNameAr + ", " + shipping.Town + ", " + shipping.Block + ", House # " + shipping.HouseNo.ToString() + ", Apartment # " + shipping.ApartmentNo.ToString(),
                                  ContactNumber = city.CityId == null ? string.Empty : shipping.ContactNumber,
                                  CuttingNotes = shipping.CuttingNotes == null ? string.Empty : shipping.CuttingNotes
                              });

                foreach (var data in query7)
                {
                    Shareholder item = new Shareholder();

                    item.FullName = data.FullName;
                    item.NameEn = data.NameEn;
                    item.NameAr = data.NameAr;
                    item.product_token = data.product_token;
                    item.Quantity = data.Quantity;
                    item.CharityId = data.CharityId;
                    item.CharityNameEn = data.CharityNameEn;
                    item.CharityNameAr = data.CharityNameAr;
                    item.PurposeId = data.PurposeId;
                    item.PurposeName = data.PurposeName;
                    item.PurposeNameAr = data.PurposeNameAr;
                    item.AddressDetails = data.AddressDetails;
                    item.ShippingAddressEn = data.ShippingAddressEn;
                    item.ShippingAddressAr = data.ShippingAddressAr;
                    item.ContactNumber = data.ContactNumber;
                    item.CuttingNotes = data.CuttingNotes;

                    if (data.CountryId != 0)
                    {
                        item.CountryId = data.CountryId;
                        var CountryData = context2.Countries.SingleOrDefault(b => b.CountryId == data.CountryId);
                        item.CountryNameEn = CountryData.CountryNameEn;
                        item.CountryNameAr = CountryData.CountryNameAr;

                    }
                    else
                    {
                        item.CountryId = 0;
                        item.CountryNameEn = "Location and charity";
                        item.CountryNameAr = "الموقع والجمعيات الخيرية";
                    }

                    _details.Persons.Add(item);
                }

                int BillingCityId = int.Parse(GetObjectValue(_details.Data, "BillingCityId"));
                int ShippingityId = int.Parse(GetObjectValue(_details.Data, "ShippingCityId"));
                var BillingCity = (from Ci in context2.Cities
                                   join Co in context2.Countries on Ci.CountryId equals Co.CountryId
                                   where
                                     Ci.CityId == BillingCityId
                                   select new
                                   {
                                       CityNameEn = Ci.CityNameEn,
                                       CityNameAr = Ci.CityNameAr,
                                       CountryNameEn = Co.CountryNameEn,
                                       CountryNameAr = Co.CountryNameAr

                                   });

                foreach (var data in BillingCity)
                {
                    _details.BillingAddress = data;
                }

                var ShippingCity = (from Ci in context2.Cities
                                    join Co in context2.Countries on Ci.CountryId equals Co.CountryId
                                    where
                                      Ci.CityId == ShippingityId
                                    select new
                                    {
                                        CityNameEn = Ci.CityNameEn,
                                        CityNameAr = Ci.CityNameAr,
                                        CountryNameEn = Co.CountryNameEn,
                                        CountryNameAr = Co.CountryNameAr

                                    });

                foreach (var data in ShippingCity)
                {
                    _details.ShippingAddress = data;
                }

                int UserId = int.Parse(GetObjectValue(_details.Data, "CreatedById"));

                UsersEntities context3 = new UsersEntities();

                var UserInfo = (from U in context3.Users
                                where
                                  U.Id == UserId
                                select new
                                {
                                    UserId = U.Id,
                                    Token = U.Token

                                });

                foreach (var data in UserInfo)
                {
                    _details.Submitter = data;
                }

                var query5 = (from T in context.Tracks
                              join S in context.Statuses on T.StatusId equals S.Id
                              where
                                    T.OrderId == orderid
                              orderby T.Id ascending
                              select new
                              {
                                  StatuseName = S.NameEn,
                                  StatusNameAr = S.NameAr,
                                  CreatedOnDate = T.CreatedOnDate,
                                  CreatedById = T.CreatedById,
                                  URL = T.URL
                              });

                _details.Tracks = new List<TrackItem>();

                foreach (var data in query5)
                {
                    TrackItem item = new TrackItem();

                    item.StatuseName = data.StatuseName;
                    item.StatuseNameAr = data.StatusNameAr;
                    item.CreatedOnDate = data.CreatedOnDate;
                    var _user = context3.Users.SingleOrDefault(b => b.Id == data.CreatedById);
                    item.Email = _user.Email;
                    item.URL = data.URL;

                    _details.Tracks.Add(item);
                }

                var query6 = (from T in context.Transactions
                              where
                                    T.OrderId == orderid
                              orderby T.Id ascending
                              select new
                              {
                                  Id = T.Id,
                                  OrderId = T.OrderId,
                                  Result = T.Result,
                                  Amount = T.Amount,
                                  Date = T.Date,
                                  PaymentId = T.PaymentId,
                                  Ref = T.Ref,
                                  TransId = T.TransId,
                                  TrackId = T.TrackId
                              });

                _details.Transactions = new List<TransactionItem>();

                foreach (var data in query6)
                {
                    TransactionItem item = new TransactionItem();
                    item.Id = data.Id;
                    item.OrderId = data.OrderId;
                    item.Result = data.Result;
                    item.Amount = data.Amount;
                    item.Date = data.Date;
                    item.PaymentId = data.PaymentId;
                    item.Ref = data.Ref;
                    item.TransId = data.TransId;
                    item.TrackId = data.TrackId;

                    _details.Transactions.Add(item);
                }

                int _CharityId = int.Parse(GetObjectValue(_details.Data, "CharityId"));

                var queryCharity = (from P in context2.Charities
                                    join D in context2.Countries on P.CountryId equals D.CountryId
                                    where
                                       P.Id == _CharityId
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
                                        CountryId = P.CountryId
                                    });

                _details.CharityInfo = queryCharity.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _details;
        }

        public object GetbatchTransactionDetailsById(int batchid)
        {
            object result = new object();

            try
            {
                productsEntities context = new productsEntities();
                UsersEntities context_user = new UsersEntities();
                GeneralEntities context_tracks = new GeneralEntities();

                var query5 = (from T in context.Track1
                              where
                                    T.BatchId == batchid
                              orderby T.Id descending
                              select new
                              {
                                  StatusId = T.StatusId,
                                  CreatedOnDate = T.CreatedOnDate,
                                  CreatedById = T.CreatedById,
                                  URL = T.URL
                              }).ToList();

                List<TrackItem> Tracks = new List<TrackItem>();

                foreach (var data in query5)
                {
                    TrackItem item = new TrackItem();

                    var _Status = context_tracks.Status1.SingleOrDefault(b => b.Id == data.StatusId);
                    item.StatuseName = _Status.NameEn;
                    item.CreatedOnDate = data.CreatedOnDate;
                    var _user = context_user.Users.SingleOrDefault(b => b.Id == data.CreatedById);
                    item.Email = _user.Email;
                    item.URL = data.URL;

                    Tracks.Add(item);
                }

                result = Tracks.ToList();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return result;
        }

        public void change_order_status(int orderid, int status, string user_token)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities context2 = new productsEntities();

                var record = context2.Orders.SingleOrDefault(d => d.Id == orderid);

                if (record != null)
                {
                    record.StatusId = status;
                    record.LastModById = userid;
                    record.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }

                Track obj = new Track();
                obj.StatusId = status;
                obj.OrderId = orderid;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.Tracks.Add(obj);
                context2.SaveChanges();

                string path = HttpContext.Current.Server.MapPath("~/assets/emails/action.html");

                if (File.Exists(path))
                {
                    User = context.Users.SingleOrDefault(d => d.Id == record.CreatedById);

                    string readText = File.ReadAllText(path);
                    readText = readText.Replace("@Action", record.Status.NameEn);
                    readText = readText.Replace("@Email", User.Email);
                    readText = readText.Replace("#Number", "#" + record.Id);
                    readText = readText.Replace("@Url", "https://localhost:44346/order?Id=" + record.Id);
                    SendEmail(User.Email, "Kabshak | Order #" + record.Id + " - " + record.Status.NameEn, readText, string.Empty, string.Empty);
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
                    path = HttpContext.Current.Server.MapPath("~/assets/emails/admin/action.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        readText = readText.Replace("@Action", record.Status.NameEn);
                        readText = readText.Replace("@Email", data.Email);
                        readText = readText.Replace("#Number", "#" + record.Id);
                        readText = readText.Replace("@Url", "https://localhost:44346/admin/order?Id=" + record.Id);
                        SendEmail(data.Email, "Kabshak | Order #" + record.Id + " - " + record.Status.NameEn, readText, string.Empty, string.Empty);
                    }
                }


                if (status == 1002)
                {
                    var billing = context2.Detail1.SingleOrDefault(d => d.OrderId == orderid);

                    path = HttpContext.Current.Server.MapPath("~/assets/emails/InvoicePDF.html");
                    string readText = File.ReadAllText(path);

                    readText = GetInvoiceTemplet(readText, orderid);

                    string _filename = "Invoice_" + orderid.ToString();
                    string URL = HttpContext.Current.Server.MapPath("~/assets/PDF/") + _filename + ".pdf";

                    if (!File.Exists(URL))
                    {
                        SelectPdf.HtmlToPdf converter = new HtmlToPdf();
                        SelectPdf.PdfDocument doc = converter.ConvertHtmlString(readText);
                        doc.Save(URL);
                        doc.Close();
                    }

                    string email = billing.Email;

                    if (email != string.Empty)
                    {
                        path = HttpContext.Current.Server.MapPath("~/assets/emails/InvoiceEmailText.html");
                        readText = File.ReadAllText(path);
                        readText = readText.Replace("@Email", email.Trim());
                        readText = readText.Replace("#Number", orderid.ToString());
                        commonBL _commonBL = new commonBL();
                        _commonBL.SendEmail(email.Trim(), "Kabshak | Order #" + orderid.ToString() + " Invoice", readText, string.Empty, URL);
                    }
                }

                int submitterId = int.Parse(GetObjectValue(record, "CreatedById"));
                User = context.Users.SingleOrDefault(d => d.Id == submitterId);
                string _FirebaseToken = GetObjectValue(User, "FirebaseToken");

                if (_FirebaseToken != string.Empty)
                {
                    GeneralEntities context3 = new GeneralEntities();
                    var OrderStatus = context3.Statuses.SingleOrDefault(d => d.Id == status);
                    string StatusName = GetObjectValue(OrderStatus, "NameEn");

                    FirebaseService _obj = new FirebaseService();
                    Task<object> result;
                    result = _obj.Push_Notification("Your Order Status Has Been Updated", "We wanted to let you know that the status of your order has been updated. Your order [" + orderid.ToString() + "] is now [" + StatusName + "].", _FirebaseToken, user_token, orderid, "Customer");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

        }

        public void admin_change_order_status(int orderid, int status, string user_token, string url)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities context2 = new productsEntities();

                var record = context2.Orders.SingleOrDefault(d => d.Id == orderid);

                Track obj = new Track();
                obj.StatusId = status;
                obj.OrderId = orderid;
                obj.URL = url == string.Empty ? null : url;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.Tracks.Add(obj);
                context2.SaveChanges();

                string path = HttpContext.Current.Server.MapPath("~/assets/emails/action.html");

                if (File.Exists(path))
                {
                    User = context.Users.SingleOrDefault(d => d.Id == record.CreatedById);

                    string readText = File.ReadAllText(path);
                    readText = readText.Replace("@Action", record.Status.NameEn);
                    readText = readText.Replace("@Email", User.Email);
                    readText = readText.Replace("#Number", "#" + record.Id);
                    readText = readText.Replace("@Url", "https://localhost:44346/order?Id=" + record.Id);
                    SendEmail(User.Email, "Kabshak | Order #" + record.Id + " - " + record.Status.NameEn, readText, string.Empty, string.Empty);
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
                    path = HttpContext.Current.Server.MapPath("~/assets/emails/admin/action.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        readText = readText.Replace("@Action", record.Status.NameEn);
                        readText = readText.Replace("@Email", data.Email);
                        readText = readText.Replace("#Number", "#" + record.Id);
                        readText = readText.Replace("@Url", "https://localhost:44346/admin/order?Id=" + record.Id);
                        SendEmail(data.Email, "Kabshak | Order #" + record.Id + " - " + record.Status.NameEn, readText, string.Empty, string.Empty);
                    }
                }

                int submitterId = int.Parse(GetObjectValue(record, "CreatedById"));
                User = context.Users.SingleOrDefault(d => d.Id == submitterId);
                string _FirebaseToken = GetObjectValue(User, "FirebaseToken");

                if (_FirebaseToken != string.Empty)
                {
                    GeneralEntities context3 = new GeneralEntities();
                    var OrderStatus = context3.Statuses.SingleOrDefault(d => d.Id == status);
                    string StatusName = GetObjectValue(OrderStatus, "NameEn");

                    FirebaseService _obj = new FirebaseService();
                    Task<object> result;
                    result = _obj.Push_Notification("Your Order Status Has Been Updated", "We wanted to let you know that the status of your order has been updated. Your order [" + orderid.ToString() + "] is now [" + StatusName + "].", _FirebaseToken, user_token, orderid, "Customer");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

        }

        public string edit_sub_category_products(string token, string user_token, int stock, int sub_category, string sub_category_txt, float usd, int discount, string content_en, string content_ar)
        {
            string productName = string.Empty;

            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities context2 = new productsEntities();
                var product = context2.Products.SingleOrDefault(d => d.Token == token);

                GeneralEntities context3 = new GeneralEntities();
                var category = context3.SubCategories.SingleOrDefault(d => d.Id == sub_category);


                if (product != null)
                {
                    if (product.SubCategoryId != sub_category)
                    {
                        productName = product.NameEn + "-" + category.NameEn;
                        string productNameAr = product.NameAr + "-" + category.NameAr;

                        product.NameEn = productName;
                        product.NameAr = productNameAr;
                        product.SubCategoryId = sub_category;
                        product.LastModById = userid;
                        product.LastModOnDate = DateTime.Now;
                        context2.SaveChanges();
                    }
                }

                var product_details = context2.Details.SingleOrDefault(d => d.ProductId == product.Id);

                if (product_details != null)
                {
                    product_details.DescriptionEn = content_en;
                    product_details.DescriptionAr = content_ar;
                    product_details.LastModById = userid;
                    product_details.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }

                var product_stock = context2.Stocks.SingleOrDefault(d => d.ProductId == product.Id);

                if (product_stock != null)
                {
                    product_stock.Amount = stock;
                    product_stock.LastModById = userid;
                    product_stock.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }

                var product_price = context2.Prices.SingleOrDefault(d => d.ProductId == product.Id);

                if (product_price != null)
                {
                    product_price.Usd = usd;
                    product_price.LastModById = userid;
                    product_price.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }

                if (discount > 0)
                {
                    product.Discount = discount;
                    product.LastModById = userid;
                    product.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return productName;
        }

        public string save_sub_category_products(string main_token, string user_token, int stock, int sub_category, string sub_category_txt, float usd, int discount, string content_en, string content_ar)
        {
            string productName = string.Empty;

            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                string _tkn = EnryptString(GetToken());

                productsEntities context2 = new productsEntities();
                var product = context2.Products.SingleOrDefault(d => d.Token == main_token);

                GeneralEntities context3 = new GeneralEntities();
                var category = context3.SubCategories.SingleOrDefault(d => d.Id == sub_category);

                productName = product.NameEn + " - " + category.NameEn;
                string productNameAr = product.NameAr + " - " + category.NameAr;

                Product obj = new Product();
                obj.NameEn = productName.Trim();
                obj.NameAr = productNameAr.Trim();
                obj.CategoryId = product.CategoryId;
                obj.SubCategoryId = sub_category;
                obj.BrandId = product.BrandId;
                obj.IsNewArrival = product.IsNewArrival;
                obj.Token = _tkn;
                obj.MainToken = main_token;
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.Products.Add(obj);
                context2.SaveChanges();

                int productId = obj.Id;

                var product_details = context2.Details.SingleOrDefault(d => d.ProductId == product.Id);

                if (product_details != null)
                {
                    Detail obj2 = new Detail();
                    obj2.ProductId = productId;
                    obj2.BriefEn = product_details.BriefEn.Trim();
                    obj2.BriefAr = product_details.BriefAr.Trim();
                    obj2.DescriptionEn = content_en;
                    obj2.DescriptionAr = content_ar;
                    obj2.SpecificationEn = product_details.SpecificationEn.Trim();
                    obj2.SpecificationAr = product_details.SpecificationAr.Trim();
                    obj2.SKU = product_details.SKU.Trim();
                    obj2.CreatedById = userid;
                    obj2.CreatedOnDate = DateTime.Now;
                    context2.Details.Add(obj2);
                    context2.SaveChanges();
                }

                var Images = context2.Images.SingleOrDefault(d => d.ProductId == product.Id && d.IsMain == true);

                if (Images != null)
                {
                    DataAccess.Modals.Image img = new DataAccess.Modals.Image();
                    img.ProductId = productId;
                    img.Url = Images.Url;
                    img.IsMain = true;
                    img.CreatedById = userid;
                    img.CreatedOnDate = DateTime.Now;
                    context2.Images.Add(img);
                    context2.SaveChanges();
                }

                Stock _obj = new Stock();
                _obj.ProductId = productId;
                _obj.Amount = stock;
                _obj.CreatedById = userid;
                _obj.CreatedOnDate = DateTime.Now;
                context2.Stocks.Add(_obj);
                context2.SaveChanges();

                Price _obj2 = new Price();
                _obj2.ProductId = productId;
                _obj2.Kwd = 0;
                _obj2.Usd = Double.Parse(usd.ToString());
                _obj2.CreatedById = userid;
                _obj2.CreatedOnDate = DateTime.Now;
                context2.Prices.Add(_obj2);
                context2.SaveChanges();

                if (discount > 0)
                {
                    product = context2.Products.SingleOrDefault(d => d.Id == productId);
                    product.Discount = discount;
                    product.LastModById = userid;
                    product.LastModOnDate = DateTime.Now;
                    context2.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return productName;
        }

        public object GetProductOrdersList(string token)
        {
            var _data = new object();
            var _list = new List<object>();

            try
            {
                productsEntities context = new productsEntities();
                var product = context.Products.SingleOrDefault(d => d.Token == token);

                var query = (from O in context.Orders
                             join D in context.Detail1 on O.Id equals D.OrderId
                             join P in context.Price1 on O.Id equals P.OrderId
                             join S in context.Statuses on O.StatusId equals S.Id
                             join Pro in context.Product1 on O.Id equals Pro.OrderId
                             join Products in context.Products on Pro.ProductId equals Products.Id
                             where
                               Products.MainToken == token
                             orderby O.Id descending
                             select new
                             {
                                 Id = O.Id,
                                 StatusNameEn = S.NameEn,
                                 StatusNameAr = S.NameAr,
                                 CreatedOnDate = O.CreatedOnDate,
                                 TotalPriceKwd = P.TotalPriceKwd,
                                 TotalPriceUsd = P.TotalPriceUsd - (P.CodeValue != null ? P.CodeValue : 0),
                                 ShippingPriceKwd = P.ShippingPriceKwd,
                                 ShiipingPriceUsd = P.ShiipingPriceUsd,
                                 FirstName = D.FirstName,
                                 LastName = D.LastName,
                                 Mobile = D.Mobile,
                                 Email = D.Email,
                                 BillingCityId = D.BillingCityId,
                                 ShippingCityId = D.ShippingCityId,
                                 Notes = D.Notes
                             }).Distinct();

                foreach (var data in query)
                {
                    _list.Add(data);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _list;
        }

        public void chnage_product_activation_status(string token, string user_token, bool status)
        {

            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities context2 = new productsEntities();

                var record = context2.Products.SingleOrDefault(d => d.Token == token);

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

        public object save_product_info(string user_token, string name_en, string name_ar, int category, int sub_category, int brand, int new_arrival)
        {
            var result = new object();

            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                string _tkn = EnryptString(GetToken());

                int? value = sub_category;

                if (value == -1)
                {
                    value = null;
                }

                productsEntities context2 = new productsEntities();
                Product obj = new Product();
                obj.NameEn = name_en.Trim();
                obj.NameAr = name_ar.Trim();
                obj.CategoryId = category;
                obj.SubCategoryId = value;
                obj.BrandId = brand;
                obj.IsNewArrival = (new_arrival == 1 ? true : false);
                obj.Token = _tkn;
                obj.IsActive = true;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                context2.Products.Add(obj);
                context2.SaveChanges();

                result = context2.Products.SingleOrDefault(o => o.Token == _tkn.Trim() && o.IsActive == true);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return result;
        }

        public void edit_product_info(string token, string user_token, string name_en, string name_ar, int category, int sub_category, int brand, int new_arrival)
        {
            try
            {
                UsersEntities context = new UsersEntities();
                var User = context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities context2 = new productsEntities();

                var record = context2.Products.SingleOrDefault(d => d.Token == token);

                int? value = sub_category;

                if (value == -1)
                {
                    value = null;
                }

                if (record != null)
                {
                    record.NameEn = name_en.Trim();
                    record.NameAr = name_ar.Trim();
                    record.CategoryId = category;
                    record.SubCategoryId = value;
                    record.BrandId = brand;
                    record.IsNewArrival = (new_arrival == 1 ? true : false);
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

        public void save_product_details(string token, string user_token, string brief_en, string brief_ar, string sku, string description_en, string description_ar, string specification_en, string specification_ar)
        {
            try
            {
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities product_context = new productsEntities();
                var product = product_context.Products.SingleOrDefault(d => d.Token == token);
                int productId = int.Parse(GetObjectValue(product, "Id"));

                if (product.Details.Count <= 0)
                {
                    Detail obj = new Detail();
                    obj.ProductId = productId;
                    obj.BriefEn = brief_en.Trim();
                    obj.BriefAr = brief_ar.Trim();
                    obj.DescriptionEn = description_en.Trim();
                    obj.DescriptionAr = description_ar.Trim();
                    obj.SpecificationEn = specification_en.Trim();
                    obj.SpecificationAr = specification_ar.Trim();
                    obj.SKU = sku.Trim();
                    obj.CreatedById = userid;
                    obj.CreatedOnDate = DateTime.Now;
                    product_context.Details.Add(obj);
                    product_context.SaveChanges();
                }
                else
                {
                    var record = product_context.Details.SingleOrDefault(d => d.ProductId == productId);

                    if (record != null)
                    {
                        record.BriefEn = brief_en.Trim();
                        record.BriefAr = brief_ar.Trim();
                        record.DescriptionEn = description_en.Trim();
                        record.DescriptionAr = description_ar.Trim();
                        record.SpecificationEn = specification_en.Trim();
                        record.SpecificationAr = specification_ar.Trim();
                        record.SKU = sku.Trim();
                        record.LastModById = userid;
                        record.LastModOnDate = DateTime.Now;
                        product_context.SaveChanges();
                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public string submit_batch_slaughtered(int batchid, int slaughterhouseId)
        {
            string _result = string.Empty;

            try
            {
                productsEntities context = new productsEntities();

                var record = context.Batches.SingleOrDefault(d => d.Id == batchid);

                if (record != null)
                {
                    if (record.StatusId == 3 && record.SlaughterhouseId == slaughterhouseId)
                    {
                        UsersEntities user_context = new UsersEntities();
                        var User = user_context.Users.SingleOrDefault(d => d.Email.Trim() == "info@kabshak.com");

                        record.StatusId = 4;
                        record.LastModById = User.Id;
                        record.LastModOnDate = DateTime.Now;
                        context.SaveChanges();

                        Track1 trakobj2 = new Track1();
                        trakobj2.BatchId = batchid;
                        trakobj2.StatusId = 4;
                        trakobj2.CreatedById = User.Id;
                        trakobj2.CreatedOnDate = DateTime.Now;
                        context.Track1.Add(trakobj2);
                        context.SaveChanges();
                    }
                    else
                    {
                        _result = "Security problem, please contact the administrator!";
                    }
                }
                else
                {
                    _result = "No batch found, please contact the administrator!";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
                _result = ex.ToString();
            }

            return _result;
        }

        public string submit_batch_shipped(int batchid, int slaughterhouseId, string url)
        {
            string _result = string.Empty;

            try
            {
                productsEntities context = new productsEntities();

                var record = context.Batches.SingleOrDefault(d => d.Id == batchid);

                if (record != null)
                {
                    if (record.StatusId == 4 && record.SlaughterhouseId == slaughterhouseId)
                    {
                        UsersEntities user_context = new UsersEntities();
                        var User = user_context.Users.SingleOrDefault(d => d.Email.Trim() == "info@kabshak.com");

                        record.StatusId = 8;
                        record.LastModById = User.Id;
                        record.LastModOnDate = DateTime.Now;
                        context.SaveChanges();

                        Track1 trakobj2 = new Track1();
                        trakobj2.BatchId = batchid;
                        trakobj2.StatusId = 8;
                        trakobj2.URL = url == string.Empty ? null : url;
                        trakobj2.CreatedById = User.Id;
                        trakobj2.CreatedOnDate = DateTime.Now;
                        context.Track1.Add(trakobj2);
                        context.SaveChanges();
                    }
                    else
                    {
                        _result = "Security problem, please contact the administrator!";
                    }
                }
                else
                {
                    _result = "No batch found, please contact the administrator!";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
                _result = ex.ToString();
            }

            return _result;
        }

        public string submit_batch_distributed(int batchid, int charityid)
        {

            string _result = string.Empty;

            try
            {
                productsEntities context = new productsEntities();

                var record = context.Batches.SingleOrDefault(d => d.Id == batchid);

                if (record != null)
                {
                    if (record.StatusId == 9 && record.CharityId == charityid)
                    {
                        UsersEntities user_context = new UsersEntities();
                        var User = user_context.Users.SingleOrDefault(d => d.Email.Trim() == "info@kabshak.com");

                        record.StatusId = 6;
                        record.LastModById = User.Id;
                        record.LastModOnDate = DateTime.Now;
                        context.SaveChanges();

                        Track1 trakobj2 = new Track1();
                        trakobj2.BatchId = batchid;
                        trakobj2.StatusId = 6;
                        trakobj2.CreatedById = User.Id;
                        trakobj2.CreatedOnDate = DateTime.Now;
                        context.Track1.Add(trakobj2);
                        context.SaveChanges();
                    }
                    else
                    {
                        _result = "Security problem, please contact the administrator!";
                    }
                }
                else
                {
                    _result = "No batch found, please contact the administrator!";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
                _result = ex.ToString();
            }

            return _result;
        }

        public void ChangeOrdersStatusToReceived(int batchid, string url)
        {
            try
            {
                productsEntities context = new productsEntities();
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Email.ToLower() == "info@kabshak.com");

                var data = context.GetBatchItems(batchid, 1, 50000);

                List<int> intList = new List<int>();

                foreach (var item in data)
                {
                    bool isInList = intList.IndexOf(item.OrderId) != -1;

                    if (!isInList)
                    {
                        Track obj = new Track();
                        obj.StatusId = 1005;
                        obj.OrderId = item.OrderId;
                        obj.CreatedById = User.Id;
                        obj.CreatedOnDate = DateTime.Now;
                        obj.URL = (url.Trim() == string.Empty) ? null : url.Trim();
                        context.Tracks.Add(obj);

                        intList.Add(item.OrderId);
                    }
                }

                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void ChangeOrdersStatusToDistributed(int batchid)
        {
            try
            {
                productsEntities context = new productsEntities();
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Email.ToLower() == "info@kabshak.com");

                var data = context.GetBatchItems(batchid, 1, 50000);

                List<int> intList = new List<int>();

                foreach (var item in data)
                {
                    bool isInList = intList.IndexOf(item.OrderId) != -1;

                    if (!isInList)
                    {
                        Track obj = new Track();
                        obj.StatusId = 1006;
                        obj.OrderId = item.OrderId;
                        obj.CreatedById = User.Id;
                        obj.CreatedOnDate = DateTime.Now;
                        context.Tracks.Add(obj);

                        intList.Add(item.OrderId);
                    }
                }

                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void ChangeOrdersStatusToShipped(int batchid)
        {
            try
            {
                productsEntities context = new productsEntities();
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Email.ToLower() == "info@kabshak.com");

                var data = context.GetBatchItems(batchid, 1, 50000);

                List<int> intList = new List<int>();

                foreach (var item in data)
                {
                    bool isInList = intList.IndexOf(item.OrderId) != -1;

                    if (!isInList)
                    {
                        Track obj = new Track();
                        obj.StatusId = 1004;
                        obj.OrderId = item.OrderId;
                        obj.CreatedById = User.Id;
                        obj.CreatedOnDate = DateTime.Now;
                        context.Tracks.Add(obj);

                        intList.Add(item.OrderId);
                    }
                }

                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }
        public string submit_batch_received(int batchid, int charityid, string url)
        {

            string _result = string.Empty;

            try
            {
                productsEntities context = new productsEntities();

                var record = context.Batches.SingleOrDefault(d => d.Id == batchid);

                if (record != null)
                {
                    if (record.StatusId == 5 && record.CharityId == charityid)
                    {
                        UsersEntities user_context = new UsersEntities();
                        var User = user_context.Users.SingleOrDefault(d => d.Email.Trim() == "info@kabshak.com");

                        record.StatusId = 9;
                        record.LastModById = User.Id;
                        record.LastModOnDate = DateTime.Now;
                        context.SaveChanges();

                        Track1 trakobj2 = new Track1();
                        trakobj2.BatchId = batchid;
                        trakobj2.StatusId = 9;
                        trakobj2.CreatedById = User.Id;
                        trakobj2.CreatedOnDate = DateTime.Now;
                        trakobj2.URL = (url.Trim() == string.Empty) ? null : url.Trim();
                        context.Track1.Add(trakobj2);
                        context.SaveChanges();

                        SaveBatchNotification(batchid, "Batch #" + batchid.ToString() + " has been received by a charitable foundation.", record.SlaughterhouseId, -1, User.Id);

                        GeneralEntities context2 = new GeneralEntities();
                        var Slaughterhouse = context2.Slaughterhouses.SingleOrDefault(d => d.Id == record.SlaughterhouseId);
                        string _FirebaseToken = GetObjectValue(Slaughterhouse, "FirebaseToken");

                        if (_FirebaseToken != string.Empty)
                        {
                            FirebaseService _obj = new FirebaseService();
                            Task<object> result;
                            result = _obj.Push_Notification("Batch #" + batchid.ToString(), "Batch #" + batchid.ToString() + " has been received by a charitable foundation.", _FirebaseToken, batchid.ToString(), batchid, "Slaughterhouse");
                        }
                    }
                    else
                    {
                        _result = "Security problem, please contact the administrator!";
                    }
                }
                else
                {
                    _result = "No batch found, please contact the administrator!";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
                _result = ex.ToString();
            }

            return _result;
        }

        public void ChangeOrdersStatusToDelivered(int batchid, string user_token)
        {
            try
            {
                productsEntities context = new productsEntities();
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);

                var data = context.GetBatchItems(batchid, 1, 50000);

                List<int> intList = new List<int>();

                foreach (var item in data)
                {
                    bool isInList = intList.IndexOf(item.OrderId) != -1;

                    if (!isInList)
                    {
                        Track obj = new Track();
                        obj.StatusId = 1007;
                        obj.OrderId = item.OrderId;
                        obj.CreatedById = User.Id;
                        obj.CreatedOnDate = DateTime.Now;
                        context.Tracks.Add(obj);

                        intList.Add(item.OrderId);
                    }
                }

                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public string batch_completed(int batchid, string user_token)
        {

            string _result = string.Empty;

            try
            {
                productsEntities context = new productsEntities();
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                var record = context.Batches.SingleOrDefault(d => d.Id == batchid);

                if (record != null)
                {
                    if ((record.StatusId == 6 || record.StatusId == 10) && User.IsAdmin == true)
                    {
                        record.StatusId = 7;
                        record.LastModById = User.Id;
                        record.LastModOnDate = DateTime.Now;
                        context.SaveChanges();

                        Track1 trakobj2 = new Track1();
                        trakobj2.BatchId = batchid;
                        trakobj2.StatusId = 7;
                        trakobj2.CreatedById = User.Id;
                        trakobj2.CreatedOnDate = DateTime.Now;
                        context.Track1.Add(trakobj2);
                        context.SaveChanges();

                        SaveBatchNotification(batchid, "Batch #" + batchid.ToString() + " completed and closed, thank you for your work.", record.SlaughterhouseId, record.CharityId, User.Id);

                        GeneralEntities context2 = new GeneralEntities();
                        var Slaughterhouse = context2.Slaughterhouses.SingleOrDefault(d => d.Id == record.SlaughterhouseId);
                        string _FirebaseToken = GetObjectValue(Slaughterhouse, "FirebaseToken");

                        if (_FirebaseToken != string.Empty)
                        {
                            FirebaseService _obj = new FirebaseService();
                            Task<object> result;
                            result = _obj.Push_Notification("Batch #" + batchid.ToString(), "Batch #" + batchid.ToString() + " completed and closed, thank you for your work.", _FirebaseToken, batchid.ToString(), batchid, "Slaughterhouse");
                        }

                        var Charity = context2.Charities.SingleOrDefault(d => d.Id == record.CharityId);
                        _FirebaseToken = GetObjectValue(Charity, "FirebaseToken");

                        if (_FirebaseToken != string.Empty)
                        {
                            FirebaseService _obj = new FirebaseService();
                            Task<object> result;
                            result = _obj.Push_Notification("Batch #" + batchid.ToString(), "Batch #" + batchid.ToString() + " completed and closed, thank you for your work.", _FirebaseToken, batchid.ToString(), batchid, "Charity");
                        }
                    }
                    else
                    {
                        _result = "Security problem, please contact the administrator!";
                    }
                }
                else
                {
                    _result = "No batch found, please contact the administrator!";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
                _result = ex.ToString();
            }

            return _result;
        }

        public string assigned_to_charity(int batchid, int charityid, string user_token)
        {
            string _result = string.Empty;

            try
            {
                productsEntities context = new productsEntities();
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                var record = context.Batches.SingleOrDefault(d => d.Id == batchid);

                if (record != null)
                {
                    if (record.StatusId == 8 && User.IsAdmin == true)
                    {
                        record.StatusId = 5;
                        record.CharityId = charityid;
                        record.LastModById = User.Id;
                        record.LastModOnDate = DateTime.Now;
                        context.SaveChanges();

                        Track1 trakobj2 = new Track1();
                        trakobj2.BatchId = batchid;
                        trakobj2.StatusId = 5;
                        trakobj2.CreatedById = User.Id;
                        trakobj2.CreatedOnDate = DateTime.Now;
                        context.Track1.Add(trakobj2);
                        context.SaveChanges();

                        SaveBatchNotification(batchid, "Batch #" + batchid.ToString() + " has been earmarked for your charity, please arrange your procedure.", -1, charityid, User.Id);

                        GeneralEntities context2 = new GeneralEntities();
                        var Charity = context2.Charities.SingleOrDefault(d => d.Id == charityid);
                        string _FirebaseToken = GetObjectValue(Charity, "FirebaseToken");

                        if (_FirebaseToken != string.Empty)
                        {
                            FirebaseService _obj = new FirebaseService();
                            Task<object> result;
                            result = _obj.Push_Notification("Batch #" + batchid.ToString(), "Batch #" + batchid.ToString() + " has been earmarked for your charity, please arrange your procedure.", _FirebaseToken, batchid.ToString(), batchid, "Charity");
                        }
                    }
                    else
                    {
                        _result = "Security problem, please contact the administrator!";
                    }
                }
                else
                {
                    _result = "No batch found, please contact the administrator!";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
                _result = ex.ToString();
            }

            return _result;
        }

        private void SaveBatchNotification(int batchid, string Message, int? SlaughterId, int? charityid, int userid)
        {
            try
            {
                productsEntities product_context = new productsEntities();

                Notification obj = new Notification();
                obj.BatchId = batchid;
                obj.Message = Message;
                obj.CharityId = charityid > 0 && charityid != null ? charityid : -1;
                obj.SlaughterId = SlaughterId > 0 && SlaughterId != null ? SlaughterId : -1; ;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                product_context.Notifications.Add(obj);
                product_context.SaveChanges();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void change_notification_to_seen(int id)
        {
            try
            {
                productsEntities context = new productsEntities();

                var record = context.Notifications.SingleOrDefault(d => d.Id == id);

                if (record != null)
                {
                    UsersEntities user_context = new UsersEntities();
                    var User = user_context.Users.SingleOrDefault(d => d.Email.Trim() == "info@kabshak.com");

                    record.IsSeen = true;
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public object notifications_list(int slaughterhouseid, int charityid)
        {
            object returnList = new object();

            try
            {
                productsEntities context = new productsEntities();

                if (slaughterhouseid > 0)
                {

                    var _notfication = (from c in context.Notifications
                                        where c.SlaughterId == slaughterhouseid
                                        orderby c.Id descending
                                        select new
                                        {
                                            Id = c.Id,
                                            BatchId = c.BatchId,
                                            Message = c.Message,
                                            Date = c.CreatedOnDate,
                                            IsSeen = c.IsSeen,
                                            Keyword = "Open Batch"
                                        });

                    returnList = _notfication.ToList();
                }
                else if (charityid > 0)
                {
                    var _notfication = (from c in context.Notifications
                                        where c.CharityId == charityid
                                        orderby c.Id descending
                                        select new
                                        {
                                            Id = c.Id,
                                            BatchId = c.BatchId,
                                            Message = c.Message,
                                            Date = c.CreatedOnDate,
                                            IsSeen = c.IsSeen,
                                            Keyword = "Open Batch"
                                        });

                    returnList = _notfication.ToList();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return returnList;
        }

        public void save_order_rating_value(int orderId, string user_token, int rating)
        {
            try
            {
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));
                productsEntities product_context = new productsEntities();
                Rating obj = new Rating();
                obj.OrderId = orderId;
                obj.Rating1 = rating;
                obj.CreatedById = userid;
                obj.CreatedOnDate = DateTime.Now;
                product_context.Ratings.Add(obj);
                product_context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public object slaughterhouse_dashboard(int slaughterhouseid)
        {
            object data = new object();

            try
            {
                productsEntities context = new productsEntities();

                var query = context.GetSlaughterhouseBatchesCounts(slaughterhouseid).ToList();

                data = query;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return data;
        }

        public void ChangeOrdersStatusToItemSlaughtered(int orderid, string url)
        {
            try
            {
                productsEntities context = new productsEntities();
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Email.ToLower() == "info@kabshak.com");

                Track obj = new Track();
                obj.StatusId = 1003;
                obj.OrderId = orderid;
                obj.CreatedById = User.Id;
                obj.CreatedOnDate = DateTime.Now;
                obj.URL = (url.Trim() == string.Empty) ? null : url.Trim();
                context.Tracks.Add(obj);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public string batch_item_slaughtered(int batchid, int batch_item_id, int orderid, string url)
        {
            string _result = string.Empty;

            try
            {
                productsEntities context = new productsEntities();

                var record = context.Items.SingleOrDefault(d => d.Id == batch_item_id && d.OrderId == orderid && d.BatchId == batchid);

                if (record != null)
                {
                    UsersEntities user_context = new UsersEntities();
                    var User = user_context.Users.SingleOrDefault(d => d.Email.Trim() == "info@kabshak.com");

                    record.IsSlaughtered = true;
                    record.IsRecorded = true;
                    record.URL = url;
                    record.LastModById = User.Id;
                    record.LastModOnDate = DateTime.Now;
                    context.SaveChanges();

                    var order = context.Orders.SingleOrDefault(d => d.Id == orderid);
                    int submitterId = int.Parse(GetObjectValue(order, "CreatedById"));
                    User = user_context.Users.SingleOrDefault(d => d.Id == submitterId);
                    string _FirebaseToken = GetObjectValue(User, "FirebaseToken");
                    string user_token = GetObjectValue(User, "Token");

                    if (_FirebaseToken != string.Empty)
                    {
                        string StatusName = "Slaughtered";

                        FirebaseService _obj = new FirebaseService();
                        Task<object> result;
                        result = _obj.Push_Notification("Your Order Item Status Has Been Updated", "We wanted to let you know that the status of your order item has been updated. Your order item [" + orderid.ToString() + "] is now [" + StatusName + "].", _FirebaseToken, user_token, orderid, "Customer");
                    }
                }
                else
                {
                    _result = "No batch found, please contact the administrator!";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
                _result = ex.ToString();
            }

            return _result;
        }

        public object charity_dashboard(int charityid)
        {
            object data = new object();

            try
            {
                productsEntities context = new productsEntities();

                var query = context.GetCharityBatchesCounts(charityid).ToList();

                data = query;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return data;
        }

        public void save_product_colors_sizes(string token, string user_token, string colors, string sizes)
        {
            try
            {
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities product_context = new productsEntities();
                var product = product_context.Products.SingleOrDefault(d => d.Token == token);
                int productId = int.Parse(GetObjectValue(product, "Id"));

                if (product.Details.Count <= 0)
                {
                    Detail obj = new Detail();
                    obj.ProductId = productId;
                    obj.BriefEn = string.Empty;
                    obj.BriefAr = string.Empty;
                    obj.Colors = colors.Trim();
                    obj.Sizes = sizes.Trim();
                    obj.CreatedById = userid;
                    obj.CreatedOnDate = DateTime.Now;
                    product_context.Details.Add(obj);
                    product_context.SaveChanges();
                }
                else
                {
                    var record = product_context.Details.SingleOrDefault(d => d.ProductId == productId);

                    if (record != null)
                    {
                        record.Colors = colors.Trim();
                        record.Sizes = sizes.Trim();
                        record.LastModById = userid;
                        record.LastModOnDate = DateTime.Now;
                        product_context.SaveChanges();
                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void save_order_payment_transaction(int orderid, string result, string date, string _ref, string trackid, string transid, string paymentid, string amount, string user_token, string currency)
        {
            try
            {
                productsEntities product_context = new productsEntities();

                Transaction obj = new Transaction();
                obj.OrderId = orderid;
                obj.Result = result;
                obj.Date = date;
                obj.Ref = _ref;
                obj.TrackId = trackid;
                obj.TransId = transid;
                obj.PaymentId = paymentid;
                obj.Amount = amount + " " + currency;
                product_context.Transactions.Add(obj);
                product_context.SaveChanges();

                if (result.ToUpper() == "CAPTURED" || result.ToUpper() == "SUCCESS" || result.ToUpper() == "AUTHORISED")
                {
                    var record = product_context.Orders.SingleOrDefault(d => d.Id == orderid);
                    int Order_User = int.Parse(GetObjectValue(record, "CreatedById"));


                    UsersEntities context = new UsersEntities();
                    var User = context.Users.SingleOrDefault(d => d.Token == user_token);

                    if (User == null)
                    {
                        User = context.Users.SingleOrDefault(d => d.Id == Order_User);
                    }

                    int userid = int.Parse(GetObjectValue(User, "Id"));

                    if (record != null)
                    {
                        record.StatusId = 1002;
                        record.LastModById = Order_User;
                        record.LastModOnDate = DateTime.Now;
                    }

                    Track trk = new Track();
                    trk.StatusId = 1002;
                    trk.OrderId = orderid;
                    trk.CreatedById = Order_User;
                    trk.CreatedOnDate = DateTime.Now;
                    product_context.Tracks.Add(trk);
                    product_context.SaveChanges();

                    var path = HttpContext.Current.Server.MapPath("~/assets/emails/invoice.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        readText = readText.Replace("@Email", User.Email);
                        readText = readText.Replace("#Number", "#" + orderid);
                        readText = readText.Replace("@date", date);
                        readText = readText.Replace("trackId", trackid);
                        readText = readText.Replace("aamount", amount + " " + currency);
                        readText = readText.Replace("sstatus", result + "/paid");
                        readText = readText.Replace("ppaymentId", paymentid);
                        readText = readText.Replace("rrefrance", _ref);
                        readText = readText.Replace("@Url", "https://localhost:44346/order?Id=" + orderid);

                        var billing = product_context.Detail1.SingleOrDefault(d => d.OrderId == orderid);

                        SendEmail(User.Email, "Kabshak | Order #" + record.Id + " - Invoice", readText, string.Empty, string.Empty);

                        path = HttpContext.Current.Server.MapPath("~/assets/emails/InvoicePDF.html");
                        readText = File.ReadAllText(path);

                        readText = GetInvoiceTemplet(readText, orderid);

                        string _filename = "Invoice_" + orderid.ToString();
                        string URL = HttpContext.Current.Server.MapPath("~/assets/PDF/") + _filename + ".pdf";

                        if (!File.Exists(URL))
                        {
                            SelectPdf.HtmlToPdf converter = new HtmlToPdf();
                            SelectPdf.PdfDocument doc = converter.ConvertHtmlString(readText);
                            doc.Save(URL);
                            doc.Close();
                        }

                        string email = billing.Email;

                        if (email != string.Empty)
                        {
                            path = HttpContext.Current.Server.MapPath("~/assets/emails/InvoiceEmailText.html");
                            readText = File.ReadAllText(path);
                            readText = readText.Replace("@Email", email.Trim());
                            readText = readText.Replace("#Number", orderid.ToString());
                            commonBL _commonBL = new commonBL();
                            _commonBL.SendEmail(email.Trim(), "Kabshak | Order #" + orderid.ToString() + " Invoice", readText, string.Empty, URL);
                        }
                    }
                }

                product_context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public string GetInvoiceTemplet(string readText, int id)
        {
            try
            {
                productsEntities context = new productsEntities();

                var _order = context.Orders.SingleOrDefault(d => d.Id == id);
                readText = readText.Replace("00000001", id.ToString());
                readText = readText.Replace("@Date", _order.CreatedOnDate.ToString("dddd, dd MMMM yyyy"));

                var _order_price = context.Price1.SingleOrDefault(d => d.OrderId == id);

                if (_order_price.CodeValue > 0)
                {
                    double convertedNumber = Math.Round((float)_order_price.CodeValue, 2);

                    _order_price.CodeValue = convertedNumber;
                }

                readText = readText.Replace("250,00", (_order_price.TotalPriceUsd + _order_price.ShiipingPriceUsd - (_order_price.CodeValue != null ? _order_price.CodeValue : 0)).ToString());
                readText = readText.Replace("50,00", ((_order_price.CodeValue != null ? _order_price.CodeValue : 0)).ToString());
                readText = readText.Replace("300,00", _order_price.TotalPriceUsd.ToString());
                readText = readText.Replace("7,00", _order_price.ShiipingPriceUsd.ToString());

                var _order_trans = context.Transactions.FirstOrDefault(d => d.OrderId == id);
                readText = readText.Replace("000000", _order_trans != null ? _order_trans.TransId.ToString() : "Bank Transfer (Direct)");

                var query = (from P in context.Product1
                             join Prod in context.Products on P.ProductId equals Prod.Id
                             where
                                   P.OrderId == id
                             select new
                             {
                                 USD = P.Usd,
                                 Quantity = P.Quantity,
                                 NameEn = Prod.NameEn,
                             });

                string path = HttpContext.Current.Server.MapPath("~/assets/emails/invoice_product_item.html");
                string items = string.Empty;
                foreach (var item in query)
                {
                    string products = File.ReadAllText(path);
                    products = products.Replace("00000", item.NameEn);
                    products = products.Replace("11111", item.Quantity.ToString());
                    products = products.Replace("22222", item.USD.ToString());
                    items = items + products;
                }

                readText = readText.Replace("@items", items);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return readText;
        }

        public void delete_product_img(string token, string user_token, int id)
        {
            try
            {
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities product_context = new productsEntities();
                var product = product_context.Products.SingleOrDefault(d => d.Token == token);
                int productId = int.Parse(GetObjectValue(product, "Id"));

                var img = product_context.Images.SingleOrDefault(d => d.Id == id);

                if (img != null)
                {
                    product_context.Images.Remove(img);
                    product_context.SaveChanges();
                }

                var Image = product_context.Images.FirstOrDefault(d => d.ProductId == productId && d.IsMain == true);

                if (Image == null)
                {
                    var MainImage = product_context.Images.FirstOrDefault(d => d.ProductId == productId);

                    if (MainImage != null)
                    {
                        MainImage.IsMain = true;
                        MainImage.LastModById = userid;
                        MainImage.LastModOnDate = DateTime.Now;
                        product_context.SaveChanges();
                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void save_product_prices_info(string token, string user_token, float usd, float kwd, int discount)
        {
            try
            {
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities product_context = new productsEntities();
                var product = product_context.Products.SingleOrDefault(d => d.Token == token);
                int productId = int.Parse(GetObjectValue(product, "Id"));

                var price = product_context.Prices.SingleOrDefault(d => d.ProductId == productId);

                if (price == null)
                {
                    Price obj = new Price();
                    obj.ProductId = productId;
                    obj.Kwd = Double.Parse(kwd.ToString());
                    obj.Usd = Double.Parse(usd.ToString());
                    obj.CreatedById = userid;
                    obj.CreatedOnDate = DateTime.Now;
                    product_context.Prices.Add(obj);
                    product_context.SaveChanges();
                }
                else
                {
                    price.Kwd = Double.Parse(kwd.ToString());
                    price.Usd = Double.Parse(usd.ToString());
                    price.LastModById = userid;
                    price.LastModOnDate = DateTime.Now;
                    product_context.SaveChanges();
                }

                product.Discount = discount;
                product.LastModById = userid;
                product.LastModOnDate = DateTime.Now;
                product_context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void save_product_stock_info(string token, string user_token, int amount)
        {
            try
            {
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities product_context = new productsEntities();
                var product = product_context.Products.SingleOrDefault(d => d.Token == token);
                int productId = int.Parse(GetObjectValue(product, "Id"));

                var stock = product_context.Stocks.SingleOrDefault(d => d.ProductId == productId);

                if (stock == null)
                {
                    Stock obj = new Stock();
                    obj.ProductId = productId;
                    obj.Amount = amount;
                    obj.CreatedById = userid;
                    obj.CreatedOnDate = DateTime.Now;
                    product_context.Stocks.Add(obj);
                    product_context.SaveChanges();
                }
                else
                {
                    stock.Amount = amount;
                    stock.LastModById = userid;
                    stock.LastModOnDate = DateTime.Now;
                    product_context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void make_main_product_img(string token, string user_token, int id)
        {
            try
            {
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities product_context = new productsEntities();
                var product = product_context.Products.SingleOrDefault(d => d.Token == token);
                int productId = int.Parse(GetObjectValue(product, "Id"));

                var img = product_context.Images.SingleOrDefault(d => d.ProductId == productId && d.IsMain == true);

                if (img != null)
                {
                    img.IsMain = false;
                    img.LastModById = userid;
                    img.LastModOnDate = DateTime.Now;
                    product_context.SaveChanges();
                }

                var img2 = product_context.Images.SingleOrDefault(d => d.Id == id && d.IsMain != true);

                if (img2 != null)
                {
                    img2.IsMain = true;
                    ;
                    img2.LastModById = userid;
                    img2.LastModOnDate = DateTime.Now;
                    product_context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public List<object> upload_product_img(string token, string user_token, string url, string image_name)
        {
            var _list = new List<object>();

            try
            {
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                int userid = int.Parse(GetObjectValue(User, "Id"));

                productsEntities product_context = new productsEntities();
                var product = product_context.Products.SingleOrDefault(d => d.Token == token);
                int productId = int.Parse(GetObjectValue(product, "Id"));

                var Images = product_context.Images.SingleOrDefault(d => d.ProductId == productId && d.IsMain == true);

                if (Images == null)
                {
                    DataAccess.Modals.Image obj = new DataAccess.Modals.Image();
                    obj.ProductId = productId;
                    obj.Url = url.Trim();
                    obj.IsMain = true;
                    obj.CreatedById = userid;
                    obj.CreatedOnDate = DateTime.Now;
                    product_context.Images.Add(obj);
                    product_context.SaveChanges();
                }
                else
                {
                    DataAccess.Modals.Image obj = new DataAccess.Modals.Image();
                    obj.ProductId = productId;
                    obj.Url = url.Trim();
                    obj.IsMain = false;
                    obj.CreatedById = userid;
                    obj.CreatedOnDate = DateTime.Now;
                    product_context.Images.Add(obj);
                    product_context.SaveChanges();
                }

                var query = (from d in product_context.Images
                             where
                               d.ProductId == productId
                             orderby
                                 d.Id descending
                             select new
                             {
                                 Id = d.Id,
                                 Url = d.Url,
                                 IsMain = d.IsMain
                             });

                foreach (var data in query)
                {
                    _list.Add(data);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _list;
        }

        public List<object> GetOrdersList(string token)
        {
            var _data = new object();
            var _list = new List<object>();

            try
            {
                UsersEntities context_user = new UsersEntities();
                var query_user = from e in context_user.Users
                                 where e.Token == token.Trim()
                                 select new
                                 {
                                     UserId = e.Id
                                 };

                foreach (var data in query_user)
                {
                    _data = data;
                }

                int UserId = int.Parse(GetObjectValue(_data, "UserId"));

                productsEntities context = new productsEntities();
                var query = (from O in context.Orders
                             join D in context.Detail1 on O.Id equals D.OrderId
                             join P in context.Price1 on O.Id equals P.OrderId
                             join S in context.Statuses on O.StatusId equals S.Id
                             where
                               O.CreatedById == UserId
                             orderby O.Id descending
                             select new
                             {
                                 Id = O.Id,
                                 StatusNameEn = S.NameEn,
                                 StatusNameAr = S.NameAr,
                                 CreatedOnDate = O.CreatedOnDate,
                                 TotalPriceKwd = P.TotalPriceKwd,
                                 TotalPriceUsd = P.TotalPriceUsd - (P.CodeValue != null ? P.CodeValue : 0),
                                 ShippingPriceKwd = P.ShippingPriceKwd,
                                 ShiipingPriceUsd = P.ShiipingPriceUsd,
                                 FirstName = D.FirstName,
                                 LastName = D.LastName,
                                 Mobile = D.Mobile,
                                 Email = D.Email,
                                 BillingCityId = D.BillingCityId,
                                 ShippingCityId = D.ShippingCityId,
                                 Notes = D.Notes
                             });

                foreach (var data in query)
                {
                    _list.Add(data);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return _list;
        }

        public object GetMobileBatchTransactionDetailsById(int batchid)
        {
            object result = new object();

            try
            {
                productsEntities context = new productsEntities();
                UsersEntities context_user = new UsersEntities();
                GeneralEntities context_tracks = new GeneralEntities();

                var query5 = (from T in context.Track1
                              where
                                    T.BatchId == batchid
                              orderby T.Id descending
                              select new
                              {
                                  StatusId = T.StatusId,
                                  CreatedOnDate = T.CreatedOnDate,
                                  CreatedById = T.CreatedById
                              }).ToList();

                List<BatchTrack> Tracks = new List<BatchTrack>();

                foreach (var data in query5)
                {
                    BatchTrack item = new BatchTrack();

                    var _Status = context_tracks.Status1.SingleOrDefault(b => b.Id == data.StatusId);
                    item.StatuseName = _Status.NameEn;
                    item.Date = data.CreatedOnDate.ToString(); ;
                    var _user = context_user.Users.SingleOrDefault(b => b.Id == data.CreatedById);
                    item.Email = _user.Email;

                    Tracks.Add(item);
                }

                result = Tracks.ToList();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return result;
        }

        public string batch_delivered(int batchid, string user_token)
        {

            string _result = string.Empty;

            try
            {
                productsEntities context = new productsEntities();
                UsersEntities user_context = new UsersEntities();
                var User = user_context.Users.SingleOrDefault(d => d.Token == user_token);
                var record = context.Batches.SingleOrDefault(d => d.Id == batchid);

                if (record != null)
                {
                    if (record.StatusId == 4 && User.IsAdmin == true)
                    {
                        record.StatusId = 10;
                        record.LastModById = User.Id;
                        record.LastModOnDate = DateTime.Now;
                        context.SaveChanges();

                        Track1 trakobj2 = new Track1();
                        trakobj2.BatchId = batchid;
                        trakobj2.StatusId = 10;
                        trakobj2.CreatedById = User.Id;
                        trakobj2.CreatedOnDate = DateTime.Now;
                        context.Track1.Add(trakobj2);
                        context.SaveChanges();

                        SaveBatchNotification(batchid, "Batch #" + batchid.ToString() + " has been delivered to customers.", record.SlaughterhouseId, -1, User.Id);

                        GeneralEntities context2 = new GeneralEntities();
                        var Slaughterhouse = context2.Slaughterhouses.SingleOrDefault(d => d.Id == record.SlaughterhouseId);
                        string _FirebaseToken = GetObjectValue(Slaughterhouse, "FirebaseToken");

                        if (_FirebaseToken != string.Empty)
                        {
                            FirebaseService _obj = new FirebaseService();
                            Task<object> result;
                            result = _obj.Push_Notification("Batch #" + batchid.ToString(), "Batch #" + batchid.ToString() + " has been delivered to customers.", _FirebaseToken, batchid.ToString(), batchid, "Slaughterhouse");
                        }
                    }
                    else
                    {
                        _result = "Security problem, please contact the administrator!";
                    }
                }
                else
                {
                    _result = "No batch found, please contact the administrator!";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
                _result = ex.ToString();
            }

            return _result;
        }
    }
}
