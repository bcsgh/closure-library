/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview The SafeUrl type and its builders.
 *
 * TODO(xtof): Link to document stating type contract.
 */

goog.provide('goog.html.SafeUrl');

goog.require('goog.asserts');
goog.require('goog.fs.url');
goog.require('goog.html.TrustedResourceUrl');
goog.require('goog.i18n.bidi.Dir');
goog.require('goog.i18n.bidi.DirectionalString');
goog.require('goog.string.Const');
goog.require('goog.string.TypedString');
goog.require('goog.string.internal');



/**
 * A string that is safe to use in URL context in DOM APIs and HTML documents.
 *
 * A SafeUrl is a string-like object that carries the security type contract
 * that its value as a string will not cause untrusted script execution
 * when evaluated as a hyperlink URL in a browser.
 *
 * Values of this type are guaranteed to be safe to use in URL/hyperlink
 * contexts, such as assignment to URL-valued DOM properties, in the sense that
 * the use will not result in a Cross-Site-Scripting vulnerability. Similarly,
 * SafeUrls can be interpolated into the URL context of an HTML template (e.g.,
 * inside a href attribute). However, appropriate HTML-escaping must still be
 * applied.
 *
 * Note that, as documented in `goog.html.SafeUrl.unwrap`, this type's
 * contract does not guarantee that instances are safe to interpolate into HTML
 * without appropriate escaping.
 *
 * Note also that this type's contract does not imply any guarantees regarding
 * the resource the URL refers to.  In particular, SafeUrls are <b>not</b>
 * safe to use in a context where the referred-to resource is interpreted as
 * trusted code, e.g., as the src of a script tag.
 *
 * Instances of this type must be created via the factory methods
 * (`goog.html.SafeUrl.fromConstant`, `goog.html.SafeUrl.sanitize`),
 * etc and not by invoking its constructor. The constructor intentionally takes
 * an extra parameter that cannot be constructed outside of this file and the
 * type is immutable; hence only a default instance corresponding to the empty
 * string can be obtained via constructor invocation.
 *
 * @see goog.html.SafeUrl#fromConstant
 * @see goog.html.SafeUrl#from
 * @see goog.html.SafeUrl#sanitize
 * @final
 * @struct
 * @implements {goog.i18n.bidi.DirectionalString}
 * @implements {goog.string.TypedString}
 */
goog.html.SafeUrl = class {
  /**
   * @param {string} value
   * @param {!Object} token package-internal implementation detail.
   */
  constructor(value, token) {
    /**
     * The contained value of this SafeUrl.  The field has a purposely ugly
     * name to make (non-compiled) code that attempts to directly access this
     * field stand out.
     * @private {string}
     */
    this.privateDoNotAccessOrElseSafeUrlWrappedValue_ =
        (token === goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_) ? value : '';
  };
};


/**
 * The innocuous string generated by goog.html.SafeUrl.sanitize when passed
 * an unsafe URL.
 *
 * about:invalid is registered in
 * http://www.w3.org/TR/css3-values/#about-invalid.
 * http://tools.ietf.org/html/rfc6694#section-2.2.1 permits about URLs to
 * contain a fragment, which is not to be considered when determining if an
 * about URL is well-known.
 *
 * Using about:invalid seems preferable to using a fixed data URL, since
 * browsers might choose to not report CSP violations on it, as legitimate
 * CSS function calls to attr() can result in this URL being produced. It is
 * also a standard URL which matches exactly the semantics we need:
 * "The about:invalid URI references a non-existent document with a generic
 * error condition. It can be used when a URI is necessary, but the default
 * value shouldn't be resolveable as any type of document".
 *
 * @const {string}
 */
goog.html.SafeUrl.INNOCUOUS_STRING = 'about:invalid#zClosurez';


/**
 * @override
 * @const
 */
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = true;


/**
 * Returns this SafeUrl's value as a string.
 *
 * IMPORTANT: In code where it is security relevant that an object's type is
 * indeed `SafeUrl`, use `goog.html.SafeUrl.unwrap` instead of this
 * method. If in doubt, assume that it's security relevant. In particular, note
 * that goog.html functions which return a goog.html type do not guarantee that
 * the returned instance is of the right type.
 *
 * IMPORTANT: The guarantees of the SafeUrl type contract only extend to the
 * behavior of browsers when interpreting URLs. Values of SafeUrl objects MUST
 * be appropriately escaped before embedding in a HTML document. Note that the
 * required escaping is context-sensitive (e.g. a different escaping is
 * required for embedding a URL in a style property within a style
 * attribute, as opposed to embedding in a href attribute).
 *
 * @see goog.html.SafeUrl#unwrap
 * @override
 */
