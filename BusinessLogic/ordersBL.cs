using business_logic;
using DataAccess.Modals;
using Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BusinessLogic
{
    public class ordersBL : commonBL
    {
        public string SubmitOrder(Entities.Order order)
        {
            string Id = string.Empty;

            try
            {
                ObjectParameter OrderId = new ObjectParameter("OrderId", typeof(Int32));

                using (var context = new productsEntities())
                {
                    context.SubmitOrder(order._usertoken, order._items, order._first_name, order._last_name, order._number, order._email, order._cityid, order._town, order._block, order._street, order._house, order._apartment, order._paci, 0, string.Empty, string.Empty, string.Empty, 0, 0, 0, order._ordernotes, order._statusId, OrderId, order.promo_code, order.code_value);


                    Id = OrderId.Value.ToString();


                    if (order._shippingnumber != null)
                    {
                        int orderId = int.Parse(Id);

                        var record = context.Detail1.SingleOrDefault(d => d.OrderId == orderId);

                        if (record != null)
                        {
                            record.ShippingNumber = order._shippingnumber;
                            context.SaveChanges();
                        }
                    }
                }

                string path = HttpContext.Current.Server.MapPath("~/assets/emails/order.html");

                UsersEntities context2 = new UsersEntities();

                if (File.Exists(path))
                {
                    var User = context2.Users.SingleOrDefault(d => d.Token == order._usertoken);
                    string readText = File.ReadAllText(path);
                    readText = readText.Replace("@Email", User.Email);
                    readText = readText.Replace("#Number", "#" + Id);
                    readText = readText.Replace("@Url", "https://localhost:44346/order?Id=" + Id);
                    SendEmail(User.Email, "Kabshak | Order #" + Id, readText, string.Empty, string.Empty);
                }

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
                    path = HttpContext.Current.Server.MapPath("~/assets/emails/admin/order.html");

                    if (File.Exists(path))
                    {
                        string readText = File.ReadAllText(path);
                        readText = readText.Replace("@Email", data.Email);
                        readText = readText.Replace("#Number", "#" + Id);
                        readText = readText.Replace("@Url", "https://localhost:44346/admin/order?Id=" + Id);
                        SendEmail(data.Email, "Kabshak | Order #" + Id, readText, string.Empty, string.Empty);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }

            return Id;
        }

        public void SubmitOrderShareholder(Shareholder_Class item, string orderid)
        {
            try
            {
                UsersEntities context2 = new UsersEntities();
                var user = context2.Users.SingleOrDefault(o => o.Token == item.usertoken.Trim() && o.IsActive == true);

                productsEntities context = new productsEntities();
                var Product = context.Products.SingleOrDefault(d => d.Token == item.productToken);

                Person obj = new Person();
                obj.ProductId = Product.Id;
                obj.OrderId = int.Parse(orderid);
                obj.FullName = item.Shareholder;
                obj.CharityId = item.CharityId > 0 ? item.CharityId : -1;
                obj.Quantity = item.Quantity;
                obj.ProductPurposeId = item.PurposeId;
                obj.AddressDetails = item.AddressDetails;
                obj.CreatedById = user.Id;
                obj.CreatedOnDate = DateTime.Now;
                context.Persons.Add(obj);
                context.SaveChanges();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }

        public void SubmitOrderShippingShareholder(Shipping_Shareholder_Class item, string orderid)
        {
            try
            {
                UsersEntities context2 = new UsersEntities();
                var user = context2.Users.SingleOrDefault(o => o.Token == item.usertoken.Trim() && o.IsActive == true);

                productsEntities context = new productsEntities();
                var Product = context.Products.SingleOrDefault(d => d.Token == item.productToken);

                Person obj = new Person();
                obj.ProductId = Product.Id;
                obj.OrderId = int.Parse(orderid);
                obj.FullName = item.ShippingName;
                obj.CharityId = item.CharityId > 0 ? item.CharityId : -1;
                obj.Quantity = item.Quantity;
                obj.ProductPurposeId = item.PurposeId;
                obj.AddressDetails = item.AddressDetails;
                obj.CreatedById = user.Id;
                obj.CreatedOnDate = DateTime.Now;
                context.Persons.Add(obj);
                context.SaveChanges();

                int PersonId = obj.Id;

                PersonShippingAddress objShippingAddress = new PersonShippingAddress();
                objShippingAddress.PersonId = PersonId;
                objShippingAddress.CityId = int.Parse(item.ShippingCityid);
                objShippingAddress.Town = item.ShippingTown;
                objShippingAddress.Block = item.ShippingBlock;
                objShippingAddress.Street = item.ShippingStreet;
                objShippingAddress.HouseNo = int.Parse(item.ShippingHouse);
                objShippingAddress.ApartmentNo = int.Parse(item.ShippingApartment);
                objShippingAddress.ContactNumber = item.ShippingNumber;
                objShippingAddress.CreatedById = user.Id;
                objShippingAddress.CreatedOnDate = DateTime.Now;
                objShippingAddress.CuttingNotes = item.cuttingNotes;
                context.PersonShippingAddresses.Add(objShippingAddress);
                context.SaveChanges();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught! " + ex.ToString());
            }
        }
    }
}
