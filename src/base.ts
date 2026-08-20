function toggleReveal(id: number) {
	const list = document.getElementById(`hidden-${id}`);
	const btn = document.getElementById(`button-${id}`);

	if (!list || !btn) {
        console.error("Could not find btn or list!")
        return;
    }

	if (list.style.display === "none") {
		list.style.display = "block";
		btn.innerText = "- Hide";
	} else {
	    list.style.display = "none";
	    btn.innerText = "+ Show";
	}
}

function createSideboard() {
	const sideboard = document.getElementById("sideboard-container");
	if (!sideboard) {
        console.error("Could not find sideboard!")
        return;
    }

	sideboard.innerHTML = `<section id="sideboard">
			<div>
			<h3>Quicklinks</h3>
			<ul>
				<li><span><a href="/">Home</a></span></li>
			</ul>
			</div>
			<br>
	
			<div>
			<h3><a href="/projects">Projects</a></h3>
			<button class="show-more-button" id="button-1" onclick="toggleReveal(1)">+ Show</button>
			<ul id="hidden-1" style="display: none;">
				<li><span><a href="/projects/final_frontier.html">The Final Frontier</a></span></li>
				<li><span><a href="/projects/dust_and_dawn.html">Dust & Dawn</a></span></li>
			</ul>
			</div>
			<br>

			<div>
				<h3><a href="/articles">Articles</a></h3>
				<button class="show-more-button" id="button-2" onclick="toggleReveal(2)">+ Show</button>
				<ul id="hidden-2" style="display: none;">
					<li><span><a href="/articles/standard_technologies.html">Standard Technologies</a></span></li>
					<li><span><a href="/articles/planet_classifications.html">Planet Classifications</a></span></li>
				</ul>
			</div>
			<br>

			<div>
				<h3><a href="/tools">Tools</a></h3>
				<h4><a href="/tools">General</a></h4>
				<button class="show-more-button" id="button-3" onclick="toggleReveal(3)">+ Show</button>
				<ul id="hidden-3" style="display: none;">
					<li><span><a href="/tools/general/case_converter.html">Case Converter</a></span></li>
				</ul>

				<h4><a href="/tools">Space</a></h4>
				<button class="show-more-button" id="button-4" onclick="toggleReveal(4)">+ Show</button>
				<ul id="hidden-4" style="display: none;">
					<li><span><a href="/tools/space/habitats.html">Habitat Calculator</a></span></li>
					<li><span><a href="/tools/space/engines.html">Engine Calculator</a></span></li>
					<li><span><a href="/tools/space/radiators.html">Radiator Calculator</a></span></li>
					<li><span><a href="/tools/space/luminosity.html">Luminosity Calculator</a></span></li>
					<li><span><a href="/tools/space/ftl_wave.html">FTL Wave Calculator</a></span></li>
					<li><span><a href="/tools/space/system_generator.html">System Generator</a></span></li>
				</ul>

				<h4><a href="/tools">Japanese</a></h4>
				<button class="show-more-button" id="button-5" onclick="toggleReveal(5)">+ Show</button>
				<ul id="hidden-5" style="display: none;">
					<li><span><a href="/tools/japanese/romaji.html">Wapuro Romaji Converter</a></span></li>
					<li><span><a href="/tools/japanese/counters.html">Counter Trainer</a></span></li>
				</ul>
			</div>
			
			<!--<div style="padding-right: 20px">
				<smallweb-subway-scifi></smallweb-subway-scifi>
			</div>-->
		</section>`;
}

function addHeaderButtons(root: ParentNode = document): void {
	const headerTags = ["h2", "h3", "h4", "h5"];
	const selector = headerTags.join(", ");

	root.querySelectorAll<HTMLElement>(selector).forEach((heading) => {
		const id = heading.id;
		if (!id || heading.querySelector(".anchor-copy-button")) 
			return;

		const button = document.createElement("button");
		button.className = "anchor-copy-button";
		button.title = "Copy link to this section";
		button.textContent = "↗";

		async function copyLink(e: PointerEvent) {
			e.stopPropagation();
			await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`);

			const original = button.textContent;
			button.textContent = "✓";
			setTimeout(() => (button.textContent = original), 1200);
		}

		button.addEventListener(
			"mouseenter", () => (button.style.opacity = "1")
		);
		button.addEventListener(
			"mouseleave", () => (button.style.opacity = "0.6")
		);
		button.addEventListener("click", async (e) => {
			copyLink(e);
		});

		heading.appendChild(button);
	});
}

function main() {
    createSideboard();
	addHeaderButtons()

    function openSidebar() {
        sidebar.classList.add('open');
        toggle.textContent = '✕';
        toggle.setAttribute('aria-expanded', 'true');
    }
    function closeSidebar() {
        sidebar.classList.remove('open');
        toggle.textContent = '☰';
        toggle.setAttribute('aria-expanded', 'false');
    }

    const sidebar = document.getElementById('sideboard')!
    const toggle = document.getElementById('sidebarToggle')!;

    toggle.addEventListener('click', () => {
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeSidebar();
    });

    if (typeof CountersApp !== 'undefined') {
        CountersApp.createNewQuestion();
    }
}