goog.html.SafeUrl.prototype.getTypedStringValue = function() {
  'use strict';
  return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();
};


/**
 * @override
 * @const {boolean}
 */
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = true;


/**
 * Returns this URLs directionality, which is always `LTR`.
 * @override
 * @return {!goog.i18n.bidi.Dir}
 */
goog.html.SafeUrl.prototype.getDirection = function() {
  'use strict';
  return goog.i18n.bidi.Dir.LTR;
};


/**
 * Returns a string-representation of this value.
 *
 * To obtain the actual string value wrapped in a SafeUrl, use
 * `goog.html.SafeUrl.unwrap`.
 *
 * @return {string}
 * @see goog.html.SafeUrl#unwrap
 * @override
 */
goog.html.SafeUrl.prototype.toString = function() {
  'use strict';
  return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();
};



/**
 * Performs a runtime check that the provided object is indeed a SafeUrl
 * object, and returns its value.
 *
 * IMPORTANT: The guarantees of the SafeUrl type contract only extend to the
 * behavior of  browsers when interpreting URLs. Values of SafeUrl objects MUST
 * be appropriately escaped before embedding in a HTML document. Note that the
 * required escaping is context-sensitive (e.g. a different escaping is
 * required for embedding a URL in a style property within a style
 * attribute, as opposed to embedding in a href attribute).
 *
 * @param {!goog.html.SafeUrl} safeUrl The object to extract from.
 * @return {string} The SafeUrl object's contained string, unless the run-time
 *     type check fails. In that case, `unwrap` returns an innocuous
 *     string, or, if assertions are enabled, throws
 *     `goog.asserts.AssertionError`.
 */
goog.html.SafeUrl.unwrap = function(safeUrl) {
  'use strict';
  // Perform additional Run-time type-checking to ensure that safeUrl is indeed
  // an instance of the expected type.  This provides some additional protection
  // against security bugs due to application code that disables type checks.
  // Specifically, the following checks are performed:
  // 1. The object is an instance of the expected type.
  // 2. The object is not an instance of a subclass.
  if (safeUrl instanceof goog.html.SafeUrl &&
      safeUrl.constructor === goog.html.SafeUrl) {
    return safeUrl.privateDoNotAccessOrElseSafeUrlWrappedValue_;
  } else {
    goog.asserts.fail(
        'expected object of type SafeUrl, got \'' + safeUrl + '\' of type ' +
        goog.typeOf(safeUrl));
    return 'type_error:SafeUrl';
  }
};


/**
 * Creates a SafeUrl object from a compile-time constant string.
 *
 * Compile-time constant strings are inherently program-controlled and hence
 * trusted.
 *
 * @param {!goog.string.Const} url A compile-time-constant string from which to
 *         create a SafeUrl.
 * @return {!goog.html.SafeUrl} A SafeUrl object initialized to `url`.
 */
goog.html.SafeUrl.fromConstant = function(url) {
  'use strict';
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
      goog.string.Const.unwrap(url));
};


/**
 * A pattern that matches Blob or data types that can have SafeUrls created
 * from URL.createObjectURL(blob) or via a data: URI.
 *
 * This has some parameter support (most notably, we haven't implemented the
 * more complex parts like %-encoded characters or non-alphanumerical ones for
 * simplicity's sake). The specs are fairly complex, and they don't
 * always match Chrome's behavior: we settled on a subset where we're confident
 * all parties involved agree.
 *
 * The spec is available at https://mimesniff.spec.whatwg.org/ (and see
 * https://tools.ietf.org/html/rfc2397 for data: urls, which override some of
 * it).
 * @const
 * @private
 */
goog.html.SAFE_MIME_TYPE_PATTERN_ = new RegExp(
    // Note: Due to content-sniffing concerns, only add MIME types for
    // media formats.
    '^(?:audio/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|' +
        'font/\\w+|' +
        'image/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|' +
        'video/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))' +
        '(?:;\\w+=(?:\\w+|"[\\w;,= ]+"))*$',  // MIME type parameters
    'i');


