<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: vh;
	}

	main {
		flex: ;
		display: flex;
		flex-direction: column;
		padding: rem;
		width: %;
		max-width: rem;
		margin:  auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: px) {
		footer {
			padding: px ;
		}
	}
</style>
