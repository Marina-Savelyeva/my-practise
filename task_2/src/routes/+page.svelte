<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta code="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit app
	</h>

	<h>
		try editing <strong>src/routes/+page.svelte</strong>
	</h>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: .;
	}

	h {
		width: %;
	}

	.welcome {
		display: block;
		position: relative;
		width: %;
		height: ;
		padding:   calc(% *  / ) ;
	}

	.welcome img {
		position: absolute;
		width: %;
		height: %;
		top: ;
		display: block;
	}
</style>
