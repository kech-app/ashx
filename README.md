# .ashx - the ash file format

## Design Goals
- Isolate ash syntax from semantics 
- Create a robust .ashx file format
- Allow ash.v5 to support ash.v4 resource files. 
- AshX syntax have 2 dialects 
	- elixir style: ex: `customer.ex.ashx` 
	- ashx curly. [B language](https://en.wikipedia.org/wiki/B_%28programming_language%29) style syntax. ex: `customer.curly.ashx`
- .ex.ashx and .curly.ash are isomorph: 
	- `ashx_to_curly("customer.ex.ashx") == customer.curly.ashx`
	- `ashx_to_ex("customer.curly.ashx") == customer.ex.ashx`
- .ex.ashx syntax is a subset of (elixir + Ash dsls)
- .ex.ashx file can be seamlessly integrated into an ash project
- .ashx files can be edited visually (see [ballerina vscode extenions](https://ballerina.io/learn/vs-code-extension/))
- AshX is not a DSL builder
- AshX have a "welcome policy" to other languages (Ruby, Clojure, JS, Yaml, XML). (see CarbonUI for inspiration [CarbonUI - supported frameworks](https://carbondesignsystem.com/developing/frameworks/other-frameworks))
- AshX adheres to the [Rule of least power](https://en.wikipedia.org/wiki/Rule_of_least_power)
- AshX accelerates the adoption of ash by focusing on syntax skills (reference: [How Syntax Contributes to Reading Development](https://www.doe.mass.edu/massliteracy/skilled-reading/language-comprehend/syntax.html))

## Early Products, Libraries and AI Expermiments
- ashx.ebnf : a BNF for AshX
- .ashx file format
- ashx-parser : Parser, Syntax Checker. Available as:
	- CLI command (npm, brew, mix)
	- JS Library (for in browser apps and front-end first devs)
	- Elixir Library (to please Elixir minmaxers)
- ashx-playground  : AshX web playground
- ashx-visual-editor : native, web and for vscode
- ashx-vscode-extension : see https://ballerina.io/
- Ash GPT: an experiment to generate .ashx files with GPT

## Methods and required skill levels 
_Technical design skills_: excellent

_Programming skills_: good

_System Thinking - basic_: as we dont want to make too many distinctions (2 distinctions are good for a start IMO):
- Distinction1: Syntax vs Semantics:
  - Syntax is visible, explicit, fixed, should be finite by design
  - Semantics are hidden, implicit, evolving, should be infinite by design
- Distinction2: Distinguish complex application code from less complex code (cognitive complexity)
  - program code as a map of maps is order-independent - Easier to reason about (goes to .ashx files)
  - program code as a list of lists is order-dependent - Harder to reason about (goes to .ex, .js files)
    
For an intro, about 'Distinctions' you can see [The Four Simple Rules of Systems Thinking: The Distinction Rule](https://blog.cabreraresearch.org/the-four-simple-rules-of-systems-thinking) and [Perspective Taking](https://blog.cabreraresearch.org/perspectivetaking)

## Project Roadmap 
- 2024: Build early products 2024
- 2025: Get absorbed by ash project
- 2025: Support AshX integration in commercial projects (kech.app can be a first customer)
- 2026: Design by comity

## Project status
- ashx.ebnf: started

