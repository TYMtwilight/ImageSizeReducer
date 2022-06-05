const fileZone = document.querySelector(".file-zone");
const on = "on";
fileZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  fileZone.classList.add(on);
});
fileZone.addEventListener("dragleave", (event) => {
  event.preventDefault();
  fileZone.classList.remove(on);
});
fileZone.addEventListener("drop", (event) => {
  event.preventDefault();
  fileZone.classList.remove(on);
  const transferedFiles = event.dataTransfer.files;
  displayImage(transferedFiles);
});

const displayImage = (transferedFiles) => {
  const regex = /image.*/;
  const imageList = [];
  const length = transferedFiles.length;
  for (let i = 0; i < length; i++) {
    if (!transferedFiles[i].type.match(regex)) {
      return;
    } else {
      imageList.push(transferedFiles[i]);
    }
    console.log(imageList);
    imageList.forEach((imageFile) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.addEventListener("load", (event) => {
        const image = document.querySelector(".image");
        image.src = event.target.result;
      });
    });
  }
};
