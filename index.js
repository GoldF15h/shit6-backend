window.onload = () => {
	$('#sendbutton').click(() => {
		imagebox = $('#imagebox');
		input = $('#imageinput')[0];
		if (input.files && input.files[0]) {
			let formData = new FormData();
			formData.append('image', input.files[0]);
			formData.append('faceSelected', 1);
			formData.append('template', 3);
			$.ajax({
				url: 'http://localhost:3333/api/preprocess', // fix this to your liking
				type: 'POST',
				data: formData,
				cache: false,
				processData: false,
				contentType: false,
				error: function (data) {
					console.log('upload error', data);
					console.log(data.getAllResponseHeaders());
				},
				success: function (data) {
					// alert("hello"); // if it's failing on actual server check your server FIREWALL + SET UP CORS
					bytestring = data['image'];
					image = bytestring.split("'")[1];
					imagebox.attr('src', 'data:image/jpeg;base64,' + image);
				},
			});
		}
	});
};

function readUrl(input) {
	imagebox = $('#imagebox');
	console.log('evoked readUrl');
	if (input.files && input.files[0]) {
		let reader = new FileReader();
		reader.onload = function (e) {
			// console.log(e)

			imagebox.attr('src', e.target.result);
			imagebox.height(300);
			imagebox.width(300);
		};
		reader.readAsDataURL(input.files[0]);
	}
}