/**
 * @param {string} mimeType The MIME type to check if safe.
 * @return {boolean} True if the MIME type is safe and creating a Blob via
 *   `SafeUrl.fromBlob()` with that type will not fail due to the type. False
 *   otherwise.
 */
goog.html.SafeUrl.isSafeMimeType = function(mimeType) {
  'use strict';
  return goog.html.SAFE_MIME_TYPE_PATTERN_.test(mimeType);
};


/**
 * Creates a SafeUrl wrapping a blob URL for the given `blob`.
 *
 * The blob URL is created with `URL.createObjectURL`. If the MIME type
 * for `blob` is not of a known safe audio, image or video MIME type,
 * then the SafeUrl will wrap {@link #INNOCUOUS_STRING}.
 *
 * Note: Call {@link revokeObjectUrl} on the URL after it's used
 * to prevent memory leaks.
 *
 * @see http://www.w3.org/TR/FileAPI/#url
 * @param {!Blob} blob
 * @return {!goog.html.SafeUrl} The blob URL, or an innocuous string wrapped
 *   as a SafeUrl.
 */
goog.html.SafeUrl.fromBlob = function(blob) {
  'use strict';
  var url = goog.html.SafeUrl.isSafeMimeType(blob.type) ?
      goog.fs.url.createObjectUrl(blob) :
      goog.html.SafeUrl.INNOCUOUS_STRING;
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};


/**
 * Revokes an object URL created for a safe URL created {@link fromBlob()}.
 * @param {!goog.html.SafeUrl} safeUrl SafeUrl wrapping a blob object.
 * @return {void}
 */
goog.html.SafeUrl.revokeObjectUrl = function(safeUrl) {
  'use strict';
  var url = safeUrl.getTypedStringValue();
  if (url !== goog.html.SafeUrl.INNOCUOUS_STRING) {
    goog.fs.url.revokeObjectUrl(url);
  }
};


/**
 * Creates a SafeUrl wrapping a blob URL created for a MediaSource.
 * @param {!MediaSource} mediaSource
 * @return {!goog.html.SafeUrl} The blob URL.
 */
goog.html.SafeUrl.fromMediaSource = function(mediaSource) {
  'use strict';
  goog.asserts.assert(
      'MediaSource' in goog.global, 'No support for MediaSource');
  const url = mediaSource instanceof MediaSource ?
      goog.fs.url.createObjectUrl(mediaSource) :
      goog.html.SafeUrl.INNOCUOUS_STRING;
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};


/**
 * Matches a base-64 data URL, with the first match group being the MIME type.
 * @const
 * @private
 */
goog.html.DATA_URL_PATTERN_ = /^data:(.*);base64,[a-z0-9+\/]+=*$/i;


/**
 * Attempts to create a SafeUrl wrapping a `data:` URL, after validating it
 * matches a known-safe media MIME type. If it doesn't match, return `null`.
 *
 * @param {string} dataUrl A valid base64 data URL with one of the whitelisted
 *     media MIME types.
 * @return {?goog.html.SafeUrl} A matching safe URL, or `null` if it does not
 *     pass.
 */
goog.html.SafeUrl.tryFromDataUrl = function(dataUrl) {
  'use strict';
  // For defensive purposes, in case users cast around the parameter type.
  dataUrl = String(dataUrl);
  // RFC4648 suggest to ignore CRLF in base64 encoding.
  // See https://tools.ietf.org/html/rfc4648.
  // Remove the CR (%0D) and LF (%0A) from the dataUrl.
  var filteredDataUrl = dataUrl.replace(/(%0A|%0D)/g, '');
  var match = filteredDataUrl.match(goog.html.DATA_URL_PATTERN_);
  // Note: The only risk of XSS here is if the `data:` URL results in a
  // same-origin document. In which case content-sniffing might cause the
  // browser to interpret the contents as html.
  // All modern browsers consider `data:` URL documents to have unique empty
  // origins. Only Firefox for versions prior to v57 behaves differently:
  // https://blog.mozilla.org/security/2017/10/04/treating-data-urls-unique-origins-firefox-57/
  // Older versions of IE don't understand `data:` urls, so it is not an issue.
  if (match) {
    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
        filteredDataUrl);
  }
  return null;
};


