# .ashx - the ash file format

## Design Goals and Goals
- Isolate syntax from semantics
- Create a robust .ashx file format
- Allow ash.v5 to support ash.v4 resource files. 
- AshX syntax have 2 dialects 
	- elixir style: ex: `customer.ex.ashx` 
	- ashx curly. [B language](https://en.wikipedia.org/wiki/B_%28programming_language%29) style syntax. ex: `customer.curly.ashx`
- .ex.ashx and .curly.ash are isomorph: 
	- `ashx_to_curly(customer.ex.ashx) == customer.curly.ashx`
	- `ashx_to_ex(customer.curly.ashx) == customer.ex.ashx`
- .ex.ashx syntax is a subset of (elixir + Ash dsls)
- .ex.ashx file can be seamlessly integrated into an ash project
- .ashx files can be edited visually (see [ballerina vscode extension](https://ballerina.io/learn/vs-code-extension/))
- AshX is not a DSL builder like Spark DSL
- AshX have a "welcome policy" to other languages (Ruby, Clojure, JS, Yaml, XML). (see CarbonUI for inspiration [CarbonUI - supported frameworks](https://carbondesignsystem.com/developing/frameworks/other-frameworks))
- AshX adheres to the [Rule of least power](https://en.wikipedia.org/wiki/Rule_of_least_power)

## Early Products and Libraries:
- ashx.ebnf : a BNF for AshX
- .ashx file format
- ashx-parser : Parser, Syntax Checker. Available as:
	- CLI command (npm, brew, mix)
	- JS Library (for in browser apps and front-end first devs)
	- Elixir Library (to please Elixir minmaxers)
- ashx-playground  : AshX web playground
- ashx-visual-editor : native, web and for vscode
- ashx-vscode-extension : see https://ballerina.io/

## Project Roadmap
- 2024: Build early products 2024
- 2025: Get absorbed by ash project
- 2025: Support AshX integration in commercial projects (kech.app can be a first customer)
- 2026: Design by comity

