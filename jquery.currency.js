/*
 * jQuery Currency v0.5
 * Simple, unobtrusive currency converting and formatting
 *
 * Copyright 2011, Gilbert Pellegrom
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * http://dev7studios.com
 */


(function ($) {


    $.fn.currency = function (method) {


        var methods = {


            init: function (options) {
                var settings = $.extend({}, this.currency.defaults, options);
                return this.each(function () {
                    var $element = $(this),
                         element = this;
                    var value = 0;

                    if ($element.is(':input')) {
                        value = $element.val();
                    } else {
                        value = $element.text();
                    }

                    if ($.currency.isNumber(value)) {

                        if (settings.convertFrom != '') {
                            if ($element.is(':input')) {
                                $element.val(value + ' ' + settings.convertLoading);
                            } else {
                                $element.html(value + ' ' + settings.convertLoading);
                            }
                            $.post(settings.convertLocation, { amount: value, from: settings.convertFrom, to: settings.region }, function (data) {
                                value = data;
                                if ($element.is(':input')) {
                                    $element.val($.currency.format(value, settings));
                                } else {
                                    $element.html($.currency.format(value, settings));
                                }
                            });
                        } else {
                            if ($element.is(':input')) {
                                $element.val($.currency.format(value, settings));
                            } else {
                                $element.html($.currency.format(value, settings));
                            }
                        }

                    }

                });


            }

        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method "' + method + '" does not exist in currency plugin!');
        }
    };


    $.fn.currency.defaults = {
        region: 'USD',          // The 3 digit ISO code you want to display your currency in
        thousands: ',',         // Thousands separator
        decimal: '.',           // Decimal separator
        decimals: 2,            // How many decimals to show
        hidePrefix: false,      // Hide any prefix
        hidePostfix: false,     // Hide any postfix
        defaultSymbol: '$',     // in case the currency is not found in our maps
        separator: '',          // allows separating symbol from the amount
        convertFrom: '',        // If converting, the 3 digit ISO code you want to convert from,
        convertLoading: '(Converting...)',  // Loading message appended to values while converting
        convertLocation: 'convert.php'      // Location of convert.php file
    }


    $.fn.currency.settings = {}

    $.currency = {
        prefix: {
            'ALL': 'Lek', 'ARS': '$', 'AWG': 'f',
            'AUD': '$', 'BSD': '$', 'BBD': '$',
            'BYR': 'p.', 'BZD': 'BZ$', 'BMD': '$',
            'BOB': '$b', 'BAM': 'KM', 'BWP': 'P',
            'BRL': 'R$', 'BND': '$', 'CAD': '$',
            'KYD': '$', 'CLP': '$', 'CNY': '&yen;',
            'COP': '$', 'CRC': 'c', 'HRK': 'kn',
            'CZK': 'Kc', 'DKK': 'kr', 'DOP': 'RD$',
            'XCD': '$', 'EGP': '&pound;', 'SVC': '$',
            'EEK': 'kr', 'EUR': '&euro; ', 'FKP': '&pound;',
            'FJD': '$', 'GBP': '&pound,', 'GHC': 'c',
            'GIP': '&pound,', 'GTQ': 'Q', 'GGP': '&pound;',
            'GYD': '$', 'HNL': 'L', 'HKD': '$',
            'HUF': 'Ft', 'ILS': '&#x20aa;', 'ISK': 'kr', 'IDR': 'Rp',
            'IMP': '&pound;', 'JMD': 'J$', 'JPY': '&yen;',
            'JEP': '&pound;', 'LVL': 'Ls', 'LBP': '&pound;',
            'LRD': '$', 'LTL': 'Lt', 'MYR': 'RM',
            'MXN': '$', 'MZN': 'MT', 'NAD': '$',
            'ANG': 'f', 'NZD': 'NZ$', 'NIO': 'C$',
            'PAB': 'B/.', 'PYG': 'Gs',
            'PEN': 'S/.', 'RON': 'lei', 'RUB': '&#x440;&#x443;&#x431; ',
            'SHP': '&pound,', 'SGD': '$', 'SBD': '$',
            'SOS': 'S', 'ZAR': 'R',
            'CHF': 'CHF', 'SRD': '$', 'SYP': '&pound;',
            'TWD': 'NT$', 'TTD': 'TT$', 'TRY': 'TL',
            'TRL': '&pound;', 'TVD': '$',
            'USD': '$', 'UYU': '$U', 'VEF': 'Bs',
            'ZWD': 'Z$'
        },
        postfix: {
            'SEK': ' kr', 'PLN': 'z&#x0142;', 'NOK': ' kr'
        },
        format: function (amount, settings) {
            settings = $.extend({}, $.fn.currency.defaults, settings);
            var bc = settings.region;
            var prefix = $.currency.prefix[bc] || '';
            var postfix = $.currency.postfix[bc] || '';

            if (prefix + postfix == '') prefix = settings.defaultSymbol;

            var output = '';
            if (!settings.hidePrefix) output += prefix;
            output += settings.separator + $.currency.number_format(
                amount, settings.decimals, settings.decimal, settings.thousands
                );
            if (!settings.hidePostfix) output += postfix;
            return output;
        },
        // Kindly borrowed from http://phpjs.org/functions/number_format
        number_format: function (number, decimals, dec_point, thousands_sep) {
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                    s = '',
                    toFixedFix = function (n, prec) {
                        var k = Math.pow(10, prec);
                        return '' + Math.round(n * k) / k;
                    };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
        isNumber: function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    };

})(jQuery);