/**
 * Creates a SafeUrl wrapping a `data:` URL, after validating it matches a
 * known-safe media MIME type. If it doesn't match, return
 * `goog.html.SafeUrl.INNOCUOUS_URL`.
 *
 * @param {string} dataUrl A valid base64 data URL with one of the whitelisted
 *     media MIME types.
 * @return {!goog.html.SafeUrl} A matching safe URL, or
 *     `goog.html.SafeUrl.INNOCUOUS_URL` if it does not pass.
 */
goog.html.SafeUrl.fromDataUrl = function(dataUrl) {
  'use strict';
  return goog.html.SafeUrl.tryFromDataUrl(dataUrl) ||
      goog.html.SafeUrl.INNOCUOUS_URL;
};


/**
 * Creates a SafeUrl wrapping a tel: URL.
 *
 * @param {string} telUrl A tel URL.
 * @return {!goog.html.SafeUrl} A matching safe URL, or {@link INNOCUOUS_STRING}
 *     wrapped as a SafeUrl if it does not pass.
 */
goog.html.SafeUrl.fromTelUrl = function(telUrl) {
  'use strict';
  // There's a risk that a tel: URL could immediately place a call once
  // clicked, without requiring user confirmation. For that reason it is
  // handled in this separate function.
  if (!goog.string.internal.caseInsensitiveStartsWith(telUrl, 'tel:')) {
    telUrl = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
      telUrl);
};


/**
 * Matches a sip/sips URL. We only allow urls that consist of an email address.
 * The characters '?' and '#' are not allowed in the local part of the email
 * address.
 * @const
 * @private
 */
goog.html.SIP_URL_PATTERN_ = new RegExp(
    '^sip[s]?:[+a-z0-9_.!$%&\'*\\/=^`{|}~-]+@([a-z0-9-]+\\.)+[a-z0-9]{2,63}$',
    'i');


/**
 * Creates a SafeUrl wrapping a sip: URL. We only allow urls that consist of an
 * email address. The characters '?' and '#' are not allowed in the local part
 * of the email address.
 *
 * @param {string} sipUrl A sip URL.
 * @return {!goog.html.SafeUrl} A matching safe URL, or {@link INNOCUOUS_STRING}
 *     wrapped as a SafeUrl if it does not pass.
 */
goog.html.SafeUrl.fromSipUrl = function(sipUrl) {
  'use strict';
  if (!goog.html.SIP_URL_PATTERN_.test(decodeURIComponent(sipUrl))) {
    sipUrl = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
      sipUrl);
};


/**
 * Creates a SafeUrl wrapping a fb-messenger://share URL.
 *
 * @param {string} facebookMessengerUrl A facebook messenger URL.
 * @return {!goog.html.SafeUrl} A matching safe URL, or {@link INNOCUOUS_STRING}
 *     wrapped as a SafeUrl if it does not pass.
 */
goog.html.SafeUrl.fromFacebookMessengerUrl = function(facebookMessengerUrl) {
  'use strict';
  if (!goog.string.internal.caseInsensitiveStartsWith(
          facebookMessengerUrl, 'fb-messenger://share')) {
    facebookMessengerUrl = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
      facebookMessengerUrl);
};

/**
 * Creates a SafeUrl wrapping a whatsapp://send URL.
 *
 * @param {string} whatsAppUrl A WhatsApp URL.
 * @return {!goog.html.SafeUrl} A matching safe URL, or {@link INNOCUOUS_STRING}
 *     wrapped as a SafeUrl if it does not pass.
 */
goog.html.SafeUrl.fromWhatsAppUrl = function(whatsAppUrl) {
  'use strict';
  if (!goog.string.internal.caseInsensitiveStartsWith(
          whatsAppUrl, 'whatsapp://send')) {
    whatsAppUrl = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
      whatsAppUrl);
};

/**
 * Creates a SafeUrl wrapping a sms: URL.
 *
 * @param {string} smsUrl A sms URL.
 * @return {!goog.html.SafeUrl} A matching safe URL, or {@link INNOCUOUS_STRING}
 *     wrapped as a SafeUrl if it does not pass.
 */
goog.html.SafeUrl.fromSmsUrl = function(smsUrl) {
  'use strict';
  if (!goog.string.internal.caseInsensitiveStartsWith(smsUrl, 'sms:') ||
      !goog.html.SafeUrl.isSmsUrlBodyValid_(smsUrl)) {
    smsUrl = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
      smsUrl);
};


