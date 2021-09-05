{
	"targets": [{
		"target_name": "adder",
		"sources": ["nnao.cpp", "add.cpp"],
		"include_dirs": ["./"],
		"link_settings": {
			# "libraries": ["-l:add.so"],
			# "library_dirs": ["../../src"],
			# "ldflags": ["-Wl,-rpath,../src"]
		},
		"cflags_cc": ["-std=c++17", "-O3", "-fno-rtti", "-fno-exceptions"],
		"msvs_settings": {
			"VCCLCompilerTool": {
				"AdditionalOptions": ["/std:c++17", "/permissive-"],
				"Optimization": "3",
				"RuntimeTypeInfo": "false", # /GR-
				"WarningLevel": "4",
				"WholeProgramOptimization": "true"
			},
		},
	}]
}
