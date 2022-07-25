const input = document.getElementById('upload');
const loader = document.getElementById('img-loader');
const imgPlaceHolder = document.getElementById('new-img');
const fileReader = new FileReader();

const init = async () => {
  let greyscaleStringFromRust;
  try {
    greyscaleStringFromRust = await import('../pkg');
  } catch (e) {
    console.error(e);
    return;
  }
  setListeners(greyscaleStringFromRust);
};

const setListeners = (code) => {
  fileReader.onloadend = async () => {
    let result;
    try {
      result = await applyGreyscale(code);
    } catch {
      console.error('Error Occured! Please try again');
    }
    loader.style.display = 'none';
    imgPlaceHolder.setAttribute('src', result);
  };
  input.addEventListener('change', (e) => {
    if(!!imgPlaceHolder) {
      imgPlaceHolder.setAttribute('src', '');
    }
    loader.style.display = 'block';
    setTimeout(() => {
      fileReader.readAsDataURL(input.files[0]);
    }, 100);
  });
};

const applyGreyscale = (code) => {
  const base64 = fileReader.result.replace(
    /^data:image\/(png|jpeg|jpg);base64,/,
    ''
  );
  return new Promise((resolve, reject) => {
    resolve(code.greyscale(base64));
  });
}

init();