/**
 * Validates SMS URL `body` parameter, which is optional and should appear at
 * most once and should be percent-encoded if present. Rejects many malformed
 * bodies, but may spuriously reject some URLs and does not reject all malformed
 * sms: URLs.
 *
 * @param {string} smsUrl A sms URL.
 * @return {boolean} Whether SMS URL has a valid `body` parameter if it exists.
 * @private
 */
goog.html.SafeUrl.isSmsUrlBodyValid_ = function(smsUrl) {
  'use strict';
  var hash = smsUrl.indexOf('#');
  if (hash > 0) {
    smsUrl = smsUrl.substring(0, hash);
  }
  var bodyParams = smsUrl.match(/[?&]body=/gi);
  // "body" param is optional
  if (!bodyParams) {
    return true;
  }
  // "body" MUST only appear once
  if (bodyParams.length > 1) {
    return false;
  }
  // Get the encoded `body` parameter value.
  var bodyValue = smsUrl.match(/[?&]body=([^&]*)/)[1];
  if (!bodyValue) {
    return true;
  }
  try {
    decodeURIComponent(bodyValue);
  } catch (error) {
    return false;
  }
  return /^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test(bodyValue);
};


/**
 * Creates a SafeUrl wrapping a ssh: URL.
 *
 * @param {string} sshUrl A ssh URL.
 * @return {!goog.html.SafeUrl} A matching safe URL, or {@link INNOCUOUS_STRING}
 *     wrapped as a SafeUrl if it does not pass.
 */
goog.html.SafeUrl.fromSshUrl = function(sshUrl) {
  'use strict';
  if (!goog.string.internal.caseInsensitiveStartsWith(sshUrl, 'ssh://')) {
    sshUrl = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
      sshUrl);
};

/**
 * Sanitizes a Chrome extension URL to SafeUrl, given a compile-time-constant
 * extension identifier. Can also be restricted to chrome extensions.
 *
 * @param {string} url The url to sanitize. Should start with the extension
 *     scheme and the extension identifier.
 * @param {!goog.string.Const|!Array<!goog.string.Const>} extensionId The
 *     extension id to accept, as a compile-time constant or an array of those.
 *
 * @return {!goog.html.SafeUrl} Either `url` if it's deemed safe, or
 *     `INNOCUOUS_STRING` if it's not.
 */
