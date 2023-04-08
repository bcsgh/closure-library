load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

licenses(["notice"])

closure_js_library(
    name = "nativeresolver",
    srcs = ["nativeresolver.js"],
    lenient = True,
)

closure_js_library(
    name = "promise",
    srcs = ["promise.js"],
    lenient = True,
    exports = [
        ":resolver_impl",
        ":thenable_impl",
    ],
    deps = [
        ":resolver_impl",
        ":thenable_impl",
        "//closure/goog/asserts",
        "//closure/goog/async:freelist",
        "//closure/goog/async:run",
        "//closure/goog/async:throwexception",
        "//closure/goog/debug:error",
    ],
)

alias(
    name = "resolver",
    actual = ":promise",
)

closure_js_library(
    name = "resolver_impl",
    srcs = ["resolver.js"],
    lenient = True,
    deps = [
        "//closure/goog/asserts",
        "//closure/goog/async:freelist",
        "//closure/goog/async:run",
        "//closure/goog/async:throwexception",
        "//closure/goog/debug:error",
    ],
)

closure_js_library(
    name = "testsuiteadapter",
    testonly = 1,
    srcs = ["testsuiteadapter.js"],
    lenient = True,
    deps = [":promise"],
)

alias(
    name = "thenable",
    actual = ":promise",
)

closure_js_library(
    name = "thenable_impl",
    srcs = ["thenable.js"],
    lenient = True,
    deps = [
        "//closure/goog/asserts",
        "//closure/goog/async:freelist",
        "//closure/goog/async:run",
        "//closure/goog/async:throwexception",
        "//closure/goog/debug:error",
    ],
)
