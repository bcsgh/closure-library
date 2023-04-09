load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

licenses(["notice"])

closure_js_library(
    name = "browserfeature",
    srcs = ["browserfeature.js"],
    lenient = True,
    deps = [
        ":defines",
        "//closure/goog/useragent",
        "//closure/goog/useragent:product",
    ],
)

closure_js_library(
    name = "clicktoeditwrapper",
    srcs = ["clicktoeditwrapper.js"],
    lenient = True,
    deps = [
        ":browserfeature",
        ":command",
        ":field",
        ":range",
        "//closure/goog/disposable",
        "//closure/goog/dom",
        "//closure/goog/dom:abstractrange",
        "//closure/goog/dom:range",
        "//closure/goog/dom:tagname",
        "//closure/goog/events:browserevent",
        "//closure/goog/events:eventhandler",
        "//closure/goog/events:eventtype",
    ],
)

closure_js_library(
    name = "command",
    srcs = ["command.js"],
    lenient = True,
)

closure_js_library(
    name = "contenteditablefield",
    srcs = ["contenteditablefield.js"],
    lenient = True,
    deps = [
        ":field",
        "//closure/goog/asserts",
        "//closure/goog/log",
    ],
)

closure_js_library(
    name = "defines",
    srcs = ["defines.js"],
    lenient = True,
)

closure_js_library(
    name = "field",
    srcs = ["field.js"],
    lenient = True,
    exports = [
        ":plugin_impl2",
    ],
    deps = [
        ":browserfeature",
        ":command",
        ":icontent",
        ":node",
        ":plugin_impl2",
        ":range",
        "//closure/goog/a11y/aria",
        "//closure/goog/a11y/aria:roles",
        "//closure/goog/array",
        "//closure/goog/asserts",
        "//closure/goog/async:delay",
        "//closure/goog/disposable",
        "//closure/goog/dom",
        "//closure/goog/dom:abstractrange",
        "//closure/goog/dom:classlist",
        "//closure/goog/dom:range",
        "//closure/goog/dom:safe",
        "//closure/goog/dom:tagname",
        "//closure/goog/events",
        "//closure/goog/events:browserevent",
        "//closure/goog/events:eventhandler",
        "//closure/goog/events:eventtarget",
        "//closure/goog/events:eventtype",
        "//closure/goog/events:keycodes",
        "//closure/goog/functions",
        "//closure/goog/html:legacyconversions",
        "//closure/goog/html:safehtml",
        "//closure/goog/html:safestylesheet",
        "//closure/goog/html:trustedresourceurl",
        "//closure/goog/labs/useragent:platform",
        "//closure/goog/log",
        "//closure/goog/object",
        "//closure/goog/reflect",
        "//closure/goog/string",
        "//closure/goog/style",
        "//closure/goog/useragent",
        "//closure/goog/useragent:product",
    ],
)

closure_js_library(
    name = "focus",
    srcs = ["focus.js"],
    lenient = True,
    deps = ["//closure/goog/dom:selection"],
)

closure_js_library(
    name = "icontent",
    srcs = ["icontent.js"],
    lenient = True,
    deps = [
        ":browserfeature",
        "//closure/goog/dom",
        "//closure/goog/dom:safe",
        "//closure/goog/html:legacyconversions",
        "//closure/goog/style",
        "//closure/goog/useragent",
    ],
)

closure_js_library(
    name = "link",
    srcs = ["link.js"],
    lenient = True,
    deps = [
        ":browserfeature",
        ":command",
        ":field",
        ":node",
        ":range",
        "//closure/goog/array",
        "//closure/goog/dom",
        "//closure/goog/dom:nodetype",
        "//closure/goog/dom:range",
        "//closure/goog/dom:tagname",
        "//closure/goog/string",
        "//closure/goog/uri:utils",
    ],
)

closure_js_library(
    name = "node",
    srcs = ["node.js"],
    lenient = True,
    deps = [
        "//closure/goog/asserts:dom",
        "//closure/goog/dom",
        "//closure/goog/dom:iter",
        "//closure/goog/dom:nodetype",
        "//closure/goog/dom:safe",
        "//closure/goog/dom:tagname",
        "//closure/goog/html:legacyconversions",
        "//closure/goog/iter",
        "//closure/goog/object",
        "//closure/goog/string",
        "//closure/goog/useragent",
    ],
)

closure_js_library(
    name = "plugin",
    srcs = ["plugin.js"],
    lenient = True,
    deps = [
        ":field",
        ":plugin_impl",
    ],
)

alias(
    name = "plugin_impl",
    actual = ":field",
)

closure_js_library(
    name = "plugin_impl2",
    srcs = ["plugin_impl.js"],
    lenient = True,
    deps = [
        "//closure/goog/events:eventtarget",
        "//closure/goog/functions",
        "//closure/goog/log",
        "//closure/goog/object",
        "//closure/goog/reflect",
        "//closure/goog/useragent",
    ],
)

closure_js_library(
    name = "range",
    srcs = ["range.js"],
    lenient = True,
    deps = [
        ":node",
        ":style",
        "//closure/goog/array",
        "//closure/goog/dom",
        "//closure/goog/dom:abstractrange",
        "//closure/goog/dom:nodetype",
        "//closure/goog/dom:range",
        "//closure/goog/dom:rangeendpoint",
        "//closure/goog/dom:savedcaretrange",
        "//closure/goog/dom:tagname",
        "//closure/goog/iter",
        "//closure/goog/useragent",
    ],
)

closure_js_library(
    name = "seamlessfield",
    srcs = ["seamlessfield.js"],
    lenient = True,
    deps = [
        ":browserfeature",
        ":field",
        ":icontent",
        ":node",
        "//closure/goog/cssom/iframe:style",
        "//closure/goog/dom",
        "//closure/goog/dom:range",
        "//closure/goog/dom:safe",
        "//closure/goog/dom:tagname",
        "//closure/goog/events",
        "//closure/goog/events:eventtype",
        "//closure/goog/html:safehtml",
        "//closure/goog/log",
        "//closure/goog/style",
    ],
)

closure_js_library(
    name = "style",
    srcs = ["style.js"],
    lenient = True,
    deps = [
        ":browserfeature",
        "//closure/goog/array",
        "//closure/goog/asserts",
        "//closure/goog/dom",
        "//closure/goog/dom:nodetype",
        "//closure/goog/dom:tagname",
        "//closure/goog/events:event",
        "//closure/goog/events:eventhandler",
        "//closure/goog/events:eventtype",
        "//closure/goog/object",
        "//closure/goog/style",
        "//closure/goog/useragent",
    ],
)

closure_js_library(
    name = "table",
    srcs = ["table.js"],
    lenient = True,
    exports = [
        ":tablecell",
        ":tablerow",
    ],
    deps = [
        ":tablecell",
        ":tablerow",
        "//closure/goog/asserts",
        "//closure/goog/dom",
        "//closure/goog/dom:nodetype",
        "//closure/goog/dom:tagname",
        "//closure/goog/log",
        "//closure/goog/string",
        "//closure/goog/style",
    ],
)

closure_js_library(
    name = "tablecell",
    srcs = ["tablecell.js"],
    lenient = True,
)

closure_js_library(
    name = "tablerow",
    srcs = ["tablerow.js"],
    lenient = True,
)
