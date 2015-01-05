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
                else if(bc == 'ARS') currency_before = '$';
                else if(bc == 'AWG') currency_before = 'f';
                else if(bc == 'AUD') currency_before = '$';
                else if(bc == 'BSD') currency_before = '$';
                else if(bc == 'BBD') currency_before = '$';
                else if(bc == 'BYR') currency_before = 'p.';
                else if(bc == 'BZD') currency_before = 'BZ$';
                else if(bc == 'BMD') currency_before = '$';
                else if(bc == 'BOB') currency_before = '$b';
                else if(bc == 'BAM') currency_before = 'KM';
                else if(bc == 'BWP') currency_before = 'P';
                else if(bc == 'BRL') currency_before = 'R$';
                else if(bc == 'BND') currency_before = '$';
                else if(bc == 'CAD') currency_before = '$';
                else if(bc == 'KYD') currency_before = '$';
                else if(bc == 'CLP') currency_before = '$';
                else if(bc == 'CNY') currency_before = '&yen;';
                else if(bc == 'COP') currency_before = '$';
                else if(bc == 'CRC') currency_before = 'c';
                else if(bc == 'HRK') currency_before = 'kn';
                else if(bc == 'CZK') currency_before = 'Kc';
                else if(bc == 'DKK') currency_before = 'kr';
                else if(bc == 'DOP') currency_before = 'RD$';
                else if(bc == 'XCD') currency_before = '$';
                else if(bc == 'EGP') currency_before = '&pound;';
                else if(bc == 'SVC') currency_before = '$';
                else if(bc == 'EEK') currency_before = 'kr';
                else if(bc == 'EUR') currency_before = '&euro;';
                else if(bc == 'FKP') currency_before = '&pound;';
                else if(bc == 'FJD') currency_before = '$';
                else if(bc == 'GBP') currency_before = '&pound;';
                else if(bc == 'GHC') currency_before = 'c';
                else if(bc == 'GIP') currency_before = '&pound;';
                else if(bc == 'GTQ') currency_before = 'Q';
                else if(bc == 'GGP') currency_before = '&pound;';
                else if(bc == 'GYD') currency_before = '$';
                else if(bc == 'HNL') currency_before = 'L';
                else if(bc == 'HKD') currency_before = '$';
                else if(bc == 'HUF') currency_before = 'Ft';
                else if(bc == 'ISK') currency_before = 'kr';
                else if(bc == 'IDR') currency_before = 'Rp';
                else if(bc == 'IMP') currency_before = '&pound;';
                else if(bc == 'JMD') currency_before = 'J$';
                else if(bc == 'JPY') currency_before = '&yen;';
                else if(bc == 'JEP') currency_before = '&pound;';
                else if(bc == 'LVL') currency_before = 'Ls';
                else if(bc == 'LBP') currency_before = '&pound;';
                else if(bc == 'LRD') currency_before = '$';
                else if(bc == 'LTL') currency_before = 'Lt';
                else if(bc == 'MYR') currency_before = 'RM';
                else if(bc == 'MXN') currency_before = '$';
                else if(bc == 'MZN') currency_before = 'MT';
                else if(bc == 'NAD') currency_before = '$';
                else if(bc == 'ANG') currency_before = 'f';
                else if(bc == 'NZD') currency_before = '$';
                else if(bc == 'NIO') currency_before = 'C$';
                else if(bc == 'NOK') currency_before = 'kr';
                else if(bc == 'PAB') currency_before = 'B/.';
                else if(bc == 'PYG') currency_before = 'Gs';
                else if(bc == 'PEN') currency_before = 'S/.';
                else if(bc == 'PLN') currency_before = 'zl';
                else if(bc == 'RON') currency_before = 'lei';
                else if(bc == 'SHP') currency_before = '&pound;';
                else if(bc == 'SGD') currency_before = '$';
                else if(bc == 'SBD') currency_before = '$';
                else if(bc == 'SOS') currency_before = 'S';
                else if(bc == 'ZAR') currency_before = 'R';
                else if(bc == 'SEK') currency_before = 'kr';
                else if(bc == 'CHF') currency_before = 'CHF';
                else if(bc == 'SRD') currency_before = '$';
                else if(bc == 'SYP') currency_before = '&pound;';
                else if(bc == 'TWD') currency_before = 'NT$';
                else if(bc == 'TTD') currency_before = 'TT$';
                else if(bc == 'TRY') currency_before = 'TL';
                else if(bc == 'TRL') currency_before = '&pound;';
                else if(bc == 'TVD') currency_before = '$';
                else if(bc == 'GBP') currency_before = '&pound;';
                else if(bc == 'USD') currency_before = '$';
                else if(bc == 'UYU') currency_before = '$U';
                else if(bc == 'VEF') currency_before = 'Bs';
                else if(bc == 'ZWD') currency_before = 'Z$';

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