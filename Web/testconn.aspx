<%@ Page Language="C#" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Configuration" %>

<!DOCTYPE html>
<html>
<head>
    <title>Database Connection Test</title>
</head>
<body>
    <h2>Database Connection Test Page</h2>
    <%
        try
        {
            var connSetting = ConfigurationManager.ConnectionStrings["ProductsDB"];
            string connStr = connSetting != null ? connSetting.ConnectionString : null;
            if (string.IsNullOrEmpty(connStr))
            {
                Response.Write("<p style='color:red;'><b>Error:</b> Connection string 'ProductsDB' not found in configuration.</p>");
                return;
            }

            // Mask password for display
            string maskedConnStr = System.Text.RegularExpressions.Regex.Replace(connStr, "Password=[^;]+", "Password=******");
            Response.Write("<p><b>Using Connection String:</b> " + Server.HtmlEncode(maskedConnStr) + "</p>");

            // Extract password length and characters
            var match = System.Text.RegularExpressions.Regex.Match(connStr, "Password=([^;]+)");
            if (match.Success)
            {
                string pwd = match.Groups[1].Value;
                Response.Write("<p><b>Password Length:</b> " + pwd.Length + "</p>");
                Response.Write("<p><b>Password Starts With:</b> '" + pwd.Substring(0, Math.Min(3, pwd.Length)) + "'</p>");
            }
            else
            {
                Response.Write("<p style='color:orange;'>Could not find password in connection string.</p>");
            }

            using (SqlConnection conn = new SqlConnection(connStr))
            {
                Response.Write("<p>Attempting to open connection...</p>");
                conn.Open();
                Response.Write("<p style='color:green;font-weight:bold;'>Success! Connection opened successfully.</p>");
                
                using (SqlCommand cmd = new SqlCommand("SELECT DB_NAME()", conn))
                {
                    object dbNameVal = cmd.ExecuteScalar();
                    string dbName = dbNameVal != null ? dbNameVal.ToString() : "";
                    Response.Write("<p><b>Active Database:</b> " + dbName + "</p>");
                }
            }
        }
        catch (Exception ex)
        {
            Response.Write("<p style='color:red;'><b>Exception Caught:</b></p>");
            Response.Write("<pre>" + Server.HtmlEncode(ex.ToString()) + "</pre>");
        }
    %>
</body>
</html>
