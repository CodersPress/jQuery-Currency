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

(function($) {

    $.fn.currency = function(method) {

        var methods = {

            init : function(options) {
                var settings = $.extend({}, this.currency.defaults, options);
                return this.each(function() {
                    var $element = $(this),
                         element = this;
                    var value = 0;
                    
                    if($element.is(':input')){
                        value = $element.val();
                    } else {
                        value = $element.text();
                    }
                    
                    if(helpers.isNumber(value)){
                    
                        if(settings.convertFrom != ''){
                            if($element.is(':input')){
                                $element.val(value +' '+ settings.convertLoading);
                            } else {
                                $element.html(value +' '+ settings.convertLoading);
                            }
                            $.post(settings.convertLocation, { amount: value, from: settings.convertFrom, to: settings.region }, function(data){
                                value = data;
                                if($element.is(':input')){
                                    $element.val(helpers.format_currency(value, settings));
                                } else {
                                    $element.html(helpers.format_currency(value, settings));
                                }
                            });
                        } else {
                            if($element.is(':input')){
                                $element.val(helpers.format_currency(value, settings));
                            } else {
                                $element.html(helpers.format_currency(value, settings));
                            }
                        }
                    
                    }
                    
                });

            },

        }

        var helpers = {

            format_currency: function(amount, settings) {
                var bc = settings.region;
                var currency_before = '';
                var currency_after = '';
                
                if(bc == 'ALL') currency_before = 'Lek';
                if(bc == 'ARS') currency_before = '$';
                if(bc == 'AWG') currency_before = 'f';
                if(bc == 'AUD') currency_before = '$';
                if(bc == 'BSD') currency_before = '$';
                if(bc == 'BBD') currency_before = '$';
                if(bc == 'BYR') currency_before = 'p.';
                if(bc == 'BZD') currency_before = 'BZ$';
                if(bc == 'BMD') currency_before = '$';
                if(bc == 'BOB') currency_before = '$b';
                if(bc == 'BAM') currency_before = 'KM';
                if(bc == 'BWP') currency_before = 'P';
                if(bc == 'BRL') currency_before = 'R$';
                if(bc == 'BND') currency_before = '$';
                if(bc == 'CAD') currency_before = '$';
                if(bc == 'KYD') currency_before = '$';
                if(bc == 'CLP') currency_before = '$';
                if(bc == 'CNY') currency_before = '&yen;';
                if(bc == 'COP') currency_before = '$';
                if(bc == 'CRC') currency_before = 'c';
                if(bc == 'HRK') currency_before = 'kn';
                if(bc == 'CZK') currency_before = 'Kc';
                if(bc == 'DKK') currency_before = 'kr';
                if(bc == 'DOP') currency_before = 'RD$';
                if(bc == 'XCD') currency_before = '$';
                if(bc == 'EGP') currency_before = '&pound;';
                if(bc == 'SVC') currency_before = '$';
                if(bc == 'EEK') currency_before = 'kr';
                if(bc == 'EUR') currency_before = '&euro;';
                if(bc == 'FKP') currency_before = '&pound;';
                if(bc == 'FJD') currency_before = '$';
                if(bc == 'GBP') currency_before = '&pound;';
                if(bc == 'GHC') currency_before = 'c';
                if(bc == 'GIP') currency_before = '&pound;';
                if(bc == 'GTQ') currency_before = 'Q';
                if(bc == 'GGP') currency_before = '&pound;';
                if(bc == 'GYD') currency_before = '$';
                if(bc == 'HNL') currency_before = 'L';
                if(bc == 'HKD') currency_before = '$';
                if(bc == 'HUF') currency_before = 'Ft';
                if(bc == 'ISK') currency_before = 'kr';
                if(bc == 'IDR') currency_before = 'Rp';
                if(bc == 'IMP') currency_before = '&pound;';
                if(bc == 'JMD') currency_before = 'J$';
                if(bc == 'JPY') currency_before = '&yen;';
                if(bc == 'JEP') currency_before = '&pound;';
                if(bc == 'LVL') currency_before = 'Ls';
                if(bc == 'LBP') currency_before = '&pound;';
                if(bc == 'LRD') currency_before = '$';
                if(bc == 'LTL') currency_before = 'Lt';
                if(bc == 'MYR') currency_before = 'RM';
                if(bc == 'MXN') currency_before = '$';
                if(bc == 'MZN') currency_before = 'MT';
                if(bc == 'NAD') currency_before = '$';
                if(bc == 'ANG') currency_before = 'f';
                if(bc == 'NZD') currency_before = '$';
                if(bc == 'NIO') currency_before = 'C$';
                if(bc == 'NOK') currency_before = 'kr';
                if(bc == 'PAB') currency_before = 'B/.';
                if(bc == 'PYG') currency_before = 'Gs';
                if(bc == 'PEN') currency_before = 'S/.';
                if(bc == 'PLN') currency_before = 'zl';
                if(bc == 'RON') currency_before = 'lei';
                if(bc == 'SHP') currency_before = '&pound;';
                if(bc == 'SGD') currency_before = '$';
                if(bc == 'SBD') currency_before = '$';
                if(bc == 'SOS') currency_before = 'S';
                if(bc == 'ZAR') currency_before = 'R';
                if(bc == 'SEK') currency_before = 'kr';
                if(bc == 'CHF') currency_before = 'CHF';
                if(bc == 'SRD') currency_before = '$';
                if(bc == 'SYP') currency_before = '&pound;';
                if(bc == 'TWD') currency_before = 'NT$';
                if(bc == 'TTD') currency_before = 'TT$';
                if(bc == 'TRY') currency_before = 'TL';
                if(bc == 'TRL') currency_before = '&pound;';
                if(bc == 'TVD') currency_before = '$';
                if(bc == 'GBP') currency_before = '&pound;';
                if(bc == 'USD') currency_before = '$';
                if(bc == 'UYU') currency_before = '$U';
                if(bc == 'VEF') currency_before = 'Bs';
                if(bc == 'ZWD') currency_before = 'Z$';
                
                if( currency_before == '' && currency_after == '' ) currency_before = '$';
                
                var output = '';
                if(!settings.hidePrefix) output += currency_before;
                output += helpers.number_format( amount, settings.decimals, settings.decimal, settings.thousands );
                if(!settings.hidePostfix) output += currency_after;
                return output;
            },
            
            // Kindly borrowed from http://phpjs.org/functions/number_format
            number_format: function(number, decimals, dec_point, thousands_sep) {
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
            
            isNumber: function(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
            
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in currency plugin!');
        }

    }

    $.fn.currency.defaults = {
        region: 'USD', // The 3 digit ISO code you want to display your currency in
        thousands: ',', // Thousands separator
        decimal: '.',   // Decimal separator
        decimals: 2, // How many decimals to show
        hidePrefix: false, // Hide any prefix
        hidePostfix: false, // Hide any postfix
        convertFrom: '', // If converting, the 3 digit ISO code you want to convert from,
        convertLoading: '(Converting...)', // Loading message appended to values while converting
        convertLocation: 'convert.php' // Location of convert.php file
    }

    $.fn.currency.settings = {}

})(jQuery);