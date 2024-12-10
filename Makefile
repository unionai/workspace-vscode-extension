.PHONY: update-content
update-content:
	git submodule update --remote content


.PHONY: clean
clean:
	rm -rf union-workspace-*.vsix

.PHONY: package
package: clean
	vsce package --no-yarn
