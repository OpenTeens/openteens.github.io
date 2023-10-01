.PHONY: help
help:
	@echo help            - show this help
	@echo revidx          - build revidx
	@echo revidx.extract  - extract text from wiki pages
	@echo revidx.build    - build revidx from extracted text

.PHONY: revidx
revidx: revidx.extract revidx.build

.PHONY: revidx.extract
revidx.extract:
	python devtools/search/extract_text.py

.PHONY: revidx.build
revidx.build:
	python devtools/search/build_revidx.py
	python devtools/search/gen_json.py
	python devtools/search/build_jieba.py

