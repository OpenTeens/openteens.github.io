.PHONY: help
help:
	@echo help                 - show this help
	@echo revidx               - build revidx
	@echo revidx.extract       - extract text from wiki pages
	@echo revidx.build         - build revidx from extracted text
	@echo revidx.build.index   - build reverse index only
	@echo revidx.build.js      - build js search script only
	@echo revidx.build.commit  - build and commit
	@echo revidx.commit        - commit the builds
	@echo logo.build		   - build logo

.PHONY: revidx
revidx: revidx.extract revidx.build

.PHONY: revidx.extract
revidx.extract:
	python devtools/search/extract_text.py

.PHONY: revidx.build
revidx.build: revidx.build.index revidx.build.js

.PHONY: revidx.build.index
revidx.build.index:
	python devtools/search/build_revidx.py
	python devtools/search/gen_json.py

.PHONY: revidx.build.js
revidx.build.js:
	python devtools/search/build_jieba.py

.PHONY: revidx.build.commit
revidx.build.commit: revidx.build revidx.commit

.PHONY: revidx.commit
revidx.commit:
	git add search/*
	git commit -m "[build] /revidx: update"

logo.build: img/logo/build/*
	python img/logo/build.py
