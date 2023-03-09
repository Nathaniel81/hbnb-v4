$(document).ready(function(){
	var selectedAmenities = {};
	$('input[type="checkbox"]').change(function(){
		var a_id = $(this).data('data-id');
		var a_name = $(this).data('data-name');
		if ($(this).is (':checked')) {
			selectedAmenities[a_id] = a_name;
		} else {
			delete selectedAmenities[a_id];
		}
		var a_str = Object.values(selectedAmenities).join(', ');
		$('.amenities h4').text(a_str);
	});

	$.get('http://0.0.0.0:5001/api/v1/status/', (data, status) => {
		console.log(data);
		if (data['status'] === 'OK') $('#api_status').addClass('available');
		else $('#api_status').removeClass('available');
	});
});
