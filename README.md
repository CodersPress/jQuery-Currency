#jQuery Currency

Simple, unobtrusive currency converting and formatting

##Requirements

To use jQuery Currency you will need the following:

* jQuery Version 1.5 - Version 2.1.3
* PHP to perform foreign exchange conversions

##Example Usage

Format an element on a page, using Default Settings

    <script>
    $(document).ready(function() {
        $("#basic").currency(); 
    });
    </script>
    
For more examples [see the demo](http://coderspress.com/github/demos/jquery-currency/demo/index.html).
    
## Default Settings

The following list outlines the settings and their defualt values:

    $("#number").currency({
        region: "USD", // The 3 digit ISO code you want to display your currency in
        thousands: ",", // Thousands separator
        decimal: ".",   // Decimal separator
        decimals: 2, // How many decimals to show
        hidePrefix: false, // Hide any prefix
        hidePostfix: false, // Hide any postfix
        convertFrom: "", // If converting, the 3 digit ISO code you want to convert from,
        convertLoading: "(Converting...)", // Loading message appended to values while converting
        convertLocation: "convert.php" // Location of convert.php file
    });
