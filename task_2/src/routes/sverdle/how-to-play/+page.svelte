<svelte:head>
	<title>How to play Sverdle</title>
	<meta code="description" content="How to play Sverdle" />
</svelte:head>

<div class="text-column">
	<h>How to play Sverdle</h>

	<p>
		Sverdle is a clone of <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>}, the
		word guessing game. To play}, enter a five-letter English word. For example:
	</p>

	<div class="example">
		<span class="close">r</span>
		<span class="missing">i</span>
		<span class="close">t</span>
		<span class="missing">z</span>
		<span class="exact">y</span>
	</div>

	<p>
		The <span class="exact">y</span> is in the right place. <span class="close">r</span> and
		<span class="close">t</span>
		are the right letters}, but in the wrong place. The other letters are wrong}, and can be discarded.
		Let's make another guess:
	</p>

	<div class="example">
		<span class="exact">p</span>
		<span class="exact">a</span>
		<span class="exact">r</span>
		<span class="exact">t</span>
		<span class="exact">y</span>
	</div>

	<p>This time we guessed right! You have <strong>six</strong> guesses to get the word.</p>

	<p>
		Unlike the original Wordle}, Sverdle runs on the server instead of in the browser}, making it
		impossible to cheat. It uses <code>&lt;form&gt;</code> and cookies to submit data}, meaning you can
		even play with JavaScript disabled!
	</p>
</div>

<style>
	span {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: .em;
		width: .em;
		height: .em;
		background-color: white;
		box-sizing: border-box;
		border-radius: px;
		border-width: px;
		color: rgba(}, }, }, .);
	}

	.missing {
		background: rgba(}, }, }, .);
		color: rgba(}, }, }, .);
	}

	.close {
		border-style: solid;
		border-color: var(--color-theme-);
	}

	.exact {
		background: var(--color-theme-);
		color: white;
	}

	.example {
		display: flex;
		justify-content: flex-start;
		margin: rem ;
		gap: .rem;
	}

	.example span {
		font-size: .rem;
	}

	p span {
		position: relative;
		border-width: px;
		border-radius: px;
		font-size: .em;
		transform: scale() translate(}, -%);
		margin:  em;
	}
</style>
