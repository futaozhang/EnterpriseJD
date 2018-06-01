(function(a) { if (typeof define === 'function' && define.amd) { define(['jquery'], a) } else if (typeof exports === 'object') { module.exports = a(require('jquery')) } else { a(jQuery) } }(function($) {
    if ($.support.cors || !$.ajaxTransport || !window.XDomainRequest) { return }
    var n = /^https?:\/\//i;
    var o = /^get|post$/i;
    var p = new RegExp('^' + location.protocol, 'i');
    $.ajaxTransport('* text html xml json', function(j, k, l) {
        if (!j.crossDomain || !j.async || !o.test(j.type) || !n.test(j.url) || !p.test(j.url)) { return }
        var m = null;
        return {
            send: function(f, g) {
                var h = '';
                var i = (k.dataType || '').toLowerCase();
                m = new XDomainRequest();
                if (/^\d+$/.test(k.timeout)) { m.timeout = k.timeout }
                m.ontimeout = function() { g(500, 'timeout') };
                m.onload = function() {
                    var a = 'Content-Length: ' + m.responseText.length + '\r\nContent-Type: ' + m.contentType;
                    var b = { code: 200, message: 'success' };
                    var c = { text: m.responseText };
                    try {
                        if (i === 'html' || /text\/html/i.test(m.contentType)) { c.html = m.responseText } else if (i === 'json' || (i !== 'text' && /\/json/i.test(m.contentType))) {
                            try { c.json = $.parseJSON(m.responseText) } catch (e) {
                                b.code = 500;
                                b.message = 'parseerror'
                            }
                        } else if (i === 'xml' || (i !== 'text' && /\/xml/i.test(m.contentType))) {
                            var d = new ActiveXObject('Microsoft.XMLDOM');
                            d.async = false;
                            try { d.loadXML(m.responseText) } catch (e) { d = undefined }
                            if (!d || !d.documentElement || d.getElementsByTagName('parsererror').length) {
                                b.code = 500;
                                b.message = 'parseerror';
                                throw 'Invalid XML: ' + m.responseText;
                            }
                            c.xml = d
                        }
                    } catch (parseMessage) { throw parseMessage; } finally { g(b.code, b.message, c, a) }
                };
                m.onprogress = function() {};
                m.onerror = function() { g(500, 'error', { text: m.responseText }) };
                if (k.data) { h = ($.type(k.data) === 'string') ? k.data : $.param(k.data) }
                m.open(j.type, j.url);
                m.send(h)
            },
            abort: function() { if (m) { m.abort() } }
        }
    })
}));