load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

licenses(["notice"])

closure_js_library(
    name = "pagevisibilitymonitor",
    srcs = [
        "pagevisibilityevent.js",
        "pagevisibilitymonitor.js",
    ],
    lenient = True,
    exports =[":pagevisibilitystate"],
    deps = [
        ":pagevisibilitystate",
        "//closure/goog/dom",
        "//closure/goog/dom:vendor",
        "//closure/goog/events",
        "//closure/goog/events:browserevent",
        "//closure/goog/events:event",
        "//closure/goog/events:eventtype",
        "//closure/goog/memoize",
    ],
)

closure_js_library(
    name = "pagevisibilitystate",
    srcs = ["pagevisibilitystate.js"],
    lenient = True,
)
