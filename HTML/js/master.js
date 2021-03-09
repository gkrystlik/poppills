var wWidth, wHeight;
var euro = '€';
var dollar = '$';
var currency = 'USD';
var sign = dollar;
//var $header = $('.header');
//var $body = $('body');
//var $shop = $('.shop');
//var $popIn = $('.pop-in');
var $form = $('form');
var $button = $('.shop-button');
var $inputs = $('input[type="checkbox"]');
var $cart = $('.cart');
var $prices = $('.shop-price-amount');
var $currencySwitch = $('.shop-currency');
function onScroll(){
	if($(window).scrollTop() > $('.credits').offset().top) { $header.addClass('is-visible'); } 
	else { $header.removeClass('is-visible'); }
	
	if($(window).scrollTop() >= $shop.offset().top - wHeight * 2 / 3 ) { $body.addClass('is-colored'); $currencySwitch.addClass('is-visible'); } 
	else { $body.removeClass('is-colored'); $currencySwitch.removeClass('is-visible') }

	if($(window).scrollTop() >= $shop.offset().top - wHeight * 1 / 3 && $(window).scrollTop() < $('.footer').offset().top - wHeight * 1 / 3) { $currencySwitch.addClass('is-visible'); } 
	else { $currencySwitch.removeClass('is-visible') }

	if($(window).scrollTop() >= $('.footer').offset().top - wHeight * 1 / 3 ) { $body.removeClass('is-colored'); } 

}

function switchCurrency(){
	var $this = $(this);
	var $el = $this.find('[data-currency]');
	currency = $el.attr('data-currency');
	sign = $el.attr('data-currency-sign');
	var newCurrency, newSign;
	if(currency == 'EUR'){ newSign = dollar; newCurrency = 'USD'; } 
	else { newSign = euro; newCurrency = 'EUR'; }

	$el.attr('data-currency-sign', newSign);
	$el.attr('data-currency', newCurrency);
	$('.shop-shipping-amount').html(sign + '5');
	$prices.each(function(i, el){
		$(el).text(sign + $(el).attr('data-price-' + currency.toLowerCase()))
	});
	$('input[name="currency_code"]').val(currency);
	updatePrice();


}

function updatePrice(){

	var total = 0;
	var shipping = 5;
	$inputs.each(function(i, el){
		if($(el).is(':checked')){
			var quantity = $(el).parent().find('input[type="number"]').val();
			console.log(parseInt($(el).attr('data-price-' + currency.toLowerCase())));
			total += (parseInt($(el).attr('data-price-' + currency.toLowerCase())) + shipping) * quantity;	
		}
	});
	if(total > 0) { 
		$button.addClass('is-visible')
//		window.setTimeout(function(){
//			$button.removeClass('animate'); 
//		}, 500);
		$button.find('.shop-button-price').text(sign + total); 
	} 

	else { 
   // $button.removeClass('is-visible'); 
    $button.find('.shop-button-price').text(sign +"0");
}
	
}

function updateCart(){
	$cart.html('');
	var index = 1;
	$inputs.each(function(i, el){
		if($(el).is(':checked')){
			$cart.append($('<input>').attr({
				type: 'hidden',
				name: 'item_name_' + index
			}).val($(el).data('item')));
			$cart.append($('<input>').attr({
				type: 'hidden',
				name: 'amount_' + index
			}).val($(el).data('price-' + currency.toLowerCase())));
			$cart.append($('<input>').attr({
				type: 'hidden',
				name: 'quantity_' + index
			}).val($(el).parent().find('input[type="number"]').val()));
			$cart.append($('<input>').attr({
				type: 'hidden',
				name: 'shipping_' + index
			}).val(5));
			index++;
		}
	});
}

function order(e){
	e.preventDefault();
	$('html,body').animate({
    scrollTop: $shop.offset().top
  }, 500);
}

function onSubmit(e){
	e.preventDefault();
	updateCart();
	$form.submit();
}


function addEventListeners(){
	$('.js-updatePrice').on('change', updatePrice);
	$('.js-submit').on('click', onSubmit);
}

function initialize(){
	addEventListeners();
}


initialize();