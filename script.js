function attachRipple(button) {
	button.addEventListener('click', function (e) {
		const rect = button.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const span = document.createElement('span');
		span.className = 'ripple';
		span.style.width = span.style.height = size + 'px';
		span.style.left = (e.clientX - rect.left - size / 2) + 'px';
		span.style.top = (e.clientY - rect.top - size / 2) + 'px';
		button.appendChild(span);
		span.addEventListener('animationend', () => span.remove());
	});
}

function initReveals() {
	const toReveal = [];
	const selectors = [
		'.hero-content',
		'.hero-content h1',
		'.about-text',
		'.about-flex img',
		'.menu-section',
		'.coffee-table',
		'.main-footer',
		'.nav-links li',
		'.logo'
	];
	selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => toReveal.push(el)));

	toReveal.forEach(el => el.classList.add('reveal'));

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('active');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	toReveal.forEach((el, i) => {
		if (el.matches && el.matches('.nav-links li')) {
			el.style.transitionDelay = (i * 60) + 'ms';
		}
		observer.observe(el);
	});
}

document.addEventListener('DOMContentLoaded', function () {
	// page enter transition
	document.body.classList.add('page-enter');
	requestAnimationFrame(() => setTimeout(() => document.body.classList.add('active'), 18));

	initReveals();

	const ctas = document.querySelectorAll('.btn-cta');
	ctas.forEach(btn => attachRipple(btn));

	const logo = document.querySelector('.logo');
	if (logo) {
		logo.classList.add('reveal');
		setTimeout(() => logo.classList.add('active'), 80);
	}

	const navItems = document.querySelectorAll('.nav-links li');
	navItems.forEach((li, idx) => {
		li.classList.add('reveal');
		li.style.transitionDelay = (idx * 70) + 'ms';
	});

	// setup prefetch on hover + smooth page-exit fade
	setupPageTransitions();
});

function setupPageTransitions() {
	// prefetch on hover/focus to warm cache
	document.querySelectorAll('a[href]').forEach(a => {
		const href = a.getAttribute('href');
		if (!href || href.startsWith('#') || href.startsWith('mailto:') || a.target === '_blank') return;
		let url;
		try { url = new URL(href, location.href); } catch (e) { return; }
		if (url.origin !== location.origin) return;

		let added = false;
		const addPrefetch = () => {
			if (added) return; added = true;
			const link = document.createElement('link');
			link.rel = 'prefetch';
			link.href = url.href;
			document.head.appendChild(link);
		};

		a.addEventListener('mouseenter', addPrefetch, { passive: true });
		a.addEventListener('focus', addPrefetch, { passive: true });
	});

	// intercept clicks on internal links and play exit animation
	document.addEventListener('click', (e) => {
		const a = e.target.closest('a');
		if (!a) return;
		const href = a.getAttribute('href');
		if (!href || href.startsWith('#') || href.startsWith('mailto:') || a.target === '_blank') return;
		let url;
		try { url = new URL(href, location.href); } catch (err) { return; }
		if (url.origin !== location.origin) return; // external

		e.preventDefault();
		// trigger exit animation
		document.body.classList.remove('page-enter', 'active');
		document.body.classList.add('page-exit');
		requestAnimationFrame(() => setTimeout(() => document.body.classList.add('active'), 8));

		const wait = 300; // must match/ exceed CSS transition (260ms)
		setTimeout(() => { window.location.href = url.href; }, wait);
	}, true);
}