goog.html.SafeUrl.sanitizeChromeExtensionUrl = function(url, extensionId) {
  'use strict';
  return goog.html.SafeUrl.sanitizeExtensionUrl_(
      /^chrome-extension:\/\/([^\/]+)\//, url, extensionId);
};

/**
 * Sanitizes a Firefox extension URL to SafeUrl, given a compile-time-constant
 * extension identifier. Can also be restricted to chrome extensions.
 *
 * @param {string} url The url to sanitize. Should start with the extension
 *     scheme and the extension identifier.
 * @param {!goog.string.Const|!Array<!goog.string.Const>} extensionId The
 *     extension id to accept, as a compile-time constant or an array of those.
 *
 * @return {!goog.html.SafeUrl} Either `url` if it's deemed safe, or
 *     `INNOCUOUS_STRING` if it's not.
 */
goog.html.SafeUrl.sanitizeFirefoxExtensionUrl = function(url, extensionId) {
  'use strict';
  return goog.html.SafeUrl.sanitizeExtensionUrl_(
      /^moz-extension:\/\/([^\/]+)\//, url, extensionId);
};

/**
 * Sanitizes a Edge extension URL to SafeUrl, given a compile-time-constant
 * extension identifier. Can also be restricted to chrome extensions.
 *
 * @param {string} url The url to sanitize. Should start with the extension
 *     scheme and the extension identifier.
 * @param {!goog.string.Const|!Array<!goog.string.Const>} extensionId The
 *     extension id to accept, as a compile-time constant or an array of those.
 *
 * @return {!goog.html.SafeUrl} Either `url` if it's deemed safe, or
 *     `INNOCUOUS_STRING` if it's not.
 */
goog.html.SafeUrl.sanitizeEdgeExtensionUrl = function(url, extensionId) {
  'use strict';
  return goog.html.SafeUrl.sanitizeExtensionUrl_(
      /^ms-browser-extension:\/\/([^\/]+)\//, url, extensionId);
};

/**
 * Private helper for converting extension URLs to SafeUrl, given the scheme for
 * that particular extension type. Use the sanitizeFirefoxExtensionUrl,
 * sanitizeChromeExtensionUrl or sanitizeEdgeExtensionUrl unless you're building
 * new helpers.
 *
 * @private
 * @param {!RegExp} scheme The scheme to accept as a RegExp extracting the
 *     extension identifier.
 * @param {string} url The url to sanitize. Should start with the extension
 *     scheme and the extension identifier.
 * @param {!goog.string.Const|!Array<!goog.string.Const>} extensionId The
 *     extension id to accept, as a compile-time constant or an array of those.
 *
 * @return {!goog.html.SafeUrl} Either `url` if it's deemed safe, or
 *     `INNOCUOUS_STRING` if it's not.
 */
goog.html.SafeUrl.sanitizeExtensionUrl_ = function(scheme, url, extensionId) {
  'use strict';
  var matches = scheme.exec(url);
  if (!matches) {
    url = goog.html.SafeUrl.INNOCUOUS_STRING;
  } else {
    var extractedExtensionId = matches[1];
    var acceptedExtensionIds;
    if (extensionId instanceof goog.string.Const) {
      acceptedExtensionIds = [goog.string.Const.unwrap(extensionId)];
    } else {
      acceptedExtensionIds = extensionId.map(function unwrap(x) {
        'use strict';
        return goog.string.Const.unwrap(x);
      });
    }
    if (acceptedExtensionIds.indexOf(extractedExtensionId) == -1) {
      url = goog.html.SafeUrl.INNOCUOUS_STRING;
    }
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};


/**
 * Creates a SafeUrl from TrustedResourceUrl. This is safe because
 * TrustedResourceUrl is more tightly restricted than SafeUrl.
 *
 * @param {!goog.html.TrustedResourceUrl} trustedResourceUrl
 * @return {!goog.html.SafeUrl}
 */
goog.html.SafeUrl.fromTrustedResourceUrl = function(trustedResourceUrl) {
  'use strict';
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
      goog.html.TrustedResourceUrl.unwrap(trustedResourceUrl));
};


/**
 * A pattern that recognizes a commonly useful subset of URLs that satisfy
 * the SafeUrl contract.
 *
 * This regular expression matches a subset of URLs that will not cause script
 * execution if used in URL context within a HTML document. Specifically, this
 * regular expression matches if (comment from here on and regex copied from
 * Soy's EscapingConventions):
 * (1) Either a protocol in a whitelist (http, https, mailto or ftp).
 * (2) or no protocol.  A protocol must be followed by a colon. The below
 *     allows that by allowing colons only after one of the characters [/?#].
 *     A colon after a hash (#) must be in the fragment.
 *     Otherwise, a colon after a (?) must be in a query.
 *     Otherwise, a colon after a single solidus (/) must be in a path.
 *     Otherwise, a colon after a double solidus (//) must be in the authority
 *     (before port).
 *
 * @private
 * @const {!RegExp}
 */
goog.html.SAFE_URL_PATTERN_ =
    /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;

/**
 * Public version of goog.html.SAFE_URL_PATTERN_. Updating
 * goog.html.SAFE_URL_PATTERN_ doesn't seem to be backward compatible.
 * Namespace is also changed to goog.html.SafeUrl so it can be imported using
 * goog.require('goog.dom.SafeUrl').
 *
 * TODO(bangert): Remove SAFE_URL_PATTERN_
 * @const {!RegExp}
 */
goog.html.SafeUrl.SAFE_URL_PATTERN = goog.html.SAFE_URL_PATTERN_;

/**
 * Attempts to create a SafeUrl object from `url`. The input string is validated
 * to match a pattern of commonly used safe URLs. If validation fails, `null` is
 * returned.
 *
 * `url` may be a URL with the `http:`, `https:`, `mailto:`, `ftp:` or `data`
 * scheme, or a relative URL (i.e., a URL without a scheme; specifically, a
 * scheme-relative, absolute-path-relative, or path-relative URL).
 *
 * @see http://url.spec.whatwg.org/#concept-relative-url
 * @param {string|!goog.string.TypedString} url The URL to validate.
 * @return {?goog.html.SafeUrl} The validated URL, wrapped as a SafeUrl, or null
 *     if validation fails.
 */
goog.html.SafeUrl.trySanitize = function(url) {
  'use strict';
  if (url instanceof goog.html.SafeUrl) {
    return url;
  }
  if (typeof url == 'object' && url.implementsGoogStringTypedString) {
    url = /** @type {!goog.string.TypedString} */ (url).getTypedStringValue();
  } else {
    // For defensive purposes, in case users cast around the parameter type.
    url = String(url);
  }
  if (!goog.html.SAFE_URL_PATTERN_.test(url)) {
    return goog.html.SafeUrl.tryFromDataUrl(url);
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};

/**
 * Creates a SafeUrl object from `url`. If `url` is a
 * `goog.html.SafeUrl` then it is simply returned. Otherwise the input string is
 * validated to match a pattern of commonly used safe URLs. If validation fails,
 * `goog.html.SafeUrl.INNOCUOUS_URL` is returned.
 *
 * `url` may be a URL with the `http:`, `https:`, `mailto:`, `ftp:` or `data`
 * scheme, or a relative URL (i.e., a URL without a scheme; specifically, a
 * scheme-relative, absolute-path-relative, or path-relative URL).
 *
 * @see http://url.spec.whatwg.org/#concept-relative-url
 * @param {string|!goog.string.TypedString} url The URL to validate.
 * @return {!goog.html.SafeUrl} The validated URL, wrapped as a SafeUrl.
 */
goog.html.SafeUrl.sanitize = function(url) {
  'use strict';
  return goog.html.SafeUrl.trySanitize(url) || goog.html.SafeUrl.INNOCUOUS_URL;
};

/**
 * Creates a SafeUrl object from `url`. If `url` is a
 * `goog.html.SafeUrl` then it is simply returned. Otherwise the input string is
 * validated to match a pattern of commonly used safe URLs.
 *
 * `url` may be a URL with the http, https, mailto or ftp scheme,
 * or a relative URL (i.e., a URL without a scheme; specifically, a
 * scheme-relative, absolute-path-relative, or path-relative URL).
 *
 * This function asserts (using goog.asserts) that the URL matches this pattern.
 * If it does not, in addition to failing the assert, an innocuous URL will be
 * returned.
 *
 * @see http://url.spec.whatwg.org/#concept-relative-url
 * @param {string|!goog.string.TypedString} url The URL to validate.
 * @param {boolean=} opt_allowDataUrl Whether to allow valid data: URLs.
 * @return {!goog.html.SafeUrl} The validated URL, wrapped as a SafeUrl.
 */
goog.html.SafeUrl.sanitizeAssertUnchanged = function(url, opt_allowDataUrl) {
  'use strict';
  if (url instanceof goog.html.SafeUrl) {
    return url;
  } else if (typeof url == 'object' && url.implementsGoogStringTypedString) {
    url = /** @type {!goog.string.TypedString} */ (url).getTypedStringValue();
  } else {
    url = String(url);
  }
  if (opt_allowDataUrl && /^data:/i.test(url)) {
    var safeUrl = goog.html.SafeUrl.fromDataUrl(url);
    if (safeUrl.getTypedStringValue() == url) {
      return safeUrl;
    }
  }
  if (!goog.asserts.assert(
          goog.html.SAFE_URL_PATTERN_.test(url),
          '%s does not match the safe URL pattern', url)) {
    url = goog.html.SafeUrl.INNOCUOUS_STRING;
  }
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);
};

/**
 * Token used to ensure that object is created only from this file. No code
 * outside of this file can access this token.
 * @private {!Object}
 * @const
 */
goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};

/**
 * Package-internal utility method to create SafeUrl instances.
 *
 * @param {string} url The string to initialize the SafeUrl object with.
 * @return {!goog.html.SafeUrl} The initialized SafeUrl object.
 * @package
 */
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(
    url) {
  'use strict';
  return new goog.html.SafeUrl(
      url, goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_);
};


/**
 * `INNOCUOUS_STRING` wrapped in a `SafeUrl`.
 * @const {!goog.html.SafeUrl}
 */
goog.html.SafeUrl.INNOCUOUS_URL =
    goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
        goog.html.SafeUrl.INNOCUOUS_STRING);


/**
 * A SafeUrl corresponding to the special about:blank url.
 * @const {!goog.html.SafeUrl}
 */
goog.html.SafeUrl.ABOUT_BLANK =
    goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(
        'about:blank');
