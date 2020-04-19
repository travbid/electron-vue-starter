{
	"targets": [
		{
			"target_name": "adder",
			"sources": ["nnao.cpp", "add.cpp"],
			"include_dirs": ["./"],
			"link_settings": {
				# "libraries": ["-l:add.so"],
				# "library_dirs": ["../../src"],
				# "ldflags": ["-Wl,-rpath,../src"]
			},
			"cflags": ["-std=c++17", "-O3"],
			"cflags_cc!": [
				"-fno-rtti",
				"-fno-exceptions"
			]
		}
	]
}
