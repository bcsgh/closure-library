load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

licenses(["notice"])

closure_js_library(
    name = "abstractgraphics",
    srcs = ["abstractgraphics.js"],
    lenient = True,
    exports = [
        ":abstractgraphics_impl",
        ":affinetransform_impl",
        ":element_impl",
        ":strokeandfillelement_impl",
    ],
    deps = [
        ":abstractgraphics_impl",
        ":affinetransform_impl",
        ":element_impl",
        ":strokeandfillelement_impl",
        "//closure/goog/array",
        "//closure/goog/asserts",
        "//closure/goog/dom",
        "//closure/goog/events",
        "//closure/goog/events:eventtarget",
        "//closure/goog/events:listenable",
        "//closure/goog/math",
        "//closure/goog/math:coordinate",
        "//closure/goog/math:size",
        "//closure/goog/style",
        "//closure/goog/ui:component",
    ],
)

closure_js_library(
    name = "abstractgraphics_impl",
    srcs = [
        "ellipseelement.js",
        "font.js",
        "groupelement.js",
        "imageelement.js",
        "path.js",
        "pathelement.js",
        "rectelement.js",
        "solidfill.js",
        "stroke.js",
        "textelement.js",
    ],
    exports = [
        ":fill_impl",
    ],
    lenient = True,
    deps = [
        ":affinetransform_impl",
        ":element_impl",
        ":fill_impl",
        ":strokeandfillelement_impl",
        "//closure/goog/array",
        "//closure/goog/asserts",
        "//closure/goog/events",
        "//closure/goog/events:eventtarget",
        "//closure/goog/events:listenable",
        "//closure/goog/math",
    ],
)

alias(
    name = "affinetransform",
    actual = ":abstractgraphics",
)

closure_js_library(
    name = "affinetransform_impl",
    srcs = ["affinetransform.js"],
    lenient = True,
)

alias(
    name = "canvaselement",
    actual = ":canvasgraphics",
)

closure_js_library(
    name = "canvaselement_impl",
    srcs = ["canvaselement.js"],
    lenient = True,
    deps = [
        ":abstractgraphics",
        "//closure/goog/array",
        "//closure/goog/dom",
        "//closure/goog/dom:safe",
        "//closure/goog/dom:tagname",
        "//closure/goog/html:safehtml",
        "//closure/goog/html:uncheckedconversions",
        "//closure/goog/math",
        "//closure/goog/string",
        "//closure/goog/string:const",
    ],
)

closure_js_library(
    name = "canvasgraphics",
    srcs = ["canvasgraphics.js"],
    lenient = True,
    exports = [
        ":canvaselement_impl",
    ],
    deps = [
        ":abstractgraphics",
        ":canvaselement_impl",
        "//closure/goog/array",
        "//closure/goog/dom",
        "//closure/goog/dom:safe",
        "//closure/goog/dom:tagname",
        "//closure/goog/events:eventtype",
        "//closure/goog/html:safehtml",
        "//closure/goog/html:uncheckedconversions",
        "//closure/goog/math",
        "//closure/goog/math:size",
        "//closure/goog/string",
        "//closure/goog/string:const",
        "//closure/goog/style",
    ],
)

alias(
    name = "element",
    actual = ":abstractgraphics",
)

closure_js_library(
    name = "element_impl",
    srcs = ["element.js"],
    lenient = True,
    deps = [
        ":affinetransform_impl",
        "//closure/goog/asserts",
        "//closure/goog/events",
        "//closure/goog/events:eventtarget",
        "//closure/goog/events:listenable",
        "//closure/goog/math",
    ],
)

alias(
    name = "ellipseelement",
    actual = ":abstractgraphics",
)

alias(
    name = "fill",
    actual = ":abstractgraphics",
)

closure_js_library(
    name = "fill_impl",
    srcs = ["fill.js"],
    lenient = True,
)

alias(
    name = "font",
    actual = ":abstractgraphics",
)

closure_js_library(
    name = "graphics",
    srcs = [
        "graphics.js",
    ],
    lenient = True,
    deps = [
        ":abstractgraphics",
        ":canvasgraphics",
        ":svggraphics",
        "//closure/goog/dom",
        "//closure/goog/useragent",
    ],
)

alias(
    name = "groupelement",
    actual = ":abstractgraphics",
)

alias(
    name = "imageelement",
    actual = ":abstractgraphics",
)

closure_js_library(
    name = "lineargradient",
    srcs = ["lineargradient.js"],
    lenient = True,
    deps = [
        ":abstractgraphics",
        "//closure/goog/asserts",
    ],
)

alias(
    name = "path",
    actual = ":abstractgraphics",
)

alias(
    name = "pathelement",
    actual = ":abstractgraphics",
)

closure_js_library(
    name = "paths",
    srcs = ["paths.js"],
    lenient = True,
    deps = [
        ":abstractgraphics",
        "//closure/goog/math:coordinate",
    ],
)

alias(
    name = "rectelement",
    actual = ":abstractgraphics",
)

alias(
    name = "solidfill",
    actual = ":abstractgraphics",
)

alias(
    name = "stroke",
    actual = ":abstractgraphics",
)

alias(
    name = "strokeandfillelement",
    actual = ":abstractgraphics",
)

closure_js_library(
    name = "strokeandfillelement_impl",
    srcs = ["strokeandfillelement.js"],
    lenient = True,
    deps = [
        ":element_impl",
    ],
)

alias(
    name = "svgelement",
    actual = ":svggraphics",
)

closure_js_library(
    name = "svgelement_impl",
    srcs = ["svgelement.js"],
    lenient = True,
    deps = [
        ":abstractgraphics",
        "//closure/goog/dom",
    ],
)

closure_js_library(
    name = "svggraphics",
    srcs = ["svggraphics.js"],
    lenient = True,
    exports = [
        ":svgelement_impl",
    ],
    deps = [
        ":abstractgraphics",
        ":lineargradient",
        ":svgelement_impl",
        "//closure/goog/dom",
        "//closure/goog/events:eventhandler",
        "//closure/goog/events:eventtype",
        "//closure/goog/math",
        "//closure/goog/math:size",
        "//closure/goog/style",
        "//closure/goog/timer",
        "//closure/goog/useragent",
    ],
)

alias(
    name = "textelement",
    actual = ":graphics",
)
