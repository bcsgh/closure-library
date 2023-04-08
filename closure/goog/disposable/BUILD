load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

licenses(["notice"])

closure_js_library(
    name = "disposable",
    srcs = [
        "disposable.js",
    ],
    lenient = True,
    exports = [
        ":dispose",
        ":disposeall",
    ],
    deps = [
        ":dispose",
        ":disposeall",
        ":idisposable",
    ],
)

closure_js_library(
    name = "dispose",
    srcs = ["dispose.js"],
    lenient = True,
    deps = [":idisposable"],
)

closure_js_library(
    name = "disposeall",
    srcs = ["disposeall.js"],
    lenient = True,
    deps = [
        ":dispose",
        ":idisposable",
    ],
)

closure_js_library(
    name = "idisposable",
    srcs = ["idisposable.js"],
    lenient = True,
)
