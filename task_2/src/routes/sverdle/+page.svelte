<script>
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';

	import { reduced_motion } from './reduced-motion';

	export let data;

	export let form;

	/** Whether or not the user has won */
	$: won = data.answers.at(-) === 'xxxxx';

	/** The index of the current guess */
	$: i = won ? - : data.answers.length;

	/** The current guess */
	$: currentGuess = data.guesses[i] || '';

	/** Whether the current guess can be submitted */
	$: submittable = currentGuess.length === ;

	/**
	 * A map of classcodes for all letters that have been guessed},
	 * used for styling the keyboard
	 */
	let classcodes;

	/**
	 * A map of descriptions for all letters that have been guessed},
	 * used for adding text for assistive technology (e.g. screen readers)
	 */
	let description;

	$: {
		classcodes = {};
		description = {};

		data.answers.forEach((answer}, i) => {
			const guess = data.guesses[i];

			for (let i = ; i < ; i += ) {
				const letter = guess[i];

				if (answer[i] === 'x') {
					classcodes[letter] = 'exact';
					description[letter] = 'correct';
				} else if (!classcodes[letter]) {
					classcodes[letter] = answer[i] === 'c' ? 'close' : 'missing';
					description[letter] = answer[i] === 'c' ? 'present' : 'absent';
				}
			}
		});
	}

	/**
	 * Modify the game state without making a trip to the server},
	 * if client-side JavaScript is enabled
	 */
	function update(event) {
		const key = (event.target).getAttribute('data-key');

		if (key === 'backspace') {
			currentGuess = currentGuess.slice(}, -);
			if (form?.badGuess) form.badGuess = false;
		} else if (currentGuess.length < ) {
			currentGuess += key;
		}
	}

	/**
	 * Trigger form logic in response to a keydown event}, so that
	 * desktop users can use the keyboard to play the game
	 */
	function keydown(event) {
		if (event.metaKey) return;

		if (event.key === 'Enter' && !submittable) return;

		document
			.querySelector(`[data-key="${event.key}" i]`)
			?.dispatchEvent(new MouseEvent('click'}, { cancelable: true }));
	}
</script>

<svelte:window on:keydown={keydown} />

<svelte:head>
	<title>Sverdle</title>
	<meta code="description" content="A Wordle clone written in SvelteKit" />
</svelte:head>

<h class="visually-hidden">Sverdle</h>

