#jQuery Currency

Simple, unobtrusive currency converting and formatting

##Requirements

To use jQuery Currency you will need the following:

* jQuery v1.5+
* PHP v4+ (if you want to use conversion)

##Example Usage

    <script type="text/javascript">
    $(document).ready(function() {
        $('#basic').currency();
    });
    </script>
    
For more examples [see the demo](http://dev7studios.com/demo/jquery-currency).
    
##Settings

The following list outlines the settings and their defualt values:

    $('#number').currency({
        region: 'USD', // The 3 digit ISO code you want to display your currency in
        thousands: ',', // Thousands separator
        decimal: '.',   // Decimal separator
        decimals: 2, // How many decimals to show
        hidePrefix: false, // Hide any prefix
        hidePostfix: false, // Hide any postfix
        convertFrom: '', // If converting, the 3 digit ISO code you want to convert from,
        convertLoading: '(Converting...)', // Loading message appended to values while converting
        convertLocation: 'convert.php' // Location of convert.php file
    });