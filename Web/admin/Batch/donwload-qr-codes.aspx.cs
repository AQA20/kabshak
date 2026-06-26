using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace vape.admin.Batch
{
    public partial class donwload_qr_codes : System.Web.UI.Page
    {
        public string batchid
        {
            get
            {
                if (Request == null || string.IsNullOrEmpty(Request.QueryString["batchid"]))
                {
                    return string.Empty;
                }

                return Request.QueryString["batchid"].ToString();
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                string path = HttpContext.Current.Server.MapPath("~/assets/images/QRs/" + batchid);
                DownloadFolderImages(batchid, path);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        protected void DownloadFolderImages(string batchid, string folderPath)
        {
            try
            {
                using (var memoryStream = new MemoryStream())
                {
                    using (var zipArchive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                    {
                        foreach (string file in Directory.GetFiles(folderPath))
                        {
                            string fileName = Path.GetFileName(file);
                            ZipArchiveEntry entry = zipArchive.CreateEntry(fileName);
                            using (var entryStream = entry.Open())
                            {
                                using (var fileStream = new FileStream(file, FileMode.Open))
                                {
                                    fileStream.CopyTo(entryStream);
                                }
                            }
                        }
                    }

                    Context.Response.Clear();
                    Context.Response.ContentType = "application/zip";
                    Context.Response.AppendHeader("Content-Disposition", $"attachment; filename=" + batchid + ".zip");
                    Context.Response.BinaryWrite(memoryStream.ToArray());
                    Context.Response.End();
                }
            }
            catch (ThreadAbortException err)
            {

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}