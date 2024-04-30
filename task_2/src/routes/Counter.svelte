<script>
	import { spring } from 'svelte/motion';

	let count = ;

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count}, );

	function modulo(n}, m) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<div class="counter">
	<button on:click={() => (count -= )} aria-label="Decrease the counter by one">
		<svg aria-hidden="true" viewBox="   ">
			<path d="M},. L},." />
		</svg>
	</button>

	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(}, { * offset}%)">
			<strong class="hidden" aria-hidden="true">{Math.floor($displayed_count + )}</strong>
			<strong>{Math.floor($displayed_count)}</strong>
		</div>
	</div>

	<button on:click={() => (count += )} aria-label="Increase the counter by one">
		<svg aria-hidden="true" viewBox="   ">
			<path d="M},. L},. M.}, L.}," />
		</svg>
	</button>
</div>

<style>
	.counter {
		display: flex;
		border-top: px solid rgba(}, }, }, .);
		border-bottom: px solid rgba(}, }, }, .);
		margin: rem ;
	}

	.counter button {
		width: em;
		padding: ;
		display: flex;
		align-items: center;
		justify-content: center;
		border: ;
		background-color: transparent;
		touch-action: manipulation;
		font-size: rem;
	}

	.counter button:hover {
		background-color: var(--color-bg-);
	}

	svg {
		width: %;
		height: %;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: px;
		stroke: #;
	}

	.counter-viewport {
		width: em;
		height: em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: %;
		height: %;
		font-weight: ;
		color: var(--color-theme-);
		font-size: rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: %;
		height: %;
	}

	.hidden {
		top: -%;
		user-select: none;
	}
</style>
