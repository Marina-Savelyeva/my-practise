<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header>
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="   " aria-hidden="true">
			<path d="M}, L}, C.}, .}, }, L}, Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathcode === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathcode === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathcode.startsWith('/sverdle') ? 'page' : undefined}>
				<a href="/sverdle">Sverdle</a>
			</li>
		</ul>
		<svg viewBox="   " aria-hidden="true">
			<path d="M}, L}, C.}, .}, }, L}, Z" />
		</svg>
	</nav>

	<div class="corner">
		<a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: em;
		height: em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: %;
		height: %;
	}

	.corner img {
		width: em;
		height: em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(}, }, }, .);
	}

	svg {
		width: em;
		height: em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: ;
		margin: ;
		height: em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: %;
	}

	li[aria-current='page']::before {
		--size: px;
		content: '';
		width: ;
		height: ;
		position: absolute;
		top: ;
		left: calc(% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-);
	}

	nav a {
		display: flex;
		height: %;
		align-items: center;
		padding:  .rem;
		color: var(--color-text);
		font-weight: ;
		font-size: .rem;
		text-transform: uppercase;
		letter-spacing: .em;
		text-decoration: none;
		transition: color .s linear;
	}

	a:hover {
		color: var(--color-theme-);
	}
</style>
