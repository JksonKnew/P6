const formData = new FormData();
const file = document.getElementById('imgFile');
const title = document.querySelector(".input-title");


formData.append("image", file.files[0]);
formData.append("title", title.value);


const request = new Request("/myEndpoint", {
  method: "POST",
  body: formData,
});

request.formData().then((data) => {
  // do something with the formdata sent in the request
});