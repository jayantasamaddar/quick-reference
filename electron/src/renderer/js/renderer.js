const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

/*********************************************************************************************
 * Helpers
 * -------
 *********************************************************************************************/

const isImageFile = file => {
  const acceptedTypes = ['image/png', 'image/jpeg', 'image/gif'];
  return file && acceptedTypes.includes(file?.type);
};

const alert = (type, message) => {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: type === 'success' ? 'green' : 'red',
      color: '#FFFFFF',
      textAlign: 'center',
    },
  });
};

/**********************************************************************************************
 * Event Handlers
 * --------------
 **********************************************************************************************/

const loadImage = e => {
  const file = e.target.files[0];

  if (!isImageFile(file)) {
    alert('error', 'Please select an Image');
    return;
  }

  /** Get original Image dimensions */
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function () {
    widthInput.value = this.width;
    heightInput.value = this.height;
  };

  form.style.display = 'block'; // Display was `hidden`
  filename.innerText = file.name;
  outputPath.innerText = path.join(os.homedir(), 'image-resizer');
};

/** Handle image send on submit */
const handleSubmit = e => {
  e.preventDefault();

  if (!img.files[0]) {
    alert('error', 'Please upload an image');
    return;
  }

  if (widthInput.value === '' || heightInput.value === '') {
    alert('error', 'Please fill in a height and width');
    return;
  }

  /** Send to main using IPCRenderer */
  ipcRenderer.send('image:resize', {
    width: widthInput.value,
    height: heightInput.value,
    imgPath: img.files[0].path,
  });
};

/***************************************************************************************
 * Event Listeners
 * ----------------
 ***************************************************************************************/
img.addEventListener('change', loadImage);

form.addEventListener('submit', handleSubmit);

ipcRenderer.on('image:success', () => {
  alert(
    'success',
    `Image resized to ${widthInput.value} x ${heightInput.value}!`
  );
});
