<script>
  import { createEventDispatcher } from 'svelte';
  import { currencies } from '../lib/data';
  import { apiKey } from './apiKey';
  const dispatch = createEventDispatcher();

  let from = '';
  let to = '';
  let resultMoney = null;
  let count = 0;//чтобы изначально отображался 0

  async function getCurrency() {//получаем данные из api для конвертации валют
    try {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);//берем значения относительно from
      if (!res.ok) {
        throw new Error(`Ошибка HTTP: ${res.status}`);
      }

      const currency = await res.json();
      if (currency.result === 'error') {
        throw new Error(`API ошибка: ${currency.error_type}`);
      }
      //console.log(currency.conversion_rates[to]);
      return currency.conversion_rates[to];//на что надо умножить количество, чтобы получить результат
    } catch (error) {
      console.error('Ошибка:', error.message);
      return null;
    }
  }

  async function calculate() {//считаем конвертацию валют
    if (!from || !to || !count) {
      console.error('Пожалуйста заполните все 3 поля');
    }
    const exchange = await getCurrency();//получаем курс обмена
    if (exchange !== null) {
      resultMoney = count * exchange;
      dispatch('result', { result: resultMoney });
    }
  }

</script>


<h1>Одностраничный сервис для конвертации валют</h1>
<div class="section">
  <label for="from">Что:</label>
  <select id="from" bind:value={from} on:change={calculate}>
    <option value="">Выберите валюту</option>
    {#each currencies as currency}
      <option value={currency.code}>{currency.code}</option>
    {/each}
  </select>
</div>
<div class="section">
  <label for="to">Во что:</label>
  <select id="to" bind:value={to} on:change={calculate}>
    <option value="">Выберите валюту</option>
    {#each currencies as currency}
      <option value={currency.code}>{currency.code}</option>
    {/each}
  </select>
</div>
<div class="section">
  <label for="count">Сколько:</label>
  <input type="number" id="count" bind:value={count} on:input={calculate} />
</div>

<div class="converter_result section">
  <div>
    <p>Результат: </p>
    {#if resultMoney}
    <p class="res"> {count} {from} = {resultMoney} {to}</p>
    {/if}
  </div>
</div>

