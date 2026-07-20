# Revamp Checkout Addresses with Google Maps Integration

This comprehensive plan details the required changes across the Database, Backend (C# & EF), and Frontend to revamp the address system (House/Apartment types) and integrate the Google Maps Places Autocomplete and Geocoding API.

> [!CAUTION]
> **Data Deletion Warning**
> As per your request, the first step in this plan will wipe all existing Orders, Order Details, and saved Shareholder addresses to allow for a clean database restructure without encountering foreign key errors. Please ensure this is performed on your local/development environment first.

---

## 1. Database Cleanup & Restructure (SQL Server)

We will execute a SQL script to delete existing data, drop unused columns, and add the new precise address columns.

### SQL Script Details:
```sql
-- 1. Delete existing data to prevent FK conflicts
DELETE FROM Orders.Details;
DELETE FROM Orders.Orders;
DELETE FROM Users.PersonShippingAddresses;

-- 2. Drop unused columns from Orders.Details
ALTER TABLE Orders.Details
DROP COLUMN BillingBlock, BillingHouseNo, BillingApartmentNo, BillingPaciNo,
            ShippingBlock, ShippingHouseNo, ShippingApartmentNo, ShippingPaciNo;

-- 3. Add new precise columns to Orders.Details
ALTER TABLE Orders.Details
ADD BillingAddressType NVARCHAR(50) NULL,
    BillingFloor NVARCHAR(50) NULL,
    BillingBuildingNo NVARCHAR(100) NULL,
    BillingAptNo NVARCHAR(100) NULL,
    BillingAdditionalDirections NVARCHAR(1000) NULL,
    BillingLatitude NVARCHAR(100) NULL,
    BillingLongitude NVARCHAR(100) NULL,

    ShippingAddressType NVARCHAR(50) NULL,
    ShippingFloor NVARCHAR(50) NULL,
    ShippingBuildingNo NVARCHAR(100) NULL,
    ShippingAptNo NVARCHAR(100) NULL,
    ShippingAdditionalDirections NVARCHAR(1000) NULL,
    ShippingLatitude NVARCHAR(100) NULL,
    ShippingLongitude NVARCHAR(100) NULL;

-- 4. Drop unused columns from PersonShippingAddresses
ALTER TABLE Users.PersonShippingAddresses
DROP COLUMN Block, HouseNo, ApartmentNo;

-- 5. Add new precise columns to PersonShippingAddresses
ALTER TABLE Users.PersonShippingAddresses
ADD AddressType NVARCHAR(50) NULL,
    Floor NVARCHAR(50) NULL,
    BuildingNo NVARCHAR(100) NULL,
    AptNo NVARCHAR(100) NULL,
    AdditionalDirections NVARCHAR(1000) NULL,
    Latitude NVARCHAR(100) NULL,
    Longitude NVARCHAR(100) NULL;
```

---

## 2. Backend Layer (C# / Entity Framework)

### [MODIFY] `DataAccess/Modals/*.edmx` and generated `.cs` files
- **Programmatic Update:** I will manually update the XML structure inside the `.edmx` files (`ProductsModel.edmx` and `UsersModel.edmx`) to map the new database columns to your Entity Framework models. 
- I will also update the auto-generated C# model files (e.g., `Details.cs`, `PersonShippingAddress.cs`) programmatically so you **do not** need to open Visual Studio to run the "Update Model from Database" tool. It will compile immediately.

### [MODIFY] `BusinessLogic/Order.cs`
- Add new properties to mirror the new database columns: `AddressType`, `Floor`, `BuildingNo`, `AptNo`, `AdditionalDirections`, `Latitude`, `Longitude` (for both Billing and Shipping prefixes).

### [MODIFY] `BusinessLogic/ordersBL.cs`
- Update the data mapping code to correctly assign the properties from the `Order` object to the Entity Framework `Details` entity when saving to the database.

### [MODIFY] `api/products.asmx.cs`
- In `submit_order()`, parse the new request parameters (e.g., `HttpContext.Current.Request["billing_address_type"]`) and assign them to the `Order` object.

---

## 3. Frontend Layer (UI & JS)

### [MODIFY] `Web/checkout.aspx` & `Web/AR/checkout.aspx`
- **Map & Search Box:** Insert `<div id="checkout-map"></div>` and `<input id="map-search-box" type="text" placeholder="Search for your neighborhood...">` inside Step 2 (Billing Address).
- **Google Maps API Script:** Append `<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap" async defer></script>`.
- **Address Type Tabs:** Replace the old address fields with two toggle buttons: "House" and "Apartment".
- **Dynamic Input Fields:**
  - `Shared`: Country, City, Area. *(Note: First Name, Last Name, Email, and Mobile are already collected in Step 1 and will NOT be duplicated here).*
  - `If Apartment`: Building Number, Apt Number, Floor, Street, Additional Directions.
  - `If House`: House Number, Street, Additional Directions.

### [MODIFY] `Web/assets/js/checkout.js`
- **Map Initialization:** Create `initMap()` to load the map centered on Amman.
- **Places Autocomplete:** Attach the Google Places Autocomplete to `#map-search-box`. When a user selects a place, the map will pan to that location.
- **Draggable Marker:** Allow users to drag a pin on the map. On `dragend`, capture the `lat` and `lng` and store them in hidden inputs. Reverse geocoding will auto-fill the 'Area' and 'City' inputs if possible.
- **Form Toggles:** Add event listeners to the "House" / "Apartment" tabs to show and hide the relevant `div` containers and toggle the `required` attributes.
- **Form Validation:** Update `ValidateShippingFields()` to correctly validate the visible fields.
- **Submission:** Update `SubmitOrder()` to bundle the new fields (including Latitude/Longitude) into the AJAX `FormData` request.

---

## 4. Admin Dashboard Updates

### [MODIFY] `Web/admin/Order.aspx`
- Update the HTML layout for the `billing-address-table` and `shipping-address-table` to replace the old unused rows (Block, Paci, etc.) with the new precise rows (`Address Type`, `Floor`, `Building No`, `Apt No`, `Additional Directions`).
- Add a clickable link/button (e.g., `View on Google Maps`) that will open a new tab directly to Google Maps using the captured Latitude and Longitude.

### [MODIFY] `Web/assets/js/admin-order-details.js`
- Replace the obsolete `.html(item.Data.BillingBlock)` fetching logic with the new properties (e.g., `item.Data.BillingFloor`, `item.Data.BillingAddressType`).
- Bind the Latitude and Longitude to the Google Maps link.

---

## Verification Plan
1. **Database:** Verify `Orders.Details` and `PersonShippingAddresses` have the new columns and the old ones are gone.
2. **Backend:** Recompile the project and ensure no Entity Framework mapping errors occur.
3. **Frontend:** 
   - Ensure the Google Map renders and the Autocomplete Search Box correctly pans the map.
   - Verify that switching between House and Apartment toggles the correct inputs.
   - Place a test order and verify the exact `Latitude`, `Longitude`, and `AddressType` are successfully saved in the SQL Database.
4. **Admin Dashboard:** Open an order in the admin portal and verify the new address details render correctly, and the Google Maps link points to the exact pin location.
