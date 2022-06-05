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
  const regex = /image.*/;
  const imageList = [];
  const length = transferedFiles.length;
  for (let i = 0; i < length; i++) {
    if (!transferedFiles[i].type.match(regex)) {
      return;
    } else {
      imageList.push(transferedFiles[i]);
    }
  }
  displayImage(imageList);
});

const displayImage = (imageList) => {
  const imageBox = document.querySelector(".image-box");
  imageList.forEach((imageFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener("load", (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
        const IMG_WIDTH = image.naturalWidth;
        const scaleSize = MAX_WIDTH / IMG_WIDTH;
        canvas.width = MAX_WIDTH;
        canvas.height = image.naturalHeight * scaleSize;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        imageBox.insertBefore(canvas, imageBox.firstChild);
      };
    });
  });
  const canvasNum = imageList.length;
  console.log(canvasNum);
  if (canvasNum % 5 !== 0) {
    const shortage = 5 - (canvasNum % 5);
    console.log(shortage);
    for (let i = 0; i < shortage; i++) {
      const empty = document.createElement("canvas");
      imageBox.insertBefore(empty, imageBox.lastChild);
    }
  }
};
