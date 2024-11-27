.PHONY: update-workflows
update-workflows:
	git submodule update --remote workflows


.PHONY: clean
clean:
	rm -rf union-workspace-*.vsix

.PHONY: package
package: clean
	vsce package --no-yarn
