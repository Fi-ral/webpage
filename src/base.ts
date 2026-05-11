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
			<h3>Projects</h3>
			<button class="show-more-button" id="button-1" onclick="toggleReveal(1)">+ Show</button>
			<ul id="hidden-1" style="display: none;">
				<li><span><a href="/projects/final_frontier.html">The Final Frontier</a></span></li>
				<li><span><a href="/projects/dust_and_dawn.html">Dust & Dawn</a></span></li>
			</ul>
			</div>
			<br>

			<div>
				<h3>Articles</h3>
				<button class="show-more-button" id="button-2" onclick="toggleReveal(2)">+ Show</button>
				<ul id="hidden-2" style="display: none;">
					<li><span><a href="/articles/planet_classifications.html">Planet Classifications</a></span></li>
				</ul>
			</div>
			<br>

			<div>
				<h3>Tools</h3>
				<h4>General</h4>
				<button class="show-more-button" id="button-3" onclick="toggleReveal(3)">+ Show</button>
				<ul id="hidden-3" style="display: none;">
					<li><span><a href="/tools/general/case_converter.html">Case Converter</a></span></li>
				</ul>

				<h4>Space</h4>
				<button class="show-more-button" id="button-4" onclick="toggleReveal(4)">+ Show</button>
				<ul id="hidden-4" style="display: none;">
					<li><span><a href="/tools/space/habitats.html">Habitat Calculator</a></span></li>
					<li><span><a href="/tools/space/brachistochrone.html">Brachistochrone Calculator</a></span></li>
					<li><span><a href="/tools/space/travel_time.html">Travel Time Calculator</a></span></li>
					<li><span><a href="/tools/space/engines.html">Engine Calculator</a></span></li>
					<li><span><a href="/tools/space/radiators.html">Radiator Calculator</a></span></li>
				</ul>

				<h4>Japanese</h4>
				<button class="show-more-button" id="button-5" onclick="toggleReveal(5)">+ Show</button>
				<ul id="hidden-5" style="display: none;">
					<li><span><a href="/tools/japanese/romaji.html">Wapuro Romaji Converter</a></span></li>
					<li><span><a href="/tools/japanese/counters.html">Counter Trainer</a></span></li>
				</ul>
			</div>
		</section>`;
}

function main() {
    createSideboard();

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

    if ((window as any).createNewQuestion) {
        (window as any).createNewQuestion();
    }
}