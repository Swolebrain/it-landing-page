/*
	Spectral by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

			$body.addClass('is-loading');
			setTimeout(function() {
				$body.removeClass('is-loading');
			}, 300);
		// Disable animations/transitions until the page has loaded.
			/*$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});*/

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			/*$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});*/

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

	});
	//FORM SUBMISSION
	var btnText = "Request Info!", waitText = "Sending...";
	//var campaignUrl = "https://secure.velocify.com/Import.aspx?Provider=LandingPageB&Client=30010&CampaignId=1087";
	//var campaignUrl = "http://localhost:4004/submitITform";
	var campaignUrl = 'http://www.fvi-grad.com:4004/submitITform'
	$("#form-submit").on("click", submitForm);

	function submitForm(e){
		e.preventDefault();
		var res = validateForm($("#contact"));
		console.log("Form validation result: "+res);
		if ( res != "valid"){
			alert(res);
			return;
		}
		$("#form-submit").html(waitText);
		$("#form-submit").off("click", submitForm);
		var fullName = $("#full_name").val().split(" ");
		var firstName = fullName[0];
		var lastName = fullName.splice(1).join(" ");
		try{
			dataLayer.push({'event':'fsubmit_landing_page_b'});
		}
		catch (err){
			console.log("datalayer push failed - "+err.toString());
		}
		$.ajax({
			url: campaignUrl,
			method: 'POST',
			data:{
				fname: firstName,
				lname: lastName,
				email: $("#email").val(),
				phone: $("#phone").val(),
				program: "SUMMER CAMPS",
				age: $("#age").val(),
				zip: $("#zip").val()
			},
			success: function(resp, text, xhr){
				console.log("form submission succeeded");
				$("#form-submit").html(resp);
			},
			error: function(xhr, err){
				resetForm();
				alert("There was an error: "+err);
			}
		});
	}
	function resetForm(){
		$("#form-submit").on("click", submitForm);
		$("#form-submit").html(btnText);
	}
	function validateForm(frm){
		if ($("#full_name").val().length < 3 ||
		$("#full_name").val().split(" ").length <= 1)
			return "Please include your full name";

		if (!$("#email").val().match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ) )
			return "Please enter an email with the structure address@domain.com (or .net, .co, etc)";

		if (!$("#phone").val().match(/^[( ]*[0-9]{3}[) -]*[0-9]{3}[ -]*[0-9]{4}$/) )
			return "Please enter a nine-digit US phone number in the format xxx-xxx-xxxx.";

		return "valid";
	}
	function findSource(){
		return "12 week overtown code camp";
	}

})(jQuery);
