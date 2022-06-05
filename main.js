const fileZone = document.querySelector(".file-zone");
const on = "on";
const filenames = [];

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
    filenames.push(imageFile.name);
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener("load", (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.classList.add(".canvas-image");
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
  if (canvasNum % 5 !== 0) {
    const shortage = 5 - (canvasNum % 5);
    console.log(shortage);
    for (let i = 0; i < shortage; i++) {
      const empty = document.createElement("canvas");
      imageBox.insertBefore(empty, imageBox.lastChild);
    }
  }
  console.log(filenames);
};

const download = document.querySelector(".download");
download.addEventListener("click", (event) => {
  event.preventDefault();
  const canvasImages = document.getElementsByClassName(".canvas-image");
  const length = canvasImages.length;
  for (let i = 0; i < length; i++) {
    canvasImages[i].toBlob((blob) => {
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filenames[i]);
      } else if (window.URL && window.URL.createObjectURL) {
        const a = document.createElement("a");
        a.download = filenames[i];
        a.href = window.URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        window.open(base64, "_bloank");
      }
    }, "image/jpeg");
  }
});
