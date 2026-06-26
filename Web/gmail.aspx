<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="gmail.aspx.cs" Inherits="vape.gmail" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
        </div>
    </form>
</body>
<script>
    window.onunload = refreshParent;
    function refreshParent() {
        window.opener.location.reload();
    }
    window.close();
</script>
</html>
