$(document).ready(function(){
	var selectedAmenities = {};
	places = $('.places'); /*A jQuery object that represents a collection of elements that match the selector.
	to avoid searching the DOM for the element every time the function is called.*/
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

	fetch_places(places, [], [], []);

    $('button').click(() => {
        fetch_places(places, [], [], Object.keys(amenity_filters));
    });
});
function get_places(places, states, cities, amenities){
	places.empty();
	$.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        data: JSON.stringify({}),
        contentType: 'application/json',
        dataType: 'json',
        success: (data) => {
            data.map((place) => {
                $places.append(`
                    <article>   
                        <div class="place_header">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">
                                ${place['price_by_night']}
                            </div>
                        </div>
                        <div class="information">
                            <div class="max_guest">
                                ${place['max_guest']} Guests
                            </div>
                            <div class="number_rooms">
                                ${place['number_rooms']} Bedroom
                            </div>
                            <div class="number_bathrooms">
                                ${place['number_bathrooms']} Bathroom
                            </div>
                        </div>
                        <div id="owner_${place['id']}" class="user">  
                        </div>
                        <div class="description">${place['description']}</div>
                    </article>
                `);
                $.get(
                    `http://0.0.0.0:5001/api/v1/users/${place['user_id']}`,
                    (user) => {
                        $(`#owner_${place['id']}`).append(`
                            <strong>Owner</strong>: ${user['first_name']}
                            ${user['last_name']}
                        `);
                    }
                );
            });
        },
    });
}