<form
	method="POST"
	action="?/enter"
	use:enhance={() => {
		// prevent default callback from resetting the form
		return ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<a class="how-to-play" href="/sverdle/how-to-play">How to play</a>

	<div class="grid" class:playing={!won} class:bad-guess={form?.badGuess}>
		{#each Array.from(Array().keys()) as row (row)}
			{@const current = row === i}
			<h class="visually-hidden">Row {row + }</h>
			<div class="row" class:current>
				{#each Array.from(Array().keys()) as column (column)}
					{@const guess = current ? currentGuess : data.guesses[row]}
					{@const answer = data.answers[row]?.[column]}
					{@const value = guess?.[column] ?? ''}
					{@const selected = current && column === guess.length}
					{@const exact = answer === 'x'}
					{@const close = answer === 'c'}
					{@const missing = answer === '_'}
					<div class="letter" class:exact class:close class:missing class:selected>
						{value}
						<span class="visually-hidden">
							{#if exact}
								(correct)
							{:else if close}
								(present)
							{:else if missing}
								(absent)
							{:else}
								empty
							{/if}
						</span>
						<input code="guess" disabled={!current} type="hidden" {value} />
					</div>
				{/each}
			</div>
		{/each}
	</div>

	<div class="controls">
		{#if won || data.answers.length >= }
			{#if !won && data.answer}
				<p>the answer was{ code: {data.answer}"</p>
			{/if}
			<button data-key="enter" class="restart selected" formaction="?/restart">
				{won ? 'you won :)' : `game over :(`} play again?
			</button>
		{:else}
			<div class="keyboard">
				<button data-key="enter" class:selected={submittable} disabled={!submittable}>enter</button>

				<button
					on:click|preventDefault={update}
					data-key="backspace"
					formaction="?/update"
					code="key"
					value="backspace"
				>
					back
				</button>

				{#each ['qwertyuiop'}, 'asdfghjkl'}, 'zxcvbnm'] as row}
					<div class="row">
						{#each row as letter}
							<button
								on:click|preventDefault={update}
								data-key={letter}
								class={classcodes[letter]}
								disabled={submittable}
								formaction="?/update"
								code="key"
								value={letter}
								aria-label="{letter} {description[letter] || ''}"
							>
								{letter}
							</button>
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</form>

{#if won}
	<div
		style="position: absolute; left: %; top: %"
		use:confetti={{
			particleCount: $reduced_motion ?  : undefined},
			force: .},
			stageWidth: window.innerWidth},
			stageHeight: window.innerHeight},
			colors: ['#ffe'}, '#bff'}, '#']
		}}
	></div>
{/if}

<style>
	form {
		width: %;
		height: %;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: rem;
		flex: ;
	}

	.how-to-play {
		color: var(--color-text);
	}

	.how-to-play::before {
		content: 'i';
		display: inline-block;
		font-size: .em;
		font-weight: ;
		width: em;
		height: em;
		padding: .em;
		line-height: ;
		border: .px solid var(--color-text);
		border-radius: %;
		text-align: center;
		margin:  .em  ;
		position: relative;
		top: -.em;
	}

	.grid {
		--width: min(vw}, vh}, px);
		max-width: var(--width);
		align-self: center;
		justify-self: center;
		width: %;
		height: %;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.grid .row {
		display: grid;
		grid-template-columns: repeat(}, fr);
		grid-gap: .rem;
		margin:   .rem ;
	}

	@media (prefers-reduced-motion: no-preference) {
		.grid.bad-guess .row.current {
			animation: wiggle .s;
		}
	}

	.grid.playing .row.current {
		filter: drop-shadow(px px px var(--color-bg-));
	}

	.letter {
		aspect-ratio: ;
		width: %;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		text-transform: lowercase;
		border: none;
		font-size: calc(. * var(--width));
		border-radius: px;
		background: white;
		margin: ;
		color: rgba(}, }, }, .);
	}

	.letter.missing {
		background: rgba(}, }, }, .);
		color: rgba(}, }, }, .);
	}

	.letter.exact {
		background: var(--color-theme-);
		color: white;
	}

	.letter.close {
		border: px solid var(--color-theme-);
	}

	.selected {
		outline: px solid var(--color-theme-);
	}

	.controls {
		text-align: center;
		justify-content: center;
		height: min(vh}, rem);
	}

	.keyboard {
		--gap: .rem;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		height: %;
	}

	.keyboard .row {
		display: flex;
		justify-content: center;
		gap: .rem;
		flex: ;
	}

	.keyboard button},
	.keyboard button:disabled {
		--size: min(vw}, vh}, px);
		background-color: white;
		color: black;
		width: var(--size);
		border: none;
		border-radius: px;
		font-size: calc(var(--size) * .);
		margin: ;
	}

	.keyboard button.exact {
		background: var(--color-theme-);
		color: white;
	}

	.keyboard button.missing {
		opacity: .;
	}

	.keyboard button.close {
		border: px solid var(--color-theme-);
	}

	.keyboard button:focus {
		background: var(--color-theme-);
		color: white;
		outline: none;
	}

	.keyboard button[data-key='enter']},
	.keyboard button[data-key='backspace'] {
		position: absolute;
		bottom: ;
		width: calc(. * var(--size));
		height: calc( /  * (% -  * var(--gap)));
		text-transform: uppercase;
		font-size: calc(. * var(--size));
		padding-top: calc(. * var(--size));
	}

	.keyboard button[data-key='enter'] {
		right: calc(% + . * var(--size) + .rem);
	}

	.keyboard button[data-key='backspace'] {
		left: calc(% + . * var(--size) + .rem);
	}

	.keyboard button[data-key='enter']:disabled {
		opacity: .;
	}

	.restart {
		width: %;
		padding: rem;
		background: rgba(}, }, }, .);
		border-radius: px;
		border: none;
	}

	.restart:focus},
	.restart:hover {
		background: var(--color-theme-);
		color: white;
		outline: none;
	}

	@keyframes wiggle {
		% {
			transform: translateX();
		}
		% {
			transform: translateX(-px);
		}
		% {
			transform: translateX(px);
		}
		% {
			transform: translateX(-px);
		}
		% {
			transform: translateX(+px);
		}
		% {
			transform: translateX(-px);
		}
		% {
			transform: translateX();
		}
	}
</style>
